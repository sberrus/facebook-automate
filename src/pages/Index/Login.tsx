// imports
import { Form, Button } from "react-bootstrap";
// styles
import style from "./login.module.scss";

//
const Login = () => {
	return (
		<div className={style.login}>
			<div className={style.formContainer}>
				<Form className={style.form}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>
					<Button variant="dark" type="submit">
						Submit
					</Button>
				</Form>
			</div>
		</div>
	);
};

export default Login;
