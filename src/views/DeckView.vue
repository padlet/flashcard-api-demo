<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import FlashcardNav from "@/components/FlashcardNav.vue";
import FlashcardStack from "@/components/FlashcardStack.vue";
import FlashcardProgressBar from "@/components/FlashcardProgressBar.vue";
import { useCardStore } from "@/stores/cardStore";
import { watch } from "vue";

import { storeToRefs } from "pinia";
import { useAppStore } from "@/stores/appStore";
import { useRouter } from "vue-router";

const cardStore = useCardStore();
const appStore = useAppStore();
const { cards, currentCardIndex } = storeToRefs(cardStore);

const router = useRouter();
watch(currentCardIndex, (index) => {
  if (index >= cards.value.length) {
    router.push("/result");
  }
});
</script>

<template>
  <AppHeader />
  <main
    v-if="cards.length > 0"
    class="w-full flex flex-1 flex-col justify-center gap-4 md:gap-8 max-w-[480px] mx-auto"
  >
    <FlashcardStack />
    <FlashcardProgressBar class="mt-1 md:mt-3" />
    <FlashcardNav />
  </main>
  <main v-else class="w-full flex flex-1 flex-col justify-center gap-8"></main>
</template>

<style scoped></style>
