import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// project imports
import Loadable from 'components/Loadable';
import PublicRoute from 'components/PublicRoute';

// jwt auth
const LoginPage = Loadable(lazy(() => import('pages/auth/Login')));
const RegisterPage = Loadable(lazy(() => import('pages/auth/Register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes: RouteObject = {
  path: '/',
  children: [
    {
      path: '/',
      children: [
        {
          path: '/login',
          element: (
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          )
        },
        {
          path: '/register',
          element: (
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          )
        }
      ]
    }
  ]
};

export default LoginRoutes;
