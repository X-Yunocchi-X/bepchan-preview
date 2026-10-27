"use client";

import { useEffect, useState, type ReactNode } from "react";
import { buttonDisabled, buttonSecondary } from "@/components/ui";
import { copy, type Lang } from "./content";
import { LatencyDiagram, RecoveryDiagram } from "./Diagrams";

/** 页面左侧导航里的语言开关：只改本页状态，不写 cookie / localStorage。 */
function LanguageToggle({
  lang,
  onChange,
  label,
}: {
  lang: Lang;
  onChange: (lang: Lang) => void;
  label: string;
}) {
  const buttonClass = "px-2.5 py-1 text-[11px] font-medium leading-5 transition-colors";
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex shrink-0 overflow-hidden rounded-[4px] border border-line"
    >
      <button
        type="button"
        onClick={() => onChange("en")}
        aria-pressed={lang === "en"}
        className={`${buttonClass} ${lang === "en" ? "bg-panel-2 text-ink" : "text-muted hover:text-ink"}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => onChange("zh")}
        aria-pressed={lang === "zh"}
        className={`${buttonClass} border-l border-line ${
          lang === "zh" ? "bg-panel-2 text-ink" : "text-muted hover:text-ink"
        }`}
      >
        中文
      </button>
    </div>
  );
}

/** 图片与对比面板之间的向下小箭头。 */
function DownArrow() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className="h-3 w-3 shrink-0">
      <path
        d="M6 1v9M2.5 6.5 6 10l3.5-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 章节外壳：编号、短标签、主标题与引导文案。 */
function SectionShell({
  id,
  index,
  label,
  title,
  intro,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-b border-line-soft py-10 sm:py-12">
      <p className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
        <span className="font-mono text-accent">{index}</span>
        <span className="h-px w-5 bg-line" />
        <span>{label}</span>
      </p>
      <h2 className="mt-3 text-[22px] font-semibold leading-[1.3] sm:text-[26px]">{title}</h2>
      <p className="mt-3 max-w-[760px] text-muted">{intro}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

/** 图上四种状态的图例；与 SVG 内的颜色和线型保持一致。 */
function DiagramLegend({
  items,
}: {
  items: { active: string; newCarrier: string; kept: string; drop: string };
}) {
  return (
    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-muted">
      <li className="flex items-center gap-2">
        <span className="h-[2px] w-6 bg-accent" aria-hidden="true" />
        {items.active}
      </li>
      <li className="flex items-center gap-2">
        <span className="w-6 border-t-2 border-dashed border-accent" aria-hidden="true" />
        {items.newCarrier}
      </li>
      <li className="flex items-center gap-2">
        <span className="h-[2px] w-6 bg-ok" aria-hidden="true" />
        {items.kept}
      </li>
      <li className="flex items-center gap-2">
        <span className="text-sm leading-none text-warn" aria-hidden="true">
          ×
        </span>
        {items.drop}
      </li>
    </ul>
  );
}

/**
 * 预览页的客户端外壳。
 *
 * 语言切换只读取本地 `copy` 对象，不引入 i18n 框架；页面默认英文。
 * 根布局仍是 zh-CN，因此切到中文时同步 document.lang，离开页面时还原。
 */
export function WhyChooseBeptardPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [discordNoteShown, setDiscordNoteShown] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.lang;
    root.lang = lang === "en" ? "en" : "zh-CN";
    return () => {
      root.lang = previous;
    };
  }, [lang]);

  return (
    <div id="top" className="lg:flex lg:min-h-screen">
      <aside className="border-b border-line-soft lg:sticky lg:top-0 lg:h-screen lg:w-[236px] lg:shrink-0 lg:overflow-y-auto lg:border-b-0 lg:border-r">
        <div className="px-4 py-4 sm:px-6 sm:py-5 lg:px-6 lg:py-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <a
                href="#top"
                className="text-[20px] font-semibold leading-7 tracking-[0.2px] text-ink hover:no-underline"
              >
                Beptard
              </a>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted">
                {t.nav.tagline}
              </p>
            </div>
            <LanguageToggle lang={lang} onChange={setLang} label={t.nav.languageAria} />
          </div>

          <nav aria-label={t.nav.aria} className="mt-4 lg:mt-8">
            <ol className="grid grid-cols-2 gap-x-4 gap-y-0.5 sm:grid-cols-4 lg:block lg:space-y-1">
              {t.nav.sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex items-baseline gap-2 rounded-[3px] py-1.5 text-sm text-muted hover:text-ink hover:no-underline lg:px-2 lg:hover:bg-panel-2"
                  >
                    <span className="font-mono text-[10px] text-muted/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{section.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mx-auto max-w-[980px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
          <header className="border-b border-line-soft pb-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              {t.hero.eyebrow}
            </p>
            <h1 className="mt-3 text-[30px] font-semibold leading-[1.2] sm:text-[38px]">
              {t.hero.title}
            </h1>
            <p className="mt-4 max-w-[720px] text-muted">{t.hero.lead}</p>
          </header>

          <SectionShell
            id="easy-to-use"
            index="01"
            label={t.sections.easy.label}
            title={t.sections.easy.title}
            intro={t.sections.easy.intro}
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {t.sections.easy.steps.map((step, index) => (
                <span key={step} className="flex items-center gap-3 text-sm">
                  {index > 0 ? (
                    <span aria-hidden="true" className="text-accent">
                      →
                    </span>
                  ) : null}
                  <span>{step}</span>
                </span>
              ))}
            </div>
            <p className="mt-5 max-w-[760px] border-l border-line pl-4 text-sm text-muted">
              {t.sections.easy.summary}
            </p>
          </SectionShell>

          <SectionShell
            id="connection-recovery"
            index="02"
            label={t.sections.recovery.label}
            title={t.sections.recovery.title}
            intro={t.sections.recovery.intro}
          >
            <div className="overflow-x-auto pb-1">
              <RecoveryDiagram labels={t.sections.recovery.diagram} />
            </div>
            <p className="mt-2 text-[11px] text-muted min-[1120px]:hidden">{t.diagramHint}</p>
            <DiagramLegend items={t.sections.recovery.diagram.legend} />

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <figure className="min-w-0">
                <div className="flex items-center gap-2 text-[11px] text-warn">
                  <DownArrow />
                  <span>{t.sections.recovery.diagram.withoutTitle}</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/bepchan-preview/why-choose-beptard/kancolle-error.png"
                  alt={t.sections.recovery.diagram.errorShotAlt}
                  width={800}
                  height={480}
                  loading="lazy"
                  decoding="async"
                  className="mt-2 block h-auto w-full rounded-[3px] border border-line bg-panel-2"
                />
                <figcaption className="mt-2 text-xs text-muted">
                  {t.sections.recovery.diagram.errorShotCaption}
                </figcaption>
              </figure>

              <figure className="min-w-0">
                <div className="flex items-center gap-2 text-[11px] text-ok">
                  <DownArrow />
                  <span>{t.sections.recovery.diagram.withTitle}</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/bepchan-preview/why-choose-beptard/kancolle-continue.png"
                  alt={t.sections.recovery.diagram.continueShotAlt}
                  width={800}
                  height={480}
                  loading="lazy"
                  decoding="async"
                  className="mt-2 block h-auto w-full rounded-[3px] border border-line bg-panel-2"
                />
                <figcaption className="mt-2 text-xs text-muted">
                  {t.sections.recovery.diagram.continueShotCaption}
                </figcaption>
              </figure>
            </div>

            <ol className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.sections.recovery.steps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line bg-panel-2 font-mono text-[10px] text-accent">
                    {index + 1}
                  </span>
                  <span className="text-sm text-muted">{step}</span>
                </li>
              ))}
            </ol>

            <p className="mt-5 max-w-[760px] border-l border-line pl-4 text-sm text-muted">
              {t.sections.recovery.caveat}
            </p>
          </SectionShell>

          <SectionShell
            id="lower-latency"
            index="03"
            label={t.sections.latency.label}
            title={t.sections.latency.title}
            intro={t.sections.latency.intro}
          >
            <div className="overflow-x-auto pb-1">
              <LatencyDiagram labels={t.sections.latency.diagram} />
            </div>
            <p className="mt-2 text-[11px] text-muted min-[1120px]:hidden">{t.diagramHint}</p>

            <div className="mt-4 max-w-[760px] border-l border-line pl-4">
              <p className="text-sm font-semibold text-ink">{t.sections.latency.note}</p>
              <p className="mt-1 text-sm text-muted">{t.sections.latency.caveat}</p>
            </div>
          </SectionShell>

          <SectionShell
            id="more-than-acceleration"
            index="04"
            label={t.sections.more.label}
            title={t.sections.more.title}
            intro={t.sections.more.intro}
          >
            <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {t.sections.more.items.map((item) => (
                <div key={item.label} className="border-l border-line pl-4">
                  <dt className="text-sm font-semibold text-ink">{item.label}</dt>
                  <dd className="mt-1 text-sm text-muted">{item.text}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 border-t border-line-soft pt-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-accent">
                {t.sections.more.next.label}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{t.sections.more.next.title}</h3>
              <p className="mt-2 max-w-[760px] text-sm text-muted">{t.sections.more.next.intro}</p>
              <dl className="mt-4 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                {t.sections.more.next.items.map((item) => (
                  <div key={item.label}>
                    <dt className="text-sm font-semibold text-ink">{item.label}</dt>
                    <dd className="mt-1 text-sm text-muted">{item.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </SectionShell>

          <section className="py-10 sm:py-12">
            <div className="max-w-[620px] border border-line bg-panel p-5 sm:p-6">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-accent">
                {t.cta.label}
              </p>
              <h2 className="mt-2 text-[22px] font-semibold">{t.cta.title}</h2>
              <p className="mt-5 text-[34px] font-semibold leading-none">{t.cta.price}</p>
              <p className="mt-2 text-sm text-muted">{t.cta.priceNote}</p>
              <button type="button" disabled className={`${buttonDisabled} mt-5 w-full`}>
                {t.cta.disabledButton}
              </button>
              <p className="mt-2 text-xs text-muted">{t.cta.disabledNote}</p>
              <div className="mt-5 border-t border-line-soft pt-5">
                <button
                  type="button"
                  onClick={() => setDiscordNoteShown(true)}
                  className={`${buttonSecondary} w-full`}
                >
                  {t.cta.discord}
                </button>
                <p className="mt-2 text-xs text-muted" aria-live="polite">
                  {discordNoteShown ? t.cta.discordClicked : t.cta.discordNote}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
