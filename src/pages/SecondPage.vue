<template>
  <div class="w-full m-4">
    <AccordionComponent
      :title="'Test One Title'"
      :body="'Test One Body'"
    ></AccordionComponent>
    <AccordionComponent
      :title="'Test Two Title'"
      :body="'Test Two Body'"
    ></AccordionComponent>
    <AccordionComponent
      :title="'Test Three Title'"
      :body="'Test Three Body'"
    ></AccordionComponent>
  </div>
</template>

<script>
import AccordionComponent from "../components/AccordionComponent.vue";
export default {
  components: {
    AccordionComponent,
  },
};
</script>

<style>
</style>