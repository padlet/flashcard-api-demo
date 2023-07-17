<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  progress: number;
}>();
</script>

<template>
  <div class="flex w-full h-4 rounded-xl bg-progress-bar-background">
    <div
      class="rounded-xl bg-progress-bar-foreground transition-all duration-500"
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
</template>
