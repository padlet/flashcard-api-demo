import { defineStore } from "pinia";
import { computed, ref, type Ref } from "vue";
import {
  getPadletBoard,
  VIETNAMESE_DEMO_PADLET_BOARD_ID,
  AFRICA_DEMO_PADLET_BOARD_ID,
} from "@/services/padletService";
import { useCardStore } from "@/stores/cardStore";
import { getCardsFromPadletPosts } from "@/services/cardService";
import { BoardIdError, ApiKeyError } from "@/services/errorService";
import type { PadletPostType } from "@/types";
export const useAppStore = defineStore("app", () => {
  const { initializeCards, resetCards, clearCards } = useCardStore();
  const title = ref("");
  const boardIdOrUrl: Ref<string> = ref("");
  const boardId = computed(
    () => boardIdOrUrl.value?.split("-")?.pop() ?? "".trim()
  );
  const apiKey = ref("");
  const posts: Ref<PadletPostType[]> = ref([]);

  async function initializeDeck(
    { demo }: { demo?: boolean } = { demo: false }
  ) {
    let boardIdBeingUsed = boardId.value;
    let apiKeyBeingUsed = apiKey.value;
    if (demo) {
      boardIdBeingUsed = [
        VIETNAMESE_DEMO_PADLET_BOARD_ID,
        AFRICA_DEMO_PADLET_BOARD_ID,
      ][Math.floor(Math.random() * 2)];
      apiKeyBeingUsed = "";
    } else {
      boardIdBeingUsed = boardId.value;
      apiKeyBeingUsed = apiKey.value;
      if (boardId.value == "") {
        throw new BoardIdError("Please fill in the board ID");
      }
      if (boardId.value.indexOf("-") != -1) {
        throw new BoardIdError("Invalid board ID");
      }
      if (apiKey.value == "") {
        throw new ApiKeyError("Please fill in the API key");
      }
    }
    try {
      const data = await getPadletBoard(boardIdBeingUsed, apiKeyBeingUsed);
      initializeApp({ title: data.title });
      posts.value = data.posts;
      initializeCards(getCardsFromPadletPosts(data.posts));
    } catch (e) {
      throw new BoardIdError("Error loading this Padlet board");
    }

    // Set this so that "Open Padlet" works correctly
    boardIdOrUrl.value = boardIdBeingUsed;
  }

  function initializeApp(data: { title: string }) {
    title.value = data.title;
  }

  function resetDeck() {
    resetCards();
    initializeCards(getCardsFromPadletPosts(posts.value));
  }

  function clearDeck() {
    title.value = "";
    clearCards();
  }

  function resetApp() {
    boardIdOrUrl.value = "";
    apiKey.value = "";
    clearDeck();
  }

  return {
    // state
    title,
    boardId,
    boardIdOrUrl,
    apiKey,

    // action
    initializeDeck,
    initializeApp,
    resetDeck,
    clearDeck,
  };
});
