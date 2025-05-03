// src/hooks/useTempFiles.ts
import { useState, useCallback } from 'react';

export const useTempFiles = (onTempFileChange?: (files: Map<string, File>) => void) => {
    const [tempFiles, setTempFiles] = useState<Map<string, File>>(new Map());

    const updateTempFiles = useCallback((newTempFiles: Map<string, File>) => {
        setTempFiles(newTempFiles);
        onTempFileChange?.(newTempFiles);
    }, [onTempFileChange]);

    const addTempFile = useCallback((url: string, file: File) => {
        const newFiles = new Map(tempFiles).set(url, file);
        updateTempFiles(newFiles);
        return url;
    }, [tempFiles, updateTempFiles]);

    return {
        tempFiles,
        updateTempFiles,
        addTempFile
    };
};