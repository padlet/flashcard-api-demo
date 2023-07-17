declare module "tinykeys" {
  export function tinykeys(
    target: EventTarget,
    options: {
      [key: string]: () => void;
    }
  ): () => void;
}
