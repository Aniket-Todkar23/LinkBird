# LinkBird - Lead Generation & Campaign Management Platform

A modern, production-ready LinkedIn lead generation and campaign management platform built with Next.js 15, TypeScript, and the latest web technologies.

## 🚀 Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth (credentials + Google OAuth)
- **State Management**: 
  - TanStack Query (React Query) for server state
  - Zustand for client-side state
- **Language**: TypeScript
- **Deployment**: Ready for Vercel, Netlify, or any Node.js hosting

## 📁 Project Structure

```
linkbird-nextjs/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard page
│   ├── leads/            # Leads management
│   ├── campaigns/        # Campaign management
│   └── layout.tsx        # Root layout
├── components/           # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   └── providers/        # Context providers
├── lib/                  # Utility libraries
│   ├── stores/           # Zustand stores
│   ├── auth.ts           # Better Auth configuration
│   ├── db.ts             # Database connection
│   ├── schema.ts         # Drizzle schema
│   └── queries.ts        # Database queries
├── drizzle/              # Database migrations
└── public/               # Static assets
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Google OAuth credentials (for Google login)

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd linkbird-nextjs
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/linkbird"

# Better Auth
BETTER_AUTH_SECRET="your-random-secret-key-32-chars-min"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth (get from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Next.js
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
```

### 3. Database Setup

#### Option A: Local PostgreSQL

1. Install PostgreSQL locally
2. Create a database named `linkbird`
3. Update DATABASE_URL in `.env.local`

#### Option B: Cloud Database (Recommended)

Use services like:
- **Neon** (recommended): https://neon.tech
- **Supabase**: https://supabase.com
- **PlanetScale**: https://planetscale.com
- **Railway**: https://railway.app

### 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
5. Copy Client ID and Client Secret to `.env.local`

### 5. Run Database Migrations

```bash
# Generate migration files
npm run db:generate

# Run migrations
npm run db:migrate
```

### 6. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🎯 Features Implemented

### ✅ Authentication System
- Email/password registration and login
- Google OAuth integration
- Protected routes with middleware
- Session management with Better Auth
- Clean, responsive auth UI

### ✅ Dashboard Layout
- Collapsible sidebar navigation
- User profile section
- Active state indicators
- Responsive design

### ✅ Leads Management
- Infinite scrolling leads table
- Advanced search and filtering
- Lead detail side sheets
- Status management
- Campaign association

### ✅ Campaigns Overview
- Campaign statistics and progress tracking
- Status indicators and progress bars
- Campaign filtering and sorting
- Success rate calculations

### ✅ Database Schema
- Users, campaigns, leads, LinkedIn accounts tables
- Proper relationships and constraints
- Type-safe queries with Drizzle ORM

## 🔧 Development Commands

```bash
# Development
npm run dev                 # Start development server
npm run build              # Build for production
npm run start              # Start production server
npm run lint               # Run ESLint

# Database
npm run db:generate        # Generate migration files
npm run db:migrate         # Run database migrations
npm run db:studio          # Open Drizzle Studio (database GUI)
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Update BETTER_AUTH_URL and NEXT_PUBLIC_BETTER_AUTH_URL to your production domain
4. Deploy!

### Other Platforms

- **Netlify**: Configure build settings for Next.js
- **Railway**: Add PostgreSQL addon and deploy
- **DigitalOcean**: Use App Platform with Node.js

## 📱 Mobile Responsiveness

The application is fully responsive with:
- Collapsible mobile navigation
- Touch-friendly interactions
- Optimized layouts for all screen sizes
- Progressive enhancement

## 🔒 Security Features

- CSRF protection with Better Auth
- Secure session management
- SQL injection prevention with Drizzle ORM
- Environment variable validation
- Protected API routes

## 🎨 UI/UX Features

- Clean, professional LinkBird.ai inspired design
- Smooth animations and transitions
- Loading states and skeleton UI
- Toast notifications
- Keyboard navigation support
- Dark mode ready (implement as needed)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the GitHub issues page
2. Ensure all environment variables are set correctly
3. Verify database connection and migrations
4. Check Google OAuth configuration

## 🔄 Next Steps

- [ ] Implement LinkedIn integration
- [ ] Add email campaign functionality
- [ ] Set up automated testing
- [ ] Add analytics and reporting
- [ ] Implement team collaboration features
- [ ] Add bulk actions for leads
- [ ] Set up monitoring and logging