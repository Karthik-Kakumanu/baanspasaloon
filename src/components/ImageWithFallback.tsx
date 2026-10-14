import React, { useState } from 'react';
import type { ImgHTMLAttributes } from 'react';

interface ImageWithFallbackProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onError'> {
  fallbackText?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className,
  fallbackText,
  ...imageProps
}) => {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const source = src ?? '';

  if (failedSource === source) {
    return (
      <div
        className={`image-fallback ${className ?? ''}`}
        role="img"
        aria-label={alt || fallbackText || 'BAAN photography'}
      >
        <span className="image-fallback-brand" aria-hidden="true">BAAN</span>
        <span className="image-fallback-caption" aria-hidden="true">
          {fallbackText || alt || 'Salon · Beauty · Spa'}
        </span>
      </div>
    );
  }

  return (
    <img
      {...imageProps}
      src={src}
      alt={alt ?? ''}
      className={className}
      onError={() => setFailedSource(source)}
    />
  );
};
