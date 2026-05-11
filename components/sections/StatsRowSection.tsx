export type StatsRowBlock = {
  _type: "statsRow";
  _key?: string;
  items?: { value?: string; label?: string }[] | null;
};

export function StatsRowSection({ block }: { block: StatsRowBlock }) {
  const items = block.items ?? [];
  return (
    <section id="stats-light" className="py-12">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 md:grid-cols-3 lg:px-10">
        {items.map((item, i) => (
          <article
            key={`${item.value}-${i}`}
            className="rounded-[24px] bg-neutral-100 px-8 py-10 shadow-sm shadow-black/[0.02]"
          >
            <div
              className="text-[40px] font-bold tracking-tighter text-neutral-950"
              style={{ fontFamily: "var(--font-figtree), system-ui, sans-serif" }}
            >
              {item.value}
            </div>
            <p className="mt-4 text-[15px] font-medium leading-snug text-neutral-700">
              {item.label}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
