<script setup lang="ts">
import { useAppStore } from "@/stores/appStore";
import BaseButton from "@/components/BaseButton.vue";
import { computed, defineAsyncComponent, onMounted, ref } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useCardStore } from "@/stores/cardStore";
import BaseFadeTransition from "@/components/BaseFadeTransition.vue";
const appStore = useAppStore();
const router = useRouter();
const { resetDeck, clearDeck } = appStore;
const { cardFinishedWithTries, cards } = storeToRefs(useCardStore());
const ResetIcon = defineAsyncComponent(
  () => import("@/assets/icons/reset.svg")
);
const HomeIcon = defineAsyncComponent(() => import("@/assets/icons/home.svg"));

function goHome() {
  clearDeck();
  router.go(-2);
}

const oneTryCards = computed(
  () =>
    Object.values(cardFinishedWithTries.value).filter((tries) => tries === 1)
      .length
);
const twoTryCards = computed(
  () =>
    Object.values(cardFinishedWithTries.value).filter((tries) => tries === 2)
      .length
);
const threeTryOrMoreCards = computed(
  () =>
    Object.values(cardFinishedWithTries.value).filter(
      (tries) => tries != null && tries >= 3
    ).length
);
const passedCards = computed(
  () =>
    Object.values(cardFinishedWithTries.value).filter(
      (tries) => tries == undefined
    ).length
);

const totalCards = computed(
  () => Object.values(cardFinishedWithTries.value).length
);

const skippedCards = computed(
  () => cards.value.length - Object.values(cardFinishedWithTries.value).length
);

// Disable buttons for 1 second to prevent accidental clicks
const areButtonsDisabled = ref(true);
onMounted(() => {
  setTimeout(() => {
    areButtonsDisabled.value = false;
  }, 1000);
});
</script>
<template>
  <AppHeader />
  <main
    class="z-10 w-full flex flex-1 flex-col justify-between items-center max-w-[480px] mx-auto"
  >
    <div />
    <div class="flex flex-col gap-6 items-center">
      <div class="font-semibold text-xl text-white-100">Results</div>
      <div class="flex flex-col gap-4 items-center">
        <div v-if="oneTryCards > 0" class="flex flex-row items-end gap-1">
          <span class="font-semibold text-white-100 text-2xl">
            {{ oneTryCards }}/{{ totalCards }}
          </span>
          <span class="text-white-100">cards learned in one try</span>
        </div>
        <div v-if="twoTryCards > 0" class="flex flex-row items-end gap-1">
          <span class="font-semibold text-white-100 text-2xl">
            {{ twoTryCards }}/{{ totalCards }}
          </span>
          <span class="text-white-100">cards learned in two tries</span>
        </div>
        <div
          v-if="threeTryOrMoreCards > 0"
          class="flex flex-row items-end gap-1"
        >
          <span class="font-semibold text-white-100 text-2xl">
            {{ threeTryOrMoreCards }}/{{ totalCards }}
          </span>
          <span class="text-white-100"
            >cards learned in three tries or more</span
          >
        </div>
        <div v-if="passedCards > 0" class="flex flex-row items-end gap-1">
          <span class="font-semibold text-white-100 text-2xl">
            {{ passedCards }}/{{ totalCards }}
          </span>
          <span class="text-white-100">cards passed</span>
        </div>
        <div v-if="skippedCards > 0" class="flex flex-row items-end gap-1">
          <span class="font-semibold text-white-100 text-2xl">
            {{ skippedCards }}/{{ cards.length }}
          </span>
          <span class="text-white-100">cards skipped</span>
        </div>
      </div>
      <div class="font-semibold text-xl text-white-100">Good work!</div>
    </div>
    <div class="flex gap-3 w-full px-6 mb-12">
      <BaseButton
        :disabled="areButtonsDisabled"
        class="flex-shrink-0 gap-4"
        color="PrimaryBlue"
        @click="goHome"
        ><HomeIcon class="fill-current"
      /></BaseButton>
      <BaseButton
        :disabled="areButtonsDisabled"
        class="flex-1 gap-4"
        color="PrimaryBlue"
        @click="
          $router.go(-1);
          resetDeck();
        "
        >Try again<ResetIcon class="fill-current"
      /></BaseButton>
    </div>
  </main>
</template>

<style scoped lang="postcss"></style>
