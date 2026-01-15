'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Editor } from '@/components/Editor';
import ImageUpload from '@/components/ImageUpload';
import { updatePost } from '../../actions';
import { TagSelector } from '@/components/TagSelector';
import { useParams } from 'next/navigation';

export default function EditPostPage() {
  const params = useParams();
  const postId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<any>(null);
  const [coverImage, setCoverImage] = useState<File[]>([]);
  const [content, setContent] = useState({});
  const [editorImages, setEditorImages] = useState<Map<string, File>>(
    new Map()
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [status, setStatus] = useState('draft');

  useEffect(() => {
    async function loadPost() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) {
        console.error('Error loading post:', error);
        return;
      }

      setPost(data);
      setContent(data.content);
      setSelectedTags(Array.isArray(data.tags) ? data.tags : []);
      setStatus(data.published ? 'published' : 'draft');
      setLoading(false);
    }

    loadPost();
  }, [postId]);

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  async function handleSubmit(formData: FormData) {
    try {
      const supabase = createClient();
      let coverImageUrl = post.cover_image;

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

        // Delete old cover image if exists
        if (post.cover_image && !post.cover_image.startsWith('http')) {
          await supabase.storage
            .from('blog-content')
            .remove([post.cover_image]);
        }
      }

      // Process content images (same as create)
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
      submitFormData.set('status', status);

      const result = await updatePost(postId, submitFormData);

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.success) {
        window.location.href = '/admin/blog';
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to update post');
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 bg-white min-h-screen">
        <p className="text-gray-900">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 bg-white min-h-screen">
        <p className="text-gray-900">Post not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Edit Post</h1>

      <form action={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={post.title}
            className="mt-1 text-gray-900 bg-white block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            defaultValue={post.description}
            className="mt-1 text-gray-900 bg-white block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Cover Image
            {post.cover_image && (
              <span className="text-xs text-gray-500 ml-2">
                (Leave empty to keep current image)
              </span>
            )}
          </label>
          <ImageUpload
            value={coverImage}
            onChange={setCoverImage}
            maxFiles={1}
            bucket="blog-content"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Content *
          </label>
          <Editor
            content={content}
            onChange={setContent}
            onTempFileChange={setEditorImages}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Tags
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
          <button
            type="button"
            onClick={() => (window.location.href = '/admin/blog')}
            className="bg-gray-200 hover:bg-gray-300 font-bold px-4 py-2 rounded-md text-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 font-bold px-4 py-2 rounded-md text-white transition-colors"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
}
