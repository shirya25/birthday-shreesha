'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Card from './Card';

export default function Gallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const isOpen = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';

    function handleKeyDown(e) {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close, showPrev, showNext]);

  return (
    <>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <Card key={img.src} src={img.src} alt={img.alt} index={i} onClick={setActiveIndex} />
        ))}
      </div>

      {isOpen && (
        <div className="lightbox" onClick={close}>
          <div className="lightbox__img-wrap" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              width={1200}
              height={1200}
              style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '82vh' }}
              priority
            />
            <button
              type="button"
              className="lightbox__close"
              onClick={close}
              aria-label="Close photo"
            >
              ✕
            </button>
            <button
              type="button"
              className="lightbox__nav lightbox__nav--prev"
              onClick={showPrev}
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              type="button"
              className="lightbox__nav lightbox__nav--next"
              onClick={showNext}
              aria-label="Next photo"
            >
              ›
            </button>
            <span className="lightbox__counter">
              {activeIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
