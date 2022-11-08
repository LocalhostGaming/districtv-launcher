import { ROUTE } from '@constants/routes';
import { useUserService } from '@services/user';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const { me: getUserDetails } = useUserService();

interface Props {
  children: ReactNode;
  isPrivate?: boolean;
}

export const Route = ({ children, isPrivate }: Props): JSX.Element | null => {
  const navigate = useNavigate();

  const { data: user } = getUserDetails();

  useEffect(() => {
    // If route is private but user is not logged in
    if (isPrivate && !user) {
      // Redirect to Login
      navigate(ROUTE.AUTH.LOGIN);
    }

    // If route is public but has logged in user
    if (!isPrivate && user) {
      // Redirect to Dashboard
      navigate(ROUTE.DASHBOARD.PLAY);
    }
  }, [user]);

  return children as JSX.Element;
};
