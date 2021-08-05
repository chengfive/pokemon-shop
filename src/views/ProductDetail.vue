<template>
  <div v-show="!products.length" class="loading-icon"></div>
  <div class="product-detail" v-if="products.length">
    <div class="product-img">
      <img :src="require('@/assets/products/' + product.src)" />
    </div>
    <div class="product-other">
      <span class="product-type">{{ product.type }}</span>
      <div class="product-name">{{ product.name }}</div>
      <div class="product-price">${{ product.price }}</div>
      <div class="product-description">{{ product.description }}</div>
      <hr color="#999999" size="0.5" style="margin: 30px 0" />
      <div class="product-quantity">
        <button
          :class="{ disable: currentQuantity == 1 }"
          @click="decreaseQuantity"
        >
          &minus;
        </button>
        <input
          type="text"
          @input="maxQuantity"
          @blur="emptyQuantity"
          v-model="currentQuantity"
        />
        <button
          :class="{ disable: currentQuantity == product.quantity }"
          @click="increaseQuantity"
        >
          &plus;
        </button>
        <span style="margin-left: 15px; color: #666666"
          >還剩下{{ product.quantity }}件</span
        >
      </div>
      <div style="height: 20px; margin: -10px 0 0">
        <span v-if="maxNotice" style="color: #ff0000">已達到購買上限</span>
      </div>
      <div class="product-subTotal">
        小計<span>${{ subTotal }}</span>
      </div>
      <div class="product-cart">
        <button @click="addToCart">加入購物車</button>
      </div>
    </div>
    <div id="pop"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import store from "@/store/index.js";

export default {
  data() {
    return {
      currentQuantity: 1,
    };
  },
  computed: {
    ...mapState(["products", "isLogining", "user"]),
    product() {
      return this.products.find((item) => item.id === this.$route.params.id);
    },
    subTotal() {
      return this.product.price * this.currentQuantity;
    },
    cartData() {
      return {
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        src: this.product.src,
        quantity: this.currentQuantity,
        subTotal: this.subTotal,
      };
    },
    maxNotice() {
      if (this.currentQuantity < this.product.quantity) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    addToCart() {
      if (this.isLogining) {
        store.commit("pushCart", this.cartData);
        axios.patch(
          "https://pokemon-shop-server.herokuapp.com/users/" + this.user.id,
          {
            cart: this.user.cart,
          }
        );
        store.commit("addCart", this.user.cart);
        const div = document.createElement("div");
        const text = document.createTextNode("商品已加入購物車");
        div.appendChild(text);
        document.getElementById("pop").appendChild(div);
        setTimeout(() => {
          document.getElementById("pop").removeChild(div);
        }, 1000);
      } else {
        this.$router.push("/login");
      }
    },
    increaseQuantity() {
      if (this.currentQuantity < this.product.quantity) {
        this.currentQuantity++;
      }
    },
    decreaseQuantity() {
      if (this.currentQuantity > 1) {
        this.currentQuantity--;
      }
    },
    maxQuantity() {
      this.currentQuantity = this.currentQuantity.replace(/^0|\D/g, "");
      if (this.currentQuantity > this.product.quantity) {
        this.currentQuantity = this.product.quantity;
      }
      if (this.currentQuantity !== "") {
        this.currentQuantity = +this.currentQuantity;
      }
    },
    emptyQuantity() {
      if (this.currentQuantity === "") {
        this.currentQuantity = 1;
      }
    },
  },
};
</script>

<style lang="scss"></style>
