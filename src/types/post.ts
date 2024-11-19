// Define TypeScript interfaces for our blog post
export interface Post {
    _id: string;
    _createdAt: string;
    title: string;
    slug: string;
    author: {
        name: string;
        image: {
            asset: {
                _id: string;
                url: string;
            };
        };
    };
    mainImage: {
        asset: {
            _id: string;
            url: string;
        };
    };
    categories: Array<{
        title: string;
    }>;
    publishedAt: string;
    body: any; // This will be portable text content
}

export interface SanityResponse {
    result: Post[];
}
