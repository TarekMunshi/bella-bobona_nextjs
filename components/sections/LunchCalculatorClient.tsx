"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { urlFor } from "@/lib/sanity/image";

export type LunchCalculatorBlock = {
  _type: "lunchCalculator";
  calculatorHeading?: string;
  daysQuestionLabel?: string;
  employeesQuestionLabel?: string;
  subsidyQuestionLabel?: string;
  employeeResultHeading?: string;
  companyResultHeading?: string;
  employeeInfoNote?: string;
  companyInfoNote?: string;
  emailCaptureLabel?: string;
  quoteButtonLabel?: string;
  testimonialHeading?: string;
  testimonialQuote?: string;
  testimonialAttribution?: string;
  testimonialImageLeft?: unknown;
  testimonialImageRight?: unknown;
};

function formatEuro(n: number) {
  return `${n.toFixed(2).replace(".", ",")} €`;
}

export function LunchCalculatorClient({ block }: { block: LunchCalculatorBlock }) {
  const [days, setDays] = useState(3);
  const [employees, setEmployees] = useState(50);
  const [subsidy, setSubsidy] = useState(4.5);

  const { employeeRange, companyRange } = useMemo(() => {
    const baseOut = Math.max(1.5, 10.5 - subsidy);
    const employeeLow = baseOut * 0.85;
    const employeeHigh = baseOut * 1.25;
    const monthly = days * employees * subsidy * 4.3;
    const companyLow = monthly * 0.97;
    const companyHigh = monthly * 1.04;
    return {
      employeeRange: `${formatEuro(employeeLow)} - ${formatEuro(employeeHigh)} / dish`,
      companyRange: `${Math.round(companyLow).toLocaleString("de-DE")} € - ${Math.round(companyHigh).toLocaleString("de-DE")} € / mo`,
    };
  }, [days, employees, subsidy]);

  const left = block.testimonialImageLeft
    ? urlFor(block.testimonialImageLeft as unknown)
        ?.width(700)
        .height(900)
        .fit("crop")
        .auto("format")
        .url()
    : undefined;
  const right = block.testimonialImageRight
    ? urlFor(block.testimonialImageRight as unknown)
        ?.width(700)
        .height(900)
        .fit("crop")
        .auto("format")
        .url()
    : undefined;

  return (
    <section id="lunch-calculator" className="bg-bb-lime py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-10">
        <div className="rounded-[28px] bg-white px-6 py-10 shadow-sm sm:px-12">
          <h2 className="text-center text-[26px] font-bold leading-snug sm:text-3xl">
            {block.calculatorHeading}
          </h2>

          <div className="mx-auto mt-12 max-w-3xl space-y-10">
            <div>
              <p className="text-sm font-semibold text-neutral-800">
                📅 {block.daysQuestionLabel}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDays(d)}
                    className={`rounded-2xl border px-5 py-3 text-sm font-semibold transition ${
                      days === d
                        ? "border-bb-green bg-bb-green text-white"
                        : "border-neutral-300 bg-white text-neutral-900"
                    }`}
                  >
                    {d} {d === 1 ? "day" : "days"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-neutral-800">
                👥 {block.employeesQuestionLabel}
              </p>
              <div className="mt-4">
                <input
                  type="range"
                  min={20}
                  max={250}
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full accent-pink-500"
                />
                <div className="mt-1 flex justify-between text-xs text-neutral-500">
                  <span>20</span>
                  <span className="font-semibold text-neutral-900">
                    {employees} employees
                  </span>
                  <span>250</span>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-neutral-800">
                🍽️ {block.subsidyQuestionLabel}
              </p>
              <div className="mt-4">
                <input
                  type="range"
                  min={3}
                  max={10}
                  step={0.5}
                  value={subsidy}
                  onChange={(e) => setSubsidy(Number(e.target.value))}
                  className="w-full accent-pink-500"
                />
                <div className="mt-1 flex justify-between text-xs text-neutral-500">
                  <span>3 €</span>
                  <span className="font-semibold text-neutral-900">
                    {subsidy.toFixed(2)} € subsidy
                  </span>
                  <span>10 €</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-12 grid gap-6 lg:grid-cols-2">
            <div className="flex flex-col justify-between rounded-[24px] bg-bb-green-strong px-7 py-8 text-white">
              <div>
                <p className="text-sm font-semibold text-white/80">{block.employeeResultHeading}</p>
                <p
                  className="mt-4 text-3xl font-bold leading-tight"
                  style={{ fontFamily: "var(--font-figtree)" }}
                >
                  {employeeRange}
                </p>
                <p className="mt-3 text-xs text-white/75">Per employee per dish</p>
              </div>
              <div className="mt-6 flex gap-3 rounded-xl bg-white/10 p-4 text-[11px] leading-relaxed text-white/92">
                <span className="rounded-full bg-white/20 px-2 py-0.5">i</span>
                <span>{block.employeeInfoNote}</span>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-[24px] bg-bb-lime px-7 py-8 text-bb-green-strong">
              <div>
                <p className="text-sm font-semibold text-bb-green/80">{block.companyResultHeading}</p>
                <p className="mt-4 text-3xl font-bold leading-tight text-neutral-950">
                  {companyRange}
                </p>
                <p className="mt-3 text-xs text-neutral-800/80">Per month total</p>
              </div>
              <div className="mt-6 flex gap-3 rounded-xl bg-white/70 p-4 text-[11px] leading-relaxed text-neutral-900">
                <span className="rounded-full bg-white px-2 py-0.5 text-neutral-900">i</span>
                <span>{block.companyInfoNote}</span>
              </div>
            </div>
          </div>

          <form className="mx-auto mt-12 max-w-xl space-y-4" action="#" method="post">
            <label className="block text-sm leading-relaxed text-neutral-800">{block.emailCaptureLabel}</label>
            <input
              type="email"
              required
              className="w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none ring-bb-green/30 focus:border-bb-green focus:ring-2"
              placeholder="you@company.com"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-bb-green py-3 text-sm font-semibold text-white"
            >
              {block.quoteButtonLabel}
            </button>
          </form>
        </div>

        <div className="mt-16 px-4 text-center lg:px-0">
          <h2 className="text-[26px] font-bold leading-snug sm:text-[30px]">
            {block.testimonialHeading}
          </h2>
          <div className="mx-auto mt-10 grid items-stretch gap-6 lg:grid-cols-[1fr,minmax(0,1.1fr),1fr]">
            <div className="relative hidden overflow-hidden rounded-[26px] bg-neutral-200 lg:block">
              {left ? (
                <Image src={left} alt="" fill className="object-cover" sizes="360px" />
              ) : null}
            </div>
            <div className="flex flex-col justify-center rounded-[28px] bg-bb-green-strong px-8 py-12 text-white">
              <p className="text-center text-[18px] leading-relaxed">{block.testimonialQuote}</p>
              <p className="mt-10 text-center text-sm text-white/80">{block.testimonialAttribution}</p>
            </div>
            <div className="relative hidden overflow-hidden rounded-[26px] bg-neutral-200 lg:block">
              {right ? (
                <Image src={right} alt="" fill className="object-cover" sizes="360px" />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
