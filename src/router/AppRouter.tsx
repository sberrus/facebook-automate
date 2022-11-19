// imports
import { Routes, Route, Navigate } from "react-router-dom";
// templates
import AppTemplate from "../template/AppTemplate";
// pages
import Dashboard from "./../pages/dashboard/Dashboard";
// public route
import Login from "../pages/index/Login";
// public and private routes controller
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

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
				</Route>

				{/* 404 fallback */}
				<Route path="*" element={<Navigate to="/" />} />
			</Route>
		</Routes>
	);
};

export default router;
