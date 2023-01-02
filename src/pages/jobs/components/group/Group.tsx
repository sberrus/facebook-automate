import { GroupConfigType } from "../../context/jobs.context";
import style from "./group.module.scss";

type GroupPropType = {
	job: GroupConfigType;
};

const Groups = ({ job }: GroupPropType) => {
	return (
		<>
			<div className={style.group}>
				<div className={style.groupInfoContainer}>
					<div className={style.imgContainer}>
						<img src={job.group.picture.data.url} alt={`${job.group.name} picture`} />
					</div>
					<div className={style.groupInfo}>
						<div className={style.groupTitle}>{job.group.name}</div>
						<div className={style.groupScope}>Public</div>
					</div>
				</div>

				{/* schedule info */}
				<div className={style.groupSchedule}>
					<p className={style.schedule}>
						<span className={style.data}>Date:</span>
						<span className={style.scheduleInfo}>
							{job.schedule.date === "1"
								? "Monday"
								: job.schedule.date === "2"
								? "Tuesday"
								: job.schedule.date === "3"
								? "Wednesday"
								: job.schedule.date === "4"
								? "Thursday"
								: job.schedule.date === "5"
								? "Friday"
								: job.schedule.date === "6"
								? "Saturday"
								: job.schedule.date === "0" && "Sunday"}
						</span>
					</p>
					<p className={style.schedule}>
						<span className={style.data}>Time:</span>
						<span className={style.scheduleInfo}>
							{job.schedule.hour}:{job.schedule.minute}
						</span>
					</p>
				</div>
			</div>
			<hr />
		</>
	);
};

export default Groups;
