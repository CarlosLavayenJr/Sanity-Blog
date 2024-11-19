import { client } from '@/lib/sanity'
import { Post } from '@/types/post'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'

interface Props {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    const posts = await client.fetch<Post[]>(`
        *[_type == "post"] {
            "slug": slug.current
        }
    `)

    return posts.map((post) => ({
        slug: post.slug
    }))
}

export default async function PostPage({ params }: Props) {
    const post = await client.fetch<Post | null>(`
        *[_type == "post" && slug.current == $slug][0] {
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
        }
    `, { slug: params.slug })

    if (!post) {
        notFound()
    }

    return (
        <article className="max-w-4xl mx-auto p-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                {post.author && (
                    <div className="flex items-center mb-4">
                        <span className="text-gray-600">By {post.author.name}</span>
                    </div>
                )}
                <time className="text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString()}
                </time>
            </header>

            {post.mainImage?.asset?.url && (
                <div className="relative w-full h-[400px] mb-8">
                    <Image
                        src={post.mainImage.asset.url}
                        alt={post.title}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
            )}

            <div className="prose max-w-none">
                <PortableText value={post.body} />
            </div>
        </article>
    )
}
