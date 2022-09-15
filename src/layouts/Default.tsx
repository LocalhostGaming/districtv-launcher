import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <main className="flex justify-center items-center h-full">{children}</main>
  );
};

export default DefaultLayout;
