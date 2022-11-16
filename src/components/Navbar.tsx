// imports
import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
// style
import style from "./navbar.module.scss";

const MainNavbar = () => {
	return (
		<Navbar expand="lg" className={style.navbar}>
			<Container>
				<Navbar.Brand as={Link} to="#home">
					Facebook Automate
				</Navbar.Brand>
				{/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className={style.nav}>
						<Nav.Link as={Link} to="#link" className={style.link}>
							<i className={`bi bi-person ${style.icon}`}></i>
						</Nav.Link>
					</Nav>
				</Navbar.Collapse> */}
			</Container>
		</Navbar>
	);
};

export default MainNavbar;
