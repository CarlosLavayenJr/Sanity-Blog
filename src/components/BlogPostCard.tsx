'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/types/post'
import { useState } from 'react'
import { PortableText } from '@portabletext/react'

interface BlogPostCardProps {
    post: Post
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
    const [isShaking, setIsShaking] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleMouseEnter = () => {
        if (!isShaking) {
            setIsShaking(true);
            setTimeout(() => {
                setIsShaking(false);
            }, 750);
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        // Don't expand if clicking on the title link
        if ((e.target as HTMLElement).closest('a')) return;
        setIsExpanded(!isExpanded);
    };

    // Use the direct URL from Sanity if available
    const imageUrl = post.mainImage?.asset?.url;
    console.log('Post image URL:', imageUrl);

    return (
        <article 
            className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500 cursor-pointer
                ${isShaking ? 'animate-shake' : ''} 
                ${isExpanded ? 'lg:col-span-2 lg:row-span-2 md:col-span-2' : ''}
                group`}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
        >
            <div className={`relative ${isExpanded ? 'h-72' : 'h-48'} transition-all duration-500 bg-gray-100`}>
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">
                    <Link href={`/posts/${post.slug}`} className="hover:text-blue-600">
                        {post.title}
                    </Link>
                </h2>
                <div className="flex items-center mb-4">
                    {post.author?.image && (
                        <Image
                            src={post.author.image.asset.url}
                            alt={post.author.name}
                            width={24}
                            height={24}
                            className="rounded-full mr-2"
                        />
                    )}
                    <span className="text-gray-600">{post.author?.name}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories?.map((category, idx) => (
                        <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-sm">
                            {category.title}
                        </span>
                    ))}
                </div>
                <time className="text-gray-500 text-sm block mb-4">
                    {new Date(post.publishedAt).toLocaleDateString()}
                </time>
                
                <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="prose prose-sm max-w-none">
                        {post.body && <PortableText value={post.body} />}
                    </div>
                </div>
                
                <button 
                    className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(!isExpanded);
                    }}
                >
                    {isExpanded ? 'Show less' : 'Read more'}
                </button>
            </div>
        </article>
    )
}
