<template>
  <div v-if="!cart.length" class="cart-empty">購物車是空的</div>
  <div v-else class="cart-page">
    <cart :cart="cart" :discount="discount" />
    <div class="coupons">
      <input
        type="text"
        autocomplete="off"
        name="coupon"
        id="coupon"
        spellcheck="false"
        placeholder="輸入優惠碼:pokemon"
        @keyup.enter="useCoupon(coupon)"
        v-model="coupon"
      />
      <button @click="useCoupon(coupon)">套用優惠碼</button>
    </div>
    <div class="next">
      <router-link to="/order-page"> 填寫訂單資料 </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import cart from "@/components/Cart.vue";
import store from "@/store/index.js";

export default {
  data() {
    return {
      coupon: "",
    };
  },
  components: {
    cart,
  },
  computed: {
    ...mapState(["user", "cart", "coupons", "discount"]),
  },
  methods: {
    useCoupon(coupon) {
      let value = coupon.trim();
      this.coupon = value;
      if (value) {
        let currentCoupon = this.coupons.find((item) => item.id === value);
        if (currentCoupon) {
          store.commit("addDiscount", currentCoupon.discount);
        } else {
          alert("此優惠碼不存在");
        }
      } else {
        return;
      }
    },
  },
};
</script>

<style lang="scss"></style>
