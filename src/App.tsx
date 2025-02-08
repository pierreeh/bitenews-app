import { Suspense } from 'react';

import Router from './Router';
import { Spinner } from './components/ui/spinner';

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <Router />
    </Suspense>
  );
}
