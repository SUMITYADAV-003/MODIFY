import React from 'react'
import { Link } from 'react-router';
import Formgroup from '../components/Formgroup.jsx';
import "../styles/Register.scss";
const Register = () => {
  return (
    <main className='register-page'>
      <div className="form-container">
        <h1>Register user</h1>
        <form >
          <Formgroup label="User" placeholder="Enter Your User" />
          <Formgroup label="Email" placeholder="Enter Your Email" />
          <Formgroup label="password" placeholder="Enter Your password" />
          <button className='button'>Register</button>

          
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </main>
  )
}

export default Register;