import React,{useState,useEffect,useContext} from 'react'
import {Context} from "../store/appContext.js"

const Signup = () => {
    const {store,actions:{signupFetch}}=useContext(Context)
    const [data,setData]=useState({
        name:"",
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
        signupFetch(data).then((res)=>console.log(res)).catch((err)=>console.log(err))
    }

  return (
    <div className='container-fluid d-flex justify-content-center align-items-center flex-column'>
        <h1>Sign Up</h1>
        <form onSubmit={submitHandler} className='container-fluid d-flex justify-content-center align-items-center flex-column gap-2'>
            <label htmlFor="name">name</label>
            <input type="text" id='name' name='name' value={data.name} onChange={changeHandler} />
            <label htmlFor="password">password</label>
            <input type="text" id='password' name='password' value={data.password} onChange={changeHandler} />
            <label htmlFor="email">email</label>
            <input type="text" id='email' name='email' value={data.email} onChange={changeHandler} />
            <button className='btn btn-primary' type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Signup