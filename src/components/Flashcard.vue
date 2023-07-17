<script setup lang="ts">
import { useCardStore } from "@/stores/cardStore";
import { computed, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import BaseFadeTransition from "@/components/BaseFadeTransition.vue";
const { currentCard } = storeToRefs(useCardStore());
defineProps<{
  frontImageUrl?: string;
  frontText?: string;
  backText?: string;
}>();

const currentSide = ref<"front" | "back">("front");
function flipFlashcard(side?: "front" | "back"): void {
  if (side != null) {
    currentSide.value = side;
    return;
  }
  currentSide.value = currentSide.value === "front" ? "back" : "front";
}

let originalX = 0,
  originalY = 0,
  originalTime = 0;
function handleMousedown(event: MouseEvent) {
  originalX = event.clientX;
  originalY = event.clientY;
  originalTime = Date.now();
}
function handleMouseup(event: MouseEvent) {
  const deltaX = event.clientX - originalX;
  const deltaY = event.clientY - originalY;
  const deltaTime = Date.now() - originalTime;
  if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && deltaTime < 300) {
    flipFlashcard();
  }
}
const cardHeight = computed(() => (document.body.clientHeight - 100) * 0.6);
const cardWidth = computed(() => cardHeight.value / 1.3125);
watch(
  () => currentCard.value.id,
  () => {
    flipFlashcard("front");
  }
);
</script>

<template>
  <div
    class="rounded-3xl shadow-card border-4 border-card-border border-solid overflow-hidden cursor-pointer select-none"
    :style="{ width: cardWidth + 'px', height: cardHeight + 'px' }"
    @mousedown.prevent="handleMousedown"
    @mouseup.prevent="handleMouseup"
    @click.prevent
    ref="element"
  >
    <div class="bg-white-100 w-full h-full p-2">
      <div
        class="border-2 border-solid border-app-blue-20 rounded-2xl w-full h-full flex flex-col items-center justify-center p-2 gap-2 relative overflow-hidden"
      >
        <BaseFadeTransition>
          <div
            v-show="currentSide === 'front'"
            class="flex flex-col items-center justify-center"
          >
            <div v-if="frontImageUrl" class="min-h-10">
              <img
                :src="frontImageUrl"
                :style="{ width: cardWidth * 0.6 + 'px', maxWidth: '200px' }"
                loading="lazy"
                draggable="false"
              />
            </div>
            <div
              v-if="frontText"
              class="text-2xl mt-4 font-medium text-center"
              :style="{
                width: cardWidth * 0.8 + 'px',
                maxHeight: cardHeight * 0.8 + 'px',
              }"
            >
              {{ frontText }}
            </div>
          </div>
        </BaseFadeTransition>
        <BaseFadeTransition>
          <div
            v-show="currentSide === 'back'"
            class="flex flex-col items-center justify-center w-full text-center"
            :style="{
              width: cardWidth * 0.8 + 'px',
              height: cardHeight * 0.8 + 'px',
            }"
          >
            <div
              v-if="backText"
              class="text-2xl max-h-full back-text"
              v-html="backText"
            ></div>
          </div>
        </BaseFadeTransition>
      </div>
    </div>
  </div>
</template>

<style>
.back-text > *:first-child {
  height: 100%;
  overflow: hidden;
}
</style>
