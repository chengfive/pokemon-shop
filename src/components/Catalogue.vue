<template>
  <div class="catalogue">
    <ul>
      <li
        v-for="(list, key) in lists"
        :key="key"
        :class="{ 'active disable': list == currentType }"
        @click="selectType(list)"
      >
        <span>{{ list }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "catalogue",
  props: {
    lists: Array,
    currentType: String,
  },
  methods: {
    selectType(list) {
      this.$emit("selectType", list);
    },
  },
};
</script>

<style lang="scss"></style>
