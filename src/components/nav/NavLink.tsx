'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './nav.module.scss';

interface NavLinkProps {
  href: string;
  title: string;
}

export default function NavLink({
  title,
  href,
}: NavLinkProps) {
  const pathname = usePathname();

  const match = href === pathname;

  return (
    <li>
      <Link
        href={match ? '#' : href}
        className={match ? styles.selectedLink : styles.link}
      >
        {title}
      </Link>
    </li>
  )
}