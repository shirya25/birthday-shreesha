import Image from 'next/image';

export default function Card({ src, alt, index, onClick }) {
  return (
    <button
      type="button"
      className="photo-card"
      onClick={() => onClick(index)}
      aria-label={`Open photo: ${alt}`}
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={600}
        sizes="(min-width: 1180px) 25vw, (min-width: 860px) 33vw, (min-width: 560px) 50vw, 100vw"
        style={{ width: '100%', height: 'auto' }}
      />
      <span className="photo-card__glow" aria-hidden="true"></span>
    </button>
  );
}
