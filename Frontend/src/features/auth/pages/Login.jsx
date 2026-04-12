import React from 'react'
import "../style/form-contenter.scss"

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

      </div>
    </main>
  )
}

export default Login