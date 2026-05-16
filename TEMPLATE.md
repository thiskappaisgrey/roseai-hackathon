# Rosewood Sand Hill — Guest Experience Page Template

This is a reusable HTML template for generating personalized guest welcome pages at Rosewood Sand Hill.

## How It Works

The `index.html` file contains `{{PLACEHOLDER}}` variables that get replaced with guest-specific data to produce a personalized page.

## Template Variables Reference

### Guest & Stay Info

| Variable | Description | Example |
|---|---|---|
| `{{GUEST_FIRST_NAME}}` | Guest's first name | `Michael` |
| `{{GUEST_COMPANION_NAME}}` | Travel companion | `Mrs. Gahan` |
| `{{GREETING}}` | Hero greeting text | `Welcome Back` |
| `{{HERO_EMPHASIS}}` | Italic emphasis word in hero h1 | `congratulations` |
| `{{HERO_DESCRIPTION}}` | Hero paragraph text | `An anniversary worth celebrating...` |
| `{{HERO_IMAGE_URL}}` | Hero background image URL | Rosewood CDN URL |
| `{{STAY_META_1}}` | First stay detail | `Suite 312` |
| `{{STAY_META_2}}` | Second stay detail | `3 Nights` |
| `{{STAY_META_3}}` | Third stay detail | `Anniversary` |
| `{{FOOTER_OCCASION_MESSAGE}}` | Footer personalized message | `Happy Anniversary` |
| `{{CONCIERGE_PHONE}}` | SMS phone number | `+16505611500` |

### Picked For You Cards (repeat 1–5)

| Variable | Description |
|---|---|
| `{{PICKED_N_IMAGE}}` | Card image URL |
| `{{PICKED_N_IMAGE_ALT}}` | Image alt text |
| `{{PICKED_N_TAG}}` | Category label (e.g. "Anniversary Afternoon") |
| `{{PICKED_N_TITLE}}` | Experience title |
| `{{PICKED_N_DESC}}` | Short description |
| `{{PICKED_N_WHY}}` | Personalized reason (italic) |
| `{{PICKED_N_CTA}}` | Button text |
| `{{PICKED_N_CTA_HREF}}` | Button link |
| `{{PICKED_INTRO}}` | Intro text for the section |

### Hotel Experiences (repeat 1–4)

| Variable | Description |
|---|---|
| `{{EXP_N_IMAGE}}` | Card image URL |
| `{{EXP_N_ALT}}` | Image alt text |
| `{{EXP_N_TITLE}}` | Experience name |
| `{{EXP_N_DESC}}` | Short description |
| `{{EXP_N_META}}` | Timing/availability |

### Explore Menlo Park Tiles (repeat 1–6)

| Variable | Description |
|---|---|
| `{{EXPLORE_N_IMAGE}}` | Tile background image URL |
| `{{EXPLORE_N_ALT}}` | Image alt text |
| `{{EXPLORE_N_TYPE}}` | Category (e.g. "Hike", "Tasting") |
| `{{EXPLORE_N_TITLE}}` | Place name |
| `{{EXPLORE_N_DETAIL}}` | Distance/details |
| `{{EXPLORE_N_HREF}}` | Link URL |

### FAQ (repeat 1–7)

| Variable | Description |
|---|---|
| `{{FAQ_N_QUESTION}}` | The question text |
| `{{FAQ_N_ANSWER}}` | The answer (can be guest-personalized) |

## Guest Profile Inputs

To populate the template, gather:

1. **Guest basics**: Name, companion name, occasion, room, duration
2. **Interests**: What they're excited about (pool, wine, dining, spa, active, etc.)
3. **Travel style**: Romantic, family, solo, business, celebration
4. **Rosewood experiences**: Match from the hotel's current programming
5. **Local recommendations**: Tailor Explore section to guest interests
6. **FAQ customization**: Adjust answers for guest type (e.g. anniversary → late checkout)

## Amenities Section

The amenities grid is **static per hotel** and doesn't need per-guest customization. Update only if hotel offerings change.

## Design Notes

- **Mobile-first**: Designed as a 480px phone-shaped app; scales via media query on desktop
- **Self-contained**: All CSS is inline in `<style>` — no external stylesheet needed
- **No JS required**: Pure HTML/CSS, works everywhere
- **Horizontal scroll**: Picked For You uses native CSS scroll-snap
- **Accessible**: Uses semantic HTML, proper alt text, and `prefers-reduced-motion` support
