// imports
import { FormEvent, ChangeEvent } from "react";
import { Form, Button, Container } from "react-bootstrap";
// context
import UseAuth from "../../context/auth/UseAuth";
// styles
import style from "./login.module.scss";
import { useState } from "react";

/**
 * TODO: FIRST IN LOGIN WHEN LOGIN CHECK IF USER IS REGISTERED, IF NOT, DISPLAY A REGISTER CONFIRMATION BEFORE LOGIN AND ACCESS
 * APP.
 *
 * WHEN REGISTER CONFIRMATION, CREATE REGISTER IN USER COLLECTION AND WORKSPACE COLLECTION
 */
//
const Login = () => {
	// context
	const auth = UseAuth();
	// states
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// form login
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		auth?.loginWithEmail({
			email,
			password,
		});
	};
	const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value.trim());
	};

	const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value.trim());
	};

	// login with facebook
	const handleFacebookLogin = () => {
		auth?.loginWithFacebook();
	};

	//
	return (
		<div className={style.login}>
			<div className={style.formContainer}>
				<Container>
					<Form className={style.form} onSubmit={handleSubmit}>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email" onChange={handleEmail} />
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" onChange={handlePassword} />
						</Form.Group>
						<Button variant="dark" type="submit">
							Submit
						</Button>
						<hr />
						<button onClick={handleFacebookLogin}>Login with facebook</button>
					</Form>
				</Container>
			</div>
		</div>
	);
};

export default Login;
