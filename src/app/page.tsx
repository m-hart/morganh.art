import styles from './page.module.scss'

async function getDog(): Promise<string> {
  const res = await fetch(
    `${process.env.CANONICAL_URL}/api/dog`,
    {
      method: 'GET',
      mode: 'same-origin',
      cache: 'no-cache',
      // next: {
      //   revalidate: 60,
      // }
    }
  );

  return (await res.json()).uri;
}

export default async function Page() {
  // const dogURI = await getDog();

  return (
    <main className={styles.main}>
      <img 
        // src={dogURI} 
        alt="Generated image of pip the jack russell" 
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

