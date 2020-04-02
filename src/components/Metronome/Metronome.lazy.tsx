import React, { lazy, Suspense } from 'react';

const LazyMetronome = lazy(() => import('./Metronome'));

const Metronome = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMetronome {...props} />
  </Suspense>
);

export default Metronome;
