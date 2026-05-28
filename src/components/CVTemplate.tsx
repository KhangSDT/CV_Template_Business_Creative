import { useMemo } from "react";
import { featureEnabled } from "@/config";
import { getMainSectionNumbers } from "@/lib/cv-sections";
import { hasCreativeSkills, normalizeCVData } from "@/lib/normalize-cv";
import { cvData, type CVData } from "@/resume";
import type { Locale, UILabels } from "@/i18n/ui";
import CVAvatar from "@/components/CVAvatar";

function stripUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "");
}

function MainSection({
  num,
  title,
  children,
  className = "",
}: {
  num: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="mb-1 flex items-baseline gap-2">
        <span className="section-num">{num}</span>
        <h2 className="section-heading">{title}</h2>
        <span className="ml-auto h-px flex-1 max-w-[8rem] bg-gradient-to-r from-brand-coral/40 to-transparent" />
      </div>
      {children}
    </section>
  );
}

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10 mb-3.5">
      <h2 className="sidebar-heading">{title}</h2>
      {children}
    </div>
  );
}

function SkillPills({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item) => (
        <span key={item} className="skill-pill">
          {item}
        </span>
      ))}
    </div>
  );
}

function ContactItem({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="contact-chip">
      <span className="block text-[7.5px] font-bold uppercase tracking-widest text-brand-gold/80">
        {label}
      </span>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium">
          {value}
        </a>
      ) : (
        <span className="font-medium">{value}</span>
      )}
    </div>
  );
}

type CVTemplateProps = {
  data?: CVData;
  labels: UILabels;
  locale?: Locale;
};

