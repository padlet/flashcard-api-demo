<script setup lang="ts">
withDefaults(defineProps<{ color?: "PrimaryBlue" | "PrimaryPurple" }>(), {
  color: "PrimaryBlue",
});
</script>
<template>
  <div
    :class="[
      'px-4 py-2 bg-app-blue-100 text-white rounded-xl font-semibold text-white-100',
      {
        'bg-app-blue-100': color === 'PrimaryBlue',
        'bg-purple-primary': color === 'PrimaryPurple',
      },
    ]"
  >
    <slot />
  </div>
</template>
