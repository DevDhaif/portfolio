import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TagSelectorProps } from '@/types';

// Common tags for web development
const PREDEFINED_TAGS = [
  'React.js',
  'Next.js',
  'Vue.js',
  'TypeScript',
  'JavaScript',
  'Tailwind CSS',
  'CSS',
  'HTML',
  'Laravel',
  'PHP',
  'MySQL',
  'API',
  'Firebase',
  'Supabase',
  'Performance',
  'Frontend',
  'Backend',
  'Full Stack',
  'UI/UX',
  'Responsive',
  'Deployment',
  'Git',
  'GitHub',
  'Bootstrap',
  'Material UI',
  'Redux',
  'State Management',
  'Authentication',
  'SEO',
  'Accessibility',
];

export function TagSelector({
  selectedTags,
  onChange,
  className,
}: TagSelectorProps) {
  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onChange(selectedTags.filter((t) => t !== tag));
    } else {
      onChange([...selectedTags, tag]);
    }
  };

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {PREDEFINED_TAGS.map((tag) => (
        <Button
          key={tag}
          type="button"
          size="sm"
          variant={selectedTags.includes(tag) ? 'default' : 'outline'}
          onClick={() => toggleTag(tag)}
          className={cn(
            'text-sm transition-all',
            selectedTags.includes(tag)
              ? 'bg-blue-600 text-white hover:bg-blue-700 border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:bg-blue-50'
          )}
        >
          #{tag}
        </Button>
      ))}
    </div>
  );
}
