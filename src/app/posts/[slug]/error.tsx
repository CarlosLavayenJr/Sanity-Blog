'use client'

export default function Error() {
    return (
        <div className="max-w-4xl mx-auto p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong!</h1>
            <p className="text-gray-600 mb-4">
                We couldn't load this blog post. Please try again later.
            </p>
            <button
                onClick={() => window.location.reload()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Try Again
            </button>
        </div>
    )
}
