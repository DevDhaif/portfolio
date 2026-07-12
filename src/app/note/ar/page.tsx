import Link from 'next/link';
import Image from 'next/image';
import { createPublicClient } from '@/utils/supabase/public';
import { Project, Certificate, Post } from '@/types';
import { SOCIAL_LINKS, AUTHOR } from '@/lib/constants';
import { GsapReveals } from '@/components/ui/gsap-reveals';
import s from '../notebook.module.css';
import { RiyadhClockNotebook } from './riyadh-clock';
import { NotebookMotion } from '../notebook-motion';

export const revalidate = 60;

/* ===========================================================
   Server data loaders (cookie-free public client → ISR-cacheable)
   =========================================================== */
async function loadData() {
  const supabase = createPublicClient();

  const [projectsRes, certsRes, postsRes, postsCountRes] = await Promise.all([
    supabase
      .from('projects')
      .select('*, project_images (*)')
      .order('created_at', { ascending: true }),
    supabase
      .from('certificates')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(6),
    supabase
      .from('posts')
      .select('id', { count: 'exact', head: true })
      .eq('published', true),
  ]);

  const projects: Project[] = (projectsRes.data ?? [])
    .map((project: any) => {
      const mainImageUrl = project.main_image
        ? supabase.storage.from('projects-images').getPublicUrl(project.main_image).data.publicUrl
        : '';
      return {
        id: project.id,
        name: project.name,
        description: project.description,
        longDescription: project.long_description,
        mainImage: mainImageUrl,
        skills: project.skills || [],
        githubUrl: project.github_url,
        liveUrl: project.live_url,
        highlights: project.highlights || [],
        createdAt: project.created_at,
        updatedAt: project.updated_at,
        importance: project.importance,
      };
    })
    .sort((a: Project, b: Project) => (a.importance ?? 99) - (b.importance ?? 99))
    .slice(0, 12);

  const certificates: Certificate[] = (certsRes.data ?? []).map((cert: any) => ({
    ...cert,
    sourceIconUrl: cert.source_icon || '',
    certificateImageUrl: cert.image || '',
    urlLink: cert.url_link || '',
  }));

  const posts: Post[] = (postsRes.data ?? []).map((post: any) => {
    let cover = post.cover_image;
    if (cover && !cover.startsWith('http')) {
      cover = supabase.storage.from('blog-content').getPublicUrl(cover).data.publicUrl;
    }
    return { ...post, cover_image: cover };
  });

  return {
    projects,
    certificates,
    posts,
    postsCount: postsCountRes.count ?? 0,
  };
}

/* ===========================================================
   Page
   =========================================================== */
