<script setup lang="ts">
import { onMounted, ref } from "vue";

export interface DropdownOption {
  label: string;
  key?: string;
  onClick: () => void;
  iconUrl?: string;
}
defineProps<{
  options?: DropdownOption[];
}>();
const dropdownRef = ref<HTMLElement | null>(null);
const emit = defineEmits(["close"]);
onMounted(() => {
  // Add document click listener to close dropdown, except for when clicking to anything inside the dropdownRef itself
  setTimeout(() => {
    document.addEventListener("click", (event) => {
      if (
        dropdownRef.value &&
        !dropdownRef.value.contains(event.target as Node)
      ) {
        emit("close");
      }
    });
  });
});
</script>
<template>
  <div
    ref="dropdownRef"
    class="absolute top-14 right-4 w-[280px] bg-black rounded-xl z-10"
  >
    <div class="p-1 gap-4">
      <button
        v-for="option in options"
        :key="option.key || option.label"
        @click="option.onClick"
        class="w-full flex items-center justify-start px-3 py-3 text-white-100 hover:bg-white-20 active:bg-white-40 transition-colors rounded-xl"
      >
        {{ option.label }}
        <div
          class="icon bg-white-50 h-6 w-6 ml-auto"
          :style="{
            mask: `url(${option.iconUrl}) no-repeat center`,
            '-webkit-mask': `url(${option.iconUrl}) no-repeat center`,
          }"
        />
      </button>
    </div>
  </div>
</template>
