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
			// alert("updated");
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
		alert("err");
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


