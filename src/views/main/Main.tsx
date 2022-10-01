import { useEffect } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

const MainPage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/' || pathname.includes('index.html'))
      navigate('/auth/login');
  }, []);

  return <Outlet />;
};

export default MainPage;
