import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return <main className="h-full grid place-content-center">{children}</main>;
};

export default DashboardLayout;
