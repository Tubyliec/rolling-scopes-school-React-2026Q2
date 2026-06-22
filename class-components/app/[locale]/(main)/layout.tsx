import type { ReactNode } from 'react';

interface MainGroupLayoutProps {
  readonly children: ReactNode;
}

export function MainGroupLayout({ children }: MainGroupLayoutProps): ReactNode {
  return <>{children}</>;
}

export default MainGroupLayout;
