import { ReactNode } from 'react';
import { Router, useLocation, useRouter } from 'wouter';

interface Props {
  base: string;
  children: ReactNode;
}

export const NestedRoute = ({ base, children }: Props) => {
  const router = useRouter();
  const [parentLocation] = useLocation();

  const nestedBase = `${router.base}${base}`;

  // don't render anything outside of the scope
  if (!parentLocation.startsWith(nestedBase)) return null;

  // we need key to make sure the router will remount if the base changes
  return (
    <Router base={nestedBase} key={nestedBase}>
      {children}
    </Router>
  );
};
