/**
 * 登录组件
 *
 * @returns 返回登录组件的JSX元素
 */
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  /**
   * 处理注册事件，跳转到注册页面
   */
  const handleToRegister = () => {
    navigate('/register');
  };

  /**
   * 处理表单提交事件
   *
   * @returns 无返回值
   */
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      // console.log(values);
      const response = await axios.post('/api/login', values);
      // console.log(response);
      if (response.data.code === 200) {
        message.success('登录成功');
      } else {
        message.error('登录失败');
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return (
    <div className="h-screen w-screen bg-slate-800 flex justify-center items-center">
      <div className="p-4 bg-white rounded-2xl w-3/4 max-w-96">
        <h2 className="text-xl font-medium mb-2">登录</h2>
        <Form
          form={form}
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="账号"
            name="username"
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="账号" maxLength={20} />
          </Form.Item>
          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" maxLength={20} />
          </Form.Item>
          <Form.Item<FieldType> name="remember" valuePropName="checked">
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item noStyle>
            <Button type="primary" block onClick={handleSubmit} loading={loading}>
              登录
            </Button>
          </Form.Item>
          <Form.Item noStyle>
            <Button type="link" className="p-0" onClick={handleToRegister}>
              去注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
