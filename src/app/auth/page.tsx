'use client';

import '@ant-design/v5-patch-for-react-19';
import { AuthForm } from '@/features/AuthForm';
import { FC } from 'react';

const Auth: FC = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full flex-col gap-5 overflow-hidden">
      <AuthForm />
    </div>
  );
};

export default Auth;
