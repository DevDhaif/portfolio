'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import s from '../spacetoon.module.css';

type ChannelId =
  | 'sport'
  | 'adventure'
  | 'science'
  | 'zomorroda'
  | 'history'
  | 'reward'
  | 'action';

type Channel = {
  id: ChannelId;
  number: string;
  name: string;
  arabic: string;
  primary: string;
  secondary: string;
};

const CHANNELS: Channel[] = [
  { id: 'sport',     number: '٠١', name: 'المشاريع',  arabic: 'كوكب الرياضة',  primary: '#00c773', secondary: '#ffe066' },
  { id: 'adventure', number: '٠٢', name: 'عني',       arabic: 'كوكب المغامرات', primary: '#ff8a1f', secondary: '#ffd24a' },
  { id: 'science',   number: '٠٣', name: 'المهارات',  arabic: 'كوكب العلوم',   primary: '#7a5cff', secondary: '#5cf0ff' },
  { id: 'zomorroda', number: '٠٤', name: 'المدونة',   arabic: 'كوكب زمردة',    primary: '#ff5aa8', secondary: '#ffd6a8' },
  { id: 'history',   number: '٠٥', name: 'الخبرات',   arabic: 'كوكب التاريخ',  primary: '#3aa6ff', secondary: '#ffd86b' },
  { id: 'reward',    number: '٠٦', name: 'الشهادات',  arabic: 'كوكب الجوائز',  primary: '#ffc62a', secondary: '#ff5fa2' },
  { id: 'action',    number: '٠٧', name: 'تواصل',     arabic: 'كوكب الأكشن',   primary: '#ff3434', secondary: '#ffd700' },
];

export default function SpacetoonArPage() {
  const [booted, setBooted] = useState(false);
  const [active, setActive] = useState<ChannelId>('sport');
  const [transitioning, setTransitioning] = useState(false);
  const [time, setTime] = useState('00:00');

  const channel = useMemo(
    () => CHANNELS.find((c) => c.id === active)!,
    [active]
  );

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, '0');
      const mm = d.getMinutes().toString().padStart(2, '0');
      setTime(`${hh}:${mm}`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (booted) return;
    const t = setTimeout(() => setBooted(true), 1600);
    return () => clearTimeout(t);
  }, [booted]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const idx = CHANNELS.findIndex((c) => c.id === active);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        switchTo(CHANNELS[(idx + 1) % CHANNELS.length].id);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        switchTo(CHANNELS[(idx - 1 + CHANNELS.length) % CHANNELS.length].id);
      } else if (/^[1-7]$/.test(e.key)) {
        switchTo(CHANNELS[parseInt(e.key, 10) - 1].id);
      } else if (e.key === 'Escape' && !booted) {
        setBooted(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, booted]);

  const switchTo = (next: ChannelId) => {
    if (next === active) return;
    setTransitioning(true);
    setTimeout(() => {
      setActive(next);
      setTimeout(() => setTransitioning(false), 280);
    }, 220);
  };

  return (
    <div
      className={s.root}
      style={
        {
          '--c-primary': channel.primary,
          '--c-secondary': channel.secondary,
        } as React.CSSProperties
      }
    >
      <div className={s.topNav}>
        <Link href="/" className={s.exitLink}>← خروج من التجربة</Link>
        <div className={s.langToggle}>
          <Link href="/experiments/spacetoon" className={s.langBtn}>EN</Link>
          <Link href="/experiments/spacetoon/ar" className={`${s.langBtn} ${s.langBtnActive}`}>ع</Link>
        </div>
      </div>

      <div className={s.wallpaper} />
      <div className={s.grain} />

      <div className={s.tvStage}>
        <div className={s.tv}>
          <div className={s.screenWell}>
            <div className={s.screen} data-channel={channel.id}>
              {!booted && (
                <div
                  className={s.bootStage}
                  onClick={() => setBooted(true)}
                  role="button"
                  aria-label="تشغيل التلفزيون"
                >
                  <div className={s.bootScanlineExpand} />
                  <div className={s.skipHint}>اضغط لتخطي / Esc</div>
                </div>
              )}

              {booted && transitioning && (
                <>
                  <div className={s.flashWhite} />
                  <div className={s.static} />
                  <div className={s.syncBar} />
                </>
              )}

              {booted && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className={s.channel}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    <div className={s.channelBg} />
                    <div className={s.halftone} />
                    {active === 'sport' && <div className={s.speedLines} />}
                    <div className={s.channelInner}>
                      {active === 'sport' && <SportChannel />}
                      {active === 'adventure' && <AdventureChannel />}
                      {active === 'science' && <ScienceChannel />}
                      {active === 'zomorroda' && <ZomorrodaChannel />}
                      {active === 'history' && <HistoryChannel />}
                      {active === 'reward' && <RewardChannel />}
                      {active === 'action' && <ActionChannel />}
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}

              {booted && (
                <div className={s.hud}>
                  <div className={s.hudTopLeft}>
                    <div className={s.logoBug}>
                      <span className={s.logoBugDot} />
                      <span>سبيس تون</span>
                    </div>
                    <span style={{ opacity: 0.7 }}>
                      ق-{channel.number} · {channel.arabic}
                    </span>
                  </div>
                  <div className={s.hudTopRight}>
                    <div>
                      <span className={s.recDot} />
                      على الهواء · {time}
                    </div>
                    <div style={{ opacity: 0.55, marginTop: 4 }}>
                      ١٩٩٦ · اليمن
                    </div>
                  </div>
                  <div className={s.hudBottomRight}>
                    ◀▶ تغيير القناة · ١-٧ تنغيم سريع
                  </div>
                </div>
              )}

              <div className={s.scanlines} />
              <div className={s.crtCurve} />
              <div className={s.aberration} />
              <div className={s.flicker} />
            </div>
          </div>

          <div className={s.remote}>
            <div className={s.remoteBrand}>سونيك-في آر · ٩٦</div>
            {CHANNELS.map((c) => {
              const isActive = c.id === active;
              return (
                <button
                  key={c.id}
                  className={`${s.btn} ${isActive ? s.btnActive : ''}`}
                  onClick={() => switchTo(c.id)}
                  style={{ ['--btn-color' as string]: c.primary }}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`تبديل إلى ${c.name}`}
                >
                  <span className={s.btnPlanet} />
                  <span className={s.btnNumber}>{c.number}</span>
                  <span className={s.btnLabel}>{c.name}</span>
                </button>
              );
            })}
          </div>

          <div className={s.powerLed} />
        </div>
      </div>
    </div>
  );
}

