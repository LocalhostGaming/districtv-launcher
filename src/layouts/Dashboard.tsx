import { ROUTE } from '@constants/routes';
import { Button, Text } from '@mantine/core';
import { useAuthService } from '@services/auth';
import { useUserService } from '@services/user';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

const { logout } = useAuthService();
const { me: meService } = useUserService();

const DashboardLayout = ({ children }: Props) => {
  const navigate = useNavigate();

  const { data: user } = meService();

  const handleOnLogout = () => {
    logout();
    navigate(ROUTE.AUTH.LOGIN);
  };

  return (
    <main className="h-full grid place-content-center">
      <div className="mb-6 text-center">
        <Text size="sm">{user?.email}</Text>
        <Text size="sm">{user?.username}</Text>
      </div>
      {children}
      <Button
        compact
        variant="subtle"
        className="mt-6"
        onClick={() => handleOnLogout()}
      >
        Logout
      </Button>
    </main>
  );
};

export default DashboardLayout;
