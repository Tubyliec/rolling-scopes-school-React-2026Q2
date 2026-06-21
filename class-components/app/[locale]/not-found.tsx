'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { MAIN_PAGE_ROUTE } from '@shared/constants/route-constants';

export function NotFoundPage(): ReactNode {
  const t = useTranslations('not-found');
  const locale = useLocale();

  return (
    <div className="not-found-page">
      <div className="not-found-page__code">404</div>
      <h1 className="not-found-page__title">{t('title')}</h1>
      <p className="not-found-page__text">{t('description')}</p>
      <Link className="not-found-page__back" href={`/${locale}/${MAIN_PAGE_ROUTE}`}>
        {t('back')}
      </Link>
    </div>
  );
}

export default NotFoundPage;
