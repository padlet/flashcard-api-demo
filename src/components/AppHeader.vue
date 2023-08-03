<script setup lang="ts">
import { useAppStore } from "@/stores/appStore";
import { storeToRefs } from "pinia";
import { defineAsyncComponent, onMounted, ref, type Ref } from "vue";
import BaseIconButton from "@/components/BaseIconButton.vue";
import { useRoute, useRouter } from "vue-router";
import BaseDropdown from "@/components/BaseDropdown.vue";
import type { DropdownOption } from "@/components/BaseDropdown.vue";
import externalLinkIconUrl from "@/assets/icons/external-link.svg?url";
import resetIconUrl from "@/assets/icons/reset.svg?url";
import closeIconUrl from "@/assets/icons/close.svg?url";
import githubMarkIconUrl from "@/assets/icons/github-mark.svg?url";
const appStore = useAppStore();
const { clearDeck, resetDeck } = appStore;
const { title, boardId } = storeToRefs(appStore);

const LeftArrowIcon = defineAsyncComponent(
  () => import("@/assets/icons/left-arrow.svg")
);
const MenuVerticalIcon = defineAsyncComponent(
  () => import("@/assets/icons/menu-vertical.svg")
);
const route = useRoute();
const router = useRouter();
const isDropdownOpen = ref(false);
const options: Ref<DropdownOption[]> = ref([]);
const goHome = () => {
  clearDeck();
  router.go(route.path === "/deck" ? -1 : -2);
};

const padletUrl = `https://padlet.com/wall/${boardId.value}`;
const githubUrl = "https://github.com/padlet/flashcard-api-demo";
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
const openDropdown = () => {
  isDropdownOpen.value = true;
};
const isHome = ref(route.path === "/");

onMounted(async () => {
  if (!isHome.value) {
    options.value = [
      {
        label: "Restart session",
        onClick: () => {
          route.fullPath === "/result" && router.go(-1);
          resetDeck();
        },
        iconUrl: resetIconUrl,
      },
      {
        label: "Finish session",
        onClick: () => {
          route.fullPath !== "/result" && router.push("/result");
        },
        iconUrl: closeIconUrl,
      },
      {
        label: "Open Padlet",
        onClick: () => window.open(padletUrl, "_blank"),
        iconUrl: externalLinkIconUrl,
      },
      {
        label: "Open GitHub",
        onClick: () => window.open(githubUrl, "_blank"),
        iconUrl: githubMarkIconUrl,
        colorClass: "bg-white-100", // Use the allowed color for Github Mark according to their brand guidelines
      },
    ];
  } else {
    options.value = [
      {
        label: "Open GitHub",
        onClick: () => window.open(githubUrl, "_blank"),
        iconUrl: githubMarkIconUrl,
        colorClass: "bg-white-100", // Use the allowed color for Github Mark according to their brand guidelines
      },
    ];
  }
});
</script>
<template>
  <header class="w-full flex flex-col relative" style="z-index: 100000">
    <div class="flex items-center p-2 mt-4 justify-between">
      <BaseIconButton v-if="!isHome" @click="goHome"
        ><LeftArrowIcon class="fill-current"
      /></BaseIconButton>
      <div v-else />
      <BaseIconButton
        :color-scheme="isHome ? 'dark' : 'light'"
        @click="openDropdown"
        title="Open menu"
        ><MenuVerticalIcon class="fill-current"
      /></BaseIconButton>
    </div>
    <div
      class="flex items-center h-10 mt-2 p-2 pl-4 text-white-100 font-semibold text-2xl z-10 mx-auto max-w-[480px] w-full"
    >
      <span class="">{{ title }} </span>
    </div>
    <BaseDropdown
      v-if="isDropdownOpen"
      :options="options"
      @close="toggleDropdown"
    >
    </BaseDropdown>
  </header>
</template>
