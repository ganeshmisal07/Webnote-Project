import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [credentials, setCredentials] = useState({ name:"", email: "", password: "", cpassword:""});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password })

    });
    const json = await response.json();
    if (json.success) {
        //redirect
        localStorage.setItem('token', json.authtoken);
        navigate("/");
    }
    else{
        alert("User with This Email already exists")
    }

}
  
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
}

  return (
    <>
            <div className="container my-3">
            <h2 className='mt-3'>Create an account to use WebNote</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 my-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" onChange={onChange} required />
                    </div>
                    <div className="mb-3 my-3">
                        <label htmlFor="email" className="form-label">Enail Address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label" >Password</label>
                        <input type="password" className="form-control" name="password"  id="password" onChange={onChange}  minLength={7} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label" >Confirm Password</label>
                        <input type="password" className="form-control" name="cpassword"  id="cpassword" onChange={onChange}  minLength={7} required />
                    </div>
                    <button type="submit" className="btn btn-primary" >Signup</button>
                </form>
            </div>
        </>
  )
}

export default Signup;