import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/userActions';
import { LoginForm, UserDispatch } from '../types/user';
import { AppState } from '../store/index';
import { useEffect } from 'react';
import useMessage from '../hooks/useError';

type FieldType = {
  username: string;
  password: string;
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

function Login() {
  const { contextHolder, toast } = useMessage();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch<UserDispatch>();
  const { data, loading, error } = useSelector((state: AppState) => state.user);
  useEffect(() => {
    if (error) {
      toast(error, 'error');
    }
  }, [error, toast]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/records');
    }
  }, [data.username, navigate, toast]);

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values: LoginForm) => {
    dispatch(login(values));
  };

  return (
    <Form
      name='basic'
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      {...layout}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Please login</h2>
      {location.state?.newSignup && (
        <p style={{ textAlign: 'center', marginBottom: '20px' }}>
          You successfully signed up. Please login use your credentials
        </p>
      )}
      {contextHolder}
      <Form.Item<FieldType>
        label='Username'
        name='username'
        hasFeedback
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label='Password'
        name='password'
        hasFeedback
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit' loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
