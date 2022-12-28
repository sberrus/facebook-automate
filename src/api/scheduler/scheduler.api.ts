// types
import { auth } from "../../app/firebase";
import { PostDataType } from "../../pages/jobs/context/jobs.context";
import { PostScopeType } from "../../types/workspace";
import { config } from "../config";

/**
 * Create the jobs for the page and it related groups.
 * @param data job config object. Object with the information to create pages job and it groups jobs.
 */
export const createNewJob = async (data: PostDataType) => {
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

/**
 * Get the current jobs from workspace.
 */
export const getWorkspaceJobs = async () => {
	// get user token
	const firebaseUserToken = await auth.currentUser?.getIdToken();
	if (firebaseUserToken) {
		try {
			const res = await fetch(`${config.apiUrl}/api/schedule/`, {
				headers: {
					"x-auth-firebase": firebaseUserToken,
				},
			});

			const jobs = await res.json();

			return jobs as PostScopeType[];
		} catch (error) {
			console.log("🚀 ~ file: scheduler.api.ts:9 ~ initNewJob ~ error", error);
			throw new Error("Error trying to fetch workspace jobs");
		}
	}
};
