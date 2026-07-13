'use client';

import type { ReactNode } from 'react';

import Link from 'next/link';

import { useLocale, useTranslations } from 'next-intl';

import { MAIN_PAGE_ROUTE } from '@shared/constants/route-constants';

import './page.scss';

export default function AboutPage(): ReactNode {
  const translation = useTranslations('about');
  const locale = useLocale();

  return (
    <div className="about-page">
      <div className="about-page__wrapper wrapper">
        <h1 className="about-page__title">{translation('title')}</h1>

        <section className="about-page__section">
          <h2 className="about-page__subtitle">
            {translation('application.title')}
          </h2>
          <p className="about-page__text">
            {translation('application.description')}
          </p>
        </section>

        <section className="about-page__section">
          <h2 className="about-page__subtitle">
            {translation('course.title')}
          </h2>
          <p className="about-page__text">
            {translation('course.description')}
            <a
              className="about-page__link"
              href={translation('course.link')}
              target="_blank"
              rel="noreferrer"
            >
              RS School React Course
            </a>
          </p>
        </section>

        <Link
          className="about-page__back"
          href={`/${locale}/${MAIN_PAGE_ROUTE}`}
        >
          {translation('back')}
        </Link>
      </div>
    </div>
  );
}
