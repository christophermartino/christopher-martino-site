# Christopher Martino Site

Astro + Decap CMS + Cloudinary foundation for an artist archive.

## Local development

```bash
cp .env.example .env
npm install
npm run dev
```

Add your real Cloudinary values to `.env`:

```env
PUBLIC_CLOUDINARY_CLOUD_NAME=...
PUBLIC_CLOUDINARY_FOLDER=...
PUBLIC_SITE_URL=http://localhost:4321
```

## Content

- Artwork: `src/content/artwork/`
- Exhibitions: `src/content/exhibitions/`
- Pages: `src/content/pages/`
- Decap CMS: `/admin/`

## Decap authentication

`public/admin/config.yml` uses Decap's GitHub backend for
`christophermartino/christopher-martino-site`, with Netlify's OAuth provider.
Before editors can sign in on the production `/admin/` page:

1. Create a GitHub OAuth App with callback URL `https://api.netlify.com/auth/done`.
2. In Netlify, open **Project configuration → Access & security → OAuth** and
   install the GitHub provider using that app's Client ID and Client Secret.

Keep the Client Secret only in Netlify; never commit it to this repository.

`PUBLIC_SITE_URL` is required for production builds. Set it in Netlify to the
canonical HTTPS URL (for example, `https://www.your-domain.com`) so Astro emits
correct canonical URLs and sitemap entries.

## Cloudinary

Artwork entries store only a Cloudinary public ID, such as:

```yaml
publicId: painting/12
```

The helper automatically prefixes `PUBLIC_CLOUDINARY_FOLDER`, while avoiding duplicate folder names.

## Compare

Visitors can add up to two works from artwork cards. The selections are saved in browser local storage and shown at `/compare/`.
