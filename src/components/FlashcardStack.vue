<script setup lang="ts">
import Flashcard from "@/components/Flashcard.vue";
import { useCardSwipe } from "@/composables/cardSwipe";

import { useCardStore } from "@/stores/cardStore";

import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import BaseChiclet from "./BaseChiclet.vue";

const { currentCardsInStack, currentCard, currentCardIndex } = storeToRefs(
  useCardStore()
);
const { goToNextCard, setCardButtonsListener } = useCardStore();
onMounted(() => {});

watch(currentCardIndex, () => {});
watch(currentCardsInStack, () => {
  triggerReset();
});

function hideChiclets(el: HTMLElement): void {
  const nextChicletEl = el.querySelector(".next-chiclet") as HTMLDivElement;
  const returnChicletEl = el.querySelector(".return-chiclet") as HTMLDivElement;
  nextChicletEl.style.opacity = `0`;
  returnChicletEl.style.opacity = `0`;
}

// const minSwipeDistance = document.body.clientWidth / 3;
const cardSwipe = useCardSwipe({
  cardSelector: ".flashcard",
  onSwipingLeft: (el, distance) => {
    const nextChicletEl = el.querySelector(".next-chiclet") as HTMLDivElement;
    const returnChicletEl = el.querySelector(
      ".return-chiclet"
    ) as HTMLDivElement;
    nextChicletEl.style.opacity = `0`;
    returnChicletEl.style.opacity = `${distance / minSwipeDistance / 1.5}`;
    returnChicletEl.classList.remove("opacity-0");
  },
  onSwipingRight: (el, distance) => {
    const nextChicletEl = el.querySelector(".next-chiclet") as HTMLDivElement;
    const returnChicletEl = el.querySelector(
      ".return-chiclet"
    ) as HTMLDivElement;
    returnChicletEl.style.opacity = `0`;
    nextChicletEl.style.opacity = `${distance / minSwipeDistance / 1.5}`;
    nextChicletEl.classList.remove("opacity-0");
  },

  onInsufficientSwipe: (el) => {
    hideChiclets(el);
  },
  onSwipe: (el, direction) => {
    goToNextCard(direction === "left" ? "incorrect" : "correct");
    hideChiclets(el);
  },
});
const minSwipeDistance = cardSwipe.options.minSwipeDistance;
const triggerSwipeLeft = cardSwipe.listeners.triggerSwipeLeft;
const triggerSwipeRight = cardSwipe.listeners.triggerSwipeRight;
const triggerReset = cardSwipe.listeners.triggerReset;
setCardButtonsListener({ triggerSwipeLeft, triggerSwipeRight });
const cardHeight = computed(() => (document.body.clientHeight - 100) * 0.6);
</script>
<template>
  <div class="relative overflow-visible mt-6">
    <div
      class="flex flex-col justify-start items-center w-full h-[420px] overflow-hidden"
      :style="{ height: cardHeight + 'px' }"
    >
      <div
        v-for="card in currentCardsInStack"
        :key="card.id"
        class="!flex flex-col justify-center items-center !overflow-visible flashcard absolute transition-transform"
      >
        <BaseChiclet
          class="absolute top-8 left-6 -rotate-12 opacity-0 next-chiclet z-10"
          >LEARNED!</BaseChiclet
        >
        <BaseChiclet
          class="absolute top-8 right-6 rotate-12 opacity-0 return-chiclet z-10"
          color="PrimaryPurple"
          >SKIP</BaseChiclet
        >

        <Flashcard
          v-if="card"
          :front-image-url="card.frontImageUrl"
          :front-text="card.frontText"
          :back-text="card.backText"
        />
      </div>
    </div>
  </div>
</template>
