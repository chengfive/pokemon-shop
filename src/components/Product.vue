<template>
  <router-link
    class="detail-link"
    :to="{ path: '/product-detail/' + product.id }"
  >
    <div class="product">
      <img
        v-lazy="require('@/assets/products/' + product.src)"
        :alt="product.name"
      />
      <div class="product-name">{{ product.name }}</div>
      <div class="product-price">
        <div v-if="sold !== 0" class="sold-span">
          <span>已售出{{ sold }}件</span>
        </div>
        <div class="price-span">
          <span style="font-size: 15px">$</span>{{ product.price }}
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "Product",
  props: {
    product: Object,
  },
  computed: {
    sold() {
      return this.product.stock - this.product.quantity;
    },
  },
};
</script>

<style lang="scss"></style>
