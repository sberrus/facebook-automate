import { auth } from "../../app/firebase";
import { config } from "../config";

/**
 * Checks facebook admin Long Lived Token status
 */

export const getLongLivedTokenStatus = async (): Promise<boolean | undefined> => {
	try {
		// get firebase token
		const firebaseAuthToken = await auth.currentUser?.getIdToken();
		// check if token is received
		if (firebaseAuthToken) {
			const res = await fetch(`${config.apiUrl}/api/token/token-status`, {
				headers: { "x-auth-firebase": firebaseAuthToken },
			});
			// if not 200
			if (res.status !== 200) {
				return false;
			}

			// handle res
			const tokenStatusResponse = await res.json();
			return tokenStatusResponse.token_status;
		}
	} catch (error) {
		throw new Error("There was a server error, try again later");
	}
};

/**
 * Generate a new facebook admin Long Live Token
 */
export const generateLongLivedToken = async (accessToken: string) => {
	try {
		// get firebase token
		const firebaseAuthToken = await auth.currentUser?.getIdToken();
		// check if token is received
		if (firebaseAuthToken) {
			const res = await fetch(`${config.apiUrl}/api/token/generate-llt`, {
				method: "POST",
				headers: { "x-auth-firebase": firebaseAuthToken, "content-type": "application/json" },
				body: JSON.stringify({
					"x-auth-facebook": accessToken,
				}),
			});
			const tokenStatusResponse = await res.json();

			return tokenStatusResponse.token_status;
		}
	} catch (error) {
		throw error;
	}
};
