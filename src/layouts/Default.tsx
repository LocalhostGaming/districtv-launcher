import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <main>
      Default layout
      {children}
    </main>
  );
};

export default DefaultLayout;