/* ===========================================================
   Channels (AR content)
   =========================================================== */
function SportChannel() {
  return (
    <div className={s.hero}>
      <div className={s.heroBlurb}>
        <div className={`${s.heroKicker} ${s.animFlyIn}`} style={{ animationDelay: '0.1s' }}>
          <span style={{ width: 18, height: 2, background: 'currentColor' }} />
          الحلقة ١ · يُعرض الآن
        </div>
        <h1 className={`${s.heroName} ${s.animSlam}`} style={{ animationDelay: '0.2s' }}>
          <span className={s.heroNameBlock}>ضيف</span>
          <br />
          الفروي
        </h1>
        <p className={`${s.heroSub} ${s.animFadeUp}`} style={{ animationDelay: '0.55s' }}>
          مهندس واجهات أمامية · مهندس معماري قيد التدريب
        </p>
        <p className={`${s.heroLead} ${s.animFadeUp}`} style={{ animationDelay: '0.75s' }}>
          من مواليد ١٩٩٦ في اليمن. أبني أنظمة React و Next.js و TypeScript
          جاهزة للإنتاج نهارًا، وأعيد مشاهدة شارة سبيس تون في رأسي ليلًا.
          بدّل القنوات على اليسار لمشاهدة بقية البث.
        </p>
        <div className={s.animFadeUp} style={{ animationDelay: '0.95s' }}>
          <button className={s.linkBtn} type="button">▶ شاهد المشاريع</button>
        </div>
      </div>
      <div className={`${s.heroPortrait} ${s.animFadeUp}`} style={{ animationDelay: '0.4s' }}>
        <div className={s.heroPortraitMonogram}>د</div>
        <div className={s.heroPortraitInner} />
        <div className={s.heroPortraitTag}>
          <span>ح١م١</span>
          <span>NTSC · 4:3</span>
        </div>
      </div>
    </div>
  );
}