export default function CVTemplate({
  data = cvData,
  labels,
  locale = "vi",
}: CVTemplateProps) {
  const safe = useMemo(() => normalizeCVData(data), [data]);
  const { header, creativeSkills } = safe;
  const sg = labels.sidebar.skillGroups;
  const sectionNum = useMemo(() => getMainSectionNumbers(safe), [safe]);
  const showCreativeSkills = featureEnabled("creativeSkills") && hasCreativeSkills(safe);

  return (
    <article
      id="cv-document"
      className="cv-page relative mx-auto overflow-hidden bg-brand-paper font-sans text-cv-body print:shadow-none"
      aria-label={locale === "vi" ? "Portfolio và CV sáng tạo" : "Creative Portfolio CV"}
      lang={locale}
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className="cv-header-accent h-1.5 w-full" aria-hidden />

      <header className="cv-header-cut relative bg-brand-charcoal px-5 pb-5 pt-3.5 text-white">
        <div className="cv-header-glow pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-40" aria-hidden />

        <div className="relative flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-[8px] font-bold uppercase tracking-[0.38em] text-brand-gold/90">
              {labels.cvDocument}
            </p>
            <h1 className="mt-0.5 font-display text-[27px] font-bold leading-tight tracking-tight text-white">
              {header.fullName}
            </h1>
            <p className="mt-1.5 text-[11.5px] font-semibold tracking-wide text-brand-coral">
              {header.position}
            </p>
            {header.tagline && (
              <p className="mt-1.5 max-w-full font-accent text-[10px] italic leading-snug text-white/80 pr-2">
                {header.tagline}
              </p>
            )}
            {featureEnabled("headerHighlights") && header.highlights.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {header.highlights.map((h) => (
                  <span key={h} className="highlight-chip">
                    {h}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="shrink-0 rounded border border-white/12 bg-white/5 p-2 backdrop-blur-sm">
            <div className="grid grid-cols-1 gap-1.5">
              {header.phone && (
                <ContactItem
                  label={labels.contact.phone}
                  value={header.phone}
                  href={`tel:${header.phone.replace(/\s/g, "")}`}
                />
              )}
              {header.email && (
                <ContactItem
                  label={labels.contact.email}
                  value={header.email}
                  href={`mailto:${header.email}`}
                />
              )}
              {header.address && (
                <ContactItem label={labels.contact.location} value={header.address} />
              )}
              {header.portfolio && (
                <ContactItem
                  label={labels.contact.github}
                  value={stripUrl(header.portfolio)}
                  href={header.portfolio}
                />
              )}
              {header.facebook && (
                <ContactItem
                  label={labels.contact.facebook}
                  value={stripUrl(header.facebook)}
                  href={header.facebook}
                />
              )}
              {header.zalo && (
                <ContactItem
                  label={labels.contact.zalo}
                  value={stripUrl(header.zalo)}
                  href={header.zalo}
                />
              )}
              {header.linkedin && (
                <ContactItem
                  label={labels.contact.linkedin}
                  value={stripUrl(header.linkedin)}
                  href={header.linkedin}
                />
              )}
              {featureEnabled("instagram") && header.instagram && (
                <ContactItem
                  label={labels.contact.instagram}
                  value={stripUrl(header.instagram)}
                  href={header.instagram}
                />
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="cv-body flex">
        <aside className="cv-sidebar w-1/3 shrink-0 px-3 py-3.5 text-white">
          <CVAvatar />
          {showCreativeSkills && (
            <SidebarSection title={labels.sidebar.creativeSkills}>
              <div className="space-y-2">
                {(
                  [
                    [sg.design, creativeSkills.design],
                    [sg.content, creativeSkills.content],
                    [sg.software, creativeSkills.software],
                    [sg.media, creativeSkills.media],
                  ] as const
                ).map(([label, items]) =>
                  items.length > 0 ? (
                    <div key={label}>
                      <p className="mb-1 text-[8px] font-semibold text-white/55">{label}</p>
                      <SkillPills items={[...items]} />
                    </div>
                  ) : null,
                )}
              </div>
            </SidebarSection>
          )}

          {featureEnabled("certifications") && safe.certifications.length > 0 && (
            <SidebarSection title={labels.sidebar.certifications}>
              <ul className="space-y-1.5">
                {safe.certifications.map((cert, i) => (
                  <li
                    key={i}
                    className="border-l-2 border-brand-coral/70 pl-2 text-[8px] leading-snug"
                  >
                    <span className="font-semibold text-white">{cert.name}</span>
                    {cert.detail && (
                      <span className="mt-0.5 block text-[7px] text-white/65">{cert.detail}</span>
                    )}
                  </li>
                ))}
              </ul>
            </SidebarSection>
          )}

          {featureEnabled("languages") && safe.languages.length > 0 && (
            <SidebarSection title={labels.sidebar.languages}>
              <ul className="space-y-1.5">
                {safe.languages.map((lang, i) => (
                  <li key={i} className="text-[8px] leading-snug">
                    <span className="font-bold text-brand-gold">{lang.name}</span>
                    <p className="mt-0.5 text-white/70">{lang.level}</p>
                  </li>
                ))}
              </ul>
            </SidebarSection>
          )}

          <div
            className="relative z-10 mt-auto pt-2 text-[7.5px] uppercase tracking-[0.2em] text-white/35"
            aria-hidden
          >
            {labels.sidebar.footer}
          </div>
        </aside>

        <main className="cv-main w-2/3 bg-brand-cream px-4 py-3">
          {sectionNum.careerObjective && (
            <MainSection num={sectionNum.careerObjective} title={labels.main.careerObjective} className="mb-2.5">
              <blockquote className="objective-quote relative border-l-[3px] border-brand-coral bg-white px-2.5 py-1.5 text-[8.5px] leading-relaxed text-cv-body shadow-card">
                <span
                  className="pointer-events-none absolute -left-0.5 -top-1 font-display text-2xl leading-none text-brand-coral/30"
                  aria-hidden
                >
                  “
                </span>
                {safe.careerObjective}
              </blockquote>
            </MainSection>
          )}

          {sectionNum.education && (
          <MainSection num={sectionNum.education} title={labels.main.education} className="mb-2.5">
            <div className="space-y-1.5">
              {safe.education.map((edu, i) => (
                <div
                  key={i}
                  className="rounded border border-cv-line/70 bg-white px-2 py-1"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[9.5px] font-bold leading-tight text-cv-ink">{edu.school}</p>
                    {edu.period && (
                      <p className="shrink-0 text-[8px] font-semibold text-brand-terracotta">
                        {edu.period}
                      </p>
                    )}
                  </div>
                  {edu.major && (
                    <p className="mt-0.5 text-[8.5px] text-cv-muted">
                      <span className="font-semibold text-cv-ink">Chuyên ngành:</span> {edu.major}
                    </p>
                  )}
                  {edu.detail && (
                    <p className="mt-0.5 text-[8px] leading-snug text-cv-body">{edu.detail}</p>
                  )}
                  {edu.gpa && (
                    <p className="mt-0.5 inline-block rounded bg-brand-blush px-1.5 py-px text-[7.5px] font-bold text-brand-charcoal">
                      {edu.gpa}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </MainSection>
          )}

          {sectionNum.experience && (
            <MainSection num={sectionNum.experience} title={labels.main.experience} className="mb-2.5">
              <div className="space-y-2">
                {safe.experience.map((job, i) => (
                  <article
                    key={i}
                    className="rounded border border-cv-line/70 bg-white px-2 py-1.5 print-break-avoid"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-[9.5px] font-bold text-cv-ink">{job.company}</h3>
                        <p className="text-[8.5px] font-semibold text-brand-terracotta">{job.role}</p>
                      </div>
                      <time className="shrink-0 rounded bg-brand-charcoal px-1.5 py-px text-[7px] font-bold text-brand-gold">
                        {job.period}
                      </time>
                    </div>
                    <ul className="mt-1 list-disc space-y-0.5 pl-3.5 text-[8px] leading-snug text-cv-muted marker:text-brand-coral">
                      {job.bullets.map((bullet, j) => (
                        <li key={j}>{bullet}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </MainSection>
          )}

          {sectionNum.activities && (
            <MainSection num={sectionNum.activities} title={labels.main.activities} className="mb-2.5">
              <ul className="space-y-1">
                {safe.activities.map((act, i) => (
                  <li
                    key={i}
                    className="flex gap-2 border-b border-cv-line/50 pb-1 text-[8px] leading-snug last:border-0"
                  >
                    <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-brand-coral" />
                    <div>
                      <span className="font-bold text-cv-ink">
                        {act.title}
                        {act.period && (
                          <span className="ml-1 font-normal text-brand-terracotta">
                            · {act.period}
                          </span>
                        )}
                      </span>
                      <span className="text-cv-muted"> — {act.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </MainSection>
          )}

          {sectionNum.projects && (
          <MainSection num={sectionNum.projects} title={labels.main.projects} className="mb-2">
            <div className="space-y-2">
              {safe.projects.map((project, i) => (
                <article key={i} className="project-card">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[9.5px] font-bold leading-tight text-cv-ink">
                      {project.name}
                    </h3>
                    <time className="shrink-0 rounded bg-brand-charcoal px-1.5 py-px text-[7px] font-bold text-brand-gold">
                      {project.period}
                    </time>
                  </div>
                  <p className="mt-0.5 text-[8px] font-semibold text-brand-terracotta">
                    {project.role}
                  </p>
                  <p className="mt-1 text-[7px] font-medium uppercase tracking-wider text-cv-muted">
                    {labels.main.toolsLabel}
                  </p>
                  <div className="mt-0.5 flex flex-wrap gap-1">
                    {project.tools.map((tool) => (
                      <span key={tool} className="creative-pill">
                        {tool}
                      </span>
                    ))}
                  </div>
                  <p className="mt-1 text-[8.5px] leading-snug text-cv-body">{project.summary}</p>
                  <ul className="mt-1 list-disc space-y-0.5 pl-3.5 text-[8px] leading-snug text-cv-muted marker:text-brand-coral">
                    {project.bullets.map((bullet, j) => (
                      <li key={j}>{bullet}</li>
                    ))}
                  </ul>
                  {project.result && (
                    <p className="mt-1 text-[7.5px] font-bold text-brand-charcoal">
                      {project.result}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </MainSection>
          )}
        </main>
      </div>
    </article>
  );
}
