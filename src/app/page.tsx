import sample from 'lodash/sample'
import { HfInference } from '@huggingface/inference'
import styles from './page.module.scss'
import { differenceInSeconds } from 'date-fns';

const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export const revalidate = 120;
export const dynamic = 'error';

// See getDog method for this nastyness
interface HackCache {
  imagePromise?: Promise<Blob>;
  date: Date;
  resolved: boolean;
}

const NEXT_HACK_CACHE: HackCache = {
  date: new Date(),
  resolved: false,
}

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

async function getDog(): Promise<string> {
  /**
   * ~i got a glock in my 'rari~
   * This is a nasty nasty nasty workaround to a bug in next 13.
   * When using ISR fetch is called twice per static page generation.
   * This is problematic, as it results in two different images presented
   * as calls to hugging face are not cached. 
   * 
   * Hugging face takes around 40 seconds to generate an image.
   * So I give a buffer of a minute and a bit to ensure that a new image has been regenerated.
   */
  if (!NEXT_HACK_CACHE.imagePromise || differenceInSeconds(new Date(), NEXT_HACK_CACHE.date) > 80) {
    NEXT_HACK_CACHE.date = new Date();

    NEXT_HACK_CACHE.imagePromise = Hf.textToImage({
      model: 'stabilityai/stable-diffusion-2',
      inputs: `A jack russell terrier in a ${sample(artLocations)} in a ${sample(artStyles)} style`,
    }, {
      use_cache: false,
      fetch: (input, opts) => fetch(input, {
        ...(opts || {}),
        cache: 'no-cache',
      })
    });
  }

  const blob = await NEXT_HACK_CACHE.imagePromise;
  // Update cache date again - prevents possible desync.
  NEXT_HACK_CACHE.date = new Date();
  const dogbuf =  await blob.arrayBuffer();
  const uri = `data:img/jpeg;base64,${Buffer.from(dogbuf).toString('base64')}`;
  return uri;
}

export default async function Page() {
  const dogURI = await getDog();

  return (
    <main className={styles.main}>
      <img 
        src={dogURI} 
        alt="Generated image of pip the jack russell" 
        width={512} 
        height={512} 
      />
      <div className={styles.content}>
        <p>woof - it's  my jack russell pip! check back every now and then to see what pip is up to.</p>
        <p>i make websites; contact info soon.</p>
      </div>
    </main>
  )
}

