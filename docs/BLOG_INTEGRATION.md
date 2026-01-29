# Vibe Flow Blog System - Documentation

## 1. System Architecture
The blog system is built on a **Headless CMS** architecture using Airtable as the backend and Vercel Serverless Functions as the secure middleware.

```mermaid
graph LR
    A[Airtable (Content DB)] -->|API Key (Server-Side)| B[Vercel Function /api/posts]
    B -->|JSON Response (Cached)| C[React Frontend (Vite)]
    C -->|Render| D[User Browser]
    
    subgraph Frontend Logic
    C1[SWR Hook] -->|Fetch| B
    C2[React Markdown] -->|Parse| Content
    C3[useSEO Hook] -->|Inject| MetaTags
    end
```

## 2. Airtable Configuration
**Base ID:** `appSaEaDYNrloBTkT`
**Table Name:** `News`

### Required Fields Schema
The system explicitly maps these Airtable fields. **Do not rename these fields** in Airtable or the connection will break.

| Field Name | Type | Purpose | Fallback Logic |
| :--- | :--- | :--- | :--- |
| `Nuevo Título` | Single Line Text | Main Article Title | Falls back to `Título` |
| `SEO:Slug` | Single Line Text | URL path (e.g., `my-post`) | Auto-slugifies Title if empty |
| `SEO:Description` | Long Text | Meta Description & Excerpt | Falls back to `SEO:Title` or Content start |
| `Social:Image` | Attachment | OG Image (Twitter/LinkedIn) | Falls back to `Url img` |
| `Url img` | URL | Main Blog Cover Image | Placeholder if missing |
| `Publicación de blog` | Long Text (Rich) | Article Body (Markdown) | - |
| `Fecha de Publicación`| Date | Sort & Display Date | `Creada 2` or Today |
| `Nombre (from Editor)`| Lookup/Rollup | Author Name | "Vibe Flow Team" |

## 3. SEO Features
The blog is fully optimized for semantic SEO and Social Sharing.

- **Dynamic Meta Tags:** `<title>` and `<meta description>` change for every post.
- **Open Graph (OG):** Facebook, LinkedIn, and X (Twitter) cards use `Social:Image` (Size recommended: 1200x630px).
- **JSON-LD Structured Data:** Automatically injects `schema.org/Article` into the `<head>`. This helps Google understand:
  - This is an Article.
  - Who is the Author.
  - When it was published.
  - What is the featured image.
  
**Verification Tool:** [Google Rich Results Test](https://search.google.com/test/rich-results)

## 4. How to Publish
1.  **Create Row:** Add a new row in the "News" table in Airtable.
2.  **Write:** Fill in the Title and Content (Markdown supported).
3.  **SEO:** 
    - Set a clean `SEO:Slug` (lowercase, hyphens).
    - Write a compelling `SEO:Description` (150-160 chars).
    - Attach a `Social:Image`.
4.  **Publish:** Set the `Fecha de Publicación`.
5.  **Live:** The post will appear on `vibeflow.es/blog` in approx 60 seconds (Cache TTL).

## 5. Deployment & Maintenance
- **API Key:** Managed in Vercel Environment Variables (`AIRTABLE_API_KEY`).
- **Base ID:** The code uses a default Base ID (`appSaEaDYNrloBTkT`) if `AIRTABLE_BASE_ID` is not set in env vars.
- **Contact Form:** Uses `AIRTABLE_WEBHOOK_URL` (separate from Blog system).
- **Cache Strategy:** `s-maxage=60, stale-while-revalidate=300`.
- **Local Dev:** Reads from the same live Airtable (or `.env` equivalent).

## 6. Troubleshooting
- **Post not showing?** Check if `Fecha de Publicación` is set.
- **500 Error?** Check Vercel Logs. Usually means API Key is missing or quota exceeded.
- **Image broken?** Ensure `Url img` is a direct link or `Social:Image` has an attachment.
