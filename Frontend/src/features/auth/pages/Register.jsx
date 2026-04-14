import React from 'react'
import {Link} from "react-router"

const Register = () => {
  return (
    <main>
      <div className="form-container">
        <h1>User Login</h1>
         <div className="red"></div>
          <div className="green"></div>

        <form >
         
          <input type="text" placeholder='Enter username ' />
          <input type="email" placeholder='Enter  email' />
          <input type="password" placeholder='Enter Password' /> 
          <button>Register</button>
        </form>
         <p>Already have an account ? <Link to={"/login"} >Login to account.</Link></p>

      </div>
    </main>
  )
}

export default Register