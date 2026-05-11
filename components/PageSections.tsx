import { CultureRoiSection } from "./sections/CultureRoiSection";
import type { CultureRoiBlock } from "./sections/CultureRoiSection";
import { HeroSection } from "./sections/HeroSection";
import type { HeroBlock } from "./sections/HeroSection";
import { HowItWorksSection } from "./sections/HowItWorksSection";
import type { HowItWorksBlock } from "./sections/HowItWorksSection";
import { MealGridSection } from "./sections/MealGridSection";
import type { MealGridBlock } from "./sections/MealGridSection";
import { LogoCloudSection } from "./sections/LogoCloudSection";
import type { LogoCloudBlock } from "./sections/LogoCloudSection";
import { StatsRowSection } from "./sections/StatsRowSection";
import type { StatsRowBlock } from "./sections/StatsRowSection";
import { LunchCalculatorClient } from "./sections/LunchCalculatorClient";
import type { LunchCalculatorBlock } from "./sections/LunchCalculatorClient";
import { ContactLeadSection } from "./sections/ContactLeadSection";
import type { ContactLeadBlock } from "./sections/ContactLeadSection";
import { SupportCenterSection } from "./sections/SupportCenterSection";
import type { SupportCenterBlock } from "./sections/SupportCenterSection";
import { FaqAccordionClient, type FaqItem } from "./sections/FaqAccordionClient";

type Block = { _type?: string; _key?: string };

export function PageSections({ components }: { components: unknown }) {
  if (!Array.isArray(components)) return null;

  const firstHeroIndex = components.findIndex(
    (c) => typeof c === "object" && c !== null && (c as Block)._type === "hero",
  );
  console.log("firstHeroIndex", components);

  return (
    <div>
      {components.map((raw, i) => {
        const block = raw as Block & Record<string, unknown>;
        const key = block._key ?? `row-${i}`;
        const t = block.comp_type;

        switch (t) {
          case "hero":
            return (
              <HeroSection
                key={key}
                block={block as unknown as HeroBlock}
                priority={i === firstHeroIndex}
              />
            );
          case "homepageLogoCloud":
            return (
              <LogoCloudSection key={key} block={block as unknown as LogoCloudBlock} />
            );
          case "statsRow":
            return (
              <StatsRowSection key={key} block={block as unknown as StatsRowBlock} />
            );
          case "mealGrid":
            return (
              <MealGridSection key={key} block={block as unknown as MealGridBlock} />
            );
          case "cultureRoi":
            return (
              <CultureRoiSection key={key} block={block as unknown as CultureRoiBlock} />
            );
          case "howItWorks":
            return (
              <HowItWorksSection key={key} block={block as unknown as HowItWorksBlock} />
            );
          case "lunchCalculator":
            return (
              <LunchCalculatorClient
                key={key}
                block={block as unknown as LunchCalculatorBlock}
              />
            );
          case "contactLead":
            return (
              <ContactLeadSection key={key} block={block as unknown as ContactLeadBlock} />
            );
          case "supportCenter":
            return (
              <SupportCenterSection key={key} block={block as unknown as SupportCenterBlock} />
            );
          case "faqAccordion":
            return (
              <FaqAccordionClient
                key={key}
                heading={block.sectionHeading as string | undefined}
                items={block.items as FaqItem[] | undefined | null}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
