<script setup lang="ts">
defineEmits(["click"]);
withDefaults(
  defineProps<{ color: "PrimaryBlue" | "PrimaryPurple" | "BlankUnderline" }>(),
  {
    color: "PrimaryBlue",
  }
);
</script>
<template>
  <button
    :class="[
      'flex items-center justify-center text-xl',
      {
        'h-16 px-5 py-4 rounded-2xl':
          color === 'PrimaryBlue' || color === 'PrimaryPurple',
        'text-white-100 shadow-button hover:shadow-button-hover transition-shadow font-semibold':
          color === 'PrimaryBlue' || color === 'PrimaryPurple',
        'text-dark-text-200 hover:text-dark-text-100 font-normal underline transition-colors':
          color === 'BlankUnderline',
        '[&:not(:active)]:bg-custom-gradient-blue ': color === 'PrimaryBlue',
        '[&:not(:active)]:bg-custom-gradient-purple ':
          color === 'PrimaryPurple',
        'active:bg-app-blue-100 ': color === 'PrimaryBlue',
        'active:bg-purple-primary ': color === 'PrimaryPurple',
      },
    ]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped lang="postcss"></style>
