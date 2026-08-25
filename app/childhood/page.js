import Gallery from '@/components/Gallery';

export const metadata = {
  title: 'Little Shreesha | Childhood',
};

// Expects 20 images at public/childhood/img1.jpg ... img20.jpg
// Change the extension below if your files are .png / .jpeg instead.
const images = Array.from({ length: 16 }, (_, i) => ({
  src: `/childhood/${i + 1}.png`,
  alt: `Childhood memory ${i + 1}`,
}));

export default function ChildhoodPage() {
  return (
    <main>
      <section className="gallery-hero">
        <h1 className="gallery-hero__title">Once upon a childhood</h1>
        <p className="gallery-hero__sub">
          Twenty little moments, back when the biggest wish was staying up past bedtime.
        </p>
      </section>

      <Gallery images={images} />
    </main>
  );
}
