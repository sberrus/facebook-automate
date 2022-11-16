import { Routes, Route } from "react-router-dom";
import AppTemplate from "../template/AppTemplate";

const router = () => {
	return (
		<Routes>
			<Route path="/" element={<AppTemplate />}></Route>
		</Routes>
	);
};

export default router;
