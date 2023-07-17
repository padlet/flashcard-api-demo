<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{ speed?: number }>(), {
  speed: 500,
});

const durationClass = computed(() => {
  switch (props.speed) {
    case 200:
      return "duration-200";
    case 500:
      return "duration-500";
    default:
      return "duration-500";
  }
});
</script>

<template>
  <Transition
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
    :enter-active-class="`transition ${durationClass}`"
    :leave-active-class="`absolute transition ${durationClass}`"
  >
    <slot />
  </Transition>
</template>
