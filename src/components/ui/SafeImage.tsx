import { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { checkImageSize } from '@/lib/imageUtils';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

export const SafeImage = ({ src, alt, className, fallbackClassName }: SafeImageProps) => {
  const [imageStatus, setImageStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    let cancelled = false;

    const loadImage = async () => {
      try {
        // Check if image is too large
        const isValidSize = await checkImageSize(src);
        
        if (cancelled) return;

        if (!isValidSize) {
          setImageStatus('error');
          setErrorMessage('Image is too large (>2MB)');
          return;
        }

        // Try to load the image
        const img = new Image();
        img.onload = () => {
          if (!cancelled) {
            setImageStatus('success');
          }
        };
        img.onerror = () => {
          if (!cancelled) {
            setImageStatus('error');
            setErrorMessage('Failed to load image');
          }
        };
        img.src = src;
      } catch (error) {
        if (!cancelled) {
          setImageStatus('error');
          setErrorMessage('Failed to load image');
        }
      }
    };

    loadImage();

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (imageStatus === 'error') {
    return (
      <div 
        className={cn(
          'flex flex-col items-center justify-center bg-muted text-muted-foreground',
          fallbackClassName || className
        )}
      >
        <ImageOff className="h-8 w-8 mb-2" />
        <p className="text-xs text-center px-2">{errorMessage}</p>
      </div>
    );
  }

  if (imageStatus === 'loading') {
    return (
      <div className={cn('bg-muted animate-pulse', className)} />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
    />
  );
};
