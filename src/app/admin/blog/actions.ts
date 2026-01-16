'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const generateSlug = (title: string) => {
  const baseSlug = title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
    .substring(0, 30);

  const timestamp = Date.now().toString().slice(-6);

  return `post-${timestamp}-${baseSlug}`;
};
export async function createPost(formData: FormData) {
  try {
    const supabase = await createClient();

    const contentEn = JSON.parse(formData.get('content_en') as string);
    const contentAr = JSON.parse(formData.get('content_ar') as string);
    const tags = JSON.parse(formData.get('tags') as string);
    const published = formData.get('status') === 'published';
    
    const titleEn = formData.get('title_en') as string;
    const titleAr = formData.get('title_ar') as string;
    const descriptionEn = formData.get('description_en') as string;
    const descriptionAr = formData.get('description_ar') as string;

    const { error: insertError } = await supabase
      .from('posts')
      .insert([
        {
          title_en: titleEn,
          title_ar: titleAr,
          description_en: descriptionEn,
          description_ar: descriptionAr,
          content_en: contentEn,
          content_ar: contentAr,
          cover_image: formData.get('coverImage'),
          tags,
          slug: generateSlug(titleEn || ''),
          published,
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return { error: 'Failed to create post', details: insertError };
    }

    revalidatePath('/blog');
    // Instead of redirect, return success
    return { success: true };
  } catch (error) {
    console.error('Error in createPost:', error);
    return { error: 'Failed to create post', details: error };
  }
}

export async function updatePost(postId: string, formData: FormData) {
  try {
    const supabase = await createClient();

    const contentEn = JSON.parse(formData.get('content_en') as string);
    const contentAr = JSON.parse(formData.get('content_ar') as string);
    const tags = JSON.parse(formData.get('tags') as string);
    const published = formData.get('status') === 'published';
    
    const titleEn = formData.get('title_en') as string;
    const titleAr = formData.get('title_ar') as string;
    const descriptionEn = formData.get('description_en') as string;
    const descriptionAr = formData.get('description_ar') as string;

    const updateData: any = {
      title_en: titleEn,
      title_ar: titleAr,
      description_en: descriptionEn,
      description_ar: descriptionAr,
      content_en: contentEn,
      content_ar: contentAr,
      tags,
      published,
      updated_at: new Date().toISOString(),
    };

    const coverImage = formData.get('coverImage') as string;
    if (coverImage) {
      updateData.cover_image = coverImage;
    }

    const { error: updateError } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', postId);

    if (updateError) {
      console.error('Update error:', updateError);
      return { error: 'Failed to update post', details: updateError };
    }

    revalidatePath('/blog');
    revalidatePath('/admin/blog');
    return { success: true };
  } catch (error) {
    console.error('Error in updatePost:', error);
    return { error: 'Failed to update post', details: error };
  }
}

export async function deletePost(postId: string) {
  try {
    const supabase = await createClient();

    // Fetch the post
    const { data: post, error: fetchError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (fetchError) throw fetchError;

    if (post) {
      console.log('Found post:', post);
      console.log('Raw content:', post.content);

      // Delete cover image if exists
      if (post.cover_image) {
        console.log('Deleting cover image:', post.cover_image);
        const { error: coverImageError } = await supabase.storage
          .from('blog-content')
          .remove([post.cover_image]);

        if (coverImageError) {
          console.error('Error deleting cover image:', coverImageError);
        } else {
          console.log('Successfully deleted cover image');
        }
      }

      // Delete content images
      try {
        // Make sure content is parsed properly
        const content =
          typeof post.content === 'string'
            ? JSON.parse(post.content)
            : post.content;

        console.log('Parsed content:', content);

        const imagesToDelete: string[] = [];

        // Modified findImages function
        function findImages(node: any) {
          console.log('Processing node:', node);

          // Check if it's an image node
          if (node.type === 'image') {
            const src = node.attrs.src;
            console.log('Found image src:', src);

            // If it's a filename from our storage
            if (typeof src === 'string' && !src.startsWith('http')) {
              imagesToDelete.push(src);
              console.log('Added to delete list:', src);
            }
          }

          // Process child nodes
          if (node.content && Array.isArray(node.content)) {
            node.content.forEach(findImages);
          }
        }

        // Start the recursive search
        findImages(content);

        console.log('Final list of images to delete:', imagesToDelete);

        // Delete the images if we found any
        if (imagesToDelete.length > 0) {
          console.log('Attempting to delete images:', imagesToDelete);
          const { data, error: deleteImagesError } = await supabase.storage
            .from('blog-content')
            .remove(imagesToDelete);

          if (deleteImagesError) {
            console.error('Error deleting content images:', deleteImagesError);
          } else {
            console.log('Successfully deleted images. Result:', data);
          }
        } else {
          console.log('No content images to delete');
        }
      } catch (e) {
        console.error('Error handling content images:', e);
      }

      // Delete the post
      console.log('Deleting post from database');
      const { error: deleteError } = await supabase
        .from('posts')
        .delete()
        .match({ id: postId });

      if (deleteError) {
        console.error('Error deleting post:', deleteError);
        throw deleteError;
      }

      console.log('Post deleted successfully');
      revalidatePath('/admin/blog');
      revalidatePath('/blog');
    }
  } catch (error) {
    console.error('Delete operation error:', error);
    throw new Error('Failed to delete post');
  }
}
export async function incrementViews(postId: string) {
  const cookieStore = await cookies();
  const viewedPosts = cookieStore.get('viewed_posts')?.value || '';

  if (!viewedPosts.includes(postId)) {
    const supabase = await createClient();

    const { error } = await supabase.rpc('increment_views', {
      post_id: postId,
    });
    if (error) console.error('Error incrementing views:', error);

    const newViewedPosts = viewedPosts ? `${viewedPosts},${postId}` : postId;
    cookieStore.set('viewed_posts', newViewedPosts, {
      maxAge: 60 * 60,
    });

    revalidatePath('/blog/[slug]');
    return true;
  }
  return false;
}

export async function toggleLike(postId: string) {
  try {
    const cookieStore = await cookies();
    const likedPosts = cookieStore.get('liked_posts')?.value || '';

    if (!likedPosts.includes(postId)) {
      const supabase = await createClient();

      const { error: rpcError } = await supabase.rpc('increment_likes', {
        post_id: postId,
      });

      if (rpcError) {
        console.error('RPC Error:', rpcError);
        return { error: rpcError.message };
      }

      const { data: post, error: fetchError } = await supabase
        .from('posts')
        .select('likes_count')
        .eq('id', postId)
        .single();

      if (fetchError) {
        console.error('Fetch Error:', fetchError);
        return { error: fetchError.message };
      }

      const newLikedPosts = likedPosts ? `${likedPosts},${postId}` : postId;
      cookieStore.set('liked_posts', newLikedPosts, {
        maxAge: 60 * 60 * 24 * 365,
      });

      revalidatePath('/blog/[slug]');
      return { success: true, likes: post.likes_count };
    }

    return { error: 'Already liked' };
  } catch (error) {
    console.error('Toggle Like Error:', error);
    return { error: 'Failed to toggle like' };
  }
}
