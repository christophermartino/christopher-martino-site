import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const artwork = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/artwork' }),
  schema: z.object({
    title: z.string(),
    year: z.number().int(),
    category: z.enum(['painting', 'drawing', 'digital']),
    series: z.string().optional(),
    medium: z.string(),
    dimensions: z.string().optional(),
    publicId: z.string(),
    alt: z.string(),
    featured: z.boolean().default(false),
    available: z.boolean().default(false),
    order: z.number().int().default(100),
    tags: z.array(z.string()).default([])
  })
});

const exhibitions = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/exhibitions' }),
  schema: z.object({
    title: z.string(),
    venue: z.string(),
    location: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    featured: z.boolean().default(false)
  })
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    email: z.string().email().optional()
  })
});

export const collections = { artwork, exhibitions, pages };
