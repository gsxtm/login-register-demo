/**
 * 注册组件
 *
 * @returns 返回登录组件的JSX元素
 */
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  username?: string;
  password?: string;
  confirmPassword?: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  /**
   * 处理登录逻辑，跳转到登录页面
   *
   * @returns 无返回值
   */
  const handleToLogin = () => {
    navigate('/login');
  };

  /**
   * 处理表单提交
   *
   * @returns 返回一个 Promise 对象，用于异步操作
   */
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      console.log(values);
      message.success({ content: '注册成功', onClose: handleToLogin });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div className="h-screen w-screen bg-slate-800 flex justify-center items-center">
      <div className="p-4 bg-white rounded-2xl w-3/4 max-w-96">
        <h2 className="text-xl font-medium mb-2">注册</h2>
        <Form name="login" layout="vertical" autoComplete="off" form={form}>
          <Form.Item<FieldType>
            label="账号"
            name="username"
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="账号" />
          </Form.Item>
          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>
          <Form.Item<FieldType>
            label="确认密码"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请输入确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('确认密码与密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
          </Form.Item>
          <Form.Item noStyle>
            <Button type="primary" block onClick={handleSubmit} loading={loading}>
              注册
            </Button>
          </Form.Item>
          <Form.Item noStyle>
            <Button type="link" className="p-0" onClick={handleToLogin}>
              去登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
