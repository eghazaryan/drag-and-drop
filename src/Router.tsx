import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Exercise1 } from './pages/Exercise1.page';
import { Exercise2 } from './pages/Exercise2.page';
import { Exercise3 } from './pages/Exercise3.page';

const router = createBrowserRouter([
  {
    path: '/exercise-1',
    element: <Exercise1 />,
  },
  {
    path: '/exercise-2',
    element: <Exercise2 />,
  },
  {
    path: '/exercise-3',
    element: <Exercise3 />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
