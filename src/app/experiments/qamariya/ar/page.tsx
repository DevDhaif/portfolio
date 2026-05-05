import Link from 'next/link';
import { Fragment } from 'react';
import s from '../qamariya.module.css';

type Segment = string | { em: string };

export default function QamariyaArPage() {
  return (
    <div className={s.root}>
      <div className={s.plasterTexture} />
      <div className={s.grain} />

      <div className={s.shell}>
        <header className={s.topBar}>
          <div className={s.brand}>
            <BrandMark className={s.brandMark} />
            <span style={{ direction: 'rtl' }}>
              ضيف الله <em style={{ fontStyle: 'normal', color: 'var(--ruby)' }}>·</em> الفروي
            </span>
          </div>
          <nav className={s.nav}>
            <a href="#work" className={s.navLink}>الأعمال</a>
            <a href="#about" className={s.navLink}>عني</a>
            <a href="#craft" className={s.navLink}>الحرفة</a>
            <a href="#experience" className={s.navLink}>الخبرات</a>
            <a href="#certificates" className={s.navLink}>الشهادات</a>
            <a href="#words" className={s.navLink}>كتابات</a>
            <a href="#contact" className={s.navLink}>تواصل</a>
          </nav>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div className={s.langToggle}>
              <Link href="/experiments/qamariya" className={s.langBtn}>EN</Link>
              <Link href="/experiments/qamariya/ar" className={`${s.langBtn} ${s.langBtnActive}`}>ع</Link>
            </div>
            <Link href="/" className={s.exitLink}>← خروج</Link>
          </div>
        </header>

        {/* ==================== HERO ==================== */}
        <section className={s.hero}>
          <div>
            <div className={`${s.heroLabel} ${s.animFadeUp}`} style={{ animationDelay: '0.05s' }}>
              صنعاء · اليمن · ١٩٩٦ —
            </div>
            <h1 className={`${s.heroName} ${s.animFadeUp}`} style={{ animationDelay: '0.15s' }}>
              ضيف الله،
              <br />
              <span className={s.heroNameItalic}>أبني </span>
              أدواتٍ&nbsp;هادئة
              <span className={s.heroNameArabic}>Dhaifallah Alfarawi</span>
            </h1>
            <p className={`${s.heroLead} ${s.animFadeUp}`} style={{ animationDelay: '0.3s' }}>
              مهندس واجهات أمامية يعامل الواجهات كزجاجٍ ملوّن — <em>كل لوحٍ متعمّد،
              وكل خطٍ يحمل ثقلًا.</em>
            </p>
            <p className={`${s.heroBody} ${s.animFadeUp}`} style={{ animationDelay: '0.45s' }}>
              أشحن React و Next.js و TypeScript للإنتاج نهارًا، وأهوس بحوافّ الحرفة
              ليلًا. البورتفوليو الذي تقرأه واحد من ثلاث تجارب — الأخريان تلفزيون
              صاخب ودفتر مدرسي. هذه فناءٌ هادئ.
            </p>
            <div className={`${s.heroCta} ${s.animFadeUp}`} style={{ animationDelay: '0.6s' }}>
              <a className={s.btn} href="#work">شاهد الأعمال →</a>
              <a className={`${s.btn} ${s.btnGhost}`} href="#contact">افتح قناة</a>
            </div>
          </div>

          <div className={`${s.qamariyaFrame} ${s.animFadeIn}`} style={{ animationDelay: '0.4s' }}>
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

        <section className={s.projectsGrid}>
          {PROJECTS.map((p, i) => (
            <a key={p.title} href="#" className={`${s.project} ${s[p.tint]}`}>
              <span className={s.projectNumber}>رقم {String(i + 1).padStart(2, '٠')}</span>
              <h3 className={s.projectTitle}>{p.title}</h3>
              <div className={s.projectMeta}>
                {p.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
              <p className={s.projectBlurb}>{p.blurb}</p>
              <div className={s.projectArrow}>
                <span style={{ fontFamily: 'var(--qm-mono)', fontSize: 11 }}>{p.year}</span>
                <span>زيارة ↗</span>
              </div>
            </a>
          ))}
        </section>

        {/* ==================== ABOUT ==================== */}
        <ArchDivider />
        <div id="about" className={s.sectionLabel}>القصة</div>
        <h2 className={s.sectionTitle}>
          مولود <em>عام تسعةٍ وتسعين</em>، رُبّيتُ على ضوءٍ وتشويش.
        </h2>

        <section className={s.aboutLayout}>
          <div className={s.aboutProse}>
            <p>
              كبرتُ بين القمريات وشاشات الـCRT. كانت أصائلي ملك سبيس تون — روميو
              فوق الجبل، سبستيان وبيل في جبال الألب، الكابتن ماجد يرسم أقواسًا
              مستحيلة في السماء. وصبيحاتي ملك فناءٍ، وطيارة ورق، وسبع حجار في
              التراب.
            </p>
            <p>
              في مكانٍ ما بين تلكَ القناتَين — الأنمي المستورد والسماء المحلية
              جدًا — تشكّلت طريقةٌ في الرؤية: <em>النمط معنى، والمعنى حِرفة.</em>
              أكتب الكود مثلما يقطع المُقصّاص قمرية: ألوانٌ معدودة، خطوطٌ مكرّرة،
              وضوءٌ خلفها يعمل أكثرها.
            </p>
            <p>
              اليوم يبدو هذا React و Next.js و TypeScript، ورأيًا هادئًا لكنه عنيد
              في كيف ينبغي أن تكون لُحوم النظام.
            </p>
          </div>

          <div className={s.timeline}>
            {TIMELINE.map((t) => (
              <div key={t.year} className={`${s.timelineItem} ${t.active ? s.active : ''}`}>
                <div className={s.timelineYear}>{t.year}</div>
                <div className={s.timelineTitle}>{t.title}</div>
                <div className={s.timelineBlurb}>{t.blurb}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ==================== SKILLS ==================== */}
      <section id="craft" className={s.skillsCanvas}>
        <div className={s.skillsHalftone} />
        <div className={s.shell} style={{ padding: 0 }}>
          <ArchDividerLight />
          <div className={s.sectionLabel}>الأدوات</div>
          <h2 className={s.sectionTitle}>
            ما أمتدُّ إليه <em>بلا تفكير.</em>
          </h2>

          <div className={s.skillCols}>
            {SKILLS.map((col) => (
              <div key={col.heading} className={s.skillCol}>
                <h3>{col.heading}</h3>
                <ul>
                  {col.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={s.shell}>
        {/* ==================== EXPERIENCE ==================== */}
        <ArchDivider />
        <div id="experience" className={s.sectionLabel}>الإعادات</div>
        <h2 className={s.sectionTitle}>
          من أين <em>بثثت.</em>
        </h2>

        <section className={s.experienceList}>
          {EXPERIENCE.map((j) => (
            <article key={j.role + j.period} className={s.expRow}>
              <div className={s.expPeriod}>{j.period}</div>
              <div className={s.expBody}>
                <h3 className={s.expRole}>{j.role}</h3>
                <div className={s.expCompany}>{j.company}</div>
                <p className={s.expBlurb}>{j.blurb}</p>
              </div>
            </article>
          ))}
        </section>

        {/* ==================== CERTIFICATES ==================== */}
        <ArchDivider />
        <div id="certificates" className={s.sectionLabel}>أختام الثقة</div>
        <h2 className={s.sectionTitle}>
          أختام وشهادات، <em>مكتسبة على الطريق.</em>
        </h2>

        <section className={s.certGrid}>
          {CERTIFICATES.map((c) => (
            <div key={c.name} className={s.certCard}>
              <div className={s.certSeal} aria-hidden>
                <svg viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="26" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="30" cy="30" r="20" stroke="currentColor" strokeWidth="0.8" />
                  <path d="M30 14 L33 26 L46 26 L36 33 L40 46 L30 38 L20 46 L24 33 L14 26 L27 26 Z"
                    fill="currentColor" opacity="0.85" />
                </svg>
              </div>
              <div className={s.certIssuer}>{c.issuer}</div>
              <div className={s.certName}>{c.name}</div>
              <div className={s.certYear}>{c.year}</div>
            </div>
          ))}
        </section>

        {/* ==================== WRITING ==================== */}
        <ArchDivider />
        <div id="words" className={s.sectionLabel}>ملاحظات الميدان</div>
        <h2 className={s.sectionTitle}>
          مقالات، أحيانًا <em>برأيٍ مغرور.</em>
        </h2>

        <section className={s.writingList}>
          {WRITING.map((w, idx) => (
            <a key={idx} href="#" className={s.writingItem}>
              <span className={s.writingDate}>{w.date}</span>
              <span className={s.writingTitle}>
                {w.title.map((seg, i) =>
                  typeof seg === 'string'
                    ? <Fragment key={i}>{seg}</Fragment>
                    : <em key={i}>{seg.em}</em>
                )}
              </span>
              <span className={s.writingArrow}>←</span>
            </a>
          ))}
        </section>

        {/* ==================== CONTACT ==================== */}
        <ArchDivider />
        <section id="contact" className={s.contact}>
          <div className={s.sectionLabel}>المدخل</div>
          <p className={s.contactQuote}>
            إن لمسك شيءٌ هنا — أو أردتَ أن نتجادل في الـCSS — <em>أرسل خطًا.</em>
          </p>
          <div className={s.contactRow}>
            <a className={s.btn} href="mailto:devdhaif@gmail.com">devdhaif@gmail.com</a>
            <a className={`${s.btn} ${s.btnGhost}`} href="https://github.com/DevDhaif">GitHub ↗</a>
            <a className={`${s.btn} ${s.btnGhost}`} href="https://linkedin.com/in/devdhaif">LinkedIn ↗</a>
          </div>
        </section>
      </div>

      <div className={s.skyline}>
        <SanaaSkyline />
      </div>

      <div className={s.shell}>
        <footer className={s.footer}>
          <span>© ٢٠٢٦ · ضيف الله الفروي</span>
          <span><em>من صنعاء إلى العالم.</em></span>
        </footer>
      </div>
    </div>
  );
}

/* ===========================================================
   DATA (AR)
   =========================================================== */

const PROJECTS = [
  { title: 'موقف — خرائط مدنية للنقل', blurb: 'منصة Next.js تخرّط مواقف الحافلات غير الرسمية في صنعاء؛ بياناتٌ يقودها الركاب، مصممة للشبكات البطيئة.', tags: ['Next.js', 'Supabase', 'Mapbox'], year: '٢٠٢٥', tint: 'projectCobalt' as const },
  { title: 'حلقة — حلقات للجادّين', blurb: 'غرف نقاش حية لحلقات الدرس العربية؛ حالة جلسة شاملة وحضور وتذكّر.', tags: ['React', 'Liveblocks', 'Edge'], year: '٢٠٢٥', tint: 'projectRuby' as const },
  { title: 'قِشر — لوحة تعاونية للقهوة', blurb: 'واجهة عمليات داخلية لتعاونية قهوة يمنية؛ مخزون، قطعان، تذوّق، وتسليم للمصدّرين.', tags: ['Laravel', 'TS', 'shadcn'], year: '٢٠٢٤', tint: 'projectEmerald' as const },
  { title: 'سرايا — أنماط لأوقات الصلاة', blurb: 'أداة صغيرة ترسم ساعات صلاة هندسية لأي خط عرض. WebGL، توليدية.', tags: ['R3F', 'Three.js'], year: '٢٠٢٤', tint: 'projectAmber' as const },
] as const;

const TIMELINE = [
  { year: '١٩٩٦', title: 'مولود في اليمن.', blurb: 'بيتٌ بقمرية في كل غرفة.', active: false },
  { year: '٢٠٠٨', title: 'أول HTML.', blurb: 'حفظتُ مصدر قالب منتدى؛ بقية الحكاية معروفة.', active: false },
  { year: '٢٠١٨', title: 'شحنتُ أول تطبيق React.', blurb: 'ريبوهان لعميل، بلا فهم لمعنى الحالة، تعلمتُ على أي حال.', active: false },
  { year: '٢٠٢٢', title: 'تفرّغت للواجهات الأمامية.', blurb: 'React و Next.js و TypeScript — وفُتح الباب.', active: false },
  { year: '٢٠٢٦', title: 'مهندس معماري قيد التدريب.', blurb: 'أدرس اللحم. أحاول ألا أكون مُسايرًا.', active: true },
];

const SKILLS = [
  { heading: 'الأساسات',  items: ['HTML بشكلٍ دلالي', 'CSS بما فيه الصعب', 'TypeScript يوميًا', 'إمكانية وصولٍ افتراضية'] },
  { heading: 'الأطر',     items: ['React 18 / 19', 'Next.js 15', 'Tailwind + توكنز', 'Framer Motion'] },
  { heading: 'الخلفية',   items: ['Node, Express', 'Laravel, PHP', 'Postgres, Supabase', 'tRPC, REST, RSC'] },
  { heading: 'التشغيل',   items: ['Vercel, Cloudflare', 'Edge & serverless', 'استراتيجية التخزين', 'الرصد'] },
];

const EXPERIENCE = [
  { period: '٢٠٢٤ — الآن',  role: 'مهندس واجهات أمامية أول',   company: 'مستقل · الرياض',         blurb: 'React و Next.js و TypeScript للإنتاج لعملاء SaaS في الشرق الأوسط. هندسة معمارية وأداء وتفاصيل حاسمة.' },
  { period: '٢٠٢٢ — ٢٠٢٤', role: 'مهندس واجهات أمامية',        company: 'فيرلو تك · عن بُعد',      blurb: 'بنيتُ واجهة منصّة تحليلات متعددة المستأجرين. ملكتُ نظام التصميم ومكتبة الحركة، وقدتُ الترحيل من CRA إلى Next.' },
  { period: '٢٠٢٠ — ٢٠٢٢', role: 'مطور Full-Stack',            company: 'وكالة محلية · صنعاء',     blurb: 'Laravel + Vue/React لعملاء كثر. تعلّمتُ انضباط الشحن في ظل القيود الحقيقية.' },
  { period: '٢٠١٨ — ٢٠٢٠', role: 'مطور ويب مبتدئ',             company: 'عمل حر',                  blurb: 'بدأت بـ WordPress، ثم jQuery، ثم React. الترتيب كان صحيحًا.' },
];

const CERTIFICATES = [
  { issuer: 'Meta',             name: 'مهندس واجهات محترف',        year: '٢٠٢٤' },
  { issuer: 'Vercel',           name: 'إتقان Next.js App Router',  year: '٢٠٢٤' },
  { issuer: 'Frontend Masters', name: 'أنماط جاهزة للإنتاج',       year: '٢٠٢٣' },
  { issuer: 'AWS',              name: 'ممارس السحابة',              year: '٢٠٢٣' },
  { issuer: 'Google',           name: 'تخصص تجربة المستخدم',        year: '٢٠٢٢' },
  { issuer: 'edX · MIT',        name: 'مدخل التفكير الحاسوبي',     year: '٢٠٢٢' },
];

const WRITING: { date: string; title: Segment[] }[] = [
  { date: '٢٠٢٦ · ٠٤', title: ['دليل مهندس متقدّم لـ', { em: 'قول لا' }, '.'] },
  { date: '٢٠٢٦ · ٠٣', title: ['لماذا توقفت عن كتابة ', { em: 'useEffect' }, ' أولًا.'] },
  { date: '٢٠٢٦ · ٠٢', title: ['تيلويند والتوكنز و', { em: 'ضريبة الانضباط' }, '.'] },
  { date: '٢٠٢٦ · ٠١', title: ['مكونات الخادم ', { em: 'ليست الهدف' }, '.'] },
  { date: '٢٠٢٥ · ١٢', title: ['التصميم حول ', { em: 'زمن الشبكة' }, '.'] },
];

/* ===========================================================
   SVGs (reused from EN)
   =========================================================== */
function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none">
      <path d="M20 4 L34 18 L34 36 L6 36 L6 18 Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="20" cy="20" r="2" fill="var(--ruby)" />
      <path d="M20 12 L20 20 M20 20 L26 22 M20 20 L14 22 M20 20 L24 28 M20 20 L16 28"
        stroke="currentColor" strokeWidth="1" />
      <path d="M6 36 L34 36" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function Qamariya({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="نافذة قمرية بزجاج ملوّن">
      <defs>
        <radialGradient id="cobaltGlass" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#3a6fd0" /><stop offset="100%" stopColor="#0e2a66" />
        </radialGradient>
        <radialGradient id="rubyGlass" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#e0454f" /><stop offset="100%" stopColor="#7d1219" />
        </radialGradient>
        <radialGradient id="emeraldGlass" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#3fb27d" /><stop offset="100%" stopColor="#0e5436" />
        </radialGradient>
        <radialGradient id="amberGlass" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#f5c54d" /><stop offset="100%" stopColor="#a76f12" />
        </radialGradient>
        <radialGradient id="ivoryGlass" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fff7e1" /><stop offset="100%" stopColor="#e6d4a8" />
        </radialGradient>
        <linearGradient id="plasterFrame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3ead9" /><stop offset="100%" stopColor="#c9b89a" />
        </linearGradient>
      </defs>
      <path d="M30 400 L30 200 Q30 30 150 30 Q270 30 270 200 L270 400 Z" fill="url(#plasterFrame)" stroke="#2a1f10" strokeWidth="3" />
      <path d="M50 380 L50 200 Q50 50 150 50 Q250 50 250 200 L250 380 Z" fill="#2a1f10" />
      <g transform="translate(150 220)">
        <circle r="22" fill="url(#amberGlass)" stroke="#2a1f10" strokeWidth="2" />
        <circle r="8" fill="url(#ivoryGlass)" stroke="#2a1f10" strokeWidth="1.2" />
        {petalPaths.map((p, i) => (
          <path key={i} d={p.d} fill={`url(#${p.fill})`} stroke="#2a1f10" strokeWidth="2" />
        ))}
        {diamondPositions.map((d, i) => (
          <g key={i} transform={`rotate(${d.r}) translate(0 -160)`}>
            <path d="M0 -8 L8 0 L0 8 L-8 0 Z"
              fill={d.fill === 'cobalt' ? 'url(#cobaltGlass)'
                : d.fill === 'ruby' ? 'url(#rubyGlass)'
                : d.fill === 'emerald' ? 'url(#emeraldGlass)'
                : 'url(#amberGlass)'}
              stroke="#2a1f10" strokeWidth="1.5" />
          </g>
        ))}
      </g>
      <g>
        <line x1="50" y1="225" x2="250" y2="225" stroke="#2a1f10" strokeWidth="3" />
        {gridCells.map((c, i) => (
          <g key={i}>
            <rect x={c.x} y={c.y} width="44" height="44" fill={`url(#${c.fill})`} stroke="#2a1f10" strokeWidth="1.5" />
            <circle cx={c.x + 22} cy={c.y + 22} r="3" fill="#2a1f10" opacity="0.4" />
          </g>
        ))}
        <rect x="50" y="370" width="200" height="10" fill="url(#plasterFrame)" stroke="#2a1f10" strokeWidth="2" />
      </g>
    </svg>
  );
}

const petalPaths = (() => {
  const petals = 12, innerR = 22, outerR = 110;
  const colors = ['cobaltGlass', 'rubyGlass', 'emeraldGlass', 'amberGlass'];
  const out: { d: string; fill: string }[] = [];
  for (let i = 0; i < petals; i++) {
    const a1 = (i / petals) * Math.PI * 2 - Math.PI / 2;
    const a2 = ((i + 1) / petals) * Math.PI * 2 - Math.PI / 2;
    const x1 = Math.cos(a1) * innerR, y1 = Math.sin(a1) * innerR;
    const x2 = Math.cos(a1) * outerR, y2 = Math.sin(a1) * outerR;
    const x3 = Math.cos(a2) * outerR, y3 = Math.sin(a2) * outerR;
    const x4 = Math.cos(a2) * innerR, y4 = Math.sin(a2) * innerR;
    if (y2 > 50 && y3 > 50) continue;
    out.push({
      d: `M${x1.toFixed(2)} ${y1.toFixed(2)} L${x2.toFixed(2)} ${y2.toFixed(2)} A${outerR} ${outerR} 0 0 1 ${x3.toFixed(2)} ${y3.toFixed(2)} L${x4.toFixed(2)} ${y4.toFixed(2)} A${innerR} ${innerR} 0 0 0 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`,
      fill: colors[i % colors.length],
    });
  }
  return out;
})();

const diamondPositions = (() => {
  const out: { r: number; fill: string }[] = [];
  const colors = ['cobalt', 'ruby', 'emerald', 'amber'];
  for (let i = 0; i < 9; i++) {
    out.push({ r: -90 + (i / 8) * 180, fill: colors[i % colors.length] });
  }
  return out;
})();

const gridCells = (() => {
  const cells: { x: number; y: number; fill: string }[] = [];
  const colors = ['cobaltGlass', 'rubyGlass', 'emeraldGlass', 'amberGlass', 'ivoryGlass'];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const idx = (row * 4 + col + row) % colors.length;
      cells.push({ x: 60 + col * 46, y: 235 + row * 46, fill: colors[idx] });
    }
  }
  return cells;
})();

function ArchDivider() {
  return (
    <div className={s.archDivider} aria-hidden>
      <svg viewBox="0 0 200 80" fill="none">
        <path d="M2 78 L2 40 Q2 4 100 4 Q198 4 198 40 L198 78" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <path d="M22 78 L22 42 Q22 22 100 22 Q178 22 178 42 L178 78" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
        <circle cx="100" cy="40" r="3" fill="currentColor" />
        <circle cx="100" cy="40" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
        <line x1="0" y1="78" x2="200" y2="78" stroke="currentColor" strokeWidth="1" />
        <line x1="40" y1="60" x2="60" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="140" y1="60" x2="160" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  );
}

function ArchDividerLight() {
  return (
    <div className={s.archDivider} style={{ color: 'var(--amber)' }} aria-hidden>
      <svg viewBox="0 0 200 80" fill="none">
        <path d="M2 78 L2 40 Q2 4 100 4 Q198 4 198 40 L198 78" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="100" cy="40" r="3" fill="currentColor" />
        <circle cx="100" cy="40" r="10" stroke="currentColor" strokeWidth="1" fill="none" />
        <line x1="0" y1="78" x2="200" y2="78" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}

function SanaaSkyline() {
  return (
    <svg viewBox="0 0 1600 220" preserveAspectRatio="xMidYEnd slice" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="160" width="1600" height="60" fill="#1a140d" opacity="0.22" />
      {towerHouses.map((t, i) => <TowerHouse key={i} {...t} />)}
      <rect x="0" y="218" width="1600" height="2" fill="#1a140d" />
    </svg>
  );
}

function TowerHouse({ x, w, h, stories }: { x: number; w: number; h: number; stories: number }) {
  const baseY = 220 - h;
  return (
    <g>
      <rect x={x} y={baseY} width={w} height={h} fill="#1a140d" />
      {Array.from({ length: Math.floor(w / 8) }).map((_, i) => (
        i % 2 === 0 ? <rect key={i} x={x + i * 8} y={baseY - 6} width="8" height="6" fill="#1a140d" /> : null
      ))}
      {Array.from({ length: stories }).map((_, i) => {
        const sy = baseY + 12 + i * (h / stories);
        return (
          <g key={i}>
            <line x1={x + 4} y1={sy} x2={x + w - 4} y2={sy} stroke="#f3ead9" strokeWidth="1" opacity="0.55" />
            <line x1={x + 4} y1={sy + 3} x2={x + w - 4} y2={sy + 3} stroke="#f3ead9" strokeWidth="0.5" opacity="0.35" />
          </g>
        );
      })}
      {Array.from({ length: stories }).map((_, i) => {
        const wy = baseY + 18 + i * (h / stories);
        const ww = Math.min(8, w * 0.18);
        const wx = x + w / 2 - ww / 2;
        return (
          <path key={`w${i}`}
            d={`M${wx} ${wy + ww * 1.3} L${wx} ${wy + ww * 0.6} Q${wx} ${wy} ${wx + ww / 2} ${wy} Q${wx + ww} ${wy} ${wx + ww} ${wy + ww * 0.6} L${wx + ww} ${wy + ww * 1.3} Z`}
            fill="#e9a82a" opacity="0.5" />
        );
      })}
      <path
        d={`M${x + w / 2 - 8} ${baseY + 6} L${x + w / 2 - 8} ${baseY + 2} Q${x + w / 2 - 8} ${baseY - 6} ${x + w / 2} ${baseY - 6} Q${x + w / 2 + 8} ${baseY - 6} ${x + w / 2 + 8} ${baseY + 2} L${x + w / 2 + 8} ${baseY + 6} Z`}
        fill="#1f4ea8" opacity="0.6" />
    </g>
  );
}

const towerHouses: { x: number; w: number; h: number; stories: number }[] = (() => {
  const out: { x: number; w: number; h: number; stories: number }[] = [];
  const widths = [62, 78, 54, 70, 60, 84, 52, 68, 76, 58, 64, 80, 56, 72, 66, 82, 50, 74, 60, 78, 54, 70];
  const heights = [180, 142, 168, 196, 130, 156, 188, 144, 172, 158, 182, 134, 168, 192, 150, 174, 138, 164, 196, 152, 168, 144];
  const storyList = [6, 5, 6, 7, 4, 5, 6, 5, 6, 5, 7, 4, 5, 7, 5, 6, 4, 6, 7, 5, 6, 5];
  let x = 0, i = 0;
  while (x < 1600 && i < widths.length) {
    out.push({ x, w: widths[i], h: heights[i], stories: storyList[i] });
    x += widths[i] + 4;
    i++;
  }
  return out;
})();
