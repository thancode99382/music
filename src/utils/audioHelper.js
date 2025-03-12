/**
 * Helper function to resolve audio file paths correctly in production
 */
export const getAudioPath = (path) => {
  // Check if the path is already a full URL
  if (path.startsWith('http') || path.startsWith('blob:')) {
    return path;
  }

  // Check if we're in a production build
  const isProd = import.meta.env.PROD;
  
  // If the path doesn't start with a slash, add one
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // In production, ensure paths are correct based on the deployment URL
  if (isProd) {
    const baseUrl = import.meta.env.VITE_APP_BASE_URL || '/';
    return `${baseUrl}${normalizedPath.replace(/^\//, '')}`;
  }
  
  return normalizedPath;
};

/**
 * Preload audio file to ensure it's cached
 */
export const preloadAudio = (urls) => {
  if (!urls || !Array.isArray(urls)) return;
  
  urls.forEach(url => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.src = getAudioPath(url);
  });
};
