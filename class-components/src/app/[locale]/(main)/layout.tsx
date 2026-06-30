import type { ReactNode } from 'react';

import type { MainGroupLayoutProps } from '../model/types/main-group-layout-props.type.ts';

export function MainGroupLayout({ children }: MainGroupLayoutProps): ReactNode {
  return <>{children}</>;
}

export default MainGroupLayout;
