<script setup lang="ts">
import { ref } from "vue";
const emit = defineEmits([
  "focusin",
  "focusout",
  "blur",
  "input",
  "update:modelValue",
]);
const isFocused = ref(false);
defineProps<{
  modelValue: string;
}>();
function focusin(event: FocusEvent): void {
  isFocused.value = true;
  emit("focusin", event);
}
function focusout(event: FocusEvent): void {
  isFocused.value = false;
  emit("focusout", event);
}
function blur(event: FocusEvent): void {
  emit("blur", event);
}
function input(event: Event): void {
  emit("input", event);
}
</script>

<template>
  <div
    :class="[
      'transition flex flex-1 flex-row items-center box-border relative border-2 border-solid bg-white-100  rounded-2xl px-4 py-3',
      {
        'border-app-blue-60': !isFocused,
        'border-app-blue-100 shadow-input-focus': isFocused,
      },
    ]"
  >
    <input
      class="flex flex-grow shadow-none appearance-none outline-none border-none w-full text-base"
      @focusin="focusin"
      @focusout="focusout"
      @blur="blur"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value);
        input($event);
      "
      v-bind="$attrs"
    />
  </div>
</template>
