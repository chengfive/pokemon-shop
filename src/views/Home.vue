<template>
  <div v-show="!products.length" class="loading-icon" />
  <main v-if="products.length">
    <div class="search">
      <input
        type="text"
        spellcheck="false"
        autocomplete="off"
        name="search"
        id="search"
        placeholder="搜尋商品"
        @keyup.enter="search(searchInput)"
        v-model="searchInput"
      />
      <button @click="search(searchInput)">
        <img src="@/assets/search.png" />
      </button>
    </div>
    <swiper />
    <div class="home">
      <catalogue
        :lists="lists"
        :currentType="currentType"
        @selectType="selectType"
      />
      <div v-if="searchCheck" class="products" id="home-product">
        <product
          v-for="product in filterProducts.slice(
            (currentPage - 1) * itemOfPage,
            currentPage * itemOfPage
          )"
          :key="product.id"
          :product="product"
        />
        <pagination
          :currentPage="currentPage"
          :totalPage="totalPage"
          @setPage="setPage"
        />
      </div>
      <div v-else class="products" id="home-product">
        <div class="search-error"><span>沒有符合搜尋結果的商品</span></div>
      </div>
    </div>
  </main>
  <Footer v-if="products.length" />
</template>

<script>
import { mapState } from "vuex";
import swiper from "@/components/Swiper.vue";
import catalogue from "@/components/Catalogue.vue";
import product from "@/components/Product.vue";
import pagination from "@/components/Pagination.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    swiper,
    catalogue,
    product,
    pagination,
    Footer,
  },
  data() {
    return {
      itemOfPage: 8,
      currentPage: 1,
      currentType: "所有商品",
      searchInput: "",
      searchOutput: [],
      searchError: false,
    };
  },
  methods: {
    selectType(list) {
      if (this.currentType !== list) {
        this.currentType = list;
        this.currentPage = 1;
        this.goAnchor();
      }
    },
    setPage(page) {
      this.currentPage = page;
      this.goAnchor();
    },
    goAnchor() {
      document.querySelector("#home-product").scrollIntoView(true);
    },
    search(searchInput) {
      let value = searchInput.trim();
      this.searchInput = value;
      this.currentPage = 1;
      if (this.searchInput === "") {
        this.searchOutput = this.products;
      } else {
        this.searchOutput = this.products.filter(
          (item) => item.name.indexOf(value) !== -1
        );
        if (this.searchOutput.length !== 0) {
          this.searchError = false;
        } else {
          this.searchError = true;
        }
      }
    },
  },
  computed: {
    ...mapState(["products", "lists"]),
    totalPage() {
      return Math.ceil(this.filterProducts.length / this.itemOfPage);
    },
    filterProducts() {
      if (this.searchOutput.length === 0 && this.searchError === false) {
        if (this.currentType === "所有商品") {
          return this.products;
        }
        return this.products.filter((item) => item.type === this.currentType);
      } else {
        if (this.currentType === "所有商品") {
          return this.searchOutput;
        }
        return this.searchOutput.filter(
          (item) => item.type === this.currentType
        );
      }
    },
    searchCheck() {
      if (this.filterProducts.length !== 0) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss"></style>
