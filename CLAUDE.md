# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Gradix is an application evaluation system built with Next.js 13 that helps automate the process of reviewing thousands of applications. The system transforms a brief into a complete evaluation pipeline with automatic filtering, rubric-based scoring, and detailed justifications.

## Tech Stack

- **Framework**: Next.js 13.1.6 with TypeScript
- **Styling**: Tailwind CSS with custom breakpoint (xs: 475px)
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