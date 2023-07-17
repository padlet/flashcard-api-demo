<script setup lang="ts"></script>

<template>
  <div class="relative block font-sans">
    <div v-if="$slots.label" class="flex justify-between mb-1">
      <slot name="label" />
    </div>

    <div class="flex flex-row flex-wrap items-center">
      <slot name="input" />
    </div>

    <div v-if="$slots.error" class="flex justify-between">
      <slot name="error" />
    </div>
  </div>
</template>
