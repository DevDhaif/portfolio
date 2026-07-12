import { createPublicClient } from '@/utils/supabase/public';
import type { Project, Certificate, Post } from '@/types';

export type ExperimentData = {
  projects: Project[];
  certificates: Certificate[];
  posts: Post[];
  postsCount: number;
};

export type ExperimentLoadOpts = {
  projectsLimit?: number;
  postsLimit?: number;
};

/**
 * Shared Supabase loader for the notebook (personal) theme pages.
 * Both /experiments/notebook and /experiments/notebook/ar render the
 * SAME canonical content as the professional theme — this is the single
 * source of truth for the persona split, with consistent shape transforms.
 */
export async function loadExperimentData(
  opts: ExperimentLoadOpts = {},
): Promise<ExperimentData> {
  const projectsLimit = opts.projectsLimit ?? 6;
  const postsLimit = opts.postsLimit ?? 6;

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
      .limit(postsLimit),
    supabase
      .from('posts')
      .select('id', { count: 'exact', head: true })
      .eq('published', true),
  ]);

  const projects: Project[] = (projectsRes.data ?? [])
    .map((project: any) => {
      const mainImageUrl = project.main_image
        ? supabase.storage
            .from('projects-images')
            .getPublicUrl(project.main_image).data.publicUrl
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
    .slice(0, projectsLimit);

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
   Bilingual helpers
   =========================================================== */

const ARABIC_DIGITS: Record<string, string> = {
  '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤',
  '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩',
};

export function toArabicNumerals(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => ARABIC_DIGITS[d] ?? d);
}

const ARABIC_MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

const ENGLISH_MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
];

export function formatDateParts(iso: string, lang: 'en' | 'ar') {
  if (!iso) return { day: '', month: '', year: '' };
  const d = new Date(iso);
  const day = d.getDate().toString().padStart(2, '0');
  const month = d.getMonth();
  const year = d.getFullYear();

  if (lang === 'ar') {
    return {
      day: toArabicNumerals(day),
      month: `${ARABIC_MONTHS[month]} ${toArabicNumerals(String(year).slice(2))}`,
      year: toArabicNumerals(String(year)),
    };
  }

  return {
    day,
    month: `${ENGLISH_MONTHS[month]} ${String(year).slice(2)}`,
    year: String(year),
  };
}

export function pickPostTitle(post: Post, lang: 'en' | 'ar'): string {
  if (lang === 'ar') return post.title_ar || post.title_en || post.title;
  return post.title_en || post.title || post.title_ar || '';
}

export function getMonogram(name: string): string {
  if (!name) return '·';
  const parts = name.split(/[\s\-_·]/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}
