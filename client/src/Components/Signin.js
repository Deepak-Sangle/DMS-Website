import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Styles/Signin.css';

const Signin = () => {

	const navigate = useNavigate();
	
	const [name, setName] = useState("");
	const [cpassword,setCpassword] = useState("");
	const [isSignin, setIsSignin] = useState(true);
	const [password,setPassword] = useState("");
	const [email,setEmail] = useState("");
	const [isVerify, setIsVerify] = useState();
	const [otp, setOtp] = useState("");

	const signIn = document.getElementById("signIn");
	const verify = document.getElementById("verify");
	const signUp = document.getElementById("signUp");

	const handleSignIn = async () => {
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
			if(data.needVerification){
				signUp.style.display = "none";
				verify.style.display = "inline-block";
				moveUp(signIn, verify);
			}
			else{
				alert(data.message);
			}
		}
		else {
			alert("Some error occured. Please try again");
		}
	}

	const handleSignUp = async () => {
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
		if(res.status===200 && data.isSuccess === true) {
			signIn.style.display = "none";
			verify.style.display = "inline-block";
			moveDown(verify, signUp);
		}
		else if(res.status===200 && data.isSuccess === false){
			alert("Email ID Already Registered");
			signIn.style.display = "inline-block";
			verify.style.display = "none";
			switchToSignIn();
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

	function moveUp(elemA, elemB) {
		elemA.className = "right move-up-signin";
		elemB.className = "right move-up-signup";
	}

	function moveDown(elemA, elemB) {
		elemA.className = "right move-down-signin";
		elemB.className = "right move-down-signup";
	}

	const switchToSignUp = () => {
		setIsSignin(false);
		moveUp(signIn, signUp);
	}
	
	const switchToSignIn = () => {
		setIsSignin(true);
		moveDown(signIn, signUp);
	}

	const sendOtpEmail = async ()=> {
		const res = await fetch('/send-otp', {
			method : "POST",
			headers : {
				"Content-Type" : "application/json"
			},
			body : JSON.stringify({email, password})
		});
		const data = await res.json();
		console.log(data);
		if(res.status === 200){
			if(!data.isSuccess){
				alert(data.message);
				if(signIn.style.display == "none"){
					signIn.style.display = "inline-block";
					signUp.style.display = "none";
				}
				moveUp(verify, signIn);
			}
			else{
				alert("Otp Sent");
			}
		}
		else{
			alert("Something went wrong");
		}
	}

	const VerifyOtp = async (e) => {
		e.preventDefault();
		if(otp == ""){
			alert("Please Enter valid otp");
			return false;
		}
		const res = await fetch('/verify-otp', {
			method : "POST",
			headers : {
				"Content-Type" : "application/json"
			},
			body : JSON.stringify({email, password, otp})
		});
		const data = await res.json();
		if(res.status === 200){
			if(data.isSuccess){
				handleSignIn();
			}
			else{
				alert(data.message);
				if(signIn.style.display == "none"){
					signIn.style.display = "inline-block";
					signUp.style.display = "none";
				}
				moveUp(signIn, verify);
			}
		}
		else{
			alert("Something went wrong");
		}
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
				
				<div id="verify" className="right">
					<h5>Verify Email</h5>
					<div>Please Verify your email ID by clicking <span className="create-span" onClick={sendOtpEmail}>here</span></div>
					<div id="email-div">Email : <span id="email-span">{email}</span></div>
					<form onSubmit={VerifyOtp}>
						<div className="inputs">
							<input 
								type="text" 
								value={otp} 
								onChange={(e)=>setOtp(e.target.value)} 
								placeholder="OTP" 
							/>
						</div>

						<div className="loginBtn">
							<button className="forgetpass">Verify</button>
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