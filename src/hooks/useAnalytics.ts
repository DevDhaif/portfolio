'use client'

export const useAnalytics = () => {
    const trackEvent = (action: string, category: string, label: string, value?: number) => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value
            })
        }
    }

    const trackPageView = (url: string) => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
                page_path: url
            })
        }
    }

    const trackBlogPost = (post: {
        title: string,
        slug: string,
        tags: string[]
    }) => {
        trackEvent(
            'view_post',
            'blog',
            post.title,
        )
        trackEvent(
            'view_tags',
            'blog',
            post.tags.join(',')
        )
    }

    const trackBlogInteraction = (
        type: 'like' | 'share' | 'comment',
        postSlug: string
    ) => {
        trackEvent(
            `blog_${type}`,
            'interaction',
            postSlug
        )
    }

    return {
        trackEvent,
        trackPageView,
        trackBlogPost,
        trackBlogInteraction
    }
}