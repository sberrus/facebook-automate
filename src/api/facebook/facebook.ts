import { auth } from "../../app/firebase";
import { config } from "../config";

export const getAdminPages = async () => {
	// get firebase token
	const firebaseAuthToken = await auth.currentUser?.getIdToken();
	// check if token is received
	if (firebaseAuthToken) {
		const res = await fetch(`${config.apiUrl}/api/workspace/admin-pages`, {
			headers: { "x-auth-firebase": firebaseAuthToken },
		});
		// if not 200
		if (res.status !== 200) {
			return false;
		}

		// handle res
		const pages = await res.json();
		return pages;
	}
};
