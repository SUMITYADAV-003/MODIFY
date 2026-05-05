import React from "react";

const Formgroup = ({ label, placeholder, value, onChange, type = "text" }) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={label}
        name={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
       
       
      />
    </div>
  );
};

export default Formgroup;
