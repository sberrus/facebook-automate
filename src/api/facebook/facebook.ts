import { auth } from "../../app/firebase";
import { PageResType } from "../../types";
import { config } from "../config";

/**
 * Get the collection of facebook pages managed by admin
 * @returns
 */
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
			return;
		}

		// handle res
		const pages: PageResType = await res.json();
		return pages.pages;
	}
};
