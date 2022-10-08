import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Styles/Signin.css';
import { Link } from "react-router-dom";

const Signin = () => {

	const navigate = useNavigate();
	
	const [name, setName] = useState("");
	const [cpassword,setCpassword] = useState("");
	const [isSignin, setIsSignin] = useState(true);
	const [password,setPassword] = useState("");
	const [email,setEmail] = useState("");

	const handleSignIn = async (e) => {
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

	const handleSignUp = async (e) => {
		if(password!=cpassword) {
			alert("Password does not match");
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

	const handleSubmit = (e) => {
		e.preventDefault();
		if(isSignin){
			handleSignIn();
		}
		else{
			handleSignUp();
		}
	}

	const switchToSignUp = () => {
		setIsSignin(false);
		const signIn = document.getElementById("signIn");
		const signUp = document.getElementById("signUp");
		signIn.className = "right move-up-signin";
		signUp.className = "right move-up-signup";
	}
	
	const switchToSignIn = () => {
		setIsSignin(true);
		const signIn = document.getElementById("signIn");
		const signUp = document.getElementById("signUp");
		signIn.className = "right move-down-signin";
		signUp.className = "right move-down-signup";
	}

    return (
        <div id="auth-box" className="box-form">
	        <div className="left">
	        	<div className="overlay">
	        	<h1>DMS</h1>
	        	<p>A store where you can find everything you need for your village from registers to stationery items and much more</p>
	        	<span>
	        		<a href="#" className="google">Google</a>
	        	</span>
	        	</div>
	        </div>

			<div className="left-float">
				
				<div id="signIn" className="right">
					<h5>Sign in </h5>
					<div>Don't have an account? <span className="create-span" onClick={switchToSignUp}>Create Your Account</span></div>
					<form onSubmit={handleSubmit}>
						<div className="inputs">
							<input 
								type="text" 
								value={email} 
								onChange={(e)=>setEmail(e.target.value)} 
								placeholder="Email ID" 
							/>
							<input 
								type="password"
								value={password}
								onChange={(e)=>setPassword(e.target.value)} 
								placeholder="Password"
							/>
						</div>

						<div className="remember-me--forget-password">
							<p className="forgetpass">Forgot password?</p>
						</div>
		
						<div className="loginBtn">
							<button className="forgetpass">Sign in</button>
						</div>
					</form>
				</div>

				<div id="signUp" className="right">
					<h5>Sign Up </h5>
					<div>Already have an account? <span className="create-span" onClick={switchToSignIn}>Login here.</span></div>
					<form onSubmit={handleSubmit}>
						<div className="inputs">
							<input 
								type="username"
								value={name}
								onChange={(e)=>setName(e.target.value)}
								placeholder="Name" 
							/>
							<input 
								type="text" 
								value={email} 
								onChange={(e)=>setEmail(e.target.value)} 
								placeholder="Email ID" 
							/>
							<input 
								type="password"
								value={password}
								onChange={(e)=>setPassword(e.target.value)} 
								placeholder="Password"
							/>
							<input 
								type="password" 
								value={cpassword}
								onChange={(e)=>setCpassword(e.target.value)}
								placeholder="Confirm Password" 
							/>
						</div>
		
						<div className="loginBtn">
							<button className="forgetpass">Sign Up</button>
						</div>
					</form>
				</div>
			</div>
        </div>
    );
}

export default Signin