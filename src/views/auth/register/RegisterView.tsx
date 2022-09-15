import { ROUTE } from '@constants/routes';
import { Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import { useLocation } from 'wouter';

const RegisterView = () => {
  const [, setLocation] = useLocation();

  return (
    <div className="p-4 h-full flex place-content-center">
      <div className="w-[340px]  text-center">
        <div className="mt-20">
          <Button
            size="sm"
            color="dark"
            leftIcon={<IconArrowLeft size={17} />}
            className="font-medium px-6"
            variant="light"
            radius={100}
            onClick={() => setLocation(ROUTE.AUTH.LOGIN.PATH)}
          >
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
