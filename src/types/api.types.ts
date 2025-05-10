import { type CookieOptions } from "@supabase/ssr";
import { Session } from '@supabase/supabase-js'

export interface WakatimeResponse {
    data: {
        text: string;
        formatted_time: string;
        total_seconds: number;
        daily_average: number;
        range: {
            start: string;
            end: string;
        };
    };
}
export interface PostsResponse {
    count: number;
}
export interface CookieValue {
    name: string
    value: string
    options?: CookieOptions
}
export interface ImageUploadProps {
    onChange: (files: File[]) => void
    value: File[]
    maxFiles?: number
    bucket?: string
    multiple?: boolean
    currentImage?: string
    currentImages?: string[]
}
export interface SessionContextType {
    session: Session | null
    loading: boolean
}
 export interface JsonLdProps {
    schema: Record<string, any>;
}