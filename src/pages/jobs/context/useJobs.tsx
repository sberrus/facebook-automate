// imports
import { useContext } from "react";
// context
import { JobsContext } from "./JobsProvider";
// context

const useJobs = () => {
	return useContext(JobsContext);
};

export default useJobs;
