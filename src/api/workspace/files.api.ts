import { auth } from "../../app/firebase";
import { AssetInformationResponseType } from "../../types";
import { config } from "../config";

export const getFiles = async () => {
	try {
		// get user token
		const firebaseAuthToken = await auth.currentUser?.getIdToken();
		if (firebaseAuthToken) {
			const res = await fetch(`${config.apiUrl}/api/assets`, {
				headers: {
					"x-auth-firebase": firebaseAuthToken,
				},
			});

			const files: AssetInformationResponseType = await res.json();
			return files.files;
		}
	} catch (error) {
		console.log("🚀 ~ file: files.api.ts:9 ~ getFiles ~ error", error);
	}
};

export const uploadFile = async (file: File) => {
	try {
		// get user token
		const firebaseAuthToken = await auth.currentUser?.getIdToken();
		console.log(firebaseAuthToken);
		if (firebaseAuthToken && file) {
			// create form data
			const formData = new FormData();
			const headers = new Headers();
			// append file
			formData.append("file", file);
			// configure header
			headers.set("x-auth-firebase", firebaseAuthToken);

			// send file
			const res = await fetch(`${config.apiUrl}/api/assets/upload`, {
				method: "POST",
				headers,
				body: formData,
			});

			const resJson = await res.json();

			console.log(resJson);
		}
	} catch (error) {
		console.log("🚀 ~ file: files.api.ts:9 ~ getFiles ~ error", error);
	}
};
