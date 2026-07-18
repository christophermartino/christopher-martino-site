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

`public/admin/config.yml` currently uses Decap's GitHub backend. Replace:

```yaml
repo: YOUR_GITHUB_USERNAME/christopher-martino-site
```

with your actual GitHub username.

The GitHub backend avoids depending on Netlify Git Gateway, which Netlify now marks as deprecated for new configurations. You will need to configure a GitHub OAuth authentication provider before production use. Decap can also be switched to another supported backend later.

## Cloudinary

Artwork entries store only a Cloudinary public ID, such as:

```yaml
publicId: painting/12
```

The helper automatically prefixes `PUBLIC_CLOUDINARY_FOLDER`, while avoiding duplicate folder names.

## Compare

Visitors can add up to two works from artwork cards. The selections are saved in browser local storage and shown at `/compare/`.