function AdventureChannel() {
  return (
    <>
      <h2 className={`${s.sectionTitle} ${s.animSlam}`}>قصة البداية</h2>
      <p className={`${s.sectionLead} ${s.animFadeUp}`} style={{ animationDelay: '0.15s' }}>
        مجموعة من طفولة صنعانية في ١٩٩٦، وشارة سبيس تون عالية الصوت، وإيمان غير
        منطقي بأن كود الواجهة الأمامية يمكن أن يكون جميلًا.
      </p>

      <div className={s.aboutLayout}>
        <div className={`${s.aboutText} ${s.animFadeUp}`} style={{ animationDelay: '0.25s' }}>
          <p>
            كبرت بين قمريات صنعاء وشاشات الـCRT. كل يوم في الرابعة عصرًا، كانت
            كواكب سبيس تون تدور والعالم يصبح مفهومًا لاثنتين وعشرين دقيقة. روميو
            يتسلق الجبل، سبستيان يبحث عن بيل، الكابتن ماجد يسجل من زوايا مستحيلة،
            والكابتن رابح يتفادى كرات لا تخضع للفيزياء.
          </p>
          <p>
            البورتفوليو الذي تتصفحه الآن هو رسالة حب لتلك الحقبة — تلفزيون لا يزال
            يعمل، قنوات لا تزال تتغيّر، ومهندس خلفها يشحن React و Next و TypeScript
            في الإنتاج فعلًا. اضغط زر القناة لمشاهدة بقية البث.
          </p>
          <p>
            أكتب كودًا جاهزًا للإنتاج، أعرق على الـCSS، وأعامل الأداء وإمكانية الوصول
            كميزات من الدرجة الأولى لا أفكارًا متأخرة.
          </p>
        </div>

        <div className={s.aboutFacts}>
          {[
            { label: 'مولود', value: '١٩٩٦ · اليمن' },
            { label: 'حاليًا', value: 'مهندس واجهات' },
            { label: 'الستاك', value: 'React · Next · TS' },
            { label: 'مهمة جانبية', value: 'الهندسة المعمارية' },
            { label: 'القناة المفضلة', value: 'سبيس تون ق-١' },
          ].map((f, i) => (
            <div
              key={f.label}
              className={`${s.factCard} ${s.animFlyIn}`}
              style={{ animationDelay: `${0.35 + i * 0.08}s` }}
            >
              <div className={s.factLabel}>{f.label}</div>
              <div className={s.factValue}>{f.value}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ScienceChannel() {
  const skills = [
    { name: 'React', level: 95 },
    { name: 'Next.js', level: 92 },
    { name: 'TypeScript', level: 90 },
    { name: 'Tailwind', level: 90 },
    { name: 'Framer Motion', level: 78 },
    { name: 'Three.js / R3F', level: 65 },
    { name: 'Node / Express', level: 75 },
    { name: 'Laravel / PHP', level: 72 },
    { name: 'Postgres', level: 70 },
    { name: 'Supabase', level: 78 },
    { name: 'هندسة معمارية', level: 60 },
    { name: 'CSS / Motion', level: 88 },
  ];

  return (
    <>
      <h2 className={`${s.sectionTitle} ${s.animSlam}`}>المختبر</h2>
      <p className={`${s.sectionLead} ${s.animFadeUp}`} style={{ animationDelay: '0.15s' }}>
        أدوات أمتد إليها بلا تفكير، والأشرطة صادقة لا تسويقية.
      </p>

      <div className={s.skillsList}>
        {skills.map((sk, i) => (
          <div
            key={sk.name}
            className={`${s.skillRow} ${s.animFlyIn}`}
            style={{ animationDelay: `${0.2 + i * 0.04}s` }}
          >
            <span>{sk.name}</span>
            <div className={s.skillBar}>
              <div className={s.skillBarFill} style={{ width: `${sk.level}%` }} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function ZomorrodaChannel() {
  const posts = [
    { date: '٢٠٢٦.٠٤.١٨', title: 'دليل مهندس متقدّم لقول لا' },
    { date: '٢٠٢٦.٠٣.٠٢', title: 'لماذا توقفت عن كتابة useEffect أولًا' },
    { date: '٢٠٢٦.٠٢.١٠', title: 'تيلويند، التوكنز، وضريبة الانضباط' },
    { date: '٢٠٢٦.٠١.٠٧', title: 'مكونات الخادم ليست الهدف' },
    { date: '٢٠٢٥.١٢.٢١', title: 'Next.js ١٥: ما الذي تغيّر فعلًا' },
    { date: '٢٠٢٥.١١.٣٠', title: 'تصميم يحتسب زمن الشبكة' },
  ];

  return (
    <>
      <h2 className={`${s.sectionTitle} ${s.animSlam}`}>المكتبة</h2>
      <p className={`${s.sectionLead} ${s.animFadeUp}`} style={{ animationDelay: '0.15s' }}>
        ملاحظات من الميدان — مقالات هندسية، آراء مدفوعة برأي، وأحيانًا ثرثرة عن
        الـCSS لم يطلبها أحد.
      </p>

      <div className={s.writingList}>
        {posts.map((p, i) => (
          <div
            key={p.title}
            className={`${s.writingRow} ${s.animFlyIn}`}
            style={{ animationDelay: `${0.2 + i * 0.06}s` }}
          >
            <span className={s.writingDate}>{p.date}</span>
            <span className={s.writingTitle}>{p.title}</span>
            <span className={s.writingArrow}>←</span>
          </div>
        ))}
      </div>
    </>
  );
}

function HistoryChannel() {
  const jobs = [
    { period: '٢٠٢٤ — الآن', role: 'مهندس واجهات أمامية أوّل', company: 'مستقل · الرياض', blurb: 'React و Next.js و TypeScript للإنتاج لعملاء SaaS في الشرق الأوسط. هندسة معمارية، أداء، والتفاصيل المملّة لكن الحاسمة.' },
    { period: '٢٠٢٢ — ٢٠٢٤', role: 'مهندس واجهات أمامية', company: 'فيرلو تك · عن بُعد', blurb: 'بنيت واجهة منصّة تحليلات متعددة المستأجرين. ملكتُ نظام التصميم ومكتبة الحركة، وأكملنا الترحيل من CRA إلى Next.' },
    { period: '٢٠٢٠ — ٢٠٢٢', role: 'مطور Full-Stack', company: 'وكالة محلية · صنعاء', blurb: 'Laravel + Vue/React لعملاء متنوعين في الشرق الأوسط. تعلّمت انضباط الشحن في ظل قيود حقيقية: شبكات بطيئة، أجهزة محدودة، مستخدمون فعليون.' },
    { period: '٢٠١٨ — ٢٠٢٠', role: 'مطور ويب مبتدئ', company: 'عمل حر', blurb: 'بدأت بـ WordPress، ثم jQuery، ثم React. الترتيب كان صحيحًا.' },
  ];

  return (
    <>
      <h2 className={`${s.sectionTitle} ${s.animSlam}`}>الإعادات</h2>
      <p className={`${s.sectionLead} ${s.animFadeUp}`} style={{ animationDelay: '0.15s' }}>
        من أين بثثت — كل حلقة سابقة بالترتيب.
      </p>

      <div className={s.timelineList}>
        {jobs.map((j, i) => (
          <div
            key={j.role + j.period}
            className={`${s.timelineCard} ${s.animFlyIn}`}
            style={{ animationDelay: `${0.2 + i * 0.08}s` }}
          >
            <div className={s.timelinePeriod}>{j.period}</div>
            <div className={s.timelineRole}>{j.role}</div>
            <div className={s.timelineCompany}>{j.company}</div>
            <div className={s.timelineBlurb}>{j.blurb}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function RewardChannel() {
  const certs = [
    { issuer: 'Meta', name: 'مهندس واجهات أمامية محترف', year: '٢٠٢٤' },
    { issuer: 'Vercel', name: 'إتقان Next.js App Router', year: '٢٠٢٤' },
    { issuer: 'Frontend Masters', name: 'أنماط جاهزة للإنتاج', year: '٢٠٢٣' },
    { issuer: 'AWS', name: 'ممارس السحابة', year: '٢٠٢٣' },
    { issuer: 'Google', name: 'تخصص تجربة المستخدم', year: '٢٠٢٢' },
    { issuer: 'edX · MIT', name: 'مدخل إلى التفكير الحاسوبي', year: '٢٠٢٢' },
  ];

  return (
    <>
      <h2 className={`${s.sectionTitle} ${s.animSlam}`}>الجوائز</h2>
      <p className={`${s.sectionLead} ${s.animFadeUp}`} style={{ animationDelay: '0.15s' }}>
        مكتسبة على الطريق. ميداليات وشهادات وبعض الأشياء البرّاقة.
      </p>

      <div className={s.trophyGrid}>
        {certs.map((c, i) => (
          <div
            key={c.name}
            className={`${s.trophyCard} ${s.animFlyIn}`}
            style={{ animationDelay: `${0.2 + i * 0.08}s` }}
          >
            <div className={s.trophyMedal}>
              <span>★</span>
            </div>
            <div className={s.trophyMeta}>
              <div className={s.trophyIssuer}>{c.issuer}</div>
              <div className={s.trophyName}>{c.name}</div>
              <div className={s.trophyYear}>{c.year}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function ActionChannel() {
  const contacts = [
    { label: 'البريد الإلكتروني', value: 'devdhaif@gmail.com' },
    { label: 'GitHub', value: '@DevDhaif' },
    { label: 'LinkedIn', value: '/in/devdhaif' },
    { label: 'X · تويتر', value: '@devdhaif' },
  ];

  return (
    <>
      <h2 className={`${s.sectionTitle} ${s.animSlam}`}>افتح قناة</h2>
      <p className={`${s.sectionLead} ${s.animFadeUp}`} style={{ animationDelay: '0.15s' }}>
        المُوظِّفون، المتعاونون، أو أيّ شخص يتذكر انتظار شارة سبيس تون حتى تنتهي
        — تواصل معي.
      </p>

      <div className={s.contactGrid}>
        {contacts.map((c, i) => (
          <div
            key={c.label}
            className={`${s.contactCard} ${s.animFlyIn}`}
            style={{ animationDelay: `${0.2 + i * 0.08}s` }}
          >
            <div className={s.contactLabel}>{c.label}</div>
            <div className={s.contactValue}>{c.value}</div>
          </div>
        ))}
      </div>

      <div className={s.animFadeUp} style={{ marginTop: 24, animationDelay: '0.6s' }}>
        <button className={s.linkBtn} type="button">▶ أرسل بثًا</button>
      </div>
    </>
  );
}
