<script setup lang="ts">
defineEmits(["click"]);
const props = withDefaults(
  defineProps<{
    href?: string;
    colorScheme?: "dark" | "light";
  }>(),
  {
    href: undefined,
    colorScheme: "light",
  }
);

const tag = props.href ? "a" : "button";
</script>
<template>
  <component
    :is="tag"
    :class="[
      'flex h-10 w-10  rounded-2xl items-center justify-center  font-semibold text-xl bg-transparent transition-colors',
      {
        'text-white-100 hover:bg-white-20 active:bg-white-40':
          colorScheme === 'light',
        'text-dark-text-100 hover:bg-black-20 active:bg-black-40':
          colorScheme === 'dark',
      },
    ]"
    :href="href"
    :target="href ? '_blank' : ''"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>

<style scoped lang="postcss"></style>
