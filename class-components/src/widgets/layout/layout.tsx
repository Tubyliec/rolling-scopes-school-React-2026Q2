import { type JSX } from 'react';

import type { LayoutProps } from '@widgets/layout/model/types/layout-props.ts';

export function Layout({ children }: LayoutProps): JSX.Element {
  return <main className="layout">{children}</main>;
}
