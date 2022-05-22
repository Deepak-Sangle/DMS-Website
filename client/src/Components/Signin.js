import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Styles/Signin.css';
const Signin = () => {

	const navigate = useNavigate();

	const [password,setPassword] = useState("");
	const [email,setEmail] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await fetch('/signin', {
			method : "POST",
			headers : {
				"Content-Type" : "application/json"
			},
			body : JSON.stringify({
				email, password
			})
		});
		const data = await res.json();
        console.log(data);
		if(res.status===200 && data.message===undefined) {
			navigate('/');
		} 
		else if(res.status===200 && data.message!==undefined) {
			alert(data.message);
		}
		else {
			alert("Some error occured. Please try again");
		}
	}


    return (
        <div className="box-form">
	        <div className="left">
	        	<div className="overlay">
	        	<h1>DMS</h1>
	        	<p>A store where you can find everything you need for your village from registers to stationery items and much more</p>
	        	<span>
	        		<p>Login with Social Media</p>
	        		<a href="#" className="google">Google</a>
	        	</span>
	        	</div>
	        </div>
	
		    <div className="right">
		        <h5>Login </h5>
		        <p>Don't have an account? <a href="#">Create Your Account.</a> It takes less than a minute</p>
                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                    <input 
							type="text" 
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
                    </div>

                    <br/>
            
                    <div className="remember-me--forget-password">
                        <p className="forgetpass">Forgot password?</p>
                    </div>
                
                    <br/>
                    <div className="loginBtn">
                        <button className="forgetpass">Login</button>
                    </div>
                </form>
	        </div>
        </div>
    );
}

export default Signin