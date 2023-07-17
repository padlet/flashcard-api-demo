// file: Handle fetching data from Padlet API.
import type { PadletPostType, PadletPostAttachmentDataType } from "@/types";

/**
 * Fetch data from a provided URL using headers.
 * @param url - The URL from which data needs to be fetched.
 * @param headers - Headers that need to be sent with the request.
 * @returns A Promise that resolves with the JSON data from the response.
 */
async function fetchData(url: string, headers: Record<string, string>) {
  const response = await fetch(url, { method: "GET", headers, mode: "cors" });
  return await response.json();
}

/**
 * If post has related attachments, fetch and add them to the post.
 * @param post - The post for which attachments need to be fetched.
 * @param headers - Headers that need to be sent with the request.
 * @returns A Promise that resolves with the post and its attachments (if any).
 */
async function handleAttachment(
  post: PadletPostType,
  headers: Record<string, string>
): Promise<PadletPostType> {
  try {
    if (post.relationships.attachmentData?.links?.related == null) {
      return post;
    }
    const jsonData = await fetchData(
      post.relationships.attachmentData.links.related,
      headers
    );
    const attachmentData: PadletPostAttachmentDataType = jsonData.data;
    return { ...post, resolvedAttachmentData: attachmentData.attributes };
  } catch (e) {
    console.error(e);
    return post;
  }
}

/**
 * Filter out posts from a provided array of items.
 * @param items - An array of items to be filtered.
 * @returns An array of filtered posts.
 */
function filterPosts(items: any[]): PadletPostType[] {
  return items.filter((item: any) => item.type === "post");
}

/**
 * Fetch a Padlet board by ID and return its title and posts.
 * @param boardId - The ID of the Padlet board to fetch.
 * @param personalAccessToken - (Optional) A personal access token.
 * @returns A Promise that resolves with the board's title and posts.
 */
export async function getPadletBoard(
  boardId: string,
  personalAccessToken?: string
): Promise<{
  title: string;
  posts: PadletPostType[];
}> {
  const headers: Record<string, string> = {
    accept: "application/vnd.api+json",
  };
  if (personalAccessToken) {
    headers["X-API-Key"] = personalAccessToken;
  }
  const jsonData = await fetchData(
    `https://api.padlet.dev/v1/boards/${boardId}?include=posts`,
    headers
  );
  let posts = filterPosts(jsonData.included);
  posts = await Promise.all(
    posts.map((post) => handleAttachment(post, headers))
  );

  return {
    title: jsonData.data.attributes.title,
    posts: posts as PadletPostType[],
  };
}

// These are demo board IDs provided by Padlet. They can be accessed without a personal access token.
export const AFRICA_DEMO_PADLET_BOARD_ID = "qk3sab0nz9rcp0wv";
export const VIETNAMESE_DEMO_PADLET_BOARD_ID = "ripehx05bvo43tnm";
export const PILOT_DEMO_PADLET_BOARD_ID = "23h9stxv7cec89gy";
