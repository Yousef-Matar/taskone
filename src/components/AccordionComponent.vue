<template>
  <div class="m-2 border-4 border-black">
    <details class="text-left p-2 bg-gray-200 divide-y divide-black">
      <summary class="cursor-pointer mb-1 text-lg">{{ title }}</summary>
      <p class="ml-3 text-base">
        {{ body }}
      </p>
    </details>
  </div>
</template>

<script>
export default {
  props: ["title", "body"],
};
</script>

<style>
</style>