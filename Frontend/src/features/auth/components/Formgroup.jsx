import React from 'react'

const Formgroup = ({label, placeholder, value, onChange}) => {
  return (
    <div className='form-group'>
      <label htmlFor={label}>{label}</label>
    </div>
  )
}

export default Formgroup