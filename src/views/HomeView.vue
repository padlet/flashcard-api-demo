<script setup lang="ts">
import BaseButton from "@/components/BaseButton.vue";
import BaseInfoTooltipButton from "@/components/BaseInfoTooltipButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseInputLabel from "@/components/BaseInputLabel.vue";
import { AFRICA_DEMO_PADLET_BOARD_ID } from "@/services/padletService";
import { computed, defineAsyncComponent, ref, watch, type Ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/stores/appStore";
import { ApiKeyError, BoardIdError } from "@/services/errorService";
const { initializeDeck } = useAppStore();
const RightArrowIcon = defineAsyncComponent(
  () => import("@/assets/icons/right-arrow.svg")
);
const { boardIdOrUrl, boardId, apiKey } = storeToRefs(useAppStore());
const router = useRouter();
const error: Ref<Error | null> = ref(null);

const boardIdError = computed(() => {
  if (error.value == null) {
    return null;
  }
  return error.value?.name === BoardIdError.errorName ? error.value : null;
});

const apiKeyError = computed(() => {
  if (error.value == null) {
    return null;
  }
  return error.value?.name === ApiKeyError.errorName ? error.value : null;
});

function clearError(): void {
  error.value = null;
}
async function handleDemo() {
  try {
    await initializeDeck({ demo: true });
    router.push("/deck");
  } catch (e) {
    error.value = e as Error;
    console.error(e);
  }
}
async function handleTimeToLearn() {
  try {
    await initializeDeck();
    router.push("/deck");
  } catch (e) {
    error.value = e as Error;
    console.error(e);
  }
}
</script>

<template>
  <header class="w-full flex flex-col"></header>
  <main
    class="flex flex-col items-center w-full flex-1 justify-evenly p-4 max-w-[480px] mx-auto"
  >
    <span class="text-black font-semibold text-5xl leading-tight"
      >Learning with Linh</span
    >
    <div class="flex w-full flex-col gap-4">
      <BaseInputLabel>
        <template #label>
          <span
            class="px-4 text-dark-text-200 flex flex-row items-center gap-4"
          >
            Padlet URL or board ID
            <BaseInfoTooltipButton>
              Copy the URL on the address bar or get the
              <a
                tabindex="-1"
                class="underline text-white-100 hover:text-gray-200 font-semibold"
                href="https://docs.padlet.dev/reference/introduction#supported-endpoints"
                target="_blank"
                >Padlet board ID</a
              >.
            </BaseInfoTooltipButton>
          </span>
        </template>
        <template #input>
          <BaseInput
            :placeholder="AFRICA_DEMO_PADLET_BOARD_ID"
            @keydown.enter="handleTimeToLearn"
            v-model="boardIdOrUrl"
            @input="clearError"
          />
        </template>
        <template #error>
          <div v-if="boardIdError" class="text-red-500 px-4 py-2">
            ⚠ <span class="ml-2">{{ boardIdError?.message }}</span>
          </div>
        </template>
      </BaseInputLabel>
      <BaseInputLabel>
        <template #label>
          <span
            class="px-4 text-dark-text-200 flex flex-row items-center gap-4"
          >
            Personal access token
            <BaseInfoTooltipButton>
              Go to
              <a
                tabindex="-1"
                class="underline text-white-100 hover:text-gray-200 font-semibold"
                href="https://padlet.com/dashboard/settings/developers"
                target="_blank"
                >Padlet's Settings panel</a
              >
              to get this.
            </BaseInfoTooltipButton>
          </span>
        </template>

        <template #input>
          <BaseInput
            placeholder="Copy from Padlet"
            v-model="apiKey"
            :error="apiKeyError"
            @keydown.enter="handleTimeToLearn"
            @input="clearError"
          />
        </template>
        <template #error>
          <div v-if="apiKeyError" class="text-red-500 px-4 py-1">
            ⚠ <span class="ml-2">{{ apiKeyError?.message }}</span>
          </div>
        </template>
      </BaseInputLabel>
    </div>
    <div class="mx-auto gap-4 flex flex-col items-center">
      <BaseButton color="BlankUnderline" @click="handleDemo"
        >Try a demo</BaseButton
      >
      <BaseButton
        class="mx-auto gap-4"
        color="PrimaryBlue"
        @click="handleTimeToLearn"
        >Time to learn<RightArrowIcon class="fill-current"
      /></BaseButton>
    </div>
  </main>
</template>
