import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import { deletePost } from './actions';
import { DeletePostButton } from '@/components/DeletePostButton';

export default async function BlogPostsPage() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
  }

  const postsWithUrls = posts?.map((post) => {
    let coverImageUrl = post.cover_image;

    if (post.cover_image && !post.cover_image.startsWith('http')) {
      coverImageUrl = supabase.storage
        .from('blog-content')
        .getPublicUrl(post.cover_image).data.publicUrl;
    }

    return {
      ...post,
      coverImageUrl,
    };
  });

  return (
    <div className="space-y-6 bg-white min-h-screen p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add New Post
        </Link>
      </div>

      <div className="grid gap-6">
        {postsWithUrls?.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start gap-4">
              {post.coverImageUrl && (
                <div className="relative w-48 h-32">
                  <Image
                    src={post.coverImageUrl}
                    alt={post.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold">{post.title}</h2>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          post.published
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-1">{post.description}</p>

                    {/* Show tags if any */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-2 flex gap-2">
                        {post.tags.map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Show creation date */}
                    <p className="text-sm text-gray-500 mt-2">
                      Created: {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                    >
                      Edit
                    </Link>
                    <DeletePostButton postId={post.id} onDelete={deletePost} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
