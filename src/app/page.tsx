import Image from 'next/image'
import styles from './page.module.css'
import sample from 'lodash/sample';
import { differenceInSeconds } from 'date-fns';
import { HfInference } from '@huggingface/inference'
import { Suspense } from 'react';
 
const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
// export const revalidate = 10;
// export const fetchCache = 'force-no-store';
// Generate dog blob
// Woof

const artLocations = [
  'in a favela',
  'in a field',
  'in a stadium',
  'in a park',
  'on a beach',
  'in outer space',
  'underwater',
  'in a japanese shrine',
  'in a boxing ring',
  'in bed',
  'driving a car',
  'in a school',
  'in a bazaar',
]

// Random style
const artStyles = [
  'expressionist',
  'Watercolor',
  'Digital art Behance',
  'Academicism painting',
  'Pop-art',
  'cubist',
  'constructivist',
  'soviet realism',
  'Surrealism painting',
  'Art deco illustration',
  'Avant-garde painting',
  'Classicism painting',
  'Op Art',
  'Black and white photo',
  'Polaroid',
  'Movie still',
  'Tattoo art',
  'Pixel art',
  'anime',
  'photo realistic'
];

interface DogCache {
  dogURI?: string;
  date: Date;
}

const CACHE: DogCache = {
  dogURI: undefined,
  date: new Date(),
}

async function getDog() {
  CACHE.date = new Date();

  const dogbuf = await (await Hf.textToImage({
    model: 'stabilityai/stable-diffusion-2',
    inputs: `A jack russell terrier in a ${sample(artLocations)} in a ${sample(artStyles)} style`,
  }, {
    use_cache: false,
    fetch: (input, init) => fetch(input, {
      ...init,
      next: {
        revalidate: 600,
      },
    })
  })).arrayBuffer();

  CACHE.dogURI = Buffer.from(dogbuf).toString('base64');
}

async function getURI() {
  if (CACHE.dogURI === undefined) {
    await getDog();

    return CACHE.dogURI;
  }

  if (differenceInSeconds(new Date(), CACHE.date) > 60) {
    getDog();
  }

  return CACHE.dogURI;
}

export default async function Page() {
  const dogPath = await getURI();

  return (
    <main className={styles.main}>
      <img 
        src={`data:img/jpeg;base64,${dogPath}`} 
        alt="Generated Dog Image" 
        width={512} 
        height={512} 
      />
      <div className={styles.content}>
        <p>woof - it's pip!</p>
        <p>i make websites; contact info soon.</p>
      </div>
    </main>
  )
}

