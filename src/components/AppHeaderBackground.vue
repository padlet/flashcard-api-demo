<script setup lang="ts">
import { computed } from "vue";
import { useAppStore } from "@/stores/appStore";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const { title } = storeToRefs(useAppStore());
const route = useRoute();

const headerHeightClass = computed(() => {
  return route.path == "/" || title == null
    ? "h-[0] ease-in"
    : route.path == "/result"
    ? "h-[200%] ease-in"
    : "h-[60%] ease-out";
});
</script>
<template>
  <div
    :class="[
      '-translate-x-1/3',
      '-translate-y-[45%]',
      headerHeightClass,
      'overflow-hidden absolute top-0 left-0 right-0 transition-all duration-200 flex w-[300%] rounded-[100%] bg-app-blue-header',
    ]"
  ></div>
</template>
