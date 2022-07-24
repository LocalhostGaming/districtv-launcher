import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <main>
      main layout
      {children}
    </main>
  );
};

export default MainLayout;
