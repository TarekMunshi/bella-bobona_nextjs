"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { useState } from "react";

const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-neutral-800">{children}</strong>,
    em: ({ children }) => <em className="italic text-neutral-700">{children}</em>,
  },
};

export type FaqItem = { question?: string; answer?: unknown };

export function FaqAccordionClient({
  heading,
  items,
}: {
  heading?: string;
  items?: FaqItem[] | null;
}) {
  const list = items ?? [];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 py-16 lg:px-10">
      <h2 className="text-center text-[26px] font-bold leading-snug text-bb-green-strong sm:text-[30px]">
        {heading}
      </h2>
      <div className="mt-10 divide-y divide-neutral-200">
        {list.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={`${item.question}-${i}`} className="py-5">
              <button
                type="button"
                className="flex w-full items-start justify-between gap-4 text-left"
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="text-[16px] font-semibold text-bb-green-strong">{item.question}</span>
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-neutral-300 text-lg font-light">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && item.answer ? (
                <div className="pr-10">
                  <PortableText value={item.answer as never} components={ptComponents} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
