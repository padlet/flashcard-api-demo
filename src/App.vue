<script setup lang="ts">
import { RouterView } from "vue-router";
import AppHeaderBackground from "@/components/AppHeaderBackground.vue";
import CloudsImg from "@/assets/clouds.png";
import BaseFadeTransition from "@/components/BaseFadeTransition.vue";
</script>

<template>
  <AppHeaderBackground />
  <img
    class="fixed w-screen h-screen top-0 left-0 object-cover object-center -z-20"
    :src="CloudsImg"
    alt="clouds background image"
  />
  <router-view v-slot="{ Component }">
    <BaseFadeTransition :speed="200">
      <div class="w-full h-full flex flex-1 flex-col" :key="$route.fullPath">
        <component :is="Component" />
      </div>
    </BaseFadeTransition>
  </router-view>
</template>

<style scoped></style>
