import React,{useContext,useEffect,useState} from 'react'
import {Context} from "../store/appContext.js"
import {useNavigate} from "react-router-dom"


const Login = () => {
  const {store,actions:{loginFetch}}=useContext(Context)
  const navigate=useNavigate()
  const [data,setData]=useState({
    password:"",
    email:""
})

const changeHandler=(e)=>{
    e.persist()
    setData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
}

const submitHandler=(e)=>{
  e.preventDefault()
  loginFetch(data)
  .then((res)=>{
    if(res===true){
      navigate("/private")
    }
  })
  .catch((err)=>console.log(err))
}
  return (
    <div className='flex-column container-fluid d-flex justify-content-center align-items-center'>
      <h1>Login</h1>
              <form 
              className='flex-column container-fluid d-flex justify-content-center align-items-center gap-3'
              onSubmit={submitHandler}>

            <label htmlFor="password">password</label>
            <input type="text" id='password' name='password' value={data.password} onChange={changeHandler} />
            <label htmlFor="email">email</label>
            <input type="text" id='email' name='email' value={data.email} onChange={changeHandler} />
            <button className='btn btn-primary' type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Login