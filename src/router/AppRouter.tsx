import { Routes, Route } from "react-router-dom";
import Login from "../pages/Index/Login";
import AppTemplate from "../template/AppTemplate";

const router = () => {
	return (
		<Routes>
			<Route path="/" element={<AppTemplate />}>
				<Route index element={<Login />} />
			</Route>
		</Routes>
	);
};

export default router;
