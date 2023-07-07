import sample from 'lodash/sample';
import { HfInference } from '@huggingface/inference'
import { differenceInSeconds } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export const revalidate = 60;

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

interface DogCache {
  dogURI?: string;
  date: Date;
}

const CACHE: DogCache = {
  dogURI: undefined,
  date: new Date(),
}

/**
 * NOTE: This is not a great approach.
 * HOWEVER -  it allows us to persist a common dog image
 * while the next one is generating.
 * This improves page load speeds apart from initial generation.
 */
async function fetchDog() {
  CACHE.date = new Date();
  const dogbuf = await (await Hf.textToImage({
    model: 'stabilityai/stable-diffusion-2',
    inputs: `A jack russell terrier in a ${sample(artLocations)} in a ${sample(artStyles)} style`,
  }, {
    use_cache: false,
    fetch: (input, init) => fetch(input, {
      ...init,
      // Set no cache as we want a new dog image every fetch.
      cache: 'no-cache',
    })
  })).arrayBuffer();

  CACHE.dogURI =  `data:img/jpeg;base64,${Buffer.from(dogbuf).toString('base64')}`;
}

export async function GET() {
  // Fetch initial dog if not cached
  if (CACHE.dogURI === undefined) {
    await fetchDog();

    return NextResponse.json({ uri: CACHE.dogURI });
  }

  // Fetch new dog and update cache, but serve old dog image in the mean time.
  if (differenceInSeconds(new Date(), CACHE.date) > 60) {
    fetchDog();
  }

  return NextResponse.json({ uri: CACHE.dogURI });
}

