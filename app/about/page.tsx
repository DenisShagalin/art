import Image from 'next/image'
import about from './about.jpg';
import './index.css';

export default function About() {
  return (
    <div className='about'>
      <Image src={about} alt='about' />
      <div>
        <p style={{ marginTop: 'unset' }}>
        <strong>About me </strong><br />
          I am Anastasia Strauss and my paintings will help you
          discover your inner world. I paint in a free style and this
          allows me to express my feelings on canvas as much as
          possible. Here you will see a mixture of colors and shapes.
          Color affects the eye, it can cause both joyful emotions
          and despair. Everyone will see something different in my
          artwork and it will be unique.
        </p>
        <p>
          <strong>Projects and events</strong><br />
          2023 - Charity auction of the "Mom + Me" foundation, Vienna, Austria<br />
          2022 - Project "Vienna through the eyes of Ukrainian displaced artists", Vienna, Austria<br />
          2022 - Ukrainian arts and crafts market in the MQ, Vienna, Austria<br />
          2009 - Participant, All-Ukrainian competition for lighting design, "Light",
          Kharkiv, Ukraine<br />
          2008 - 2nd diploma, All-Ukrainian competition for lighting design, "Light",
          Kharkiv, Ukraine
        </p>
        <p>
          <strong>Exhibitions</strong><br />
          2024 – Solo-exhibition Gleis//Garten, Vienna, Austria<br />
          2023 - “Bloom. Awakening”, Stable Gallery, Vienna, Austria<br />
          2023 - “L’ESSENZZA DELLA BELLEZZA”, Alte Schieberkammer, Vienna,
          Austria, Arthentico Gallery<br />
          2022- “Insight of U”, TAITH Contemporary Gallery, Vienna, Austria<br />
          2021 - "Colors of my summer" in the art space BREWKI-Bar, Kharkiv, Ukraine<br />
          2020 - "Rock Symphony" in the art space BREWKI Bar, Kharkiv, Ukraine
        </p>
      </div>
    </div>
  )
}
