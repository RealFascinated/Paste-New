import { Paste, PasteResponse } from "../types/paste";

/**
 * Uploads a paste to paste.fascinated.cc
 *
 * @param content the content of the paste
 * @returns the paste key and the URL
 */
export async function uploadPaste(content: string): Promise<PasteResponse | null> {
  const response = await fetch("http://localhost:8080/api/upload", {
    method: "POST",
    body: content,
  });
  const json = await response.json();

  if (!response.ok) {
    return null;
  }

  return json as PasteResponse;
}

/**
 * Gets a paste from the api
 *
 * @param key the key of the paste
 * @returns the paste
 */
export async function getPaste(key: string): Promise<Paste | null> {
  const response = await fetch(`http://localhost:8080/api/paste/${key}`);
  const json = await response.json();

  if (!response.ok) {
    return null;
  }

  return json as Paste;
}
