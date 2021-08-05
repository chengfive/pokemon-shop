<template>
  <div id="nav">
    <router-link to="/">
      <div class="home-logo" @click="getProducts">
        <img src="@/assets/pokeBall.png" alt="PokeBall logo" />
        <span>Pokemon Shop</span>
      </div>
    </router-link>
    <router-link to="/cart-page" class="cart-a">
      <img src="@/assets/cart.png" alt="Cart logo" />
    </router-link>
    <div v-if="token.length === 0" class="login">
      <router-link to="/login">登入</router-link>
    </div>
    <div v-if="token.length !== 0" class="logout">
      <router-link @click="logout" to="/login">登出</router-link>
    </div>
  </div>
  <router-view />
</template>

<script>
import "@/assets/scss/all.scss";
import store from "@/store/index.js";
import { mapState } from "vuex";

export default {
  created() {
    store.dispatch("getToken");
    store.dispatch("getProducts");
    store.dispatch("getCoupons");
  },
  methods: {
    getProducts() {
      store.dispatch("getProducts");
    },
    logout() {
      localStorage.removeItem("token");
      store.commit("addToken", "");
      store.commit("logining", false);
    },
  },
  computed: {
    ...mapState(["islogining", "user", "token"]),
  },
};
</script>

<style lang="scss"></style>
