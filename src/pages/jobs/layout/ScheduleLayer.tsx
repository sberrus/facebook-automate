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
					{jobs?.postData?.sharing_groups && (
						<>
							{jobs.postData.sharing_groups.length > 0 ? (
								<>
									{jobs.postData.sharing_groups.map((job, idx) => (
										<Group job={job} key={idx} />
									))}
								</>
							) : (
								<>
									<h6 className={style.warnAdvice}>No groups selected...</h6>
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
