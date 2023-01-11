import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './component/layout/Main';
import Login from './component/Login';
import RegisterReactBootstrap from './component/RegisterReactBootstrap'
import RegisterBootstrap from './component/RegisterBootstrap'
import Register from './component/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main>0</Main>,
    children: [
      {
        path: '/',
        element: <RegisterReactBootstrap></RegisterReactBootstrap>
      },
      {
        path: '/register',
        element: <RegisterReactBootstrap></RegisterReactBootstrap>
      },
      {
        path: '/register-html',
        element: <Register></Register>
      },
      {
        path: '/register-bootstrap',
        element: <RegisterBootstrap></RegisterBootstrap>
      },
      {
        path: '/login',
        element: <Login></Login>
      }
    ]
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
