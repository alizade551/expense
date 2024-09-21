import { Button, Form, Input } from 'antd';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useMessage from '../hooks/useError';

type FieldType = {
  username: string;
  password: string;
  email: string;
  full_name: string;
  confirm?: string;
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};
type FieldErrors = Partial<Record<keyof FieldType, string>>;

function SignUp() {
  const [form] = Form.useForm();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const navigate = useNavigate();

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { contextHolder, toast } = useMessage();

  const onFinish = async (values: FieldType) => {
    setIsFetching(true);
    delete values.confirm;
    try {
      await api().post('/users/register', values);
      navigate('/login', { state: { newSignup: true } });
    } catch (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      error: any
    ) {
      if (error.response && error.response.data) {
        const errorData = error.response.data.errorMessage;
        if (typeof errorData === 'object') {
          setFieldErrors({ [error.response.data.errorMessage.error]: error.response.data.errorMessage.message });
        } else {
          setFieldErrors({ username: errorData });
          toast(error.message, 'error');
        }
      } else {
        setFieldErrors({});
        toast(error.message, 'error');
      }
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Form form={form} name='register' onFinish={(values: FieldType) => onFinish(values)} autoComplete='off' {...layout}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register for an account</h2>
      {contextHolder}
      <Form.Item<FieldType>
        label='Username'
        validateStatus={fieldErrors.username ? 'error' : undefined}
        hasFeedback
        help={fieldErrors.username}
        name='username'
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label='E-mail'
        name='email'
        hasFeedback
        validateStatus={fieldErrors.email ? 'error' : undefined}
        help={fieldErrors.email}
        rules={[
          { required: true, message: 'Please input your email!' },
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label='Full Name'
        name='full_name'
        hasFeedback
        validateStatus={fieldErrors.full_name ? 'error' : undefined}
        help={fieldErrors.full_name}
        rules={[{ required: true, message: 'Please input your full name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label='Password'
        name='password'
        hasFeedback
        validateStatus={fieldErrors.password ? 'error' : undefined}
        help={fieldErrors.password}
        rules={[
          { required: true, message: 'Please input your password!' },
          { min: 6, message: 'Password min length must be 6 characters' },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name='confirm'
        label='Confirm Password'
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type='primary' htmlType='submit' loading={isFetching}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SignUp;
