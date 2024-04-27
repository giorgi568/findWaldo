import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Game from './components/Game';

const Router = () => {
  const router = createBrowserRouter([
    { path: '/', element: <App /> },
    {
      path: '/game',
      element: <Game />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
