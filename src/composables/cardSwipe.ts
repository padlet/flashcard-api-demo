import { nextTick, onMounted } from "vue";
import Hammer from "hammerjs";
export function useCardSwipe({
  cardSelector,
  minSwipeDistance = document.body.clientWidth * 0.25,
  animationDelayMs = 100,
  onLoad,
  onSwiping,
  onSwipingLeft,
  onSwipingRight,
  onInsufficientSwipe,
  onSwipe,
}: {
  cardSelector: string;
  minSwipeDistance?: number;
  animationDelayMs?: number;
  onLoad?: () => void;
  onSwiping?: (event: HammerInput) => void;
  onSwipingLeft?: (el: HTMLElement, distance: number) => void;
  onSwipingRight?: (el: HTMLElement, distance: number) => void;
  onSwipe?: (el: HTMLElement, direction: "left" | "right") => void;
  onInsufficientSwipe?: (el: HTMLElement) => void;
}): {
  listeners: {
    triggerSwipeLeft: () => boolean;
    triggerSwipeRight: () => boolean;
    triggerReset: () => void;
  };
  options: {
    cardSelector: string;
    minSwipeDistance: number;
    animationDelayMs: number;
  };
} {
  let currentHammer: HammerManager | null = null;
  function refreshCardsStyles() {
    let newCards = document.querySelectorAll(
      `${cardSelector}:not(.removed)`
    ) as NodeListOf<HTMLDivElement>;

    newCards.forEach(function (card, index) {
      card.style.zIndex = `${newCards.length - index}`;

      const opacity = (10 - (index - 1)) / 10;
      if (opacity < 0) {
        card.style.opacity = "0";
        card.style.display = "none";
      } else {
        card.style.display = "flex";
        card.style.opacity = `${opacity}`;
        card.style.transform =
          "scale(" +
          (20 - index) / 20 +
          ") translateY(-" +
          (document.body.clientHeight / 40) * index +
          "px)";
      }
    });

    onLoad?.();
  }
  function computeRotate(event: HammerInput) {
    let ROTATION_CONSTANT_X = 0.03;
    let ROTATION_CONSTANT_Y = 80;
    let xMulti = event.deltaX * ROTATION_CONSTANT_X;
    let yMulti = event.deltaY / ROTATION_CONSTANT_Y;
    let rotate = xMulti * yMulti;
    return rotate;
  }
  function initializeHammer(el: HTMLElement): HammerManager {
    let hammertime = new Hammer(el, {
      recognizers: [[Hammer.Pan]],
    });

    hammertime.on("pan", function (event) {
      onSwiping?.(event);
    });

    hammertime.on("pan", function (event) {
      if (event.deltaX === 0) return;
      if (event.center.x === 0 && event.center.y === 0) return;

      if (event.deltaX > 0) {
        onSwipingRight?.(el, Math.abs(event.deltaX));
      }
      if (event.deltaX < 0) {
        onSwipingLeft?.(el, Math.abs(event.deltaX));
      }

      let rotate = computeRotate(event);

      // Move and rotate element as we drag them

      el.style.transition = "none";
      el.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
    });

    hammertime.on("panend", function (event) {
      const isInsufficientSwipe =
        Math.abs(event.deltaX) < minSwipeDistance &&
        Math.abs(event.velocityX) < 0.5;

      if (isInsufficientSwipe) {
        // Move element back
        el.style.transition = `all ${animationDelayMs * 3}ms ease`;
        el.style.transform = "";
        onInsufficientSwipe?.(el);
      } else {
        const OUT_OF_SCREEN_DELTA_X = document.body.clientWidth * 1.5;

        const endX = Math.max(
          Math.abs(event.velocityX) * OUT_OF_SCREEN_DELTA_X,
          OUT_OF_SCREEN_DELTA_X
        );
        const toX = event.deltaX > 0 ? endX : -endX;
        const endY = Math.abs(event.velocityY) * OUT_OF_SCREEN_DELTA_X;
        const toY = event.deltaY > 0 ? endY : -endY;
        const rotate = computeRotate(event);
        el.style.transition = `all ${animationDelayMs * 3}ms ease`;
        el.style.transform = `translate(${toX}px, ${
          toY + event.deltaY
        }px) rotate(${rotate}deg)`;

        setTimeout(() => {
          onSwipe?.(el, event.deltaX < 0 ? "left" : "right");
          nextTick(() => {
            refreshCardsStyles();
            currentHammer = initializeHammerForTopmostCard();
          });
        }, animationDelayMs);
      }
    });

    return hammertime;
  }
  function initializeHammerForTopmostCard(): HammerManager | null {
    currentHammer?.destroy();
    const topmostCard = document.querySelector(`${cardSelector}`);
    if (!topmostCard) return null;
    return initializeHammer(topmostCard as HTMLElement);
  }
  onMounted(() => {
    refreshCardsStyles();
    currentHammer = initializeHammerForTopmostCard();
  });

  function createButtonListener(direction: "left" | "right") {
    return function (): boolean {
      const topmostCard = document.querySelector(`${cardSelector}`) as
        | HTMLElement
        | undefined;
      let OUT_OF_SCREEN_DELTA_X = document.body.clientWidth * 1.5;

      if (!topmostCard) return false;

      if (direction === "right") {
        topmostCard.style.transition = `all ${animationDelayMs * 3}ms ease`;
        topmostCard.style.transform =
          "translate(" + OUT_OF_SCREEN_DELTA_X + "px, -100px) rotate(-30deg)";
      } else {
        topmostCard.style.transition = `all ${animationDelayMs * 3}ms ease`;
        topmostCard.style.transform =
          "translate(-" + OUT_OF_SCREEN_DELTA_X + "px, -100px) rotate(30deg)";
      }

      setTimeout(() => {
        onSwipe?.(topmostCard, direction);
        nextTick(() => {
          refreshCardsStyles();
          currentHammer = initializeHammerForTopmostCard();
        });
      }, animationDelayMs);
      return true;
    };
  }
  let triggerReset = function () {
    setTimeout(() => {
      refreshCardsStyles();
      currentHammer = initializeHammerForTopmostCard();
    }, animationDelayMs);
  };
  let triggerSwipeLeft = createButtonListener("left");
  let triggerSwipeRight = createButtonListener("right");
  return {
    listeners: { triggerSwipeLeft, triggerSwipeRight, triggerReset },
    options: { cardSelector, minSwipeDistance, animationDelayMs },
  };
}
