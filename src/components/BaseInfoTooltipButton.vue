<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
const InfoIcon = defineAsyncComponent(() => import("@/assets/icons/info.svg"));

withDefaults(
  defineProps<{
    tooltipWidth?: string;
  }>(),
  {
    tooltipWidth: "200px",
  }
);
defineEmits(["click"]);
</script>
<template>
  <div class="relative">
    <button
      :class="[
        'flex h-8 px-2 py-2 items-center justify-center text-dark-text-200 hover:text-dark-text-100 active:text-dark-text-100 transition-colors',
        'group',
      ]"
    >
      <InfoIcon class="fill-current" />
      <div
        role="tooltip"
        :class="[
          'absolute bg-gray-500 text-white-100 z-10 -translate-x-1/2 left-1/2 rounded-xl p-2 text-sm text-center -translate-y-full -top-2',
          'opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus:opacity-100 group-focus:visible',
          'transition-opacity duration-300',
        ]"
        :style="{ width: tooltipWidth }"
      >
        <slot />
        <!-- tooltip arrow-->
        <div
          class="absolute bottom-0 left-1/2 -ml-2 border-8 border-solid border-t-gray-500 border-l-transparent border-r-transparent border-b-transparent translate-y-full"
        ></div>
      </div>
    </button>
  </div>
</template>
