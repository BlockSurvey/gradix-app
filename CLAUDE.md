# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gradix is an application evaluation system built with Next.js 13 that helps automate the process of reviewing thousands of applications. The system transforms a brief into a complete evaluation pipeline with automatic filtering, rubric-based scoring, and detailed justifications.

## Tech Stack

- **Framework**: Next.js 13.1.6 with TypeScript
- **Styling**: Tailwind CSS with custom breakpoint (xs: 475px)
- **UI Components**: shadcn/ui - A component library built with Radix UI and Tailwind CSS
- **State Management**: Zustand
- **Code Quality**: ESLint, Prettier, Husky with lint-staged pre-commit hooks

## Development Commands

```bash
# Development (with Turbo)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Project Structure

The codebase uses the Next.js Pages Router pattern:

- **src/pages/**: Next.js pages and API routes
- **src/stores/**: Zustand state management stores
- **src/styles/**: Global styles and Tailwind configuration
- **Path alias**: `@/*` maps to `./src/*`

## Code Quality Standards

### Pre-commit Hooks
All commits trigger lint-staged which runs:
1. TypeScript type checking (`tsc --noEmit`)
2. ESLint on all TS/TSX/JS files
3. Prettier formatting on all files

### Linting Configuration
- Extends Next.js core-web-vitals, ESLint recommended, and TypeScript ESLint recommended
- Prettier integration enforced (spaces, not tabs)

## Key Architecture Decisions

1. **Pages Router**: Using Next.js Pages Router (not App Router)
2. **State Management**: Zustand for global state (example store at src/stores/zustand.store.tsx)
3. **TypeScript**: Strict mode enabled with comprehensive type checking
4. **API Routes**: Located in src/pages/api/ and automatically mapped to /api/*
5. **UI Components**: shadcn/ui components located in src/components/ui/ - prefer these over custom components when available

## UI Component Guidelines

### shadcn/ui Usage
- **Import Path**: All shadcn/ui components use `@/components/ui/` imports
- **Available Components**: Button, Dialog, Card, Badge, and other pre-configured components
- **Customization**: Components can be customized via className props while maintaining accessibility
- **Priority**: Always prefer shadcn/ui components over building custom ones when functionality matches

## Design System Guidelines

### Consistent Sidebar Pattern
All pages use a standardized left sidebar with the following structure:
- **Width**: `w-full lg:w-56` (responsive)
- **Background**: `bg-[#efeded]` with `border-r border-gray-400`
- **Header Section**: Contains GradixIcon and "gradix.ai" text with `font-medium` weight
- **Navigation**: Uses SidebarItem components with consistent active states

### Color Scheme
- **Primary Background**: `bg-[#f9f9f9]` for main content areas
- **Card Background**: `bg-white` with subtle borders
- **Sidebar Background**: `bg-[#efeded]`
- **Active States**: `bg-[rgba(179,173,173,0.4)]` for navigation
- **Text Colors**: 
  - Primary: `text-gray-600` for headers
  - Secondary: `text-gray-700` for navigation
  - Subtle: `text-gray-500` for icons

### Typography Standards
- **Main Headers**: `text-lg lg:text-xl font-medium text-gray-600`
- **Brand Text**: `text-xl lg:text-2xl font-medium text-gray-500`
- **Navigation Labels**: `font-medium text-sm lg:text-sm`
- **Button Text**: `text-sm` with appropriate font weights

### Component Standards
- **Buttons**: Consistent padding `px-4 py-2` with `text-sm`
- **Cards**: Use `border-[0.4px] border-[rgba(0,0,0,0.2)]` for subtle borders
- **Input Fields**: Consistent height `h-10` or `h-11` with border styling
- **Icons**: Standard sizes `w-5 h-5 lg:w-6 lg:h-6` for navigation

### Layout Patterns
- **Main Container**: `min-h-screen` with responsive flex layout
- **Content Padding**: `p-4 lg:p-8` for main content areas
- **Card Padding**: `p-4` or `p-6` depending on content density
- **Responsive Breakpoints**: Use `lg:` prefix for desktop variations

### Navigation Consistency
- All pages use `router.push()` for navigation instead of state-only changes
- Settings navigation: `onClick={() => router.push('/settings')}`
- Consistent SidebarItem component across all pages