export default async function NotebookArPage() {
  const { projects, certificates, posts, postsCount } = await loadData();

  return (
    <div className={s.root}>
      <div className={s.ruled} />
      <div className={s.paperGrain} />
      <div className={s.stain} />
      <div className={s.binderHoles} />
      <div className={s.marginLine} />
      <GsapReveals y={20} start="top 90%" />
      <NotebookMotion />

      <div className={s.shell}>
        <header className={s.topBar}>
          <div className={s.brand}>
            <span className={s.doodleStar}>★</span>
            <span>دفتر ضيف</span>
            <span className={s.doodleStar}>★</span>
          </div>
          <nav className={s.nav}>
            <a className={`${s.navLink} ${s.navPriority}`} href="#about">عني</a>
            <a className={s.navLink} href="#projects">الشغل</a>
            <a className={`${s.navLink} ${s.navPriority}`} href="#skills">العدّة</a>
            <a className={`${s.navLink} ${s.navPriority}`} href="#experience">الخبرات</a>
            <a className={s.navLink} href="#certs">الشهادات</a>
            <a className={s.navLink} href="#diary">المدونة</a>
            <a className={s.navLink} href="#contact">كلّمني</a>
          </nav>
          <div className={s.langToggle}>
            <Link href="/note" className={s.langBtn}>EN</Link>
            <Link href="/note/ar" className={`${s.langBtn} ${s.langBtnActive}`}>ع</Link>
          </div>
        </header>

        <Hopscotch className={s.hopscotch} />
        <span className={`${s.marginDoodle} ${s.marginDoodle1}`}>← ابدأ من هنا</span>
        <span className={`${s.marginDoodle} ${s.marginDoodle2}`} style={{ color: 'var(--margin-red)' }}>★</span>
        <span className={`${s.marginDoodle} ${s.marginDoodle3}`}>← الصفحة ٤</span>

        {/* ==================== HERO ==================== */}
        <section id="home" className={s.hero}>
          <div className={s.heroBlurb}>
            <div className={`${s.heroKicker} ${s.animFadeUp}`} style={{ animationDelay: '0.05s' }}>
              مرحبًا، أنا —
            </div>
            <h1 className={s.heroName} data-nb-title>
              <span className={s.heroNameUnderline}>ضيف الله الفروي</span>،
              <br />
              مهندس <em style={{ color: 'var(--st-green-deep)' }}>برمجيات</em>.
            </h1>
            <p className={`${s.heroSub} ${s.animFadeUp}`} style={{ animationDelay: '0.3s' }}>
              Software Engineer · أبني واجهات تشتغل وتصمد
            </p>
            <p className={`${s.heroBody} ${s.animFadeUp}`} style={{ animationDelay: '0.45s' }}>
              عندي خبرة أكثر من ٥ سنوات في React و Next.js و Laravel وغيرها. أهتم
              بدعم اللغة العربية والاتجاه RTL في مشاريعي وبجودة الأداء. متواجد في
              الرياض ومتقبّل لفرص العمل.
            </p>
            <div className={`${s.heroCta} ${s.animFadeUp}`} style={{ animationDelay: '0.6s' }}>
              <a className={`${s.btn} ${s.btnYellow}`} href="#projects">شف شغلي ←</a>
              <a className={`${s.btn} ${s.btnBlue}`} href="#contact">راسلني</a>
            </div>
          </div>

          <div className={s.bookCover} data-nb-cover>
            <div className={s.coverDoodles} aria-hidden>
              <div className={`${s.tape} ${s.tapeTopLeft}`} />
              <div className={`${s.tape} ${s.tapeTopRight}`} />
            </div>
            <div className={s.coverSubject}>
              دفتر<br />الشغل
            </div>
            <div className={s.coverLabel}>
              <div className={s.coverLabelTop}>الاسم</div>
              <div className={s.coverLabelName}>ضيف الله</div>
              <div className={s.coverLabelMeta}>سنين الخبرة · ٥+ · الرياض</div>
              <div className={s.coverLabelArabic}>Dhaifallah Alfarawi</div>
            </div>
            <div className={`${s.tape} ${s.tapeBottom}`} />
          </div>
        </section>

        {/* ==================== ABOUT ==================== */}
        <section id="about" className={s.section}>
          <div className={s.sectionHeader} data-reveal>
            <span className={s.sectionNumber}>الفصل ١</span>
            <h2 className={s.sectionTitle}>نبذة عني</h2>
          </div>
          <p className={s.sectionLead}>
            باختصار: من أنا، وين أشتغل، مبادئي، والخدمات اللي أقدّمها.
          </p>

          {/* Stats row — like the live bento */}
          <div className={s.statsRow}>
            <div className={s.statCell}><span className={s.statLabel}>سنين</span><span className={s.statValue}>+٥</span></div>
            <div className={s.statCell}><span className={s.statLabel}>مشاريع</span><span className={s.statValue}>+١٢</span></div>
            <div className={s.statCell}><span className={s.statLabel}>عملاء</span><span className={s.statValue}>+١٠</span></div>
            <div className={s.statCell}><span className={s.statLabel}>مقالات</span><span className={s.statValue}>{toArabicNumerals(String(postsCount))}</span></div>
          </div>

          <div className={s.aboutLayout}>
            <div className={s.aboutProse}>
              <p>
                أنا <strong>ضيف الله أحمد الفروي</strong>، مهندس برمجيات ساكن
                في <mark>الرياض</mark>. شغلي اليومي React و Next.js و TypeScript و
                Tailwind. إذا احتجت أشتغل مشروع كامل لوحدي أو الباك إند، أستخدم
                Laravel.
              </p>
              <p>
                أهتم بالـ<strong>أداء</strong> و<strong>قابلية الاستخدام</strong> ودعم
                <strong> اللغة العربية</strong> من البداية، مو فكرة تتذكّر آخر شي.
                هذا اللي يخلّي الواجهة تصمد ولا تنكسر بعد أول سنة.
              </p>
            </div>

            <div className={s.aboutCards}>
              <div className={`${s.factCardNB}`}>
                <div className={s.factCardLabel}>وين أنا</div>
                <div className={s.factCardValue}>الرياض، السعودية</div>
              </div>
              <div className={`${s.factCardNB}`}>
                <div className={s.factCardLabel}>الساعة عندنا</div>
                <RiyadhClockNotebook />
              </div>
            </div>
          </div>

          {/* Principles + Services */}
          <div className={s.aboutGrid}>
            <div className={s.principlesCard}>
              <div className={s.principlesHeader}>
                <span className={s.dot} /><span className={s.dot} /><span className={s.dot} />
                <span className={s.principlesFile}>~/مبادئ.json</span>
              </div>
              <ul className={s.principlesList}>
                {[
                  { kw: 'أُسلّم',       val: 'تحديثات صغيرة · باستمرار · بوضوح' },
                  { kw: 'مسؤول عن',    val: 'الواجهات · الربط مع الـAPI · نطاق المشروع' },
                  { kw: 'أحب',         val: 'الوضوح · الأداء · قابلية الوصول' },
                  { kw: 'ما أحب',      val: ' المناسبات المزدحمة · العشوائية عمومًا' },
                  { kw: 'أختبر على',    val: 'بيانات حقيقية · مستخدمين حقيقيين' },
                  { kw: 'أُؤمن',       val: 'الكود الواضح والتوثيق الجيد لهما نفس الأهمية' },
                ].map((p) => (
                  <li key={p.kw}>
                    <span className={s.principleKey}>{p.kw}</span>
                    <span className={s.principleSep}>:</span>
                    <span className={s.principleVal}>{p.val}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.servicesCard}>
              <div className={s.servicesHeader}>{'// خدمات'}</div>
              <ul className={s.servicesList}>
                {[
                  { title: 'تطوير front-end',     desc: 'React, Next.js, TypeScript, Tailwind.' },
                  { title: 'شغل Full-Stack',      desc: 'Laravel, PHP, MySQL, Supabase.' },
                  { title: 'تنفيذ التصاميم',       desc: 'تصاميم pixel-perfect في كود نظيف.' },
                  { title: 'هندسة النظام والـUI',  desc: 'أنظمة components واستراتيجية رندرنغ.' },
                  { title: 'تشغيل المنتج',         desc: 'متطلبات، تحليل، UML، سكوب.' },
                  { title: 'SEO و أداء',           desc: 'Schemas، Core Web Vitals، ترتيب أعلى.' },
                ].map((sv) => (
                  <li key={sv.title} className={s.serviceItem}>
                    <h4 className={s.serviceTitle}>{sv.title}</h4>
                    <p className={s.serviceDesc}>{sv.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ==================== PROJECTS ==================== */}
        <section id="projects" className={s.section}>
          <div className={s.sectionHeader} data-reveal>
            <span className={s.sectionNumber}>الفصل ٢</span>
            <h2 className={s.sectionTitle}>ألبوم الشغل</h2>
          </div>
          <p className={s.sectionLead}>
            شغل إنتاج — front-end وتطبيقات Full-Stack. كل مشروع بطاقة في الألبوم،
            اضغط أي وحدة وافتحه.
          </p>

          {projects.length === 0 ? (
            <p className={s.emptyNote}>ما فيه مشاريع منشورة لحد الحين.</p>
          ) : (
            <div className={s.stickerGrid}>
              {projects.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  data-reveal
                  className={s.stickerCard}
                  style={{ ['--card-color' as string]: STICKER_COLORS[i % STICKER_COLORS.length] }}
                >
                  <div className={s.stickerArt}>
                    <span className={s.cardNumber}>رقم {String(i + 1).padStart(3, '٠')}</span>
                    {p.mainImage ? (
                      <Image
                        src={p.mainImage}
                        alt={p.name}
                        fill
                        sizes="(max-width: 800px) 50vw, 280px"
                        className={s.stickerImage}
                      />
                    ) : (
                      <span className={s.stickerMonogram}>{getMonogram(p.name)}</span>
                    )}
                  </div>
                  <div className={s.stickerInfo}>
                    <span className={s.stickerTitle}>{p.name}</span>
                    <div className={s.stickerStats}>
                      {(p.skills ?? []).slice(0, 4).map((t) => <span key={t}>{t}</span>)}
                    </div>
                    <p className={s.stickerBlurb}>{p.description}</p>
                    <div className={s.stickerFoot}>
                      <span>{formatYearArabic(p.createdAt)}</span>
                      <span>افتحه ←</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ==================== SKILLS ==================== */}
        <section id="skills" className={s.section}>
          <div className={s.sectionHeader} data-reveal>
            <span className={s.sectionNumber}>الفصل ٣</span>
            <h2 className={s.sectionTitle}>الأدوات اللي أشتغل فيها</h2>
          </div>
          <p className={s.sectionLead}>
            اللي أستخدمها يوميًا، وبقية العدّة. مُعلّمة (✓) = على ظهر يدي. غير مُعلّمة =
            أنا لسّا في الطريق (وأقول الصدق في الحالتين).
          </p>

          <div className={s.checklist}>
            <div className={s.checkCols}>
              {SKILL_GROUPS_AR.map((col) => (
                <div key={col.heading} className={s.checkCol}>
                  <h3>{col.heading}</h3>
                  <ul>
                    {col.items.map((it) => (
                      <li key={it.name} className={it.done ? s.done : ''}>
                        {it.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== EXPERIENCE ==================== */}
        <section id="experience" className={s.section}>
          <div className={s.sectionHeader} data-reveal>
            <span className={s.sectionNumber}>الفصل ٤</span>
            <h2 className={s.sectionTitle}>وين راحت الساعات</h2>
          </div>
          <p className={s.sectionLead}>
            صفحات سيرة ملصقة — كل ورقة محطّة على الطريق.
          </p>

          <div className={s.resumeStack}>
            {EXPERIENCE_AR.map((j, i) => (
              <article key={j.role + j.period} data-reveal className={s.resumePaper}>
                <div className={s.resumeTape} aria-hidden />
                <div className={s.resumePeriod}>
                  {j.period}
                  {j.current && <span className={s.currentChip}>الحين</span>}
                </div>
                <h3 className={s.resumeRole}>{j.role}</h3>
                <div className={s.resumeCompany}>{j.company}</div>
                <p className={s.resumeBlurb}>{j.description}</p>
                <ul className={s.resumeAchievements}>
                  {j.achievements.map((a, k) => (
                    <li key={k}>
                      <span className={s.resumeBullet}>✓</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
                <div className={s.resumeChips}>
                  {j.skills.map((sk) => <span key={sk} className={s.resumeChip}>{sk}</span>)}
                </div>
                <span className={s.resumeIndex}>رقم {String(i + 1).padStart(2, '٠')}</span>
              </article>
            ))}
          </div>
        </section>

        {/* ==================== CERTIFICATES ==================== */}
        <section id="certs" className={s.section}>
          <div className={s.sectionHeader} data-reveal>
            <span className={s.sectionNumber}>الفصل ٥</span>
            <h2 className={s.sectionTitle}>الشهادات</h2>
          </div>
          <p className={s.sectionLead}>
            شهادات من دورات أونلاين — LinkedIn Learning و freeCodeCamp و PMI وغيرها.
          </p>

          {certificates.length === 0 ? (
            <p className={s.emptyNote}>ما فيه شهادات منشورة لحد الحين.</p>
          ) : (
            <div className={s.starGrid}>
              {certificates.map((c) => (
                <a
                  key={c.id}
                  href={c.urlLink || '#'}
                  target={c.urlLink ? '_blank' : undefined}
                  rel="noreferrer"
                  data-reveal
                  className={s.starCard}
                >
                  <div className={s.starShape} aria-hidden>
                    <svg viewBox="0 0 60 60">
                      <path d="M30 4 L37 22 L56 22 L41 33 L47 52 L30 41 L13 52 L19 33 L4 22 L23 22 Z"
                        fill="currentColor" stroke="var(--ink-black)" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className={s.starIssuer}>{c.source}</div>
                  <div className={s.starName}>{c.title}</div>
                  <div className={s.starYear}>
                    {c.issueDate
                      ? toArabicNumerals(new Date(c.issueDate).getFullYear().toString())
                      : ''}
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* ==================== DIARY / BLOG ==================== */}
        <section id="diary" className={s.section}>
          <div className={s.sectionHeader} data-reveal>
            <span className={s.sectionNumber}>الفصل ٦</span>
            <h2 className={s.sectionTitle}>المنشورات</h2>
          </div>
          <p className={s.sectionLead}>
            مقالات وملاحظات من المدوّنة. آخر اللي نُشر.
          </p>

          {posts.length === 0 ? (
            <p className={s.emptyNote}>ما فيه مقالات منشورة لحد الحين.</p>
          ) : (
            <div className={s.diaryList}>
              {posts.map((p) => {
                const d = new Date(p.created_at);
                const day = toArabicNumerals(d.getDate().toString().padStart(2, '0'));
                const month = `${ARABIC_MONTHS[d.getMonth()]} ${toArabicNumerals(String(d.getFullYear()).slice(2))}`;
                const title = p.title_ar || p.title_en || p.title;
                return (
                  <Link
                    key={p.id}
                    href={`/blog/${p.slug}`}
                    data-reveal
                    className={s.diaryEntry}
                    data-day={day}
                    data-month={month}
                  >
                    <span className={s.diaryTitle}>{title}</span>
                    <span className={s.diaryArrow}>←</span>
                  </Link>
                );
              })}
            </div>
          )}

          <div className={s.diaryFooter}>
            <Link href="/blog" className={`${s.btn} ${s.btnYellow}`}>شوف كل المقالات ←</Link>
          </div>
        </section>

        {/* ==================== CONTACT ==================== */}
        <section id="contact" className={s.section}>
          <div className={s.contactWrap}>
            <div className={s.pouch}>
              <div className={s.pouchPattern} />
              <h2 className={s.pouchTitle}>دق الباب.</h2>
              <p className={s.pouchLead}>
                متاح للعمل والتعاون، برد عليك خلال ٢٤ ساعة إن شاء الله. اختر طريقة
                التواصل اللي تناسبك.
              </p>
              <div className={s.pouchItems}>
                <a className={s.candy} href={`mailto:${SOCIAL_LINKS.EMAIL}`} style={{ ['--candy-color' as string]: 'var(--st-yellow)' }}>
                  ✉ {SOCIAL_LINKS.EMAIL}
                </a>
                <a className={s.candy} href={`tel:${AUTHOR.phone}`} style={{ ['--candy-color' as string]: 'var(--st-orange)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span>☎</span>
                    <bdi dir="ltr" style={{ fontFamily: 'var(--nb-body)' }}>{AUTHOR.phone}</bdi>
                  </span>
                </a>
                <a className={s.candy} href={SOCIAL_LINKS.GITHUB} target="_blank" rel="noreferrer" style={{ ['--candy-color' as string]: 'var(--st-cyan)' }}>
                  ◆ GitHub
                </a>
                <a className={s.candy} href={SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noreferrer" style={{ ['--candy-color' as string]: 'var(--st-teal)', color: 'white' }}>
                  ▲ LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className={s.footer}>
          <span>© ٢٠٢٦ · مكتوب بقلم رصاص · ضيف الله أحمد الفروي</span>
          <span className={s.grade}>قُرئ · ممتاز</span>
        </footer>
      </div>
    </div>
  );
}

/* ===========================================================
   Static AR data
   =========================================================== */

const STICKER_COLORS = ['#1d8f5c', '#ff7a2d', '#0e7c86', '#2fc163', '#ffd23a', '#36c5e8'];

const ARABIC_MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

const SKILL_GROUPS_AR = [
  {
    heading: 'النجوم',
    items: [
      { name: 'React (Next.js + RSC)', done: true },
      { name: 'TypeScript', done: true },
      { name: 'Tailwind CSS', done: true },
      { name: 'accessibility · WCAG', done: true },
      { name: 'دعم RTL / LTR', done: true },
    ],
  },
  {
    heading: 'الـfront-end',
    items: [
      { name: 'HTML, CSS, JavaScript', done: true },
      { name: 'Vue.js', done: true },
      { name: 'React Query', done: true },
      { name: 'Zustand', done: true },
      { name: 'Framer Motion · GSAP', done: true },
      { name: 'dnd-kit, i18next', done: true },
    ],
  },
  {
    heading: 'الباك إند',
    items: [
      { name: 'PHP / Laravel', done: true },
      { name: 'MySQL', done: true },
      { name: 'Supabase', done: true },
      { name: 'Firebase', done: true },
      { name: 'Edge / Serverless', done: true },
    ],
  },
  {
    heading: 'العدّة',
    items: [
      { name: 'Git, GitHub', done: true },
      { name: 'VS Code, Postman', done: true },
      { name: 'Vercel, Vite', done: true },
      { name: 'npm, pnpm', done: true },
      { name: 'NestJS (قيد التعلّم)', done: false },
    ],
  },
];

const EXPERIENCE_AR: {
  role: string;
  company: string;
  period: string;
  current: boolean;
  description: string;
  skills: string[];
  achievements: string[];
}[] = [
  {
    role: 'مطوّر front-end',
    company: 'ADX · الرياض',
    period: '١١/٢٠٢٤ — لين الحين',
    current: true,
    description:
      'أشتغل على منصة digital signage كاملة — محاكي حملات، أداة قوائم تشغيل بالسحب والإفلات، ولوحة إدارة شاملة.',
    skills: ['React', 'Next.js', 'TypeScript', 'Zustand', 'React Query', 'Tailwind CSS', 'dnd-kit', 'i18next'],
    achievements: [
      "بنيت محاكي حملات اسمه 'Try ADx' يكتشف نسبة العرض على الارتفاع من جهة العميل ويعرض الوسايط فورًا فوق رسوم مخصّصة.",
      'سويت أداة قوائم تشغيل وإنشاء وسايط بالسحب والإفلات، مع تحرير صور داخل البراوزر وصانع قوالب باستخدام dnd-kit.',
      'وفّرت دعم العربي RTL والإنجليزي LTR عبر i18next، والتزمت بـ WCAG وHTML دلالي في كل المنصة.',
      'وصّلت مشغّل اللافتات على الويب بستة APIs لمايكرو سيرفسز (محتوى، جدولة، تحليلات، أجهزة، يوزرز، وسايط) مع مزامنة واسترداد.',
      'بنيت لوحة الإدارة الأساسية مع نظام صلاحيات RBAC لأكثر من ٨ أدوار وأذونات مربوطة بالموقع.',
    ],
  },
  {
    role: 'مطوّر Full-Stack — مستقل',
    company: 'فريلانس',
    period: '٠١/٢٠١٨ — لين الحين',
    current: true,
    description:
      'تطبيقات ويب كاملة في مجالات مختلفة — front-end يقود وأمتد للباك إند، نُشرت على Vercel و Digital Ocean.',
    skills: ['React', 'Next.js', 'TypeScript', 'Laravel', 'MySQL', 'Supabase', 'Framer Motion', 'GSAP'],
    achievements: [
      'سلّمت أكثر من ٥ تطبيقات ويب كاملة من الفكرة لين النشر.',
      'طلّعت نتايج Lighthouse فوق ٩٠ (مثلاً Miyar Capital) عن طريق dynamic imports و code splitting وتحسين الصور وتحليل DevTools.',
      'نزّلت زمن تحميل الصفحات ٣٠–٤٠٪ عبر شغل Core Web Vitals، وارتفع ترتيب البحث.',
      'بنيت RESTful APIs بـ Laravel و MySQL بـ uptime ٩٩٫٥٪.',
      'شحنت موشن وتفاعلات دقيقة بـ CSS animations و Framer Motion و GSAP.',
    ],
  },
  {
    role: 'مطوّر front-end',
    company: 'Meraki UI Lab',
    period: '٠٥/٢٠٢٠ — ١١/٢٠٢٤',
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

/* ===========================================================
   Helpers
   =========================================================== */

function toArabicNumerals(input: string): string {
  const map: Record<string, string> = { '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤', '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩' };
  return input.replace(/[0-9]/g, (d) => map[d] ?? d);
}

function formatYearArabic(iso: string): string {
  if (!iso) return '';
  const y = new Date(iso).getFullYear();
  return toArabicNumerals(y.toString());
}

function getMonogram(name: string): string {
  if (!name) return '·';
  const parts = name.split(/[\s\-_]/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

/* ===========================================================
   Hopscotch SVG (margin doodle)
   =========================================================== */
function Hopscotch({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <g stroke="#4f4537" strokeWidth="1.5" fill="none" strokeLinejoin="round">
        <rect x="20" y="208" width="22" height="26" />
        <text x="31" y="226" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">١</text>
        <rect x="20" y="178" width="22" height="26" />
        <text x="31" y="196" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">٢</text>
        <rect x="20" y="148" width="22" height="26" />
        <text x="31" y="166" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">٣</text>
        <rect x="6" y="118" width="22" height="26" />
        <rect x="34" y="118" width="22" height="26" />
        <text x="17" y="136" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">٤</text>
        <text x="45" y="136" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">٥</text>
        <rect x="20" y="88" width="22" height="26" />
        <text x="31" y="106" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">٦</text>
        <rect x="6" y="58" width="22" height="26" />
        <rect x="34" y="58" width="22" height="26" />
        <text x="17" y="76" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">٧</text>
        <text x="45" y="76" fontFamily="cursive" fontSize="14" fill="#4f4537" textAnchor="middle">٨</text>
        <path d="M14 28 Q31 14 48 28 L48 54 L14 54 Z" />
        <text x="31" y="46" fontFamily="cursive" fontSize="12" fill="#4f4537" textAnchor="middle">سما</text>
      </g>
    </svg>
  );
}
