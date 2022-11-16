import MainNavbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
// style
import style from "./apptemplate.module.scss";

const AppTemplate = () => {
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
