import type { FlashcardType, PadletPostType } from "@/types";

export function getCardsFromPadletPosts(
  posts: PadletPostType[]
): FlashcardType[] {
  const cards = posts.map((post: PadletPostType) => {
    return {
      id: post.id,
      frontImageUrl:
        post.resolvedAttachmentData?.previewImageUrl ??
        post.attributes.content.attachment?.url ??
        undefined,
      frontText: post.attributes.content.subject,
      backText: post.attributes.content.bodyHtml,
    };
  });
  return shuffle(cards);
}

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
