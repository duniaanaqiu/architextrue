# ARCHITEXTRUE - Construction Company Website

A production-ready Next.js 16 website for ARCHITEXTRUE, a premium residential construction company based in Yogyakarta, Indonesia.

## Features

- **Modern Tech Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **SEO Optimized**: Complete SEO infrastructure with metadata, sitemap, robots.txt, Open Graph, and Twitter Cards
- **Production Ready**: Prisma ORM with Neon PostgreSQL, UploadThing for file uploads, Auth.js for authentication
- **Bilingual Navigation**: English navigation labels with Indonesian content
- **Design System**: Complete design system implementation from Stitch AI export
- **Performance**: Optimized for Core Web Vitals with static generation and image optimization
- **Accessibility**: WCAG compliant with semantic HTML and proper ARIA attributes

## Project Structure

```
architextrue/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── layout/         # Layout components
│   │   ├── shared/         # Shared UI components
│   │   └── sections/       # Page sections
│   ├── config/             # App configuration
│   ├── lib/                # Utility libraries
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript types
│   ├── styles/             # Global styles
│   └── prisma/             # Database schema
├── public/                 # Static assets
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Neon PostgreSQL recommended)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Update the `.env.local` file with your database credentials and API keys.

4. Set up the database:
   ```bash
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## SEO Features

- Dynamic metadata generation
- Structured data (Schema.org) for Organization, LocalBusiness, Service, etc.
- Automatic sitemap generation
- Open Graph and Twitter Card images
- Robots.txt configuration
- Web app manifest for PWA
- Canonical URL management

## Database Schema

The application uses Prisma ORM with PostgreSQL. Key models include:

- **User**: Authentication and user management
- **Post**: Blog posts with categories, tags, and SEO metadata
- **Portfolio**: Construction project portfolio with images and testimonials
- **Service**: Construction services with features and process steps
- **FAQ**: Frequently asked questions by category
- **Testimonial**: Client testimonials with ratings
- **ContactLead**: Contact form submissions
- **SiteSetting**: Configurable site settings

## Deployment

The application is configured for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy!

## Design System

The design system is based on the Stitch AI export with:

- **Colors**: Professional construction palette with navy blue, warm gold accents
- **Typography**: Playfair Display for headlines, Inter for body text
- **Spacing**: 8px base unit with generous section gaps
- **Components**: Reusable UI components following the design system specifications

## License

Proprietary - All rights reserved by ARCHITEXTRUE