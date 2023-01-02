// imports
import { Form } from "react-bootstrap";
// component
import Group from "../components/group/Group";
import GroupsPicker from "../components/groupspicker/GroupsPicker";
import PageSchedule from "../components/pageschedule/PageSchedule";
// context
import useJobs from "../context/useJobs";
// style
import style from "../jobsconfigure.module.scss";

const ScheduleLayer = () => {
	// hooks
	const jobs = useJobs();
	return (
		<div className={style.scheduleLayer}>
			{/* schedule section */}
			<section className={style.schedule}>
				<h3 className={style.sectionTitle}>Page Schedule</h3>
				<PageSchedule />
			</section>
			{/* Sharing */}
			<section className={style.sharing}>
				<div className={style.sharingActions}>
					<h3 className={style.sectionTitle}>Sharing</h3>
					<GroupsPicker />
				</div>
				{/* group list */}
				<div className={style.groupsList}>
					<h5>Own groups Schedules</h5>
					{jobs?.postData?.sharing_groups && (
						<>
							{jobs.postData.sharing_groups.length > 0 ? (
								<>
									{jobs.postData.sharing_groups
										.filter((job) => job.owner)
										.map((job, idx) => (
											<Group job={job} key={idx} />
										))}
								</>
							) : (
								<>
									<p className={style.warnAdvice}>No own group schedule configured...</p>
								</>
							)}
						</>
					)}
					<hr />
					<h5>Exteral groups Schedules</h5>
					{jobs?.postData?.sharing_groups && (
						<>
							{jobs.postData.sharing_groups.length > 0 ? (
								<>
									{jobs.postData.sharing_groups
										.filter((job) => !job.owner)
										.map((job, idx) => (
											<Group job={job} key={idx} />
										))}
								</>
							) : (
								<>
									<p className={style.warnAdvice}>No external group schedule configured...</p>
								</>
							)}
						</>
					)}
				</div>
			</section>
		</div>
	);
};

export default ScheduleLayer;
