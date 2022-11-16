// import
import UseAuth from "../context/auth/UseAuth";
import { Outlet, Navigate } from "react-router-dom";

//
const PublicRoute = () => {
	// hooks
	const auth = UseAuth();

	// navigate to dashboard if user is logged
	if (auth?.isLogged()) {
		return <Navigate to="/app/dashboard" replace />;
	}

	// return outlet if not logged
	return (
		<>
			<Outlet />
		</>
	);
};

export default PublicRoute;
