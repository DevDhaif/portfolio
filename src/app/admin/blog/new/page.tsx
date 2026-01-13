'use client';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Editor } from '@/components/Editor';
import ImageUpload from '@/components/ImageUpload';
import { createPost } from '../actions';
import { TagSelector } from '@/components/TagSelector';
export default function NewPostPage() {
  const [coverImage, setCoverImage] = useState<File[]>([]);
  const [content, setContent] = useState({});
  const [editorImages, setEditorImages] = useState<Map<string, File>>(
    new Map()
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
    const tagsInput = document.getElementById('tags') as HTMLInputElement;
    if (tagsInput) {
      tagsInput.value = tags.join(', ');
    }
  };
  async function handleSubmit(formData: FormData) {
    try {
      const supabase = createClient();
      let coverImageUrl = null;
      if (coverImage.length > 0) {
        const fileName = `${Date.now()}-${coverImage[0].name}`;
        const { error: uploadError } = await supabase.storage
          .from('blog-content')
          .upload(fileName, coverImage[0]);
        if (uploadError) throw uploadError;

        // Get the full public URL instead of just the filename
        const {
          data: { publicUrl },
        } = supabase.storage.from('blog-content').getPublicUrl(fileName);
        coverImageUrl = publicUrl;
      }
      let processedContent = JSON.parse(JSON.stringify(content));
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

              // Get the full public URL instead of just the filename
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
      processedContent = await processImages(processedContent);
      const submitFormData = new FormData();
      submitFormData.set('title', formData.get('title') as string);
      submitFormData.set('description', formData.get('description') as string);
      submitFormData.set('content', JSON.stringify(processedContent));
      submitFormData.set('coverImage', coverImageUrl || '');
      submitFormData.set('tags', JSON.stringify(selectedTags));
      const result = await createPost(submitFormData);
      if (result?.error) {
        throw new Error(result.error);
      }
      if (result?.success) {
        window.location.href = '/admin/blog';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

      <form action={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="mt-1 text-gray-800 block w-full rounded-md border px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            className="mt-1 text-gray-800 block w-full rounded-md border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Cover Image</label>
          <ImageUpload
            value={coverImage}
            onChange={setCoverImage}
            maxFiles={1}
            bucket="blog-content"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Content *</label>
          <Editor
            content=""
            onChange={setContent}
            onTempFileChange={setEditorImages}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <div className="space-y-4">
            <TagSelector
              selectedTags={selectedTags}
              onChange={handleTagsChange}
            />
            {selectedTags.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-text-secondary mb-1">
                  Selected tags:
                </p>
                <p className="text-sm text-accent-primary">
                  {selectedTags.join(', ')}{' '}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className="bg-text-primary font-bold px-4 py-2 rounded-md  text-background transition-colors"
          >
            {' '}
            Publish Post{' '}
          </button>
        </div>
      </form>
    </div>
  );
}
