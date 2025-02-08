import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/notFound/NotFound';

const PublicLayout = lazy(() => import('./components/public/PublicLayout'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));

export default function Router() {
  const router = createBrowserRouter([
    {
      element: <PublicLayout />,
      errorElement: (
        <PublicLayout>
          <NotFound />
        </PublicLayout>
      ),
      children: [
        {
          path: '/',
          index: true,
          element: <Home />,
        },
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
