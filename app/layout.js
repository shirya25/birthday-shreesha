import './globals.css';
import { Great_Vibes, Quicksand } from 'next/font/google';
import Navbar from '@/components/Navbar';
import StarField from '@/components/StarField';

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: "Happy Birthday, Shreesha 🎂",
  description: "A little celebration, just for her.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${greatVibes.variable} ${quicksand.variable} font-body antialiased`}>
        <StarField />
        <Navbar />
        <div className="lights" aria-hidden="true">
          <div className="lights__strand"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
