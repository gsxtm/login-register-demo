import Mock from 'mockjs';

Mock.setup({
  timeout: '400-600',
});

// 模拟登录接口
Mock.mock('/api/login', 'post', (options) => {
  const { username, password } = JSON.parse(options.body);
  if (username === 'admin' && password === '123456') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: 'token',
        user: {
          id: 1,
          username: 'admin',
        },
      },
    };
  } else {
    return {
      code: 401,
      message: '用户名或密码错误',
    };
  }
});

// 模拟注册接口
Mock.mock('/api/register', 'post', (options) => {
  const { username, password } = JSON.parse(options.body);
  // 假设注册成功返回用户信息和 token
  return {
    code: 200,
    message: '注册成功',
    data: {
      token: 'token',
      user: {
        id: 1,
        username,
      },
    },
  };
});