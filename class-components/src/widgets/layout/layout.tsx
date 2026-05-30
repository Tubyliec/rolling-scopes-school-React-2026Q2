import type { LayoutProps } from '@widgets/layout/model/types/layout-props.ts';
import { type JSX } from 'react';

export function Layout({ children }: LayoutProps): JSX.Element {
  return <main className="layout">{children}</main>;
}
