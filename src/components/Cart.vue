<template>
  <table class="cart-table">
    <tr>
      <td>商品</td>
      <td>單價</td>
      <td>數量</td>
      <td>小計</td>
      <td v-if="isCartPage">刪除</td>
    </tr>
    <tr class="cart-tr" v-for="(product, index) in cart" :key="index">
      <td>
        <img :src="require('@/assets/products/' + product.src)" />
        {{ product.name }}
      </td>
      <td>{{ product.price }}</td>
      <td>{{ product.quantity }}</td>
      <td>{{ product.subTotal }}</td>
      <td class="delete" v-if="isCartPage">
        <img
          class="trash-img"
          @click="removeCart(cart.indexOf(product))"
          src="@/assets/trashCan.png"
        />
      </td>
    </tr>
    <tr class="total-price" :class="{ 'line-through': discount !== 1 }">
      <td colspan="5">
        合計<span style="color: #ff0000">${{ totalPrice }}</span>
      </td>
    </tr>
    <tr v-if="discount !== 1" class="coupon-price">
      <td colspan="5">
        優惠價<span style="color: #ff0000">${{ couponPrice }}</span>
      </td>
    </tr>
  </table>
</template>

<script>
import axios from "axios";
import store from "@/store/index.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      price: 0,
      amount: Number,
    };
  },
  props: {
    cart: Array,
    discount: Number,
  },
  computed: {
    ...mapState(["user"]),
    totalPrice() {
      this.calculatePrice();
      this.selectAmount();
      this.$emit("selectPrice", this.amount);
      return this.price;
    },
    couponPrice() {
      return Math.round(this.totalPrice * this.discount);
    },
  },
  methods: {
    calculatePrice() {
      if (this.cart.length !== 0) {
        this.cart.reduce((accumulator, currentValue) => {
          return (this.price = accumulator + currentValue.subTotal);
        }, 0);
      } else {
        return (this.price = 0);
      }
    },
    selectAmount() {
      if (this.discount === 1) {
        this.amount = this.price;
      } else {
        this.amount = Math.round(this.price * this.discount);
      }
    },
    async removeCart(index) {
      await store.commit("deleteCart", index);
      axios.patch(
        "https://pokemon-shop-server.herokuapp.com/users/" + this.user.id,
        {
          cart: this.cart,
        }
      );
    },
  },
  created() {
    if (this.$route.name !== "check-order") {
      this.isCartPage = true;
    } else {
      this.isCartPage = false;
    }
  },
};
</script>

<style lang="scss"></style>
