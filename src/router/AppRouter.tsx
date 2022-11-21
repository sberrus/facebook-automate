// imports
import { Routes, Route, Navigate } from "react-router-dom";
// templates
import AppTemplate from "../template/AppTemplate";
// public and private routes controller
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
// public
import Login from "../pages/index/Login";
// private
import Dashboard from "./../pages/dashboard/Dashboard";
import Account from "../pages/account/Account";

const router = () => {
	return (
		<Routes>
			<Route path="/" element={<AppTemplate />}>
				<Route index element={<Navigate to="/auth/login" />} />
				{/* public routes */}
				<Route path="auth" element={<PublicRoute />}>
					<Route path="login" element={<Login />} />
				</Route>

				{/* private routes */}
				<Route path="app" element={<PrivateRoute />}>
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="account" element={<Account />} />
				</Route>

				{/* 404 fallback */}
				<Route path="*" element={<Navigate to="/" />} />
			</Route>
		</Routes>
	);
};

export default router;
