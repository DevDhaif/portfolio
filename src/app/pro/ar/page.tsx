import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUpLeft,
  Github,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  CheckCircle2,
  Briefcase,
} from 'lucide-react';
import { loadExperimentData } from '@/lib/experiments-data';
import { SOCIAL_LINKS, AUTHOR } from '@/lib/constants';
import { GsapReveals } from '@/components/ui/gsap-reveals';
import { ProjectCard } from '@/components/ui/project-card';
import { HeroScene } from '@/components/ui/hero-scene';
import { ArHeader } from './ar-header';
import { ArContactForm } from './ar-contact-form';
import { ArClock } from './ar-clock';

export const revalidate = 60;

const ARABIC_MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

export default async function ArabicHomePage() {
  const { projects, certificates, posts, postsCount } = await loadExperimentData({
    projectsLimit: 12,
    postsLimit: 6,
  });

  return (
    <div className="min-h-screen bg-paper text-ink">
      <ArHeader />
      <GsapReveals />

      <main>
        {/* ==================== HERO ==================== */}
        <section id="home" className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="pointer-events-none absolute inset-0 bg-grid-dev-fade" />
          <div className="pointer-events-none absolute inset-0 bg-scanline" />
          <HeroScene className="pointer-events-none absolute inset-0 h-full w-full opacity-80 [mask-image:radial-gradient(ellipse_90%_80%_at_50%_35%,black,transparent_88%)]" />
          <div
            className="pointer-events-none absolute -top-40 -start-40 h-[480px] w-[480px] rounded-full bg-signal/10 blur-3xl"
            aria-hidden
          />

          <div className="container-dev relative">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
              <span className="inline-flex items-center gap-2 text-signal">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-signal/60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
                </span>
                متاح
              </span>
              <span className="text-ink-faint">／</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                الرياض
              </span>
              <span className="text-ink-faint">／</span>
              <span dir="ltr">v.{new Date().getFullYear()}</span>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <h1 className="text-[clamp(2.4rem,7vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
                  مهندس
                  <br />
                  <span className="relative inline-block">
                    واجهات أمامية
                    <span aria-hidden className="absolute -bottom-2 start-0 h-2 w-full bg-signal/80" />
                  </span>
                  <span className="mt-4 block text-[clamp(1.1rem,2.2vw,1.7rem)] font-medium leading-relaxed tracking-tight text-ink-muted">
                    أبني تطبيقات ويب <span className="font-mono text-ink" dir="ltr">{'<'}سريعة{'/>'}</span>،
                    سهلة الوصول، وتصمد — بـ React و Next.js و TypeScript.
                  </span>
                </h1>

                <p className="mt-5 font-mono text-sm text-ink-muted" dir="ltr" lang="en">
                  <span className="text-ink">Dhaifallah Ahmed Alfarawi</span> — Front-End Engineer
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Link href="#projects" className="btn-signal press">شف شغلي</Link>
                  <Link href="#contact" className="btn-ghost press">تواصل معي</Link>
                  <a href={SOCIAL_LINKS.GITHUB} target="_blank" rel="noreferrer" className="btn-ghost press">
                    <Github className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                </div>
              </div>

              {/* Code window — user.json */}
              <div className="lg:col-span-5">
                <div className="code-window" dir="ltr">
                  <div className="code-window-header">
                    <span className="dot-light bg-rule-strong" />
                    <span className="dot-light bg-rule-strong" />
                    <span className="dot-light bg-rule-strong" />
                    <span className="ml-2 font-mono text-xs text-ink-muted">~/user.json</span>
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">json</span>
                  </div>
                  <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-[1.7] text-ink">
                    <code>
                      <Line n={1}><Bracket>{'{'}</Bracket></Line>
                      <Line n={2}><Indent /><Key>role</Key><Punc>: </Punc><Str>front-end engineer</Str><Punc>,</Punc></Line>
                      <Line n={3}><Indent /><Key>owns</Key><Punc>: </Punc><Bracket>[</Bracket><Str>ui</Str><Punc>, </Punc><Str>api</Str><Punc>, </Punc><Str>product</Str><Bracket>]</Bracket><Punc>,</Punc></Line>
                      <Line n={4}><Indent /><Key>loc</Key><Punc>: </Punc><Str>Riyadh, KSA</Str><Punc>,</Punc></Line>
                      <Line n={5}><Indent /><Key>stack</Key><Punc>: </Punc><Bracket>[</Bracket><Str>react</Str><Punc>, </Punc><Str>next</Str><Punc>, </Punc><Str>ts</Str><Bracket>]</Bracket><Punc>,</Punc></Line>
                      <Line n={6}><Indent /><Key>status</Key><Punc>: </Punc><Str>available</Str></Line>
                      <Line n={7}><Bracket>{'}'}</Bracket></Line>
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== ABOUT ==================== */}
        <section id="about" className="relative bg-paper-panel py-24 md:py-32">
          <div className="container-dev">
            <ArHeading index="01" eyebrow="عني" title="أبني واجهات تصمد." />

            {/* Stats */}
            <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-4" data-reveal>
              {[
                { label: 'سنوات الخبرة', value: '+٥' },
                { label: 'مشاريع', value: '+١٢' },
                { label: 'عملاء', value: '+١٠' },
                { label: 'مقالات', value: toArabicNumerals(String(postsCount)) },
              ].map((st) => (
                <div key={st.label} className="bg-paper-raised p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">{st.label}</p>
                  <p className="mt-2 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">{st.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Bio */}
              <div className="rounded-lg border border-rule bg-paper-raised p-6 lg:col-span-2" data-reveal>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">{"// نبذة"}</p>
                <p className="mt-4 text-lg leading-relaxed text-ink md:text-xl">
                  أنا <strong>ضيف الله أحمد الفروي</strong>، مهندس برمجيات ساكن في الرياض. شغلي اليومي
                  React و Next.js و TypeScript و Tailwind، وإذا احتاج المشروع باك إند كامل أستخدم Laravel.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  أهتم بالأداء وسهولة الوصول ودعم العربية RTL من البداية — مو فكرة تُضاف بالآخر. هذا اللي يخلي
                  الواجهة تصمد ولا تنكسر بعد أول سنة.
                </p>
              </div>

              {/* Location + clock */}
              <div className="grid grid-rows-2 gap-6">
                <div className="rounded-lg border border-rule bg-paper-raised p-5" data-reveal>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">{"// الموقع"}</p>
                  <p className="mt-3 inline-flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-ink">
                    <MapPin className="h-5 w-5 shrink-0 text-ink-muted" />
                    الرياض، السعودية
                  </p>
                </div>
                <div className="rounded-lg border border-rule bg-paper-raised p-5" data-reveal>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">{"// التوقيت المحلي"}</p>
                  <div className="mt-3">
                    <ArClock />
                  </div>
                </div>
              </div>
            </div>

            {/* Principles + services */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="overflow-hidden rounded-lg border border-rule bg-paper-raised" data-reveal>
                <div className="code-window-header" dir="ltr">
                  <span className="dot-light bg-rule-strong" />
                  <span className="dot-light bg-rule-strong" />
                  <span className="dot-light bg-rule-strong" />
                  <span className="ml-2 font-mono text-xs text-ink-muted">~/principles.json</span>
                </div>
                <ul className="p-5">
                  {PRINCIPLES.map((p) => (
                    <li key={p.kw} className="flex flex-wrap items-baseline gap-x-2 py-1.5 text-sm">
                      <span className="text-[#7DD3FC]">{p.kw}</span>
                      <span className="text-ink-faint">:</span>
                      <span className="text-ink-muted">{p.val}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="overflow-hidden rounded-lg border border-rule bg-paper-raised" data-reveal>
                <div className="border-b border-rule px-5 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">{"// الخدمات"}</p>
                </div>
                <ul className="grid grid-cols-1 gap-px bg-rule sm:grid-cols-2">
                  {SERVICES.map((sv) => (
                    <li key={sv.title} className="group bg-paper-raised p-4 transition-colors hover:bg-paper">
                      <h3 className="font-display text-sm font-bold tracking-tight text-ink">{sv.title}</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">{sv.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== PROJECTS ==================== */}
        <section id="projects" className="relative py-24 md:py-32">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40" />
          <div className="container-dev relative">
            <ArHeading index="02" eyebrow="أعمال مختارة" title="أشياء نفّذتها وشحنتها." subtitle="شغل إنتاج — واجهات وتطبيقات Full-Stack." />

            {projects.length === 0 ? (
              <p className="mt-10 text-ink-muted">ما فيه مشاريع منشورة لحد الحين.</p>
            ) : (
              // Same card component as the English theme. Content is
              // English DB data, so the grid renders LTR to stay identical.
              <div dir="ltr" className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((p, i) => (
                  <div key={p.id} data-reveal>
                    <ProjectCard
                      id={p.id}
                      title={p.name}
                      description={p.description}
                      image={p.mainImage}
                      tags={p.skills ?? []}
                      githubUrl={p.githubUrl}
                      liveUrl={p.liveUrl}
                      index={i}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ==================== SKILLS ==================== */}
        <section id="skills" className="relative py-24 md:py-32">
          <div className="container-dev">
            <ArHeading index="03" eyebrow="الأدوات" title="الأدوات اللي أشتغل فيها." subtitle="المفضّلة يوميًا، وبقية العدّة." />

            <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {FEATURED.map((sk) => (
                <article
                  key={sk.name}
                  data-reveal
                  className="group relative flex aspect-[5/4] flex-col justify-between rounded-lg border border-rule bg-paper-raised p-5 transition-colors hover:border-signal/50"
                >
                  <Image src={sk.icon} alt={sk.name} width={36} height={36} className="h-9 w-9 object-contain transition-transform group-hover:scale-110" />
                  <div>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-signal" dir="ltr">{sk.name}</h3>
                    <p className="mt-1 text-[11px] text-ink-faint">{sk.note}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-rule bg-rule lg:grid-cols-3">
              {SKILL_GROUPS.map((group) => (
                <div key={group.label} className="bg-paper-raised p-5" data-reveal>
                  <div className="flex items-baseline justify-between border-b border-rule pb-3">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">{group.label}</p>
                    <span className="font-mono text-[10px] text-ink-faint" dir="ltr">{String(group.items.length).padStart(2, '0')}</span>
                  </div>
                  <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
                    {group.items.map((sk) => (
                      <li key={sk.name} className="flex items-center gap-2 rounded-md border border-rule bg-paper-sunken p-2.5 transition-colors hover:border-signal/40">
                        <Image src={sk.icon} alt="" width={18} height={18} className="h-[18px] w-[18px] object-contain" />
                        <span className="text-sm text-ink" dir="ltr">{sk.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== EXPERIENCE ==================== */}
        <section id="experience" className="relative bg-paper-panel py-24 md:py-32">
          <div className="container-dev">
            <ArHeading index="04" eyebrow="الخبرات" title="وين راحت الساعات." />

            <div className="relative mt-16">
              <div className="absolute end-3 top-2 bottom-2 w-px bg-rule md:end-4" />
              <ol className="space-y-12">
                {EXPERIENCE.map((exp, i) => (
                  <li key={i} className="relative pe-12 md:pe-16" data-reveal>
                    <div className="absolute end-0 top-1.5 grid h-7 w-7 place-items-center rounded-full border border-signal bg-paper md:h-9 md:w-9">
                      <span className={`h-2.5 w-2.5 rounded-full bg-signal ${exp.current ? 'animate-pulse' : ''}`} />
                    </div>
                    <article className="overflow-hidden rounded-lg border border-rule bg-paper-raised">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule bg-paper-sunken px-5 py-3">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-3.5 w-3.5 text-ink-muted" />
                          <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">{exp.company}</span>
                        </div>
                        <span className="font-mono text-xs tracking-[0.1em] text-ink-faint" dir="ltr">
                          {exp.period}
                          {exp.current && <span className="ms-2 rounded-sm bg-signal/15 px-1.5 py-0.5 text-[10px] text-signal">الحين</span>}
                        </span>
                      </div>
                      <div className="p-5 md:p-6">
                        <h3 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">{exp.role}</h3>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">{exp.description}</p>
                        <ul className="mt-5 space-y-2.5">
                          {exp.achievements.map((a, j) => (
                            <li key={j} className="flex items-start gap-2.5 text-sm text-ink">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ink-muted" />
                              <span className="leading-snug">{a}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {exp.skills.map((sk) => (
                            <span key={sk} className="chip" dir="ltr">{sk}</span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ==================== CERTIFICATES ==================== */}
        {certificates.length > 0 && (
          <section id="certs" className="relative py-24 md:py-32">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-dot-grid opacity-40" />
            <div className="container-dev relative">
              <ArHeading index="05" eyebrow="الشهادات" title="تقدير في الطريق." subtitle="شهادات من دورات أونلاين — LinkedIn Learning و freeCodeCamp و PMI وغيرها." />

              <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {certificates.map((c) => (
                  <a
                    key={c.id}
                    href={c.urlLink || '#'}
                    target={c.urlLink ? '_blank' : undefined}
                    rel="noreferrer"
                    data-reveal
                    className="group flex flex-col rounded-lg border border-rule bg-paper-raised p-5 transition-colors hover:border-signal/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint" dir="ltr">{c.source}</span>
                      <span className="font-mono text-[10px] text-ink-faint" dir="ltr">
                        {c.issueDate ? new Date(c.issueDate).getFullYear() : ''}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold leading-tight tracking-tight text-ink group-hover:text-signal transition-colors">
                      {c.title}
                    </h3>
                    {c.skills?.length ? (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {c.skills.slice(0, 3).map((sk) => (
                          <span key={sk} className="chip" dir="ltr">{sk}</span>
                        ))}
                      </div>
                    ) : null}
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ==================== BLOG ==================== */}
        <section id="blog" className="relative bg-paper-panel py-24 md:py-32">
          <div className="container-dev">
            <ArHeading index="06" eyebrow="المدونة" title="مقالات وأفكار." subtitle="آخر ما نُشر في المدونة." />

            {posts.length === 0 ? (
              <p className="mt-10 text-ink-muted">ما فيه مقالات منشورة لحد الحين.</p>
            ) : (
              <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((p) => {
                  const d = new Date(p.created_at);
                  const dateLabel = `${toArabicNumerals(d.getDate().toString())} ${ARABIC_MONTHS[d.getMonth()]} ${toArabicNumerals(String(d.getFullYear()))}`;
                  const title = p.title_ar || p.title_en || p.title;
                  return (
                    <Link
                      key={p.id}
                      href={`/blog/${p.slug}`}
                      data-reveal
                      className="group flex flex-col overflow-hidden rounded-lg border border-rule bg-paper-raised transition-colors hover:border-signal/50"
                    >
                      <div className="relative aspect-video overflow-hidden bg-paper-sunken">
                        {p.cover_image ? (
                          <Image
                            src={p.cover_image}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <span className="grid h-full w-full place-items-center font-mono text-xs text-ink-faint">مقال</span>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">{dateLabel}</span>
                        <h3 className="mt-2 font-display text-lg font-bold leading-snug tracking-tight text-ink group-hover:text-signal transition-colors">
                          {title}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            <div className="mt-12 flex justify-center">
              <Link href="/blog" className="btn-ghost">
                كل المقالات
                <ArrowUpLeft className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ==================== CONTACT ==================== */}
        <section id="contact" className="relative bg-paper py-24 md:py-32">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-scanline opacity-60" />
          <div className="container-dev relative">
            <ArHeading index="07" eyebrow="تواصل" title="عندك مشروع؟ نبنيه." subtitle="اكتب لي باختصار، وبرد عليك خلال ٢٤ ساعة إن شاء الله." />

            <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="space-y-4 lg:col-span-4">
                {CHANNELS.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                    data-reveal
                    className="group flex items-center gap-4 rounded-lg border border-rule bg-paper-raised p-4 transition-all hover:border-signal/40 hover:bg-paper"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-signal/40 bg-signal/10 text-signal transition-colors group-hover:bg-signal group-hover:text-ink-inverse">
                      <c.icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">{c.label}</p>
                      <p className="truncate font-medium text-ink group-hover:text-signal transition-colors" dir={c.ltr ? 'ltr' : undefined}>
                        {c.value}
                      </p>
                    </div>
                  </a>
                ))}
                <div className="rounded-lg border border-signal/30 bg-signal/5 p-4" data-reveal>
                  <div className="flex items-center gap-2">
                    <span className="relative inline-flex h-2 w-2">
                      <span className="absolute inset-0 animate-ping rounded-full bg-signal/60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-signal">متاح</span>
                  </div>
                  <p className="mt-2 text-sm text-ink-muted">متقبّل مشاريع وتعاونات جديدة.</p>
                </div>
              </div>

              <div className="lg:col-span-8" data-reveal>
                <ArContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="relative overflow-hidden border-t border-rule bg-paper-sunken">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-scanline opacity-50" />
        <div className="container-dev relative py-20">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-signal">
                <span className="relative inline-flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-signal/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                </span>
                متصل الآن ／ الرياض
              </div>
              <h2 className="mt-6 text-balance text-4xl font-bold leading-[1.1] text-ink md:text-6xl">
                عندك مشروع؟{' '}
                <span className="relative inline-block">
                  خلنا نبنيه
                  <span aria-hidden className="absolute -bottom-2 start-0 h-2 w-full bg-signal/80" />
                </span>.
              </h2>
              <a
                href={`mailto:${SOCIAL_LINKS.EMAIL}`}
                className="group mt-10 inline-flex items-center gap-3 font-mono text-base text-ink hover:text-signal transition-colors press"
                dir="ltr"
              >
                <span className="text-signal">$</span>
                <span>echo &quot;hello&quot; | mail {SOCIAL_LINKS.EMAIL}</span>
              </a>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">{"// الفهرس"}</p>
                  <ul className="mt-5 space-y-3">
                    {[
                      { label: 'عني', href: '#about' },
                      { label: 'الأعمال', href: '#projects' },
                      { label: 'الأدوات', href: '#skills' },
                      { label: 'المدونة', href: '/blog' },
                      { label: 'تواصل', href: '#contact' },
                    ].map((item) => (
                      <li key={item.label}>
                        <Link href={item.href} className="text-sm text-ink-muted hover:text-signal transition-colors">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">{"// قنوات"}</p>
                  <ul className="mt-5 space-y-3" dir="ltr">
                    {CHANNELS.filter((c) => c.href.startsWith('http') || c.href.startsWith('mailto')).map((c) => (
                      <li key={c.label}>
                        <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-sm text-ink-muted hover:text-signal transition-colors">
                          <c.icon className="h-3.5 w-3.5" />
                          {c.value}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-rule pt-6 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="text-xs text-ink-faint">© ٢٠٢٦ · ضيف الله أحمد الفروي</p>
            <Link href="/pro" className="inline-flex items-baseline gap-1 font-mono text-xs text-ink-faint hover:text-signal transition-colors">
              English version
              <ArrowUpLeft className="h-3 w-3 self-center" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ===========================================================
   Section heading (Arabic)
   =========================================================== */
function ArHeading({
  index,
  eyebrow,
  title,
  subtitle,
}: {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-3xl" data-reveal>
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-faint">
        <span className="text-signal" dir="ltr">{index}</span>
        <span className="h-px w-8 bg-rule" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight text-ink">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-base leading-relaxed text-ink-muted">{subtitle}</p>}
    </div>
  );
}

/* JSON syntax tokens */
function Line({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div>
      <span className="select-none mr-3 inline-block w-5 text-right text-ink-faint/70">{n}</span>
      {children}
    </div>
  );
}
function Indent() {
  return <span className="pl-3" />;
}
function Key({ children }: { children: React.ReactNode }) {
  return <span className="text-[#7DD3FC]">&quot;{children}&quot;</span>;
}
function Str({ children }: { children: React.ReactNode }) {
  return <span className="text-[#A7F3A0]">&quot;{children}&quot;</span>;
}
function Punc({ children }: { children: React.ReactNode }) {
  return <span className="text-ink-faint">{children}</span>;
}
function Bracket({ children }: { children: React.ReactNode }) {
  return <span className="text-[#F0ABFC]">{children}</span>;
}

/* ===========================================================
   Helpers + static Arabic copy (same facts as the EN theme)
   =========================================================== */
const ARABIC_DIGITS: Record<string, string> = {
  '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤',
  '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩',
};
function toArabicNumerals(input: string): string {
  return input.replace(/[0-9]/g, (d) => ARABIC_DIGITS[d] ?? d);
}

const PRINCIPLES = [
  { kw: 'ship', val: 'تحديثات صغيرة · باستمرار · بصدق' },
  { kw: 'owns', val: 'الواجهة · الـAPI · النطاق' },
  { kw: 'values', val: 'الوضوح · الأداء · سهولة الوصول' },
  { kw: 'rejects', val: 'تضخّم النطاق · السحر · الطقوس' },
  { kw: 'tests', val: 'بيانات حقيقية · مستخدمون حقيقيون' },
  { kw: 'writes', val: 'كود واضح > توثيق كثير' },
];

const SERVICES = [
  { title: 'تطوير الواجهات الأمامية', desc: 'React، Next.js، TypeScript، Tailwind.' },
  { title: 'شغل Full-Stack', desc: 'Laravel، PHP، MySQL، Supabase.' },
  { title: 'تنفيذ التصاميم', desc: 'تصاميم pixel-perfect في كود نظيف.' },
  { title: 'هندسة النظام والواجهات', desc: 'أنظمة components واستراتيجية رندرنغ.' },
  { title: 'تشغيل المنتج', desc: 'متطلبات، تحليل، UML، نطاق.' },
  { title: 'SEO والأداء', desc: 'Schemas، Core Web Vitals، ترتيب أعلى.' },
];

const FEATURED = [
  { name: 'React', icon: '/icons/react.svg', note: 'المكتبة الأساسية' },
  { name: 'Next.js', icon: '/icons/next.svg', note: 'App Router، RSC' },
  { name: 'TypeScript', icon: '/icons/typescript.svg', note: 'اللغة الافتراضية' },
  { name: 'Tailwind CSS', icon: '/icons/tailwind.svg', note: 'نظام التصميم' },
];

const SKILL_GROUPS = [
  {
    label: 'الواجهات',
    items: [
      { name: 'HTML', icon: '/icons/html.svg' },
      { name: 'CSS', icon: '/icons/css.svg' },
      { name: 'JavaScript', icon: '/icons/js.svg' },
      { name: 'Vue.js', icon: '/icons/vue.svg' },
      { name: 'React Query', icon: '/icons/react-query.svg' },
      { name: 'Zustand', icon: '/icons/zustand.svg' },
    ],
  },
  {
    label: 'الباك إند',
    items: [
      { name: 'PHP', icon: '/icons/php.svg' },
      { name: 'Laravel', icon: '/icons/laravel.svg' },
      { name: 'MySQL', icon: '/icons/sql.svg' },
      { name: 'Firebase', icon: '/icons/firebase.svg' },
      { name: 'Supabase', icon: '/icons/supabase.svg' },
    ],
  },
  {
    label: 'العدّة',
    items: [
      { name: 'Git', icon: '/icons/git.svg' },
      { name: 'GitHub', icon: '/icons/github.svg' },
      { name: 'VS Code', icon: '/icons/vscode.svg' },
      { name: 'Postman', icon: '/icons/postman.svg' },
      { name: 'Vercel', icon: '/icons/vercel.svg' },
      { name: 'npm', icon: '/icons/npm.svg' },
      { name: 'Vite', icon: '/icons/vite.svg' },
    ],
  },
];

const CHANNELS = [
  { label: 'البريد الإلكتروني', value: SOCIAL_LINKS.EMAIL, href: `mailto:${SOCIAL_LINKS.EMAIL}`, icon: Mail, ltr: true },
  { label: 'الهاتف', value: AUTHOR.phone, href: `tel:${AUTHOR.phone}`, icon: Phone, ltr: true },
  { label: 'GitHub', value: '/devdhaif', href: SOCIAL_LINKS.GITHUB, icon: Github, ltr: true },
  { label: 'LinkedIn', value: '/in/devdhaif', href: SOCIAL_LINKS.LINKEDIN, icon: Linkedin, ltr: true },
];

const EXPERIENCE: {
  role: string;
  company: string;
  period: string;
  current: boolean;
  description: string;
  skills: string[];
  achievements: string[];
}[] = [
  {
    role: 'مهندس واجهات أمامية',
    company: 'ADX · الرياض',
    period: '11/2024 — الآن',
    current: true,
    description:
      'أبني منصة digital signage كاملة — محاكي حملات، أداة قوائم تشغيل بالسحب والإفلات، ولوحة إدارة متعددة المستأجرين.',
    skills: ['React', 'Next.js', 'TypeScript', 'Zustand', 'React Query', 'Tailwind CSS', 'dnd-kit', 'i18next'],
    achievements: [
      "بنيت محاكي حملات اسمه 'Try ADx' يكتشف نسبة العرض للارتفاع من جهة العميل ويعرض الوسائط فورًا فوق رسوم مخصّصة.",
      'سويت أداة قوائم تشغيل وإنشاء وسائط بالسحب والإفلات، مع تحرير صور داخل المتصفح وصانع قوالب باستخدام dnd-kit.',
      'وفّرت دعم العربي RTL والإنجليزي LTR عبر i18next، مع الالتزام بـ WCAG وHTML الدلالي في كل المنصة.',
      'وصّلت مشغّل اللافتات بستة APIs لمايكرو سيرفسز (محتوى، جدولة، تحليلات، أجهزة، مستخدمون، وسائط) مع مزامنة واسترداد.',
      'بنيت لوحة الإدارة الأساسية مع دعم متعدد المستأجرين ونظام صلاحيات RBAC لأكثر من ٨ أدوار مربوطة بالموقع.',
    ],
  },
  {
    role: 'مطوّر Full-Stack — مستقل',
    company: 'فريلانس',
    period: '01/2018 — الآن',
    current: true,
    description:
      'تطبيقات ويب كاملة في مجالات مختلفة — الواجهة تقود وأمتد للباك إند، منشورة على Vercel و Digital Ocean.',
    skills: ['React', 'Next.js', 'TypeScript', 'Laravel', 'MySQL', 'Supabase', 'Framer Motion', 'GSAP'],
    achievements: [
      'سلّمت أكثر من ٥ تطبيقات ويب كاملة من الفكرة لين النشر.',
      'طلّعت نتائج Lighthouse فوق ٩٠ (مثل Miyar Capital) عبر dynamic imports و code splitting وتحسين الصور.',
      'نزّلت زمن تحميل الصفحات ٣٠–٤٠٪ عبر شغل Core Web Vitals، وارتفع ترتيب البحث.',
      'بنيت RESTful APIs بـ Laravel و MySQL بـ uptime ٩٩٫٥٪.',
      'شحنت موشن وتفاعلات دقيقة بـ CSS animations و Framer Motion و GSAP.',
    ],
  },
  {
    role: 'مطوّر واجهات أمامية',
    company: 'Meraki UI Lab',
    period: '05/2020 — 11/2024',
    current: false,
    description:
      'سويت أنظمة components قابلة لإعادة الاستخدام، سهلة الوصول، بهوية بصرية ثابتة لفرق منتج cross-functional.',
    skills: ['React.js', 'TailwindCSS', 'JavaScript', 'HTML5', 'CSS3', 'WCAG'],
    achievements: [
      'رفعت زيارات الموقع ٢٠٪ خلال ٦ أشهر، بتحسين سرعة التحميل ووضوح المحتوى.',
      'شحنت أكثر من ١٥٠ component قابل لإعادة الاستخدام بهوية موحّدة، ونزل زمن التطوير ٣٥٪.',
      'طبّقت دعم RTL على ١٠٠٪ من المكوّنات مع HTML دلالي و ARIA، وارتفع تفاعل المستخدم العربي ٢٧٪.',
      'سلّمت واجهات بنسبة رضا عملاء ٩٥٪ ضمن فريق cross-functional من ٤ أشخاص.',
    ],
  },
];
