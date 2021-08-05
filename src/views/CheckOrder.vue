<template>
  <div v-show="isLoading" class="loading-icon" />
  <div v-show="isLoading" class="overlay" />
  <div v-show="!temporaryCart" class="loading-icon" />
  <div v-if="!temporaryCart.length" class="cart-empty">購物車是空的</div>
  <div v-else class="check-page">
    <cart
      :cart="temporaryCart"
      :discount="temporaryDiscount"
      @selectPrice="selectPrice"
    />
    <table class="check-table">
      <tr>
        <td colspan="2">訂單資訊</td>
      </tr>
      <tr>
        <td>姓名</td>
        <td>{{ user.order.name }}</td>
      </tr>
      <tr>
        <td>電子郵件地址</td>
        <td>{{ user.order.email }}</td>
      </tr>
      <tr>
        <td>手機號碼</td>
        <td>{{ user.order.phone }}</td>
      </tr>
      <tr>
        <td>居住地址</td>
        <td>{{ user.order.address }}</td>
      </tr>
      <tr>
        <td>備註</td>
        <td>{{ user.order.remark }}</td>
      </tr>
      <tr>
        <td>付款狀態</td>
        <td style="color: #ff0000">{{ paid }}</td>
      </tr>
    </table>
    <div v-if="!isPaid" class="pay">
      <button @click="pay">確認付款</button>
    </div>
  </div>
  <div class="pop-check"></div>
</template>

<script>
import cart from "@/components/Cart.vue";
import store from "@/store/index.js";
import axios from "axios";

import { mapState } from "vuex";

export default {
  data() {
    return {
      isPaid: false,
      checkPass: false,
      price: Number,
    };
  },
  components: {
    cart,
  },
  computed: {
    ...mapState([
      "temporaryCart",
      "isLoading",
      "user",
      "products",
      "temporaryDiscount",
    ]),
    paid() {
      if (this.isPaid !== true) {
        return "尚未付款";
      } else {
        return "已付款";
      }
    },
    order() {
      return {
        name: this.user.order.name,
        email: this.user.order.email,
        phone: this.user.order.phone,
        address: this.user.order.address,
        remark: this.user.order.remark,
        amount: this.price,
      };
    },
  },
  methods: {
    selectPrice(price) {
      this.price = price;
    },
    async pay() {
      store.commit("loading", true);
      await axios
        .get("https://pokemon-shop-server.herokuapp.com/users/" + this.user.id)
        .then(async (response) => {
          for (let element of response.data.cart) {
            let product = this.products.find((item) => item.id === element.id);
            let newArr = response.data.cart.filter(
              (item) => item.id === product.id
            );

            let totalQuantity = newArr.reduce(
              (accumulator, currentValue) =>
                accumulator + currentValue.quantity,
              0
            );
            if (totalQuantity > product.quantity) {
              this.checkPass = false;
              store.commit("loading", false);
              break;
            } else {
              this.checkPass = true;
            }
          }
        });

      if (this.checkPass) {
        await axios
          .get(
            "https://pokemon-shop-server.herokuapp.com/users/" + this.user.id
          )
          .then(async (response) => {
            for (let element of response.data.cart) {
              let product = this.products.find(
                (item) => item.id === element.id
              );

              await axios.patch(
                "https://pokemon-shop-server.herokuapp.com/products/" +
                  product.id,
                {
                  quantity: product.quantity - element.quantity,
                }
              );
              await axios
                .get("https://pokemon-shop-server.herokuapp.com/products")
                .then((response) => {
                  store.commit("addProducts", response.data);
                });
            }
          });
        await axios.post(
          "https://pokemon-shop-server.herokuapp.com/orders",
          this.order
        );
        await axios.patch(
          "https://pokemon-shop-server.herokuapp.com/users/" + this.user.id,
          {
            cart: [],
          }
        );
        this.isPaid = true;
        store.dispatch("getUser");
        store.commit("addDiscount", 1);
        store.commit("loading", false);
      } else {
        alert("商品超出購買上限");
      }
    },
  },
};
</script>

<style lang="scss"></style>
