// imports
import { Routes, Route, Navigate } from "react-router-dom";
// templates
import AppTemplate from "../template/AppTemplate";
// public and private routes controller
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
// public
import Login from "../pages/login/Login";
// private
import Dashboard from "./../pages/dashboard/Dashboard";
import Account from "../pages/account/Account";
import JobConfigure from "../pages/jobs/JobsConfigure";
// context
import JobsProvider from "../pages/jobs/context/JobsProvider";

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
					<Route path="jobs">
						{/* <Route path=":id" element={<NewJob />} /> */}
						<Route
							path="new-job"
							element={
								<>
									<JobsProvider>
										<JobConfigure />
									</JobsProvider>
								</>
							}
						/>
					</Route>
				</Route>

				{/* 404 fallback */}
				<Route path="*" element={<Navigate to="/" />} />
			</Route>
		</Routes>
	);
};

export default router;
