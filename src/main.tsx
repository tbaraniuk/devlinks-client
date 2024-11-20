import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { HomePage, Register, Login, Preview, Profile } from './routes';
import { ProtectedRoute } from './components';
import store from './store/store';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/preview/:username',
    element: <Preview isCurrentUser={false} />,
  },
  {
    path: '/preview',
    element: <Preview isCurrentUser={true} />,
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    <ToastContainer closeOnClick />
  </StrictMode>
);
