import { HfInference } from '@huggingface/inference'
 
const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export const runtime = 'edge';

// Generate dog blob
// Woof
export async function GET(req: Request) {
  const dogBlob = await Hf.textToImage({
    model: 'stabilityai/stable-diffusion-2',
    inputs: 'A mecha robot in a favela in expressionist style',
  });

  console.log(dogBlob)

  const dogBloblURL = URL.createObjectURL(dogBlob);

  return new Response(dogBloblURL, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  })
}

