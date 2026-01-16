'use client';

import { useState } from 'react';
import { Editor } from '@/components/Editor';
import ImageUpload from '@/components/ImageUpload';
import { TagSelector } from '@/components/TagSelector';
import { createClient } from '@/utils/supabase/client';

type Language = 'en' | 'ar';

interface BilingualPostFormProps {
  mode: 'create' | 'edit';
  postId?: string;
  initialData?: {
    title_en?: string;
    title_ar?: string;
    description_en?: string;
    description_ar?: string;
    content_en?: any;
    content_ar?: any;
    cover_image?: string;
    tags?: string[];
    published?: boolean;
  };
  onSubmit: (formData: FormData) => Promise<any>;
}

export function BilingualPostForm({
  mode,
  postId,
  initialData,
  onSubmit,
}: BilingualPostFormProps) {
  const [activeTab, setActiveTab] = useState<Language>('en');
  const [coverImage, setCoverImage] = useState<File[]>([]);
  const [existingCoverImage, setExistingCoverImage] = useState<string | undefined>(initialData?.cover_image);
  const [contentEn, setContentEn] = useState(initialData?.content_en || {});
  const [contentAr, setContentAr] = useState(
    initialData?.content_ar || initialData?.content_en || {}
  );
  const [editorImages, setEditorImages] = useState<Map<string, File>>(
    new Map()
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialData?.tags || []
  );
  const [status, setStatus] = useState(
    initialData?.published ? 'published' : 'draft'
  );

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  // Sync content from English to Arabic (keeps structure, you translate text)
  const syncToArabic = () => {
    if (
      window.confirm(
        'Copy English content structure to Arabic? (You can then translate the text)'
      )
    ) {
      setContentAr(JSON.parse(JSON.stringify(contentEn)));
      setActiveTab('ar');
    }
  };

  async function handleSubmit(formData: FormData) {
    try {
      const supabase = createClient();
      let coverImageUrl = existingCoverImage || null;

      // Upload new cover image if provided
      if (coverImage.length > 0) {
        const fileName = `${Date.now()}-${coverImage[0].name}`;
        const { error: uploadError } = await supabase.storage
          .from('blog-content')
          .upload(fileName, coverImage[0]);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from('blog-content').getPublicUrl(fileName);
        coverImageUrl = publicUrl;

        // Delete old cover image if exists and editing
        if (
          mode === 'edit' &&
          initialData?.cover_image &&
          !initialData.cover_image.startsWith('http')
        ) {
          await supabase.storage
            .from('blog-content')
            .remove([initialData.cover_image]);
        }
      }

      // Process images for both English and Arabic content
      const processImages = async (node: any): Promise<any> => {
        if (node.type === 'image') {
          const blobUrl = node.attrs.src;
          if (blobUrl.startsWith('blob:')) {
            const file = editorImages.get(blobUrl);
            if (file) {
              const fileName = `content-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '-')}`;
              const { error: uploadError } = await supabase.storage
                .from('blog-content')
                .upload(fileName, file);

              if (uploadError) throw uploadError;

              const {
                data: { publicUrl },
              } = supabase.storage.from('blog-content').getPublicUrl(fileName);

              return { ...node, attrs: { ...node.attrs, src: publicUrl } };
            }
          }
          return node;
        }

        if (node.content) {
          const processedContent = await Promise.all(
            node.content.map(processImages)
          );
          return { ...node, content: processedContent };
        }

        return node;
      };

      let processedContentEn = JSON.parse(JSON.stringify(contentEn));
      let processedContentAr = JSON.parse(JSON.stringify(contentAr));

      processedContentEn = await processImages(processedContentEn);
      processedContentAr = await processImages(processedContentAr);

      const submitFormData = new FormData();
      submitFormData.set('title_en', formData.get('title_en') as string);
      submitFormData.set('title_ar', formData.get('title_ar') as string);
      submitFormData.set(
        'description_en',
        formData.get('description_en') as string
      );
      submitFormData.set(
        'description_ar',
        formData.get('description_ar') as string
      );
      submitFormData.set('content_en', JSON.stringify(processedContentEn));
      submitFormData.set('content_ar', JSON.stringify(processedContentAr));
      submitFormData.set('coverImage', coverImageUrl || '');
      submitFormData.set('tags', JSON.stringify(selectedTags));
      submitFormData.set('status', status);

      const result = await onSubmit(submitFormData);

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.success) {
        window.location.href = '/admin/blog';
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save post');
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* Language Tabs */}
      <div className="flex items-center justify-between border-b border-gray-200">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('en')}
            className={`px-6 py-3 font-semibold transition-all border-b-2 ${
              activeTab === 'en'
                ? 'border-blue-600 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            🇬🇧 English
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('ar')}
            className={`px-6 py-3 font-semibold transition-all border-b-2 ${
              activeTab === 'ar'
                ? 'border-blue-600 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            🇸🇦 العربية
          </button>
        </div>
        {activeTab === 'ar' && (
          <button
            type="button"
            onClick={syncToArabic}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
            title="Copy English content structure to Arabic (you can then translate)"
          >
            📋 Copy from English
          </button>
        )}
      </div>

      {/* English Content */}
      <div className={activeTab === 'en' ? 'block' : 'hidden'}>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="title_en"
              className="block text-sm font-medium text-gray-700"
            >
              Title (English) *
            </label>
            <input
              type="text"
              id="title_en"
              name="title_en"
              required
              defaultValue={initialData?.title_en}
              className="mt-1 text-gray-900 bg-white block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="description_en"
              className="block text-sm font-medium text-gray-700"
            >
              Description (English) *
            </label>
            <textarea
              id="description_en"
              name="description_en"
              required
              rows={3}
              defaultValue={initialData?.description_en}
              className="mt-1 text-gray-900 bg-white block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Content (English) *
            </label>
            <Editor
              content={contentEn}
              onChange={setContentEn}
              onTempFileChange={setEditorImages}
            />
          </div>
        </div>
      </div>

      {/* Arabic Content */}
      <div className={activeTab === 'ar' ? 'block' : 'hidden'}>
        <div className="space-y-6" dir="rtl">
          <div>
            <label
              htmlFor="title_ar"
              className="block text-sm font-medium text-gray-700"
            >
              العنوان (العربية) *
            </label>
            <input
              type="text"
              id="title_ar"
              name="title_ar"
              required
              defaultValue={initialData?.title_ar}
              className="mt-1 text-gray-900 bg-white block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              dir="rtl"
            />
          </div>

          <div>
            <label
              htmlFor="description_ar"
              className="block text-sm font-medium text-gray-700"
            >
              الوصف (العربية) *
            </label>
            <textarea
              id="description_ar"
              name="description_ar"
              required
              rows={3}
              defaultValue={initialData?.description_ar}
              className="mt-1 text-gray-900 bg-white block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              dir="rtl"
            />
          </div>

          <div dir="ltr">
            <label
              className="block text-sm font-medium mb-2 text-gray-700 text-right"
              dir="rtl"
            >
              المحتوى (العربية) *
            </label>
            <Editor
              content={contentAr}
              onChange={setContentAr}
              onTempFileChange={setEditorImages}
            />
          </div>
        </div>
      </div>

      {/* Shared Fields (visible in both tabs) */}
      <div className="space-y-6 pt-6 border-t border-gray-200">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Cover Image (Shared)
            {mode === 'edit' && existingCoverImage && (
              <span className="text-xs text-gray-500 ml-2">
                (Leave empty to keep current image)
              </span>
            )}
          </label>
          {mode === 'edit' && existingCoverImage && coverImage.length === 0 && (
            <div className="mb-4 relative aspect-video w-full max-w-2xl rounded-lg overflow-hidden border-2 border-gray-200">
              <img
                src={existingCoverImage}
                alt="Current cover image"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setExistingCoverImage(undefined)}
                className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          )}
          <ImageUpload
            value={coverImage}
            onChange={(files) => {
              setCoverImage(files);
              if (files.length > 0) {
                setExistingCoverImage(undefined);
              }
            }}
            maxFiles={1}
            bucket="blog-content"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Tags (Shared)
          </label>
          <div className="space-y-4">
            <TagSelector
              selectedTags={selectedTags}
              onChange={handleTagsChange}
            />
            {selectedTags.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">Selected tags:</p>
                <p className="text-sm text-blue-600">
                  {selectedTags.join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium mb-2 text-gray-700"
          >
            Status *
          </label>
          <select
            id="status"
            name="status"
            required
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 text-gray-900 bg-white block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Drafts are only visible to you in the admin panel
          </p>
        </div>

        <div className="flex justify-end gap-4">
          {mode === 'edit' && (
            <button
              type="button"
              onClick={() => (window.location.href = '/admin/blog')}
              className="bg-gray-200 hover:bg-gray-300 font-bold px-4 py-2 rounded-md text-gray-700 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 font-bold px-4 py-2 rounded-md text-white transition-colors"
          >
            {mode === 'create' ? 'Publish Post' : 'Update Post'}
          </button>
        </div>
      </div>
    </form>
  );
}
