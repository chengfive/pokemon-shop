<template>
  <div class="loading-icon" v-show="isLoading" />
  <div class="overlay" v-show="isLoading" />
  <div class="order">
    <form @submit.prevent="error" autocomplete="off">
      <div class="form">
        <label>
          姓名
          <span v-if="nameError">此欄位不能為空</span>
        </label>
        <input type="text" name="name" spellcheck="false" v-model="name" />

        <label>
          電子郵件地址
          <span v-if="emailError">無效的地址郵件地址</span>
        </label>
        <input type="text" name="email" spellcheck="false" v-model="email" />

        <label>
          手機號碼
          <span v-if="phoneError">必須為09開頭的10位數數字</span>
        </label>
        <input
          type="text"
          name="phone"
          spellcheck="false"
          v-model="phone"
          maxlength="10"
        />

        <label>
          居住地址
          <span v-if="addressError">此欄位不能為空</span>
        </label>
        <input
          type="text"
          name="address"
          spellcheck="false"
          v-model="address"
        />

        <label>備註</label>
        <textarea
          name="remark"
          id="remark"
          class="remark"
          spellcheck="false"
          rows="10"
          v-model="remark"
        />
      </div>
      <input type="submit" value="送出表單" />
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
      name: "",
      email: "",
      phone: "",
      address: "",
      remark: "",
      nameError: false,
      emailError: false,
      phoneError: false,
      addressError: false,
    };
  },
  computed: {
    ...mapState(["user", "isLoading", "discount"]),
    order() {
      return {
        name: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address,
        remark: this.remark,
      };
    },
  },
  methods: {
    checkError() {
      if (this.name !== "") {
        this.nameError = false;
      } else {
        this.nameError = true;
      }

      if (this.email.match(/^\w+@\w+\.\w+$/)) {
        this.emailError = false;
      } else {
        this.emailError = true;
      }

      if (this.phone.match(/^09\d{8}$/)) {
        this.phoneError = false;
      } else {
        this.phoneError = true;
      }

      if (this.address !== "") {
        this.addressError = false;
      } else {
        this.addressError = true;
      }
    },
    async error() {
      store.commit("loading", true);
      await this.checkError();
      if (
        this.nameError === false &&
        this.emailError === false &&
        this.phoneError === false &&
        this.addressError === false
      ) {
        await axios.patch(
          "https://pokemon-shop-server.herokuapp.com/users/" + this.user.id,
          {
            order: this.order,
          }
        );
        store.dispatch("getUser");
        store.commit("addTemporaryCart", this.user.cart);
        store.commit("addTemporaryDiscount", this.discount);
        await store.commit("loading", false);
        this.$router.push("/check-order");
      } else {
        store.commit("loading", false);
      }
    },
  },
};
</script>

<style lang="scss"></style>
