export type CloudinaryPreset = 'thumbnail' | 'gallery' | 'detail' | 'hero' | 'lightbox';

const presets: Record<CloudinaryPreset, string> = {
  thumbnail: 'f_auto,q_auto,w_520,c_limit',
  gallery: 'f_auto,q_auto,w_1100,c_limit',
  detail: 'f_auto,q_auto,w_1800,c_limit',
  hero: 'f_auto,q_auto,w_2200,c_limit',
  lightbox: 'f_auto,q_auto,w_2800,c_limit'
};

function env(name: 'PUBLIC_CLOUDINARY_CLOUD_NAME' | 'PUBLIC_CLOUDINARY_FOLDER') {
  return import.meta.env[name]?.trim() || '';
}

export function cloudinaryPath(publicId: string) {
  const folder = env('PUBLIC_CLOUDINARY_FOLDER').replace(/^\/+|\/+$/g, '');
  const cleanId = publicId.replace(/^\/+|\/+$/g, '');

  if (!folder || cleanId.startsWith(`${folder}/`)) return cleanId;
  return `${folder}/${cleanId}`;
}

export function cloudinaryUrl(
  publicId: string,
  preset: CloudinaryPreset = 'gallery',
  extraTransforms: string[] = []
) {
  const cloudName = env('PUBLIC_CLOUDINARY_CLOUD_NAME');
  if (!cloudName || !publicId) return '';

  const transforms = [presets[preset], ...extraTransforms].filter(Boolean).join(',');
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms}/${cloudinaryPath(publicId)}`;
}

export function cloudinarySrcSet(publicId: string, widths = [480, 720, 960, 1280, 1800]) {
  return widths
    .map((width) => `${cloudinaryUrl(publicId, 'gallery', [`w_${width}`])} ${width}w`)
    .join(', ');
}
