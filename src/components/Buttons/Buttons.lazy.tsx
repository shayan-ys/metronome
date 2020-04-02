import React, { lazy, Suspense } from 'react';

const LazyButtons = lazy(() => import('./Buttons'));

const Buttons = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyButtons {...props} />
  </Suspense>
);

export default Buttons;
