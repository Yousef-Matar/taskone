<template>
  <div class="w-full m-4">
    <AccordionComponent
      v-for="accordion in Accordions"
      :key="accordion"
      :title="accordion.title"
      :body="accordion.body"
    ></AccordionComponent>
  </div>
</template>

<script>
import AccordionComponent from "../components/AccordionComponent.vue";
export default {
  components: {
    AccordionComponent,
  },
  data() {
    return {
      Accordions: [
        {
          title: "Test One Title",
          body: "Test One Body",
        },
        {
          title: "Test Two Title",
          body: "Test Two Body",
        },
      ],
    };
  },
};
</script>

<style>
</style>