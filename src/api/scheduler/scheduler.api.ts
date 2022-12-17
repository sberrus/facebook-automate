// types
import { auth } from "../../app/firebase";
import { PostDataType } from "../../pages/jobs/context/jobs.context";
import { config } from "../config";

//
export const initNewJob = async (data: PostDataType) => {
	// get user token
	const firebaseUserToken = await auth.currentUser?.getIdToken();
	console.log(data);
	if (firebaseUserToken) {
		try {
			const res = await fetch(`${config.apiUrl}/api/schedule/`, {
				method: "POST",
				headers: {
					"x-auth-firebase": firebaseUserToken,
					"content-type": "application/json",
				},
				body: JSON.stringify(data),
			});

			console.log(await res.json());
		} catch (error) {
			console.log("🚀 ~ file: scheduler.api.ts:9 ~ initNewJob ~ error", error);
			throw error;
		}
	}
};
