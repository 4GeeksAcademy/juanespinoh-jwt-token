import React,{useContext,useEffect,useState} from 'react'
import {Context} from "../store/appContext.js"
import {useNavigate} from "react-router-dom"

const Private = () => {
    const {store,actions:{getSessionStorage,fetchUser}}=useContext(Context)
     const navigate=useNavigate()
     const[data,setData]=useState({})

    useEffect(()=>{
        const check=getSessionStorage()
        if(check===false){
            navigate("/login")
        }else{
            fetchUser()
                .then((res)=>setData(res))
                .catch((err)=>err)
        }
    },[])

    useEffect(()=>{console.log(data

    )},[data])
  return (
    <div className='container-fluid d-flex justify-content-center align-items-center flex-column'>
        <h1>RUTA PRIVADA</h1>
        <p>{`ID: ${data.id}`}</p>
        <p>{`NAME: ${data.name}`}</p>
        <p>{`EMAIL: ${data.email}`}</p>
        
        </div>
  )
}

export default Private