import Link from 'next/link';
import Image from 'next/image';
import {
  loadExperimentData,
  getMonogram,
  toArabicNumerals,
} from '@/lib/experiments-data';
import { SOCIAL_LINKS, AUTHOR } from '@/lib/constants';
import s from '../qamariya.module.css';
import {
  ArchDivider,
  ArchDividerLight,
  BrandMark,
  Qamariya,
  SanaaSkyline,
} from '../svg';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

const PROJECT_TINTS = ['projectCobalt', 'projectRuby', 'projectEmerald', 'projectAmber'] as const;

const ARABIC_MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

export default async function QamariyaArPage() {
  const { projects, certificates, posts, postsCount } = await loadExperimentData();

  return (
    <div className={s.root}>
      <div className={s.plasterTexture} />
      <div className={s.grain} />

      <div className={s.shell}>
        <header className={s.topBar}>
          <div className={s.brand}>
            <BrandMark className={s.brandMark} />
            <span style={{ direction: 'rtl' }}>
              ضيف الله{' '}
              <em style={{ fontStyle: 'normal', color: 'var(--ruby)' }}>·</em>{' '}
              الفروي
            </span>
          </div>
          <nav className={s.nav}>
            <a href="#work" className={s.navLink}>الأعمال</a>
            <a href="#about" className={s.navLink}>عنّي</a>
            <a href="#craft" className={s.navLink}>الحرفة</a>
            <a href="#experience" className={s.navLink}>الخبرات</a>
            <a href="#certificates" className={s.navLink}>الشهادات</a>
            <a href="#words" className={s.navLink}>كتابات</a>
            <a href="#contact" className={s.navLink}>تواصل</a>
          </nav>
          <div className={s.topBarActions}>
            <div className={s.langToggle}>
              <Link href="/experiments/qamariya" className={s.langBtn}>
                EN
              </Link>
              <Link
                href="/experiments/qamariya/ar"
                className={`${s.langBtn} ${s.langBtnActive}`}
              >
                ع
              </Link>
            </div>
            <Link href="/select" className={s.exitLink}>← غيّر الثيم</Link>
          </div>
        </header>

        {/* ==================== HERO ==================== */}
        <section className={s.hero}>
          <div>
            <div
              className={`${s.heroLabel} ${s.animFadeUp}`}
              style={{ animationDelay: '0.05s' }}
            >
              البيضاء · اليمن · ١٩٩٦ —
            </div>
            <h1
              className={`${s.heroName} ${s.animFadeUp}`}
              style={{ animationDelay: '0.15s' }}
            >
              ضيف الله،
              <br />
              <span className={s.heroNameItalic}>مهندس </span>
              برمجيات
              <span className={s.heroNameArabic}>Dhaifallah Alfarawi</span>
            </h1>
            <p
              className={`${s.heroLead} ${s.animFadeUp}`}
              style={{ animationDelay: '0.3s' }}
            >
              <em>كل سطر له شغلة،</em> وكل واجهة تطلع نظيفة وتدوم.
            </p>
            <p
              className={`${s.heroBody} ${s.animFadeUp}`}
              style={{ animationDelay: '0.45s' }}
            >
              عندي أكثر من ٥ سنين خبرة في React و Next.js و TypeScript و
              Laravel. أهتم بدعم العربي و RTL والأداء من أول يوم. ساكن في
              الرياض ومتقبّل لفرص العمل.
            </p>
            <div
              className={`${s.heroCta} ${s.animFadeUp}`}
              style={{ animationDelay: '0.6s' }}
            >
              <a className={s.btn} href="#work">شاهد الأعمال →</a>
              <a className={`${s.btn} ${s.btnGhost}`} href="#contact">
                افتح قناة
              </a>
            </div>

            <div className={s.heroStats}>
              <div className={s.heroStat}>
                <span className={s.heroStatValue}>+٥</span>
                <span className={s.heroStatLabel}>سنين</span>
              </div>
              <div className={s.heroStat}>
                <span className={s.heroStatValue}>
                  {toArabicNumerals(Math.max(projects.length, 12))}+
                </span>
                <span className={s.heroStatLabel}>مشاريع</span>
              </div>
              <div className={s.heroStat}>
                <span className={s.heroStatValue}>
                  {toArabicNumerals(postsCount)}
                </span>
                <span className={s.heroStatLabel}>مقالات</span>
              </div>
              <div className={s.heroStat}>
                <span className={s.heroStatValue}>
                  {toArabicNumerals(certificates.length)}
                </span>
                <span className={s.heroStatLabel}>شهادات</span>
              </div>
            </div>
          </div>

          <div
            className={`${s.qamariyaFrame} ${s.animFadeIn}`}
            style={{ animationDelay: '0.4s' }}
          >
            <Qamariya className={`${s.qamariyaSvg} ${s.animGlow}`} />
            <div className={s.lightBeam} />
            <div className={s.halftoneOverlay} />
          </div>
        </section>

        {/* ==================== PROJECTS ==================== */}
        <ArchDivider />
        <div id="work" className={s.sectionLabel}>أعمال مختارة</div>
        <h2 className={s.sectionTitle}>
          حفنة من الأشياء، <em>صُنعت لتبقى.</em>
        </h2>

        {projects.length === 0 ? (
          <p className={s.emptyNote}>ما فيه مشاريع منشورة لحد الحين.</p>
        ) : (
          <section className={s.projectsGrid}>
            {projects.map((p, i) => {
              const tint = PROJECT_TINTS[i % PROJECT_TINTS.length];
              const year = p.createdAt
                ? toArabicNumerals(new Date(p.createdAt).getFullYear())
                : '';
              return (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className={`${s.project} ${s[tint]}`}
                >
                  {p.mainImage ? (
                    <div className={s.projectImage}>
                      <Image
                        src={p.mainImage}
                        alt={p.name}
                        fill
                        sizes="(max-width: 700px) 90vw, 360px"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div className={s.projectImage}>
                      <span className={s.projectMonogram}>
                        {getMonogram(p.name)}
                      </span>
                    </div>
                  )}
                  <span className={s.projectNumber}>
                    رقم {toArabicNumerals(String(i + 1).padStart(2, '0'))}
                  </span>
                  <h3 className={s.projectTitle}>{p.name}</h3>
                  <div className={s.projectMeta}>
                    {(p.skills ?? []).slice(0, 4).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <p className={s.projectBlurb}>{p.description}</p>
                  <div className={s.projectArrow}>
                    <span style={{ fontFamily: 'var(--qm-mono)', fontSize: 11 }}>
                      {year}
                    </span>
                    <span>زيارة ↗</span>
                  </div>
                </Link>
              );
            })}
          </section>
        )}

        {/* ==================== ABOUT ==================== */}
        <ArchDivider />
        <div id="about" className={s.sectionLabel}>عنّي</div>
        <h2 className={s.sectionTitle}>
          باختصار: <em>من أنا</em>، وش أشتغل، ومبادئي.
        </h2>

        <section className={s.aboutLayout}>
          <div className={s.aboutProse}>
            <p>
              أنا <strong>ضيف الله أحمد الفروي</strong>، مهندس برمجيات من
              اليمن، ساكن في الرياض. شغلي اليومي React و Next.js و TypeScript
              و Tailwind. لمّا أحتاج أبني مشروع كامل أو الباك إند، أستخدم
              <em> Laravel</em>.
            </p>
            <p>
              أهتم بالأداء، قابلية الوصول، ودعم اللغة العربية و RTL من أوّل
              يوم — مو فكرة تتذكّر آخر شي. هذا اللي يخلّي الواجهة تصمد ولا
              تنكسر بعد أول سنة.
            </p>
            <p>
              مأمن بأن الكود الواضح والتوثيق الجيد مهمّين بنفس الدرجة، وأن
              التحديثات الصغيرة المستمرّة أحسن من التحديث الكبير اللي ما
              يخلص.
            </p>
          </div>

          <div className={s.timeline}>
            {TIMELINE_AR.map((t) => (
              <div
                key={t.year}
                className={`${s.timelineItem} ${t.active ? s.active : ''}`}
              >
                <div className={s.timelineYear}>{t.year}</div>
                <div className={s.timelineTitle}>{t.title}</div>
                <div className={s.timelineBlurb}>{t.blurb}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ==================== SKILLS (full-bleed dark) ==================== */}
      <section id="craft" className={s.skillsCanvas}>
        <div className={s.skillsHalftone} />
        <div className={s.shell} style={{ padding: 0 }}>
          <ArchDividerLight />
          <div className={s.sectionLabel}>العدّة</div>
          <h2 className={s.sectionTitle}>
            الأدوات <em>اللي أشتغل فيها</em> كل يوم.
          </h2>

          <div className={s.skillCols}>
            {SKILLS_AR.map((col) => (
              <div key={col.heading} className={s.skillCol}>
                <h3>{col.heading}</h3>
                <ul>
                  {col.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={s.shell}>
        {/* ==================== EXPERIENCE ==================== */}
        <ArchDivider />
        <div id="experience" className={s.sectionLabel}>الخبرات</div>
        <h2 className={s.sectionTitle}>
          وين <em>اشتغلت</em> وش سلّمت.
        </h2>

        <section className={s.experienceList}>
          {EXPERIENCE_AR.map((j) => (
            <article key={j.role + j.period} className={s.expRow}>
              <div className={s.expPeriod}>
                {j.period}
                {j.current && <span className={s.currentChip}>الحين</span>}
              </div>
              <div className={s.expBody}>
                <h3 className={s.expRole}>{j.role}</h3>
                <div className={s.expCompany}>{j.company}</div>
                <p className={s.expBlurb}>{j.blurb}</p>
                <ul className={s.expHighlights}>
                  {j.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
                <div className={s.expChips}>
                  {j.stack.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* ==================== CERTIFICATES ==================== */}
        <ArchDivider />
        <div id="certificates" className={s.sectionLabel}>علامات الثقة</div>
        <h2 className={s.sectionTitle}>
          ختومٌ وشواهد، <em>حُصدت على الطريق.</em>
        </h2>

        {certificates.length === 0 ? (
          <p className={s.emptyNote}>ما فيه شهادات منشورة لحد الحين.</p>
        ) : (
          <section className={s.certGrid}>
            {certificates.map((c) => {
              const year = c.issueDate
                ? toArabicNumerals(new Date(c.issueDate).getFullYear())
                : '';
              return (
                <a
                  key={c.id}
                  href={c.urlLink || '#'}
                  target={c.urlLink ? '_blank' : undefined}
                  rel={c.urlLink ? 'noreferrer' : undefined}
                  className={s.certCard}
                >
                  <div className={s.certSeal} aria-hidden>
                    <svg viewBox="0 0 60 60" fill="none">
                      <circle cx="30" cy="30" r="26" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="30" cy="30" r="20" stroke="currentColor" strokeWidth="0.8" />
                      <path
                        d="M30 14 L33 26 L46 26 L36 33 L40 46 L30 38 L20 46 L24 33 L14 26 L27 26 Z"
                        fill="currentColor"
                        opacity="0.85"
                      />
                    </svg>
                  </div>
                  <div className={s.certIssuer}>{c.source}</div>
                  <div className={s.certName}>{c.title}</div>
                  <div className={s.certYear}>{year}</div>
                </a>
              );
            })}
          </section>
        )}

        {/* ==================== WRITING ==================== */}
        <ArchDivider />
        <div id="words" className={s.sectionLabel}>ملاحظات الميدان</div>
        <h2 className={s.sectionTitle}>
          منشورات، أحيانًا <em>صريحة الرأي.</em>
        </h2>

        {posts.length === 0 ? (
          <p className={s.emptyNote}>ما فيه مقالات منشورة لحد الحين.</p>
        ) : (
          <section className={s.writingList}>
            {posts.map((p) => {
              const d = new Date(p.created_at);
              const date = `${ARABIC_MONTHS[d.getMonth()]} ${toArabicNumerals(d.getFullYear())}`;
              const title = p.title_ar || p.title_en || p.title;
              return (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className={s.writingItem}
                >
                  <span className={s.writingDate}>{date}</span>
                  <span className={s.writingTitle}>{title}</span>
                  <span className={s.writingArrow}>←</span>
                </Link>
              );
            })}
          </section>
        )}

        <div className={s.writingFooter}>
          <Link href="/blog" className={s.btn}>
            شف كل المقالات ←
          </Link>
        </div>

        {/* ==================== CONTACT ==================== */}
        <ArchDivider />
        <section id="contact" className={s.contact}>
          <div className={s.sectionLabel}>التواصل</div>
          <p className={s.contactQuote}>
            متاح للعمل والتعاون. <em>اختر الطريقة اللي تناسبك،</em> برد عليك
            خلال ٢٤ ساعة إن شاء الله.
          </p>
          <div className={s.contactRow}>
            <a className={s.btn} href={`mailto:${SOCIAL_LINKS.EMAIL}`}>
              {SOCIAL_LINKS.EMAIL}
            </a>
            <a className={`${s.btn} ${s.btnGhost}`} href={`tel:${AUTHOR.phone}`}>
              <bdi dir="ltr">{AUTHOR.phone}</bdi>
            </a>
            <a
              className={`${s.btn} ${s.btnGhost}`}
              href={SOCIAL_LINKS.GITHUB}
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <a
              className={`${s.btn} ${s.btnGhost}`}
              href={SOCIAL_LINKS.LINKEDIN}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
            <a
              className={`${s.btn} ${s.btnGhost}`}
              href={SOCIAL_LINKS.TWITTER}
              target="_blank"
              rel="noreferrer"
            >
              X / تويتر ↗
            </a>
          </div>
        </section>
      </div>

      {/* ==================== SKYLINE ==================== */}
      <div className={s.skyline}>
        <SanaaSkyline />
      </div>

      <div className={s.shell}>
        <footer className={s.footer}>
          <span>© ٢٠٢٦ · ضيف الله أحمد الفروي</span>
          <span><em>البيضاء → العالم.</em></span>
        </footer>
      </div>
    </div>
  );
}

/* ===========================================================
   Static AR data
   =========================================================== */

const TIMELINE_AR = [
  { year: '١٩٩٦', title: 'البداية.',                  blurb: 'مولود في اليمن.',                                                 active: false },
  { year: '٢٠٠٨', title: 'أوّل كمبيوتر.',             blurb: 'من هنا بدا شغفي بالحاسوب وكل ما له علاقة به.',                         active: false },
  { year: '٢٠١٨', title: 'بدأت العمل المستقل.',       blurb: 'أوّل عملاء حقيقيين — تطبيقات Full-Stack بـ Laravel و React. لين الحين أشتغل freelance بشكل متوازي.', active: false },
  { year: '٢٠٢٠', title: 'Meraki UI Lab.',            blurb: 'شغل على نظام components قابل لإعادة الاستخدام بهوية موحّدة.',                                active: false },
  { year: '٢٠٢٤', title: 'انتقلت إلى الرياض — ADX.',  blurb: 'مهندس واجهات على منصّة digital-signage كاملة.',                       active: false },
  { year: '٢٠٢٦', title: 'الحاضر.',                   blurb: 'أركّز على الأداء، إمكانية الوصول، وهندسة الواجهات.',                   active: true },
];

const SKILLS_AR = [
  {
    heading: 'الأساسيات',
    items: ['HTML', 'CSS', 'TypeScript', 'إمكانية الوصول · WCAG', 'دعم RTL / LTR'],
  },
  {
    heading: 'الـFrameworks',
    items: ['React 18 / 19', 'Next.js 15 + RSC', 'Tailwind + tokens', 'Vue.js', 'React Query · Zustand', 'Framer Motion · GSAP', 'dnd-kit · i18next'],
  },
  {
    heading: 'الباك إند والبيانات',
    items: ['Laravel / PHP', 'MySQL', 'Supabase', 'Firebase', 'REST · RSC'],
  },
  {
    heading: 'التشغيل',
    items: ['Vercel · Cloudflare', 'Git · GitHub', 'Vite · npm · pnpm', 'استراتيجية الـcache', 'Core Web Vitals', 'NestJS (قيد التعلّم)'],
  },
];

const EXPERIENCE_AR = [
  {
    period: '١١/٢٠٢٤ — لين الحين',
    role: 'مطوّر واجهات أمامية',
    company: 'ADX · الرياض',
    current: true,
    blurb:
      'أبني منصّة digital-signage كاملة من البداية للنهاية — محاكي حملات، أداة قوائم تشغيل بالسحب والإفلات، محرّر صور داخل المتصفح، ولوحة إدارة فيها RBAC.',
    highlights: [
      "بنيت محاكي حملات اسمه 'Try ADx' يكتشف نسبة العرض على الارتفاع من جهة العميل ويعرض الوسايط فورًا فوق رسوم مخصّصة.",
      'سويت أداة قوائم تشغيل وإنشاء وسايط بالسحب والإفلات، مع تحرير صور داخل البراوزر وصانع قوالب باستخدام dnd-kit.',
      'وصّلت مشغّل اللافتات على الويب بستة APIs لمايكرو سيرفسز (محتوى، جدولة، تحليلات، أجهزة، يوزرز، وسايط) مع مزامنة واسترداد.',
      'بنيت لوحة الإدارة الأساسية مع نظام صلاحيات RBAC لأكثر من ٨ أدوار وأذونات مربوطة بالموقع.',
      'وفّرت دعم العربي RTL والإنجليزي LTR عبر i18next، والتزمت بـ WCAG وHTML دلالي في كل المنصة.',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Zustand', 'React Query', 'Tailwind CSS', 'dnd-kit', 'i18next'],
  },
  {
    period: '٠١/٢٠١٨ — لين الحين',
    role: 'مطوّر Full-Stack (مستقل)',
    company: 'فريلانس',
    current: true,
    blurb:
      'تطبيقات ويب كاملة في مجالات مختلفة. front-end يقود وأمتد للباك إند. نُشرت على Vercel و Digital Ocean.',
    highlights: [
      'سلّمت أكثر من ٥ تطبيقات ويب كاملة من الفكرة لين النشر.',
      'طلّعت نتايج Lighthouse فوق ٩٠ (مثلاً Miyar Capital) عن طريق dynamic imports و code splitting وتحسين الصور.',
      'نزّلت زمن تحميل الصفحات ٣٠–٤٠٪ عبر شغل Core Web Vitals، وارتفع ترتيب البحث.',
      'بنيت RESTful APIs بـ Laravel و MySQL بـ uptime ٩٩٫٥٪.',
      'شحنت موشن وتفاعلات دقيقة بـ CSS animations و Framer Motion و GSAP.',
    ],
    stack: ['React', 'Next.js', 'TypeScript', 'Laravel', 'MySQL', 'Supabase', 'Framer Motion', 'GSAP'],
  },
  {
    period: '٠٥/٢٠٢٠ — ١١/٢٠٢٤',
    role: 'مطوّر واجهات أمامية',
    company: 'Meraki UI Lab',
    current: false,
    blurb:
      'سويت أنظمة components قابلة لإعادة الاستخدام، سهلة الوصول، بهوية بصرية ثابتة لفرق منتج cross-functional.',
    highlights: [
      'رفعت زيارات الموقع ٢٠٪ خلال ٦ أشهر، بتحسين سرعة التحميل ووضوح المحتوى.',
      'شحنت أكثر من ١٥٠ component قابل لإعادة الاستخدام بهوية موحّدة، ونزل زمن التطوير ٣٥٪.',
      'طبّقت دعم RTL على ١٠٠٪ من المكوّنات مع HTML دلالي و ARIA، وارتفع تفاعل المستخدم العربي ٢٧٪.',
      'سلّمت واجهات بنسبة رضا عملاء ٩٥٪ ضمن فريق cross-functional من ٤ أشخاص.',
    ],
    stack: ['React.js', 'TailwindCSS', 'JavaScript', 'HTML5', 'CSS3', 'WCAG'],
  },
];
