<template>
  <div class="flex flex-wrap w-full relative overflow-x-clip">
    <div v-for="(color, index) in slider" :key="color" class="absolute w-full">
      <transition name="fade">
        <div
          v-if="currentSlide == index"
          :class="color"
          style="height: 350px"
        ></div>
      </transition>
    </div>
    <div class="w-full" style="height: 340px">
      <div class="absolute bottom-0 flex w-full justify-center">
        <div
          v-for="(item, index) in slider"
          :key="item"
          @click="makeActive(index)"
          class="w-4 h-4 rounded-full mx-2 cursor-pointer shadow-md"
          :class="currentSlide == index ? 'bg-gray-500' : 'bg-white'"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.interval = setInterval(() => {
      this.currentSlide =
        this.currentSlide == this.slider.length - 1 ? 0 : this.currentSlide + 1;
    }, 2000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  data() {
    return {
      currentSlide: 0,
      slider: ["bg-blue-500", "bg-red-500", "bg-green-500"],
      interval: "",
      showTitle: true,
    };
  },
  methods: {
    makeActive(index) {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.currentSlide =
          this.currentSlide == this.slider.length - 1
            ? 0
            : this.currentSlide + 1;
      }, 2000);
      return (this.currentSlide = index);
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
