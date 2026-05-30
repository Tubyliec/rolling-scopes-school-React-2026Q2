import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import './about-page.scss';

function AboutPage(): JSX.Element {
  return (
    <div className="about-page">
      <div className="about-page__wrapper wrapper">
        <h1 className="about-page__title">About</h1>

        <section className="about-page__section">
          <h2 className="about-page__subtitle">Application</h2>
          <p className="about-page__text">
            Star Wars API Search is a application that lets you explore
            characters from the Star Wars universe using the SWAPI public API.
          </p>
        </section>

        <section className="about-page__section">
          <h2 className="about-page__subtitle">Course</h2>
          <p className="about-page__text">
            Built for
            <a
              className="about-page__link"
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noreferrer"
            >
              RS School React Course
            </a>
            .
          </p>
        </section>

        <Link className="about-page__back" to="/main">
          ← Back to Search
        </Link>
      </div>
    </div>
  );
}

export default AboutPage;
