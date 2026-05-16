# Guest Intake Questionnaire

This questionnaire is designed for hotel concierge staff to fill out about an incoming guest. The Ox skill uses these answers — combined with Spotify/Instagram analysis — to generate a personalized welcome website.

---

## Section 1: Guest Basics

| # | Question | Input Type | Options |
|---|---|---|---|
| 1 | Guest's first name | Free text | — |
| 2 | Guest's full name | Free text | — |
| 3 | What's the occasion for this stay? | Select + free text | Birthday, Anniversary, Honeymoon, Business Trip, Getaway, Celebration, Other |
| 4 | Who is the guest traveling with? | Free text | Name(s) and relationship |
| 5 | How long is the stay? | Select | 1 night, 2 nights, 3 nights, Weekend, Week, Other |
| 6 | Room type | Select | Premier King, Luxury Suite, Rosewood Executive Suite, Signature Suite, Residential Villa |

## Section 2: Digital Footprint

| # | Question | Input Type | Notes |
|---|---|---|---|
| 7 | Spotify profile URL | Free text | Ox will analyze playlists, genres, recently played artists |
| 8 | Instagram handle | Free text | Ox will analyze bio and handle for identity signals |
| 9 | Any other online profiles or websites? | Free text | LinkedIn, personal site, etc. |

## Section 3: Preferences & Restrictions

| # | Question | Input Type | Options |
|---|---|---|---|
| 10 | Known dietary restrictions? | Multi-select + free text | None, Vegetarian, Vegan, Pescatarian, Gluten-free, Kosher, Halal, Allergies |
| 11 | Known interests or hobbies? | Free text | Sports, arts, food, wine, tech, outdoors, music, etc. |
| 12 | What matters most to this guest? | Multi-select | Dining, Spa & Wellness, Active/Outdoors, Nightlife & Music, Culture & History, Family, Business, Romance, Relaxation |
| 13 | Morning routine style? | Select | Early riser / active, Late starter / leisurely, Business meetings, Unknown |

## Section 4: Stay Intelligence

| # | Question | Input Type | Notes |
|---|---|---|---|
| 14 | Special requests or notes from previous stays? | Free text | Past complaints, preferences, VIP status |
| 15 | Anything to avoid? | Free text | Foods, fragrances, noise, specific experiences |
| 16 | Any surprises or arrangements in progress? | Free text | Proposals, birthday cakes, gifts, flowers |

---

## How the Skill Uses This Data

| Questionnaire Section | → Website Section |
|---|---|
| Guest name + occasion + companion | Hero greeting, tagline, footer |
| Spotify + Instagram + hobbies | Welcome note, guest archetype, profile cards |
| Spotify genres + artists | Arrival soundtrack (AI-composed), playlist tags |
| Interests + "what matters most" | Curated experiences, dining recommendations |
| Dietary restrictions + morning style | Dining descriptions, room setup |
| Avoid list + special requests | Room details, staff alerts (not shown on site) |
| Occasion + companion | Tone of all copy, experience selection |

## Confidence Scoring

The skill assigns confidence to each inferred preference:

| Level | When to Use |
|---|---|
| **HIGH** | Confirmed by 2+ sources or directly stated by concierge |
| **MEDIUM** | Supported by one source with reasonable inference |
| **LOW** | Inferred from indirect signals — concierge should verify |

Before committing the final JSON, the skill presents a summary of all LOW-confidence inferences for the concierge to confirm or override.
