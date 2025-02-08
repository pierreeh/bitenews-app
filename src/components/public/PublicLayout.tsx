import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';

export default function PublicLayout({ children }: { children?: ReactNode }) {
  return (
    <>
      <div>
        <PublicHeader />
        <main>{children ?? <Outlet />}</main>
      </div>
      <PublicFooter />
    </>
  );
}
