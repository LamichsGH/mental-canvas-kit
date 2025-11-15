export const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

export async function checkImageSize(src: string): Promise<boolean> {
  try {
    // Skip data URLs
    if (src.startsWith('data:')) {
      return true;
    }

    // Fetch only headers to check file size
    const response = await fetch(src, { method: 'HEAD' });
    const contentLength = response.headers.get('content-length');
    
    if (!contentLength) {
      // If no content-length header, assume it's okay
      return true;
    }
    
    const sizeInBytes = parseInt(contentLength, 10);
    return sizeInBytes <= MAX_IMAGE_SIZE;
  } catch (error) {
    console.warn('Failed to check image size:', error);
    // On error, allow the image to load
    return true;
  }
}
