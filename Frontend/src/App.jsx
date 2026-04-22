import React from 'react'
import { RouterProvider } from 'react-router';
import { routers } from './app.router';
import { AuthProvider } from './features/auth/auth.contex';

import "./features/shared/style/global.scss";

const App = () => {
  return (
    <AuthProvider>
    <RouterProvider router={routers}/>
    </AuthProvider>
  )
}

export default App;