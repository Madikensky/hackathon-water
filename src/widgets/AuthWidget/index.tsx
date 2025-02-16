'use client';

import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { useRouter } from 'next/navigation';

type FieldType = {
  email: string;
  password: string;
};

export const AuthForm: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string>('');

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const { email, password } = values;
    if (email === 'admin' && password === '1234') {
      router.push('/');
    } else {
      setError('Неправильный email или пароль.');
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Пожалуйста, введите вашу почту' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Пожалуйста, введите ваш пароль' },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        {error && (
          <span className="text-red-500" style={{ color: 'red' }}>
            {error}
          </span>
        )}
      </Form>
    </>
  );
};
