import React from 'react'
import "../style/form-contenter.scss";
import {Link} from "react-router"

const Login = () => {
  return (
    <main>
      <div className="form-container">
        <h1>User Login</h1>
         <div className="red"></div>
          <div className="green"></div>

        <form >
         
          <input type="text" placeholder='Enter username / email' />
          <input type="password" placeholder='Enter Password' />
          <button>Login</button>
        </form>
        <p>Don't have an account ? <Link to={"/register"} >Create One.</Link></p>

      </div>
    </main>
  )
}

export default Login