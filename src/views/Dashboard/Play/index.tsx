import { Loader } from '@mantine/core';
import { Suspense } from 'react';
import { lazily } from 'react-lazily';

const { Play } = lazily(() => import('./Play'));

export const PlayPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Play />
    </Suspense>
  );
};
