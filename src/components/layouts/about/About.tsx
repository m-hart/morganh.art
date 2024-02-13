import Image from 'next/image';
import styles from './about.module.scss';
import morgan from './morgan.jpg';

export default function About() {
  return (
    <div className={styles.container}>
      <Image 
        src={morgan}
        alt="Generated image of pip the jack russell" 
        width={256} 
        height={256} 
      />
      <p>i'm a 24 year old developer who likes making cool stuff</p>
    </div>
  )
}