// imports
import { FormEvent, ChangeEvent } from "react";
import { Form, Button, Container } from "react-bootstrap";
// context
import UseAuth from "./../../context/auth/UseAuth";
// styles
import style from "./login.module.scss";
import { useState } from "react";
// types
import { LoginProps } from "./../../context/auth/AuthHelper";

//
const Login = () => {
	// context
	const auth = UseAuth();
	// states
	const [formData, setFormData] = useState<LoginProps>({
		email: "",
		password: "",
	});

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		auth?.login(formData);
	};

	const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, email: e.target.value });
	};

	const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, password: e.target.value });
	};
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
					</Form>
				</Container>
			</div>
		</div>
	);
};

export default Login;