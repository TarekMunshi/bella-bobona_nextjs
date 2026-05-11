import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";

export type ContactLeadBlock = {
  _type: "contactLead";
  cardHeading?: string;
  cardIntro?: string;
  profileName?: string;
  profileEmail?: string;
  profilePhone?: string;
  profilePhoto?: unknown;
  formHeading?: string;
  consentText?: string;
  submitLabel?: string;
};

export function ContactLeadSection({ block }: { block: ContactLeadBlock }) {
  const photoUrl = block.profilePhoto
    ? urlFor(block.profilePhoto as unknown)
        ?.width(400)
        .height(400)
        .fit("crop")
        .auto("format")
        .url()
    : undefined;

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-16 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col justify-between rounded-[28px] bg-bb-green-strong px-8 py-10 text-white">
          <div>
            <h2 className="text-3xl font-bold leading-tight">{block.cardHeading}</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/88">{block.cardIntro}</p>
          </div>
          <div className="mt-10 flex items-center gap-4 rounded-2xl bg-white/10 p-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-white/25">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={block.profileName || ""}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              ) : null}
            </div>
            <div className="text-sm">
              <p className="font-semibold">{block.profileName}</p>
              <p className="text-white/80">{block.profileEmail}</p>
              <p className="text-white/80">{block.profilePhone}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-neutral-200 px-8 py-10 shadow-sm shadow-black/[0.04]">
          <h2 className="text-xl font-bold text-bb-green-strong">{block.formHeading}</h2>
          <form action="#" method="post" className="mt-8 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name *" placeholder="Your name" required />
              <Field label="Company name" placeholder="Company" />
            </div>
            <Field label="Email *" type="email" placeholder="you@company.com" required />
            <Field label="Phone *" type="tel" placeholder="+49 …" required />
            <label className="block text-[13px] font-semibold">
              Company size *
              <select className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-bb-green">
                <option>1–20</option>
                <option>21–80</option>
                <option>81–250</option>
              </select>
            </label>
            <label className="block text-[13px] font-semibold">
              Additional comments
              <textarea
                rows={3}
                placeholder="Anything we should know?"
                className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-bb-green"
              />
            </label>
            <label className="flex items-start gap-2 text-[13px] text-neutral-700">
              <input type="checkbox" required className="mt-1" />
              <span>{block.consentText}</span>
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-bb-green py-4 text-sm font-semibold text-white"
            >
              {block.submitLabel}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field(props: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-[13px] font-semibold text-neutral-800">
      {props.label}
      <input
        type={props.type || "text"}
        required={props.required}
        placeholder={props.placeholder}
        className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-bb-green focus:ring-2 focus:ring-bb-green/20"
      />
    </label>
  );
}
