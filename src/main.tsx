// import
import React from "react";
import ReactDOM from "react-dom/client";
// component
import App from "./App";
// context
import AuthContext from "./context/auth/AuthProvider";
// router
import { BrowserRouter } from "react-router-dom";
// firebase
import "./app/firebase";
// styles
import "./style/global.scss";

//
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthContext>
				<App />
			</AuthContext>
		</BrowserRouter>
	</React.StrictMode>
);
