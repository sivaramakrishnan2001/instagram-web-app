import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { PostRequest } from '../../connector/APIsCommunicator';
import { APIsPath } from '../../connector/APIsPath';
import { AppScreensKeys } from '../../connector/AppConfig';

export const Login = () => {

	const varstore = useRef(null);
	const navigate = useNavigate();

	const [reload, setReload] = useState(false);

	useEffect(() => {
		varstore.email.focus();
		varstore.email.value = "";
		varstore.password.value = "";

	}, []);

	// ==============================================================
	// onClick

	const onLogin = () => {
		onLoginApiCall();

	}

	// ==============================================================
	// APIs

	const onLoginApiCall = () => {
		var reqObj = {
			body: {
				email: varstore.email.value, password: varstore.password.value
			}
		};
		PostRequest(APIsPath.Login, reqObj, parseSignUpApiCallResponse, parseSignUpApiCallError);
	}

	const parseSignUpApiCallResponse = (res) => {
		if (res.status) {
			localStorage.setItem('token', JSON.stringify(res.data.token));
			localStorage.setItem('user', JSON.stringify(res.data.user));
			varstore.email.value = "";
			varstore.password.value = "";
			if (localStorage.getItem("token")) {
				setTimeout(() => {
					navigate(AppScreensKeys.Home, {
						state: {
							user: res.data.user,
							token: res.data.token
						}
					});
					setReload((ps) => !ps);

				}, 300);
			}

			setReload((ps) => !ps);

			<Navigate to={AppScreensKeys.Login} />

		} else {

		}
		console.log("parseSignUpApiCallResponse", res);
	}

	const parseSignUpApiCallError = (err) => {
		console.log("parseSignUpApiCallError", err);

	}

	// ==============================================================

	return (
		<div className='card'>
			<input
				ref={(elem) => varstore.email = elem}
				type="text"
				value={varstore.email}
				placeholder='email'
				onKeyDown={(e) => e.key === "Enter" ? varstore.password.focus() : ""} />
			<input
				ref={(elem) => varstore.password = elem}
				type="text"
				value={varstore.password}
				placeholder='password'
				onKeyDown={(e) => e.key === "Enter" ? onLogin() : ""} />
			<div onClick={() => navigate(AppScreensKeys.SignUp)}>signup</div>
			<button onClick={onLogin}>login</button>
		</div>
	)
}


export const Login2 = () => {

	const varstore = useRef(null);
	const navigate = useNavigate();
	const [state, setState] = useState({ email: "", password: "", token: "" });
	const [reload, setReload] = useState(false);
	const [toggleForm, setToggleForm] = useState(false);

	// ==============================================================

	useEffect(() => {
		varstore.email.focus();

	}, []);

	const onChangeInputValue = (e, id) => {
		if (id === "email") {
			state.email = e.target.value;
		} else if (id === "password") {
			state.password = e.target.value;
		}
		setReload(ps => !ps);
	}

	// ==============================================================
	// onClick

	const onLogin = (e) => {
		// e.preventdefault();
		console.log("lsjdfjskf");
		if (!state.email || !state.password) {
			alert("please enter the value");
			return;
		}
		onLoginApiCall();
	}

	// ==============================================================
	// functions

	// ==============================================================
	// APIs

	const onLoginApiCall = () => {
		var reqObj = { body: { email: state.email, password: state.password } };
		PostRequest(APIsPath.Login, reqObj, parseSignUpApiCallResponse, parseSignUpApiCallError);
	}

	const parseSignUpApiCallResponse = (res) => {
		if (res.status) {
			localStorage.setItem('token', JSON.stringify(res.data.token));
			localStorage.setItem('user', JSON.stringify(res.data.user));
			setState({ ...state, password: "", email: "", token: res.data.token });

			setReload((ps) => !ps);
			navigate(AppScreensKeys.Home, {
				state: {
					token: res.data.token,
					user: res.data.user
				}
			});
			// <Navigate to={AppScreensKeys.Home} />
			setReload((ps) => !ps);
		}
		console.log("parseSignUpApiCallResponse", res);
	}

	const parseSignUpApiCallError = (err) => {
		console.log("parseSignUpApiCallError", err);
	}

	// ==============================================================

	return (
		<section>
			<div className={toggleForm ? "container active" : "container"}>
				<div className="user signinBx">
					<div className="imgBx">
						<img src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg" alt="" />
					</div>
					<div className="formBx">
						<form method={false} action={false}>
							<h2>Sign In</h2>
							<input
								ref={(elem) => varstore.email = elem}
								type="text"
								name=""
								onChange={(e) => onChangeInputValue(e, "email")}
								value={state.email}
								placeholder='Email'
								onKeyDown={(e) => e.key === "Enter" ? varstore.password.focus() : ""}
							/>
							<input
								name=""
								placeholder="Password"
								ref={(elem) => varstore.password = elem}
								type="text"
								value={state.password}
								onChange={(e) => onChangeInputValue(e, "password")}
								onKeyDown={(e) => e.key === "Enter" ? onLogin(e) : ""}
							/>
							<div className='button' type="submit" name="" value="Login" onClick={(e) => onLogin(e)} >Login</div>
							<p className="signup">
								Don't have an account ?
								<a href="#" onClick={() => setToggleForm(true)}>Sign Up.</a>
							</p>
						</form>
					</div>
				</div>
				<div className="user signupBx">
					<div className="formBx">
						<form >
							<h2>Create an account</h2>
							<input type="text" name="" placeholder="Username" />
							<input type="email" name="" placeholder="Email Address" />
							<input type="password" name="" placeholder="Create Password" />
							<input type="password" name="" placeholder="Confirm Password" />
							<input type="submit" name="" value="Sign Up" />
							<p className="signup">
								Already have an account ?
								<a href="#" onClick={() => setToggleForm(false)} >Sign in.</a>
							</p>
						</form>
					</div>
					<div className="imgBx">
						<img src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img2.jpg" alt="" />
					</div>
				</div>
			</div>
		</section>
	)
}



