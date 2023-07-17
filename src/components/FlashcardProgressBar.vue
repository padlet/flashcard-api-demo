<script setup lang="ts">
import BaseProgressBar from "@/components/BaseProgressBar.vue";
import { useCardStore } from "@/stores/cardStore";
import { storeToRefs } from "pinia";
const cardStore = useCardStore();
const { progress, numberOfCorrectCards, numberOfCards } =
  storeToRefs(cardStore);
</script>

<template>
  <div class="flex flex-col gap-3 w-full px-6">
    <BaseProgressBar :progress="progress * 100" />
    <span class="text-blue-text-100 font-semibold"
      >{{ numberOfCorrectCards }}/{{ numberOfCards }}</span
    >
  </div>
</template>
