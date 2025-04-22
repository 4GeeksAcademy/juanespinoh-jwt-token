import React,{useContext} from "react";
import { Link } from "react-router-dom";
import {Context} from "../store/appContext.js"
import {useNavigate} from "react-router-dom"

export const Navbar = () => {
	const {store,actions:{deleteSessionStorage,getSessionStorage}}=useContext(Context)
	let existingSession= getSessionStorage()
	const navigate=useNavigate()

	const handlerCerrarSesion=()=>{
		deleteSessionStorage()
		navigate("/login")
	}
	
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">

					{
						
						existingSession ?  <button onClick={handlerCerrarSesion} className="btn btn-danger">Cerrar sesion</button> :
						<div className="container-fluid d-flex justify-content-center align-items-center flex-row gap-1">
						<button onClick={()=>navigate("/login")} className="btn btn-primary">Login</button> 
						<button onClick={()=>navigate("/signup")} className="btn btn-primary">Sign up</button> 
						</div>   
					}
					
				</div>
			</div>
		</nav>
	);
};
