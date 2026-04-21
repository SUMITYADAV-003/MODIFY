import React from 'react'
import { RouterProvider } from 'react-router';
import { routers } from './app.router';

const App = () => {
  return (
    <RouterProvider router={routers}/>
  )
}

export default App;