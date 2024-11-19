# Daily Work Blog

A personal blog application built with Next.js 14 and Sanity CMS, featuring a modern and interactive user interface.

## Features

- Server-side rendering for optimal performance
- Interactive blog post cards with smooth animations
- Responsive design using Tailwind CSS
- Rich text content using Portable Text
- Image optimization with Next.js Image component
- CMS integration with Sanity.io

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io
- **Package Manager**: pnpm

## Getting Started

1. Clone the repository:
```bash
git clone [your-repo-url]
cd my-app
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env.local` file with your Sanity credentials:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
```

4. Run the development server:
```bash
pnpm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/src/app`: Next.js app router pages
- `/src/components`: Reusable React components
- `/src/lib`: Utility functions and configurations
- `/src/types`: TypeScript type definitions
- `/sanity`: Sanity CMS configuration and schemas

## Contributing

Feel free to open issues and pull requests!
