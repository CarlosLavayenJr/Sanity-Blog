import { client } from '@/lib/sanity'
import { Post } from '@/types/post'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

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
        <div className="max-w-4xl mx-auto px-8">
            <nav className="pt-8 mb-12">
                <Link
                    href="/"
                    className="inline-flex items-center font-medium text-black hover:text-gray-700 transition-colors"
                >
                    <svg
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                    Back
                </Link>
            </nav>
            <article>
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
                    <div className="relative aspect-[16/9] w-full mb-8 sm:aspect-[21/9] md:aspect-[21/9] lg:aspect-[21/9] shadow-2xl shadow-black/10 rounded-lg overflow-hidden">
                        <Image
                            src={post.mainImage.asset.url}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                            priority
                        />
                    </div>
                )}

                <div className="prose max-w-none">
                    <PortableText value={post.body} />
                </div>
            </article>
        </div>
    )
}
