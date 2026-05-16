# End-to-End Flow: Questionnaire → Personalized Website

This document describes the complete pipeline from guest intake to a deployed personalized welcome website.

---

## Architecture

```
┌─────────────────────┐
│  Hotel Concierge    │
│  opens Ox Skill     │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Ox Questionnaire   │  ← Guided Q&A with structured options
│  (QUESTIONNAIRE.md) │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Profile Enrichment │  ← Spotify analysis, Instagram signals,
│  (Knowledge Sources)│    hotel amenity matching
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Song Generation    │  ← generateMusic based on sonic profile
│  (AI Composer)      │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  JSON Generation    │  ← guest-data.json matching template schema
│  (SKILL-INSTR.md)   │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Concierge Review   │  ← Preview JSON, approve or edit
│  & Approval         │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  GitHub Commit      │  ← Commit guest-data.json + index.html
│  to vercel-template │    to the repo
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐
│  Vercel Auto-Deploy │  ← Static site goes live
│  (serves index.html)│
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│  Guest receives URL │  ← In-room tablet, email, or QR code
│  on check-in        │
└─────────────────────┘
```

## File Responsibilities

| File | Role | Modified Per Guest? |
|---|---|---|
| `template.html` | HTML template with `{{placeholder}}` syntax and loop support | ❌ Never |
| `styles.css` | All visual styling — works for any guest | ❌ Never |
| `build.js` | Node.js template engine — reads JSON, outputs `index.html` | ❌ Never |
| `guest-data.json` | Guest-specific personalized content | ✅ Every guest |
| `index.html` | Generated output (committed for Vercel static deploy) | ✅ Every guest (auto-generated) |
| `guest-data.example.json` | Example JSON for reference (Michael Gahan) | ❌ Reference only |
| `SKILL-INSTRUCTIONS.md` | Ox skill behavior instructions | ❌ Configuration |
| `QUESTIONNAIRE.md` | Intake question reference | ❌ Reference |

## Setting Up the Ox Skill

### 1. Create a New Skill

- **Name**: Rosewood Guest Concierge
- **Starter prompt**: "I need to prepare a personalized welcome experience for a guest arriving at Rosewood Sand Hill."

### 2. Attach Knowledge

- **Rosewood Sand Hill website**: `https://www.rosewoodhotels.com/en/sand-hill-menlo-park`
- Guest's **Spotify profile URL** (added per-guest)
- Guest's **Instagram URL** (added per-guest)

### 3. Attach Instructions

Paste or attach `SKILL-INSTRUCTIONS.md` as the skill's system instructions.

### 4. Enable Connections

- **GitHub** — so the skill can commit `guest-data.json` and `index.html` to the repo

### 5. Enable Tools

- **Music generation** — for composing the arrival soundtrack
- **Web search** — for enriching guest profiles beyond attached Knowledge

## Demo Walkthrough

For a hackathon demo, the fastest path is:

1. Open the Ox skill
2. Say: "New guest: Sarah Chen, anniversary weekend, 2 nights in the Luxury Suite with her partner James. Spotify: [URL]. She loves wine, hiking, and jazz."
3. Ox runs the enrichment, generates a song, produces the JSON
4. Concierge reviews and approves
5. Ox commits to GitHub → Vercel deploys → live site in ~30 seconds
6. Show the site on a phone/tablet

## Extending This System

- **Multiple guests**: Use different JSON filenames (`guest-data-sarah.json`) and build separate pages, or add a routing layer
- **Multi-property**: The `hotel` object in the JSON already supports different properties — swap the name, images, and amenities
- **Staff briefing**: The Ox skill can also generate a `staff-briefing.md` alongside the guest site (see CONTEXT.md)
- **Real-time updates**: If the guest updates preferences mid-stay, re-run the skill with new data and re-deploy
