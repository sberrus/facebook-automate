// imports
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
// style
import style from "./navbar.module.scss";
import UseAuth from "./../context/auth/UseAuth";

const MainNavbar = () => {
	// hooks
	const auth = UseAuth();

	const handleSignOut = () => {
		auth?.signOut();
	};

	return (
		<Navbar variant="dark" bg="dark" expand="lg" className={style.navbar}>
			<Container>
				<Navbar.Brand as={Link} to="/">
					Facebook Automate
				</Navbar.Brand>
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
