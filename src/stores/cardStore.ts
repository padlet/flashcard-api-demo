import type { FlashcardType } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

export const useCardStore = defineStore("card", () => {
  const cards = ref<FlashcardType[]>([]);

  const currentCardIndex = ref(0);

  const currentCard = computed(() => cards.value[currentCardIndex.value]);
  const previousCard = computed(() => cards.value[currentCardIndex.value - 1]);
  const nextCard = computed(() => cards.value[currentCardIndex.value + 1]);
  const currentCardsInStack = computed(() =>
    cards.value.slice(currentCardIndex.value)
  );

  const cardTries = ref<Record<string, number>>({});
  const cardStatuses = ref<Record<string, "correct" | "incorrect">>({});
  const cardFinishedWithTries = computed(() => {
    return Object.keys(cardStatuses.value).reduce(
      (acc, cardId) => ({
        ...acc,
        [cardId]:
          cardStatuses.value[cardId] === "correct"
            ? cardTries.value[cardId]
            : undefined,
      }),
      {} as Record<string, number | undefined>
    );
  });

  const numberOfCards = computed(() => cards.value.length);
  const numberOfCorrectCards = computed(
    () =>
      Object.values(cardStatuses.value).filter((status) => status === "correct")
        .length
  );
  const progress = computed(() => {
    return numberOfCorrectCards.value / numberOfCards.value;
  });

  function initializeCards(newCards: FlashcardType[]) {
    cards.value = newCards;
    currentCardIndex.value = 0;
  }

  function goToNextCard(status: "correct" | "incorrect") {
    if (!currentCard.value) {
      return;
    }
    cardStatuses.value[currentCard.value.id] = status;
    const numberOfTriesSoFar = cardTries.value[currentCard.value.id] ?? 0;
    cardTries.value[currentCard.value.id] = numberOfTriesSoFar + 1;
    if (status === "correct" && currentCardIndex.value < cards.value.length) {
      currentCardIndex.value++;
    } else {
      // Put current card to random position in the back
      const currentIncorrectCard = cards.value.splice(
        currentCardIndex.value,
        1
      )[0];
      // Insert the card in the a random position between 0.5-1 of the back
      const randomPosition =
        currentCardIndex.value +
        Math.ceil(
          (Math.random() * 0.5 + 0.5) * currentCardsInStack.value.length
        );
      cards.value.splice(randomPosition, 0, currentIncorrectCard);
    }
  }

  function handleClickToSwipeRight() {
    triggerSwipeRight.value();
  }

  function handleClickToSwipeLeft() {
    triggerSwipeLeft.value();
  }
  const triggerSwipeLeft = ref(() => {});
  const triggerSwipeRight = ref(() => {});
  function setCardButtonsListener(listeners: {
    triggerSwipeRight: () => boolean;
    triggerSwipeLeft: () => boolean;
  }): void {
    triggerSwipeLeft.value = listeners.triggerSwipeLeft;
    triggerSwipeRight.value = listeners.triggerSwipeRight;
  }

  function resetCards() {
    currentCardIndex.value = 0;
    cardStatuses.value = {};
    cardTries.value = {};
  }

  function clearCards() {
    cards.value = [];
    resetCards();
  }

  return {
    // State
    cards,
    currentCardIndex,
    cardTries,

    // Getters
    currentCard,
    previousCard,
    nextCard,
    numberOfCards,
    progress,
    currentCardsInStack,
    numberOfCorrectCards,
    cardFinishedWithTries,

    // Actions
    initializeCards,
    goToNextCard,
    setCardButtonsListener,
    handleClickToSwipeRight,
    handleClickToSwipeLeft,
    resetCards,
    clearCards,
  };
});
