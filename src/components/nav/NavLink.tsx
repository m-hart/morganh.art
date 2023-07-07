'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './nav.module.scss';

interface NavLinkProps {
  href: string;
  title: string;
  list?: boolean;
}

export default function NavLink({
  title,
  href,
  list = true,
}: NavLinkProps) {
  const pathname = usePathname();

  const match = href === pathname;

  const link = (
    <Link
      href={match ? '#' : href}
      className={match ? styles.selectedLink : styles.link}
    >
      {title}
    </Link>
  );

  if (!list) {
    return link;
  }

  return (
    <li>
      {link}
    </li>
  )
}