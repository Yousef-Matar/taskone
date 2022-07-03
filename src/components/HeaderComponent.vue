<template>
  <nav class="w-full bg-black text-white px-4 py-2 text-left">
    <router-link
      v-for="item in list"
      :key="item.to"
      class="mx-2"
      :to="item.to"
      >{{ item.title }}</router-link
    >
  </nav>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { title: "FirstPage", to: "/" },
        { title: "SecondPage", to: "/SecondPage" },
      ],
    };
  },
};
</script>

<style></style>
