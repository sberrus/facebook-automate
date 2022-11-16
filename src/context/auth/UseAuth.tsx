// imports
import { useContext } from "react";
// context
import { AuthContext } from "./AuthProvider";

const UseAuth = () => {
	return useContext(AuthContext);
};

export default UseAuth;
