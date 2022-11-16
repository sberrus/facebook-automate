// import
import UseAuth from "../context/auth/UseAuth";
import { Outlet, Navigate } from "react-router-dom";

//
const PrivateRoute = () => {
	// hooks
	const auth = UseAuth();

	// navigate to login if user is not logged
	if (!auth?.isLogged()) {
		return <Navigate to="/auth/login" replace />;
	}

	// return outlet if not logged
	return (
		<>
			<Outlet />
		</>
	);
};

export default PrivateRoute;
