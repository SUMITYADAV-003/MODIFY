import React from 'react'
import Formgroup from '../components/Formgroup'
import "../styles/Login.scss";
import { Link } from 'react-router';




const Login = () => {
  return (
    <main className='login-page'>
      <div className="form-container">
        <h1>Login</h1>
        <form >
          <Formgroup label="Email" placeholder="Enter Your Emial" />
          <Formgroup label="Password" placeholder="Enter Your Password" />
          <button className='button'>Login</button>


        </form>

     
<p>Don't have an account? <Link to="/register">Register</Link></p>

      </div>

    </main>
  ) 
}

export default Login