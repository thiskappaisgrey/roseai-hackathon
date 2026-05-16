# Rosewood Guest Experience — Template System

A personalized, single-page guest welcome experience for Rosewood properties. Feed in guest data as JSON, run the build, and get a fully rendered `index.html`.

## Quick Start

```bash
# 1. Edit guest-data.example.json (or create a new JSON file)
cp guest-data.example.json guest-data.json

# 2. Build the page
node build.js guest-data.json

# 3. Open index.html — done
```

## Files

| File | Purpose |
|---|---|
| `template.html` | HTML template with `{{placeholder}}` syntax |
| `styles.css` | CSS (no guest-specific content — works for all guests) |
| `guest-data.example.json` | Example data (Michael Gahan) — copy and modify for new guests |
| `build.js` | Node.js build script — no dependencies, just `node build.js [data.json]` |
| `index.html` | Generated output (committed for Vercel deployment) |

## JSON Data Schema

See `guest-data.example.json` for the full structure. Key sections:

### `hotel`
Property-level info: name, address, phone, hero background image.

### `guest`
Guest name, full name, hero tagline.

### `note`
Personal welcome note: heading, body paragraphs (array of HTML strings), closing line, signature.

### `soundtrack`
AI-composed arrival track: audio URL, track metadata, playlist tags, artist tags.

### `experiences`
Curated on-property experiences: section label, description, array of cards (image, tag, title, description).

### `dining`
Dining recommendations: array of cards (image, title, description).

### `wellness`
Wellness and recovery: section heading, description, array of items (icon, title, description).

### `room`
In-room personalization: array of items (label, description).

### `concierge`
Concierge description, phone.

## Template Syntax

- `{{path.to.value}}` — Simple variable substitution
- `{{#path.to.array}} ... {{/path.to.array}}` — Loop over array
- `{{.property}}` — Access current item property inside a loop

HTML in JSON values is rendered as-is (no escaping), so you can include `<em>`, `<strong>`, `<br>`, etc.

## Generating for a New Guest

1. Copy `guest-data.example.json` → `guest-data-newguest.json`
2. Fill in all fields with the new guest's personalized content
3. Run `node build.js guest-data-newguest.json`
4. The output `index.html` is ready to deploy

## Deployment

The generated `index.html` + `styles.css` are static files. Deploy anywhere:
- **Vercel**: Push to `vercel` branch
- **Netlify / S3 / CloudFront**: Upload both files
- **Any static host**: Just serve the two files

---

*Powered by Rosewood AI Concierge · Ox*
