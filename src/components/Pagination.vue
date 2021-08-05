<template>
  <nav style="margin: 0 auto 2%; width: 100%">
    <ul class="pagination">
      <li>
        <a
          href="#"
          :class="{ 'disable opacity': currentPage == 1 }"
          @click.prevent="setPage(currentPage - 1)"
        >
          <span>&lt;</span>
        </a>
      </li>
      <li v-if="totalPage > maxPage && currentPage > maxPage - 1">
        <a
          href="#"
          :class="{ 'active disable': currentPage == 1 }"
          @click.prevent="setPage(1)"
        >
          <span>1</span>
        </a>
      </li>
      <span class="dot" v-if="totalPage > maxPage + 1 && currentPage > maxPage"
        >. . .</span
      >
      <li v-for="page in showPage" :key="page">
        <a
          href="#"
          :class="{ 'active disable': currentPage == page }"
          @click.prevent="setPage(page)"
        >
          <span>{{ page }}</span>
        </a>
      </li>
      <span
        class="dot"
        v-if="totalPage > maxPage + 1 && currentPage < totalPage - 3"
        >. . .</span
      >
      <li v-if="totalPage > maxPage && currentPage < totalPage - 2">
        <a
          href="#"
          :class="{ 'active disable': currentPage == totalPage }"
          @click.prevent="setPage(totalPage)"
        >
          <span>{{ totalPage }}</span>
        </a>
      </li>
      <li>
        <a
          href="#"
          :class="{ 'disable opacity': currentPage == totalPage }"
          @click.prevent="setPage(currentPage + 1)"
        >
          <span>&gt;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPage: Number,
    totalPage: Number,
  },
  data() {
    return {
      maxPage: 4,
    };
  },
  computed: {
    showPage() {
      if (this.totalPage <= this.maxPage) {
        return this.totalPage;
      } else {
        if (this.currentPage <= this.maxPage - 2) {
          return [1, 2, 3, 4];
        } else if (this.currentPage > this.totalPage - (this.maxPage - 2)) {
          return [
            this.totalPage - 3,
            this.totalPage - 2,
            this.totalPage - 1,
            this.totalPage,
          ];
        } else {
          return [
            this.currentPage - 2,
            this.currentPage - 1,
            this.currentPage,
            this.currentPage + 1,
            this.currentPage + 2,
          ];
        }
      }
    },
  },
  methods: {
    setPage(page) {
      this.$emit("setPage", page);
    },
  },
};
</script>

<style lang="scss"></style>
