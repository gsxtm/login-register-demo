import { createBrowserRouter, RouteObject, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" />,
  },
  {
    path: '/login',
    element: <Login  />,
  },
  {
    path: '/register',
    element: <Register />,
  },
];
const router = createBrowserRouter(routes);

export default router;
