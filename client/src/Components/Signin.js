import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner'

import 'react-toastify/dist/ReactToastify.css';
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
	const [loading, setLoading] = useState(false);
	
	const states = ["Send OTP", "Verify OTP", "Set Password"];
	const [forgotStates, setForgotStates] = useState(states[0]);

	const signIn = useRef(null);
  const verify = useRef(null);
  const signUp = useRef(null);
  const forgot = useRef(null);

	useEffect(()=> {
		signIn.current = document.getElementById("signIn");
		verify.current = document.getElementById("verify");
		signUp.current = document.getElementById("signUp");
		forgot.current = document.getElementById("forgot");
	}, [])

	const htmlBodyForNewAccount = () => {
		return {
			subject : "Please confirm your DMS account", 
			body : `
				<h1>Email Confirmation</h1>
				<h2>Hello ${email}$</h2>
				<p>Thank you for Registering in DMS-WebApp. Here is the one time password for your verification of the email id.</p>
				<br/>
				<h3>${otp}</h3>
				<br/>
				<p>If the above request is not initiated by you please report it immediately by clicking <a href="localhost:3000/report/verification">here</a> </p>
				</div>
			`
		}
	}

	const htmlBodyForNewPassword = () => {
		return {
			subject : "Request for new Password", 
			body : `
				<h1>Password Reset</h1>
				<h2>Hello ${email}$</h2>
				<p>You forgot your password? That's okay! Just Enter the OTP shown below to verify your Email Address and you are good to go.</p>
				<br/>
				<h3>${otp}</h3>
				<br/>
				<p>If the above request is not initiated by you please report it immediately by clicking <a href="localhost:3000/report/verification">here</a> </p>
				</div>
			`
		}
	}

	const validateEmailAddress = () => {
		const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		if (email.match(validRegex)) {
			return true;
		} 
		else {
			notify("Invalid email address", "WARN");
			return false;
		}
	}

	const validatePassword = () => {
		const validRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
		if(password.match(validRegex)) {
			return true;
		}
		else{
			notify("Your password must contain atleast 6 characters including one numeric digit, one uppercase and one lowercase letter", "INFO", 3000)
			return false;
		}
	}

	const validateMissingCredentials = () => {
		if((password === "" || email === "") || ((!isSignin && (cpassword === "" || name === "")))) {
			notify("Missing Credentials", "WARN");
			return false;
		}
		return true;
	}

	const notify = (msg, type, time) => {
		const settings = {
			position: "top-left",
			autoClose: time != undefined ? time : 1500,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		};
		if(type == "WARN")
			toast.warn(msg, settings);
		else if(type == "ERROR")
			toast.error(msg, settings);
		else if(type == "INFO")
			toast.info(msg, settings);
		else if(type == "SUCCESS")
			toast.success(msg, settings);
		
		if(type === "ERROR"){
			setName("");
			setCpassword("");
			setPassword("");
			setEmail("");
		}
		toast.clearWaitingQueue();
	}

	const handleSignIn = async () => {
		setLoading(true);
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
		setLoading(false);
		if(res.status===200 && data.message===undefined) {
			navigate('/');
		}
		else if(res.status===200 && data.message!==undefined) {
			if(data.needVerification === true){
				signUp.current.style.display = "none";
				verify.current.style.display = "block";
				moveUp(signIn.current, verify.current);
			}
			else{
				notify(data.message[0], "WARN");
			}
		}
		else {
			notify("Some error occured. Please try again", "ERROR");
		}
	}

	const handleSignUp = async () => {
		setLoading(true);
		if(password!=cpassword) {
			notify("Password do not match", "WARN");
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
		setLoading(false);
		if(res.status===200 && data.isSuccess === true) {
			signIn.current.style.display = "none";
			verify.current.style.display = "block";
			moveDown(verify, signUp);
		}
		else if(res.status===200 && data.isSuccess === false){
			notify("Email ID Already Registered", "WARN");
			signIn.current.style.display = "block";
			verify.current.style.display = "none";
			switchToSignIn();
		}
		else{
			notify("Some error occured. Please try again", "ERROR");
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if(!validateMissingCredentials() || !validateEmailAddress() || !validatePassword()) return false;
		if(isSignin){
			handleSignIn();
		}
		else{
			handleSignUp();
		}
	}

	const handleVerifyOtp = async (e) => {
		e.preventDefault();
		if(loading === true) return false;
		const res = await VerifyOtp();
		if(res === true){
			handleSignIn();
 			return true;
		}
		else{
			return false;
		}
	}

	const handleForgot = ()=> {
		setIsSignin(false);
		forgot.current.style.display = "block";
		moveUp(signIn.current, forgot.current);
		return true;
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
		forgot.current.style.display = "none";
		verify.current.style.display = "none";
		signUp.current.style.display = "block";
		moveUp(signIn.current, signUp.current);
	}
	
	const switchToSignIn = () => {
		setIsSignin(true);
		forgot.current.style.display = "none";
		verify.current.style.display = "none";
		signIn.current.style.display = "block";
		moveDown(signIn.current, signUp.current);
	}

	const RememberedPassword = () => {
		signIn.current.style.display = "block";
		signUp.current.style.display = "none";
		setIsSignin(true);
		moveDown(signIn.current, forgot.current);
		return true;
	}

	const sendOtpEmail = async (content)=> {
		setLoading(true);
		const res = await fetch('/send-otp', {
			method : "POST",
			headers : {
				"Content-Type" : "application/json"
			},
			body : JSON.stringify({email, content})
		});
		const data = await res.json();
		setLoading(false);
		if(res.status === 200){
			if(!data.isSuccess){
				notify(data.message, "WARN");
			}
			else{
				notify("Otp Sent", "SUCCESS");
				return true;
			}
		}
		else{
			notify("Something went wrong", "ERROR");
		}
		return false;
	}

	const VerifyOtp = async () => {
		setLoading(true);
		if(otp == ""){
			notify("OTP cannot be empty", "WARN");
			return false;
		}
		const res = await fetch('/verify-otp', {
			method : "POST",
			headers : {
				"Content-Type" : "application/json"
			},
			body : JSON.stringify({email, otp})
		});
		const data = await res.json();
		setLoading(false);
		if(res.status === 200){
			if(data.isSuccess === true){
				notify("OTP Verified Succesfully", "SUCCESS");
				return true;
			}
			else{
				notify(data.message, "WARN");
				return false;
			}
		}
		else{
			notify("Something went wrong", "ERROR");
			return false;
		}
	}

	const SetPassword = async () => {
		setLoading(true);
		if(password === "" || cpassword === "") {
			notify("Missing Credentials", "WARN");
			return false;
		}
		else if(cpassword !== password) {
			notify("Password do not match", "WARN");
			return false;
		}
		if(!validatePassword()) return false;
		const res = await fetch('/set-password', {
			method : "POST",
			headers : {
				"Content-Type" : "application/json"
			},
			body : JSON.stringify({email, password})
		});
		const data = await res.json();
		setLoading(false);
		if(res.status === 200){
			if(data.isSuccess === true){
				notify("Password Set Succesfully", "SUCCESS");
				return true;
			}
			else{
				notify(data.message, "WARN");
			}
		}
		else{
			notify("Something went wrong", "ERROR");
		}
		return false;
	}

	const ForgotPassword = async (e) => {
		e.preventDefault();
		if(forgotStates === states[0]){
			if(email === "") {
				notify("Mising Credentials", "WARN");
				return false;
			}
			if(!validateEmailAddress()) return false;
			const res = await sendOtpEmail(htmlBodyForNewPassword());
			if(res === true) {
				setForgotStates(states[1]);
				return true;
			}
		}
		else if(forgotStates === states[1]){
			const res = await VerifyOtp();
			if(res === true) {
				setForgotStates(states[2]);
				return true;
			}
		}
		else{
			const res = await SetPassword();
			if(res === true) {
				signIn.current.style.display = "block";
				signUp.current.style.display = "none";
				setIsSignin(true);
				moveDown(signIn.current, forgot.current);
				return true;
			}
		}
		return false;
	}

	const LoadingButton = ({text}) => {
		return (
			<div className="loginBtn">
				<button className="forgetpass">
					{loading && 
					<ThreeDots 
						height="20"
						width="40"
						radius="9"
						color="#ffffff"
						ariaLabel="three-dots-loading"
						wrapperStyle={{}}
						visible={true}
					/>
					}
					{!loading && <span>{text}</span>}
				</button>
			</div>
		)
	}

    return (
        <div id="auth-box" className="box-form">
					<ToastContainer limit={1} />

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
									<p onClick={handleForgot} className="forgetpass">Forgot password?</p>
								</div>

								<LoadingButton text="Sign In" />

							</form>
						</div>

						<div id="forgot" className="right">
							<h5>Forgot Password</h5>
							{forgotStates === states[0] && <div>Please enter the registered Email Address</div>}
							{forgotStates === states[1] && <div>Please enter the OTP</div>}
							{forgotStates === states[2] && <div>Set new Password</div>}
							<form onSubmit={ForgotPassword}>
								<div className="inputs">
									{forgotStates === states[0] && <input 
										type="text" 
										value={email} 
										onChange={(e)=>setEmail(e.target.value)} 
										placeholder="Email" 
									/>}

									{forgotStates === states[1] && <input 
										type="text" 
										value={otp} 
										onChange={(e)=>setOtp(e.target.value)} 
										placeholder="OTP" 
									/>}

									{forgotStates === states[2] && <input 
										type="password" 
										value={password} 
										onChange={(e)=>setPassword(e.target.value)} 
										placeholder="Password" 
									/>}

									{forgotStates === states[2] && <input 
										type="password" 
										value={cpassword} 
										onChange={(e)=>setCpassword(e.target.value)} 
										placeholder="Confirm Password" 
									/>}
								</div>

								<div className="remember-me--forget-password">
									<p onClick={RememberedPassword} className="forgetpass">Remembered? Go Back</p>
								</div>

								<LoadingButton text={forgotStates} />

							</form>
						</div>
					
						<div id="verify" className="right">
							<h5>Verify Email</h5>
							<div>Please Verify your email ID by clicking <span className="create-span" onClick={() => sendOtpEmail(htmlBodyForNewAccount())}>here</span></div>
							<div id="email-div">Email : <span id="email-span">{email}</span></div>
							<form onSubmit={handleVerifyOtp}>
								<div className="inputs">
									<input 
										type="text" 
										value={otp} 
										onChange={(e)=>setOtp(e.target.value)} 
										placeholder="OTP" 
									/>
								</div>

								<LoadingButton text="Verify" />

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
				
								<LoadingButton text="Sign Up" />

							</form>
						</div>

						

					</div>
      	</div>
    	);
}

export default Signin