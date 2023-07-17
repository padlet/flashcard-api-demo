<script setup lang="ts">
defineEmits(["click"]);
const props = defineProps<{
  href?: string;
}>();

const tag = props.href ? "a" : "button";
</script>
<template>
  <component
    :is="tag"
    :class="[
      'flex h-10 w-10  rounded-2xl items-center justify-center text-white-100 font-semibold text-xl bg-transparent hover:bg-white-20 active:bg-white-40 transition-colors',
    ]"
    :href="href"
    :target="href ? '_blank' : ''"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>

<style scoped lang="postcss"></style>
