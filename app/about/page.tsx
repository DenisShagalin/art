import Image from 'next/image'
import about from './about.jpg';
import './index.css';

export default function About() {
  return (
    <div className='about'>
      <Image src={about} alt='about' />
      <div>
        <p style={{ marginTop: 'unset' }}>
          About me <br />
          I am Anastasia Strauss and my paintings will help you
          discover your inner world. I paint in a free style and this
          allows me to express my feelings on canvas as much as
          possible. Here you will see a mixture of colors and shapes.
          Color affects the eye, it can cause both joyful emotions
          and despair. Everyone will see something different in my
          artwork and it will be unique.
        </p>
        <p>
          <strong>Projekte und Veranstaltungen</strong><br />
          2022 Projekt „Wien mit den Augen der ukrainischen
          vertriebenen Künstlerinnen", Wien, Österreich<br/>
          2022 - Ukrainischer Kunst- und Handwerksmarkt im
          MQ, Wien, Österreich<br/>
          2008 - 2.Diplom, Gesamtukrainischer Wettbewerb
          für Lichtdesign, "Licht", Charkiw, Ukraine<br/>
          2009 - Teilnehmer, Allukrainischer Wettbewerb für
          Lichtdesign, "Licht", Charkiw, Ukraine
        </p>
        <p>
          <strong>Persönliche Ausstellungen</strong><br />
          2021 - "Colors of my summer" im Kunstraum BREWKI-Bar,
          Charkiw, Ukraine<br />
          2020 - "Rock Symphony" im Kunstraum BREWKI Bar,
          Charkiw, Ukraine
        </p>
      </div>
    </div>
  )
}
