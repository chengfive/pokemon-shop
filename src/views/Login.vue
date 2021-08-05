<template>
  <div class="loading-icon" v-show="isLoading" />
  <div class="overlay" v-show="isLoading" />
  <div class="login-view">
    <div class="login-logo">
      <img src="@/assets/pokeBall.png" />
      <span>Pokemon Shop</span>
    </div>
    <form @submit.prevent="login" autocomplete="off">
      <div class="form">
        <label>電子郵件地址</label>
        <input
          type="text"
          name="email"
          required="true"
          spellcheck="false"
          v-model="email"
        />
      </div>
      <div class="form">
        <label>密碼</label>
        <input
          type="password"
          name="password"
          required="true"
          spellcheck="false"
          autocomplete="off"
          v-model="password"
        />
      </div>
      <div class="error" style="height: 20px">
        <span v-if="error" style="color: #ff0000">電子郵件或密碼錯誤</span>
      </div>
      <input type="submit" value="登入" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store/index.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      email: "red@gmail.com",
      password: "red123",
      error: false,
    };
  },
  methods: {
    async login() {
      store.commit("loading", true);
      await axios
        .get("https://pokemon-shop-server.herokuapp.com/users")
        .then((response) => {
          let user = response.data.find(
            (item) =>
              item.email === this.email && item.password === this.password
          );
          if (user) {
            store.commit("addUser", user);
            store.commit("addCart", user.cart);
            localStorage.setItem("token", JSON.stringify(user.token));
            store.commit("addToken", JSON.parse(localStorage.getItem("token")));
            store.commit("logining", true);
            store.commit("loading", false);
          } else {
            store.commit("loading", false);
          }
        });
      if (this.isLogining) {
        this.$router.push("/");
      } else {
        this.error = true;
      }
    },
  },
  computed: {
    ...mapState(["isLogining", "isLoading", "users"]),
  },
};
</script>

<style lang="scss"></style>
