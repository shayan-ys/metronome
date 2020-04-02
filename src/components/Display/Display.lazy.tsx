import React, { lazy, Suspense } from 'react';

const LazyDisplay = lazy(() => import('./Display'));

const Display = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDisplay {...props} />
  </Suspense>
);

export default Display;
