"use server";

import { draftMode } from "next/headers";

export async function disableDraftMode() {
  const draft = await draftMode();
  const disable = draft.disable();
  const delay = new Promise((resolve) => setTimeout(resolve, 300));
  await Promise.allSettled([disable, delay]);
}
