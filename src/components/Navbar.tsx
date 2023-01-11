// imports
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { getAuth } from "firebase/auth";
// context
import UseAuth from "./../context/auth/UseAuth";
// style
import style from "./navbar.module.scss";

const MainNavbar = () => {
	// hooks
	const auth = UseAuth();
	const _auth = getAuth();

	const handleSignOut = () => {
		auth?.signOut();
	};
	//
	const showToken = async () => {
		const token = await _auth.currentUser?.getIdToken();

		if (navigator.clipboard && token) {
			navigator.clipboard.writeText(token);
		}
	};

	return (
		<Navbar variant="dark" bg="dark" expand="lg" className={style.navbar}>
			<Container>
				<Navbar.Brand as={Link} to="/">
					Facebook Automate
				</Navbar.Brand>
				<button onClick={showToken}>.</button>
				{auth?.isLogged() && (
					<>
						<Nav className={style.nav}>
							<Nav.Link as={Link} to="/app/account" className={style.link}>
								<i className={`bi bi-person ${style.icon}`}></i>
							</Nav.Link>

							<Nav.Link as="button" className={style.logout} onClick={handleSignOut}>
								<i className={`bi bi-box-arrow-right ${style.icon}`}></i>
							</Nav.Link>
						</Nav>
					</>
				)}
			</Container>
		</Navbar>
	);
};

export default MainNavbar;
