import React from "react";
import { RouterProvider } from "react-router";
import { routers } from "./app.router";
import { AuthProvider } from "./features/auth/auth.contex";
import { SongContextProvider } from "./features/home/song.context";

import "./features/shared/style/global.scss";

const App = () => {
  return (
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={routers} />
      </SongContextProvider>
    </AuthProvider>
  );
};

export default App;
