// imports
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getWorkspaceJobs } from "../../api/scheduler/scheduler.api";
import UseAuth from "../../context/auth/UseAuth";
import { PostScopeType } from "../../types/workspace";
import Job from "./components/Job";
// styles
import style from "./dashboard.module.scss";

/**
 * TODO: Find why the workspace jobs its not loading when component renders
 */
//
const Dashboard = () => {
	// hooks
	const auth = UseAuth();
	// states
	const [jobs, setJobs] = useState<PostScopeType[] | undefined>();

	const handleJobs = async () => {
		try {
			const _jobs = await getWorkspaceJobs();
			setJobs(_jobs);
		} catch (error) {
			console.log("🚀 ~ file: Dashboard.tsx:21 ~ handleJobs ~ error", error);
		}
	};

	//
	useEffect(() => {
		if (!jobs) {
			handleJobs();
		}
		return () => {};
	}, [auth?.user]);

	return (
		<div className={style.dashboard}>
			<Container>
				<Link to="/app/jobs/new-job" className={style.newPostButton}>
					NEW POST
				</Link>
				<div className={style.postsContainer}>
					{jobs ? (
						<>
							{jobs.length > 0 ? (
								<>
									{jobs.map((job) => (
										<Job job={job} key={job.page_post_job?.job_id} />
									))}
								</>
							) : (
								<>No Jobs programmed</>
							)}
						</>
					) : (
						<>Loading programmed jobs...</>
					)}
				</div>
			</Container>
		</div>
	);
};

export default Dashboard;
