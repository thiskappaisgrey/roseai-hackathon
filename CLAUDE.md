# CLAUDE.md — Project Rules for AI Agents

## Branch Policy

- **Never push directly to `main`.** All changes must go through a feature branch and a pull request.
- Use descriptive branch names: `feat/`, `fix/`, `chore/`, `docs/` prefixes.
- Every PR should be reviewed before merging.

## Branching Convention

```
feat/short-description   → New features
fix/short-description    → Bug fixes
chore/short-description  → Tooling, config, dependencies
docs/short-description   → Documentation changes
```

## Commit Messages

Follow conventional commits:

```
feat: add guest profile schema
fix: resolve Spotify API auth error
chore: update dependencies
docs: add API documentation
```

## Project Context

This is the **Rosewood AI Guest Profile System** — a hackathon project that generates personalized hotel guest experiences by combining:

- Social media data (Instagram, Twitter/X, LinkedIn)
- Spotify listening data (playlists, top artists, mood)
- Concierge notes (past stay records, preferences, complaints)

The system produces:
1. **Staff Briefing Notes** — Actionable likes/dislikes/room setup for hotel staff
2. **Custom Concierge Page** — A guest-facing personalized recommendations page
3. **AI Guest Profiles** — Structured profiles with confidence scores per preference

## Tech Stack

- **Language**: TypeScript
- **Framework**: Next.js (App Router)
- **AI**: LLM-based profile generation (OpenAI / Claude)
- **Data**: Spotify API, social media APIs, concierge note ingestion

## Key Directories

```
src/
  types/        → TypeScript interfaces and schemas
  data/         → Sample/mock data for development
  app/          → Next.js app router pages
  lib/          → Utility functions, API clients, AI prompts
  components/   → React components
```
