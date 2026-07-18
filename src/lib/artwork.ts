import type { CollectionEntry } from 'astro:content';

export type ArtworkEntry = CollectionEntry<'artwork'>;

export function sortArtwork(entries: ArtworkEntry[]) {
  return [...entries].sort((a, b) => {
    if (a.data.order !== b.data.order) return a.data.order - b.data.order;
    if (a.data.year !== b.data.year) return b.data.year - a.data.year;
    return a.data.title.localeCompare(b.data.title);
  });
}

export function categoryLabel(category: ArtworkEntry['data']['category']) {
  return {
    painting: 'Paintings',
    drawing: 'Drawings',
    digital: 'Digital'
  }[category];
}
