// imports
import { Outlet } from "react-router-dom";
// components
import MainNavbar from "../components/Navbar";
import Footer from "../components/Footer";
// style
import style from "./apptemplate.module.scss";

const AppTemplate = () => {
	// hooks
	return (
		<div className={style.appTemplate}>
			<MainNavbar />
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default AppTemplate;
