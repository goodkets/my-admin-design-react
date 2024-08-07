import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '@/utils/storeages';

function AuthGuard({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken('token');
    console.log('token', token);
    if (token) {
      // 如果已经登录，则重定向到登录页面
      navigate('/home');
    } else {
       navigate('/login');
    }
  }, [navigate]);

  return <>{children}</>;
}

export default AuthGuard;