import { loadExperimentData } from '@/lib/experiments-data';
import { SOCIAL_LINKS } from '@/lib/constants';
import SpacetoonView, { type SpacetoonCopy } from '../spacetoon-view';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function SpacetoonArPage() {
  const data = await loadExperimentData();

  const copy: SpacetoonCopy = {
    langLabel: 'ع',
    exit: 'غيّر الثيم',
    liveLabel: 'مباشر',
    est: 'تأسّس ١٩٩٦ · اليمن',
    remoteBrand: 'سونيك‑VR · ٩٦',
    hudHint: 'الأسهم لتغيير القناة · ١–٧ للقفز السريع',
    bootHint: 'انقر / Esc للتخطّي',
    channels: {
      sport:     { name: 'الأعمال',     subtitle: 'كوكب الرياضة' },
      adventure: { name: 'عنّي',        subtitle: 'كوكب المغامرات' },
      science:   { name: 'العدّة',      subtitle: 'كوكب العلوم' },
      zomorroda: { name: 'المدوّنة',    subtitle: 'كوكب زمردة' },
      history:   { name: 'الخبرات',     subtitle: 'كوكب التاريخ' },
      reward:    { name: 'الشهادات',    subtitle: 'كوكب الجوائز' },
      action:    { name: 'تواصل',       subtitle: 'كوكب الأكشن' },
    },

    hero: {
      kicker: 'الحلقة ٠١ · يُبث الآن',
      name: 'ضيف',
      nameSub: 'الفروي',
      sub: 'مهندس برمجيات · الرياض',
      lead:
        'أنا ضيف الله — مهندس برمجيات من البيضاء، اليمن، ساكن في الرياض. عندي أكثر من ٥ سنين في React و Next.js و TypeScript و Laravel. أهتم بالأداء، إمكانية الوصول، ودعم العربي و RTL من أول يوم. غيّر القناة تشف الباقي.',
      cta: 'شغّل لفّة المشاريع',
      portraitTagLeft: 'م١ح١',
      portraitTagRight: 'NTSC · ٤:٣',
      monogram: 'د',
      projectsTitle: 'مشاريع مختارة',
      projectsLead: 'حفنة من الأشياء اللي سلّمتها. اضغط أي بطاقة وافتحها.',
      projectsEmpty: 'ما فيه مشاريع منشورة لحد الحين.',
      openProject: 'افتح',
    },

    about: {
      title: 'عنّي',
      lead:
        'باختصار: من أنا، وش أشتغل، ومبادئي.',
      paragraphs: [
        'أنا ضيف الله أحمد الفروي، مهندس برمجيات من البيضاء، اليمن، ساكن في الرياض. شغلي اليومي React و Next.js و TypeScript و Tailwind. لمّا أحتاج أبني مشروع كامل أو الباك إند، أستخدم Laravel.',
        'أهتم بالأداء، قابلية الوصول، ودعم اللغة العربية و RTL من أول يوم — مو فكرة تتذكّر آخر شي. هذا اللي يخلّي الواجهة تصمد ولا تنكسر بعد أول سنة.',
        'مأمن بأن الكود الواضح والتوثيق الجيد مهمّين بنفس الدرجة، وأن التحديثات الصغيرة المستمرّة أحسن من التحديث الكبير اللي ما يخلص.',
      ],
      facts: [
        { label: 'الموقع',         value: 'الرياض، السعودية' },
        { label: 'من',             value: 'البيضاء، اليمن' },
        { label: 'العدّة',         value: 'React · Next · TS · Laravel' },
        { label: 'سنوات الخبرة',    value: '+٥' },
        { label: 'مقالات منشورة',   value: '__POSTS_COUNT__' },
      ],
    },

    skills: {
      title: 'العدّة',
      lead: 'الأدوات اللي أشتغل فيها كل يوم.',
      groups: [
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
      ],
    },

    experience: {
      title: 'الخبرات',
      lead: 'وين اشتغلت وش سلّمت.',
      jobs: [
        {
          period: '١١/٢٠٢٤ — لين الحين',
          role: 'مطوّر واجهات أمامية',
          company: 'ADX · الرياض',
          blurb:
            'أبني منصّة digital signage كاملة — محاكي حملات، أداة قوائم تشغيل بالسحب والإفلات، محرّر صور داخل المتصفح، ولوحة إدارة فيها RBAC لأكثر من ٨ أدوار. دعم RTL/LTR عبر i18next، HTML دلالي، والتزام بـ WCAG.',
          current: true,
        },
        {
          period: '٠١/٢٠١٨ — لين الحين',
          role: 'مطوّر Full-Stack (مستقل)',
          company: 'فريلانس',
          blurb:
            'سلّمت أكثر من ٥ تطبيقات ويب من الفكرة لين النشر. Lighthouse فوق ٩٠ عبر dynamic imports وcode-splitting وتحسين الصور. RESTful APIs بـ Laravel و MySQL بـ uptime ٩٩٫٥٪. لين الحين أشتغل freelance بشكل متوازي.',
          current: true,
        },
        {
          period: '٠٥/٢٠٢٠ — ١١/٢٠٢٤',
          role: 'مطوّر واجهات أمامية',
          company: 'Meraki UI Lab',
          blurb:
            'سويت أنظمة components قابلة لإعادة الاستخدام، سهلة الوصول، بهوية بصرية ثابتة لفرق منتج cross-functional. شحنت أكثر من ١٥٠ component، دعم RTL ١٠٠٪ مع HTML دلالي و ARIA.',
        },
      ],
    },

    writing: {
      title: 'المدوّنة',
      lead: 'مقالات وملاحظات هندسية، وآراء صريحة من الميدان.',
      empty: 'ما فيه مقالات منشورة لحد الحين.',
      seeAll: 'شف كل المقالات',
    },

    certificates: {
      title: 'الشهادات',
      lead: 'دورات أونلاين خلّصتها — LinkedIn Learning و freeCodeCamp و PMI وغيرها.',
      empty: 'ما فيه شهادات منشورة لحد الحين.',
    },

    contact: {
      title: 'تواصل',
      lead:
        'متاح للعمل والتعاون. اختر الطريقة اللي تناسبك، برد عليك خلال ٢٤ ساعة إن شاء الله.',
      items: [
        { label: 'البريد',      value: SOCIAL_LINKS.EMAIL, href: `mailto:${SOCIAL_LINKS.EMAIL}` },
        { label: 'الجوّال',      value: '+966536547818',    href: 'tel:+966536547818' },
        { label: 'GitHub',      value: '@DevDhaif',         href: SOCIAL_LINKS.GITHUB },
        { label: 'LinkedIn',    value: '/in/devdhaif',      href: SOCIAL_LINKS.LINKEDIN },
        { label: 'X / تويتر',   value: '@devdhaif',         href: SOCIAL_LINKS.TWITTER },
      ],
      cta: 'ابعث رسالة',
    },
  };

  return (
    <SpacetoonView
      lang="ar"
      copy={copy}
      enHref="/experiments/spacetoon"
      arHref="/experiments/spacetoon/ar"
      projects={data.projects}
      certificates={data.certificates}
      posts={data.posts}
      postsCount={data.postsCount}
    />
  );
}
