import Cookies from 'js-cookie'

export const VIEWED_POSTS_COOKIE = 'viewed_posts'
export const LIKED_POSTS_COOKIE = 'liked_posts'

export function hasViewedPost(postId: string): boolean {
    const viewedPosts = Cookies.get(VIEWED_POSTS_COOKIE)
    return viewedPosts ? viewedPosts.split(',').includes(postId) : false
}

export function markPostAsViewed(postId: string): void {
    const viewedPosts = Cookies.get(VIEWED_POSTS_COOKIE)
    const posts = viewedPosts ? viewedPosts.split(',') : []
    if (!posts.includes(postId)) {
        posts.push(postId)
        Cookies.set(VIEWED_POSTS_COOKIE, posts.join(','), { expires: 365 })
    }
}

export function hasLikedPost(postId: string): boolean {
    const likedPosts = Cookies.get(LIKED_POSTS_COOKIE)
    return likedPosts ? likedPosts.split(',').includes(postId) : false
}

export function markPostAsLiked(postId: string): void {
    const likedPosts = Cookies.get(LIKED_POSTS_COOKIE)
    const posts = likedPosts ? likedPosts.split(',') : []
    if (!posts.includes(postId)) {
        posts.push(postId)
        Cookies.set(LIKED_POSTS_COOKIE, posts.join(','), { expires: 365 })
    }
}