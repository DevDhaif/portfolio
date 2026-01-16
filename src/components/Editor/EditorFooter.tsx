// src/components/Editor/EditorFooter.tsx
'use client';

import { memo } from 'react';
import { Clock, Type, Hash } from 'lucide-react';

interface EditorStats {
  words: number;
  characters: number;
  readingTime: number;
}

interface EditorFooterProps {
  stats: EditorStats;
}

export const EditorFooter = memo(({ stats }: EditorFooterProps) => {
  return (
    <div
      className="editor-footer sticky bottom-0 flex items-center justify-between px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600 z-10"
      aria-label="Editor statistics"
    >
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1" title="Word count">
          <Type className="h-3 w-3" />
          {stats.words} words
        </span>
        <span className="flex items-center gap-1" title="Character count">
          <Hash className="h-3 w-3" />
          {stats.characters} chars
        </span>
        <span
          className="flex items-center gap-1"
          title="Estimated reading time"
        >
          <Clock className="h-3 w-3" />
          {stats.readingTime} min read
        </span>
      </div>
      <div className="text-gray-500">
        <span>Tip: Drag & drop images or paste from clipboard</span>
      </div>
    </div>
  );
});

EditorFooter.displayName = 'EditorFooter';
