import Gallery from '@/components/Gallery';

export const metadata = {
  title: 'Sneha Today | Adulthood',
};

// Expects 20 images at public/adulthood/img1.jpg ... img20.jpg
// Change the extension below if your files are .png / .jpeg instead.
const images = Array.from({ length: 7 }, (_, i) => ({
  src: `/adulthood/${i + 1}.png`,
  alt: `Adulthood memory ${i + 1}`,
}));

export default function AdulthoodPage() {
  return (
    <main>
      <section className="gallery-hero">
        <h1 className="gallery-hero__title">All grown up, still just as wonderful</h1>
        <p className="gallery-hero__sub">
          The chapters since — same warmth, bigger adventures.
        </p>
      </section>

      <Gallery images={images} />
    </main>
  );
}
