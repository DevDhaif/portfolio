// src/hooks/useEditorStats.ts
import { useState, useEffect, useCallback } from 'react';
import { Editor } from '@tiptap/react';

interface EditorStats {
  words: number;
  characters: number;
  charactersWithSpaces: number;
  paragraphs: number;
  sentences: number;
  readingTime: number; // in minutes
}

const WORDS_PER_MINUTE = 200;

/**
 * Hook to track editor statistics (word count, character count, reading time)
 */
export const useEditorStats = (editor: Editor | null): EditorStats => {
  const [stats, setStats] = useState<EditorStats>({
    words: 0,
    characters: 0,
    charactersWithSpaces: 0,
    paragraphs: 0,
    sentences: 0,
    readingTime: 0,
  });

  const calculateStats = useCallback(() => {
    if (!editor) return;

    const text = editor.state.doc.textContent;

    // Skip heavy calculations for very large documents
    if (text.length > 50000) {
      setStats({
        words: Math.floor(text.length / 5), // Estimate
        characters: text.length,
        charactersWithSpaces: text.length,
        paragraphs: 0,
        sentences: 0,
        readingTime: Math.ceil(text.length / 5 / WORDS_PER_MINUTE),
      });
      return;
    }

    // Word count (split by whitespace, filter empty)
    const words = text.split(/\s+/).filter((word) => word.length > 0);
    const wordCount = words.length;

    // Character counts
    const charactersWithSpaces = text.length;
    const characters = text.replace(/\s/g, '').length;

    // Paragraph count (count block-level nodes)
    let paragraphs = 0;
    editor.state.doc.descendants((node) => {
      if (node.type.name === 'paragraph' && node.textContent.trim()) {
        paragraphs++;
      }
    });

    // Sentence count (rough estimate based on punctuation)
    const sentences = (text.match(/[.!?]+/g) || []).length;

    // Reading time (based on average reading speed)
    const readingTime = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));

    setStats({
      words: wordCount,
      characters,
      charactersWithSpaces,
      paragraphs: Math.max(paragraphs, 1),
      sentences,
      readingTime,
    });
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    // Calculate initial stats
    calculateStats();

    // Throttle updates to every 2 seconds
    let lastUpdate = Date.now();
    let timeoutId: NodeJS.Timeout;

    const handleUpdate = () => {
      const now = Date.now();
      const timeSinceLastUpdate = now - lastUpdate;

      if (timeSinceLastUpdate > 2000) {
        // Update immediately if 2+ seconds passed
        calculateStats();
        lastUpdate = now;
      } else {
        // Schedule update for later
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          calculateStats();
          lastUpdate = Date.now();
        }, 2000 - timeSinceLastUpdate);
      }
    };

    editor.on('update', handleUpdate);

    return () => {
      editor.off('update', handleUpdate);
      clearTimeout(timeoutId);
    };
  }, [editor, calculateStats]);

  return stats;
};
