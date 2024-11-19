import { client } from '@/lib/sanity'
import { Post } from '@/types/post'
import BlogPostCard from '@/components/BlogPostCard'

export default async function Home() {
    // Add a timestamp to avoid caching
    const posts = await client.fetch<Post[]>(`
        *[_type == "post"] {
            _id,
            _createdAt,
            title,
            "slug": slug.current,
            "author": {
                "name": author->name,
                "image": author->image
            },
            mainImage {
                asset-> {
                    _id,
                    url
                }
            },
            "categories": categories[]->{title},
            publishedAt,
            body
        } | order(publishedAt desc)
    `, {}, { cache: 'no-store' }) // Disable caching

    console.log('Fetched posts at:', new Date().toISOString())
    console.log('Posts data:', JSON.stringify(posts, null, 2))

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-12 text-center">Daily Work Blog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <BlogPostCard key={post._id} post={post} />
                ))}
            </div>
        </main>
    )
}
