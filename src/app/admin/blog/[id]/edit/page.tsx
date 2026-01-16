'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { BilingualPostForm } from '@/components/BilingualPostForm';
import { updatePost } from '../../actions';
import { useParams } from 'next/navigation';

export default function EditPostPage() {
  const params = useParams();
  const postId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<any>(null);

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
      setLoading(false);
    }

    loadPost();
  }, [postId]);

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

  const handleUpdate = async (formData: FormData) => {
    return await updatePost(postId, formData);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Edit Post</h1>
      <BilingualPostForm
        mode="edit"
        postId={postId}
        initialData={{
          title_en: post.title_en,
          title_ar: post.title_ar,
          description_en: post.description_en,
          description_ar: post.description_ar,
          content_en: post.content_en,
          content_ar: post.content_ar,
          cover_image: post.cover_image,
          tags: Array.isArray(post.tags) ? post.tags : [],
          published: post.published,
        }}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
