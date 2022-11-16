// import
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
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
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
