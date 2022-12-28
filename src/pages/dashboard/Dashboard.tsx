// imports
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getWorkspaceJobs } from "../../api/scheduler/scheduler.api";
import { PostScopeType } from "../../types/workspace";
import Job from "./components/Job";
// styles
import style from "./dashboard.module.scss";

/**
 * TODO: Find why the workspace jobs its not loading when component renders
 */
//
const Dashboard = () => {
	const [jobs, setJobs] = useState<PostScopeType[]>([]);

	const handleJobs = async () => {
		try {
			const jobs = await getWorkspaceJobs();
			if (jobs) {
				setJobs(jobs);
			}
		} catch (error) {
			console.log("🚀 ~ file: Dashboard.tsx:21 ~ handleJobs ~ error", error);
		}
	};

	//
	useEffect(() => {
		handleJobs();
		return () => {};
	}, []);

	return (
		<div className={style.dashboard}>
			<Container>
				<Link to="/app/jobs/new-job" className={style.newPostButton}>
					NEW POST
				</Link>
				<div className={style.postsContainer}>
					{jobs.length > 0 ? (
						<>
							{jobs.map((job) => (
								<Job job={job} key={job.page_post_job?.job_id} />
							))}
						</>
					) : (
						<></>
					)}
				</div>
			</Container>
		</div>
	);
};

export default Dashboard;
