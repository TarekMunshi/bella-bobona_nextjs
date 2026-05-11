"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useDraftModeEnvironment } from "next-sanity/hooks";

import { disableDraftMode } from "@/app/actions";

export function DisableDraftMode() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const environment = useDraftModeEnvironment();

  if (environment !== "live" && environment !== "unknown") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            await disableDraftMode();
            router.refresh();
          })
        }
        className="rounded-full bg-bb-green px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-bb-green-strong disabled:opacity-60"
      >
        {pending ? "Disabling…" : "Disable draft mode"}
      </button>
    </div>
  );
}
