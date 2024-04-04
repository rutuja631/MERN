import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  useEffect(()=>{
    const auth=localStorage.getItem('user');
    if (auth) {
      navigate('/')
    }
  })
    const [name, setName]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const navigate=useNavigate()
    const handleClick = async () => {
      let result= await fetch('http://localhost:5000/signup',{
        method: 'POST',
        body: JSON.stringify({name,email,password}),
        headers: {'Content-Type': 'application/json'}
      })
      result=await result.json()
      console.log(result);
      localStorage.setItem("user",JSON.stringify(result.result));
      localStorage.setItem("token",JSON.stringify(result.auth));
      navigate('/')
    }
  return (
    <div className="register">
      <h1>Register</h1>
      <input type="text" className="inputBox" value={name} placeholder='Enter Username' onChange={(e)=>setName(e.target.value)}/>
      <input type="email" className="inputBox" value={email} placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" className="inputBox" value={password} placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}/>
      <button type="button" className="boxButton" onClick={handleClick}>Sign Up</button>
    </div>
  )
}

export default SignUp
