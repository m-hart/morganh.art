import NavLink from '@/components/nav/NavLink';
import { PortfolioItem } from '@/global/portfolio';
import styles from './portfolio.module.scss';

interface PortfolioItemProps extends PortfolioItem {
}

export default function PortfolioItem({
  title,
  subtitle,
  description,
  href,
  position,
  technologies,
  meta = [],
}: PortfolioItemProps) {

  const metadata = meta.map(({ href, text }) => (
    href ? <NavLink
      href={href}
      title={text}
    /> : <li key={text}>{text}</li>
  ));

  return (
    <li key={title} className={styles.item}>
      <NavLink
        title={`${title} (${subtitle})`}
        href={href}
        list={false}
      />
      <p>{description}</p>
      <ul>
        <li>
          {position}
          <ul>
            {technologies.map(tech => <li key={tech}>{tech}</li>)}
          </ul>
        </li>
        {metadata}
      </ul>
    </li>
  )
}