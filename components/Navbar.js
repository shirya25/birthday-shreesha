'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/childhood', label: 'Childhood' },
  { href: '/adulthood', label: 'Adulthood' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <Link href="/" className="navbar__brand">
        Shreesha ✨
      </Link>
      <ul className="navbar__links">
        {LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
