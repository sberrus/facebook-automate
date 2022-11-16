// imports
import { Routes, Route } from "react-router-dom";
// templates
import AppTemplate from "../template/AppTemplate";
// pages
import Login from "../pages/index/Login";
import Dashboard from "./../pages/dashboard/Dashboard";

const router = () => {
	return (
		<Routes>
			<Route path="/" element={<AppTemplate />}>
				<Route index element={<Login />} />
				<Route path="dashboard" element={<Dashboard />} />
			</Route>
		</Routes>
	);
};

export default router;
