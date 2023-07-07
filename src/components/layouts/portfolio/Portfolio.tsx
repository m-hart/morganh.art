import { ITEMS } from '@/global/portfolio';
import PortfolioItem from './PortfolioItem';


export default function Portfolio() {
  return (
    <ul>
      {ITEMS.map(item => <PortfolioItem {...item} />)}
    </ul>
  )
}