import {RouterProvider} from "react-router";
import {router} from "./app.router";
import "../src/features/shared/global.scss"

import { AuthProvide } from "./features/auth/auth.context";



const App = () => {
  return (
    <AuthProvide>
      <RouterProvider router={router}/>
    </AuthProvide>
  )
}

export default App