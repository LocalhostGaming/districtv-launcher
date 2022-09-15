import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
  return <main>{children}</main>;
};

export default DefaultLayout;
