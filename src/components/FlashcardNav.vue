<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted } from "vue";
import BaseButton from "./BaseButton.vue";
import { useCardStore } from "@/stores/cardStore";
import { tinykeys } from "tinykeys";

const BackIcon = defineAsyncComponent(() => import("@/assets/icons/back.svg"));
const RightArrowIcon = defineAsyncComponent(
  () => import("@/assets/icons/right-arrow.svg")
);

const { handleClickToSwipeRight, handleClickToSwipeLeft } = useCardStore();
let tinykeysUnsubscribe: () => void;
onMounted(() => {
  tinykeysUnsubscribe = tinykeys(window, {
    ArrowLeft: () => handleClickToSwipeLeft(),
    ArrowRight: () => handleClickToSwipeRight(),
  });
});
onUnmounted(() => {
  tinykeysUnsubscribe();
});
</script>
<template>
  <div class="flex gap-3 w-full px-6">
    <BaseButton
      class="flex-1 gap-4"
      color="PrimaryPurple"
      @click="handleClickToSwipeLeft"
      ><span>Return</span><BackIcon class="fill-current"
    /></BaseButton>
    <BaseButton
      class="flex-1 gap-4"
      color="PrimaryBlue"
      @click="handleClickToSwipeRight"
      >Learned!<RightArrowIcon class="fill-current"
    /></BaseButton>
  </div>
</template>
