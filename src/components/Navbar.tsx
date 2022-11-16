// imports
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
// style
import style from "./navbar.module.scss";
import UseAuth from "./../context/auth/UseAuth";

const MainNavbar = () => {
	// hooks
	const auth = UseAuth();

	return (
		<Navbar expand="lg" className={style.navbar}>
			<Container>
				<Navbar.Brand as={Link} to="#home">
					Facebook Automate
				</Navbar.Brand>
				{auth?.isLogged && (
					<>
						<Nav className={style.nav}>
							<Nav.Link as={Link} to="#link" className={style.link}>
								<i className={`bi bi-person ${style.icon}`}></i>
							</Nav.Link>
						</Nav>
					</>
				)}
			</Container>
		</Navbar>
	);
};

export default MainNavbar;
