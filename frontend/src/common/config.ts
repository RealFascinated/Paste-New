import { Config } from "../types/config";

/**
 * Gets the public config for Paste.
 *
 * @returns the config for Paste
 */
export async function getConfig(): Promise<Config> {
  const res = await fetch("http://localhost:8080/api/config");
  return await res.json();
}
