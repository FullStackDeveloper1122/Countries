import {createRoot} from 'react-dom/client';
import App from './App';
import {createBrowserRouter,RouterProvider,} from 'react-router-dom';
import Contact from './Components/Contact';
// import { Children } from 'react';
import Home from './Components/Home';
import Error from './Components/Error';
import CountryDetail from './Components/CountryDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  children: [

      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/:country",
        element: <CountryDetail />,
      },
  ]
}
]);


const root = createRoot(document.getElementById('root'));
root.render( <RouterProvider router={router} />);