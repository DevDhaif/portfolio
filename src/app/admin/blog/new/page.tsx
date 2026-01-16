'use client';
import { BilingualPostForm } from '@/components/BilingualPostForm';
import { createPost } from '../actions';

export default function NewPostPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Create New Post</h1>
      <BilingualPostForm mode="create" onSubmit={createPost} />
    </div>
  );
}
