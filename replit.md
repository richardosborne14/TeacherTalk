# AI Language Learning Companion

## Overview

An AI-powered English language learning application that provides a conversational, friendly teaching experience through a chat-based interface. The app features interactive exercises (fill-in-the-blank, matching games, free practice), progress tracking with skill meters and badges, and voice interaction capabilities. Built with a mobile-first approach emphasizing warmth and encouragement, inspired by conversational interfaces like Intercom and Duolingo's engagement patterns.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type safety
- Vite as the build tool and development server with HMR support
- Wouter for lightweight client-side routing
- Mobile-first responsive design (768px breakpoint)

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management and caching
- Local React state (useState) for UI interactions
- Query client configured with no automatic refetching, infinite stale time for controlled data freshness

**Component Architecture**
- Radix UI primitives for accessible, unstyled component foundations
- Custom component library in `/client/src/components` following atomic design principles
- Activity components (`FillInBlank`, `MatchingGame`, `FreePractice`) encapsulated with shared `ActivityWrapper`
- Framer Motion for animations and transitions
- Shadcn/ui design system with "new-york" style configuration

**Styling System**
- Tailwind CSS with custom configuration
- CSS variables for theming (light mode implemented, dark mode structure present)
- Design tokens: warm cream backgrounds (#FFF8F0), coral-red primary (#FF6B6B), custom spacing scale
- Typography: Inter/system-ui for body, optional serif (Merriweather) for headings
- Custom utility classes: `hover-elevate`, `active-elevate-2` for interaction states

**Key UI Patterns**
- Chat interface with bubble-based messages (user vs AI differentiation)
- Empty state with starter prompts for onboarding
- Expandable progress header showing level, streak, lessons completed, and badges
- Voice recorder modal with recording/playback states
- Loading and error states with retry capabilities
- Offline indicator for network status awareness

### Backend Architecture

**Server Framework**
- Express.js with TypeScript
- Custom middleware for request logging with response capture
- Vite middleware integration for development HMR
- Static file serving for production builds

**API Layer (Currently Mock)**
- Centralized API functions in `/client/src/utils/api.ts`
- Mock data simulates network delays and real API responses
- Designed endpoints ready for backend implementation:
  - `GET /api/conversation` - Fetch conversation history
  - `POST /api/messages` - Send user message, receive AI response
  - `POST /api/activities/submit` - Submit activity answers for grading
  - `GET /api/profile` - Fetch user profile and progress data
  - `POST /api/voice` - Send voice recordings (future implementation)

**Storage Interface**
- Abstract `IStorage` interface defined in `/server/storage.ts`
- In-memory implementation (`MemStorage`) for development
- CRUD methods for user management (create, get by ID, get by username)
- Designed to be replaced with database-backed implementation

**Planned Database Integration**
- Drizzle ORM configured with PostgreSQL dialect
- Schema defined in `/shared/schema.ts` (currently minimal user table)
- Neon serverless database driver configured
- Migration system setup with `drizzle-kit`

### External Dependencies

**UI Component Libraries**
- @radix-ui/* (20+ primitives): Accessible component foundations
- cmdk: Command palette component
- embla-carousel-react: Carousel functionality
- lucide-react: Icon library
- vaul: Drawer component
- framer-motion: Animation library
- react-hook-form + zod: Form validation

**Backend & Database**
- @neondatabase/serverless: PostgreSQL serverless driver
- drizzle-orm + drizzle-zod: ORM and schema validation
- connect-pg-simple: PostgreSQL session store (configured but not actively used)

**State & Data Management**
- @tanstack/react-query: Server state management
- wouter: Lightweight routing

**Development Tools**
- Vite plugins: Runtime error modal, cartographer (Replit integration), dev banner
- TypeScript with strict mode enabled
- ESBuild for server bundling in production

**Design & Styling**
- Tailwind CSS with autoprefixer
- class-variance-authority: Component variant management
- clsx + tailwind-merge: Utility class composition

**Future Integration Points**
- AI/LLM service for conversation and activity generation (not yet integrated)
- Voice recording/transcription service (UI ready, backend pending)
- Real-time features potentially using WebSockets (structure supports addition)
- Analytics/tracking service for user progress (data structure prepared)