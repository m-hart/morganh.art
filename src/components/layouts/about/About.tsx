import styles from './about.module.scss';

export default function About() {
  return (
    <div className={styles.container}>
      <p>i'm a 24 year old developer who likes making cool stuff</p>
      <div>
        <p>contact</p>
        <ul>
          <li>coming soon</li>
          {/* <li>linkedin: coming soon</li>
          <li>email: coming soon</li>
          <li>github: private</li> */}
        </ul>
      </div>
    </div>
  )
}