import React, { useState, useEffect } from "react";
import  { useNavigate } from 'react-router-dom'
import './Styles/Signin.css';

const Signin = () => {
	const navigate = useNavigate();

	const [name,setName] = useState("");
	const [password,setPassword] = useState("");
	const [cpassword,setCpassword] = useState("");
	const [email,setEmail] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if(password!=cpassword) {
			alert("password bitch");
			return false;
		}
		const res = await fetch('/signup', {
			method : "POST",
			headers : {
				"Content-Type" : "application/json"
			},
			body : JSON.stringify({
				name, email, password
			})
		});
		const data = await res.json();
		if(res.status===200 && data.isSuccess==true) {
			navigate('/signin');
		}
		else if(res.status===200 && data.isSuccess==false){
			navigate('/signin');
		}
		else{
			alert("Some error occured. Please try again");
			setName('');
			setPassword('');
			setCpassword('');
			setEmail('');
		}
	}

	const checkAuthentication = async ()=>{
		const res = await fetch('/signup', {
			method : "GET",
			credentials: "include",	
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		});
		const data = await res.json();
		if(res.status===200 && data.isAuthenticated){
			navigate('/');
		}
		else if(res.status!==200){
			alert("Some error occured. Please try again");
		}
	}

	useEffect(()=>{
		checkAuthentication();
	},[])

    return (
        <div className="box-form">
	        <div className="left">
	        	<div className="overlay">
	        	<h1>DMS</h1>
	        	<p>A store where you can find everything you need for your village from registers to stationery items and much more</p>
	        	<span>
	        		<p>Register with Social Media</p>
	        		<a href="#" className="google">Google</a>
	        	</span>
	        	</div>
	        </div>
	
		    <div className="right">
		        <h5>Register </h5>
		        <p>Already have an account? <a href="#">Login here.</a></p>
				<form onSubmit={handleSubmit}>
					<div className="inputs">
						<input 
							type="text" 
							value={name} 
							onChange={(e)=>setName(e.target.value)} 
							placeholder="Username" 
						/>
						<br/>
						<input 
							type="email" 
							value={email} 
							onChange={(e)=>setEmail(e.target.value)} 
							placeholder="Email ID" 
						/>
						<br/>
						<input 
							type="password"
							value={password}
							onChange={(e)=>setPassword(e.target.value)} 
							placeholder="Password"
						/>
						<br/>
						<input 
							type="password" 
							value={cpassword}
							onChange={(e)=>setCpassword(e.target.value)}
							placeholder="Confirm Password" 
						/>
					</div>
			

					<br/>
					<div className="loginBtn">
						<button className="forgetpass">Register</button>
					</div>

				</form>
	        </div>
        </div>
    );
}

export default Signin