// imports
import { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PostScopeType } from "../../../types/workspace";
// styles
import style from "../dashboard.module.scss";
// types
interface JobProps {
	job: PostScopeType;
}

//
const Job = ({ job }: JobProps) => {
	const [date, setDate] = useState(() => {
		return job.page_post_job?.schedule_config.date === "0"
			? "SUNDAY"
			: job.page_post_job?.schedule_config.date === "1"
			? "MONDAY"
			: job.page_post_job?.schedule_config.date === "2"
			? "TUESDAY"
			: job.page_post_job?.schedule_config.date === "3"
			? "WEDNESDAY"
			: job.page_post_job?.schedule_config.date === "4"
			? "THURSDAY"
			: job.page_post_job?.schedule_config.date === "5"
			? "FRIDAY"
			: job.page_post_job?.schedule_config.date === "6" && "SATURDAY";
	});

	return (
		<div className={style.post}>
			{job.page_post_job && (
				<>
					{/* link */}
					<Link to={`/app/job/${job.id}`} className={style.postLink}>
						{job.title}
						<span className={style.scheduleDay}>EVERY {date}</span>
						<span>{job.post_scope_status ? "running" : "stopped"}</span>
					</Link>
					{/* controls */}
					<div className={style.controllers}>
						<Link to="/app/jobs/123" className={`${style.control}`}>
							<i className="bi bi-pencil-square"></i>
						</Link>
						<Dropdown drop="down">
							<Dropdown.Toggle variant="success" id="items-menu" className={`${style.control}`}>
								<i className="bi bi-eye-fill"></i>
							</Dropdown.Toggle>
							<Dropdown.Menu variant="dark" className={style.dropdown}>
								<Dropdown.Item href="#/action-1" className={style.dropdownItem}>
									Turn off
								</Dropdown.Item>
								<Dropdown.Item href="#/action-2" className={style.dropdownItem}>
									Turn off next post
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						<Button className={`${style.control}`}>
							<i className="bi bi-x-lg"></i>
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

export default Job;
