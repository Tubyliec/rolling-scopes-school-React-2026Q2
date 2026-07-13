'use client';

import type { ReactNode } from 'react';

import Link from 'next/link';

import { useLocale, useTranslations } from 'next-intl';

import { MAIN_PAGE_ROUTE } from '@shared/constants/route-constants';

export default function NotFoundPage(): ReactNode {
  const translation = useTranslations('not-found');
  const locale = useLocale();

  return (
    <div className="not-found-page">
      <div className="not-found-page__code">404</div>
      <h1 className="not-found-page__title">{translation('title')}</h1>
      <p className="not-found-page__text">{translation('description')}</p>
      <Link
        className="not-found-page__back"
        href={`/${locale}/${MAIN_PAGE_ROUTE}`}
      >
        {translation('back')}
      </Link>
    </div>
  );
}
