// imports
import { Form } from "react-bootstrap";
// component
import Group from "../components/group/Group";
import GroupsPicker from "../components/groupspicker/GroupsPicker";
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
				<h3 className={style.sectionTitle}>Schedule</h3>
				<div className={style.scheduleConfig}>
					<Form>
						<Form.Group>
							<Form.Label>Day</Form.Label>
							<Form.Select>
								<option value="Monday">Monday</option>
								<option value="Tuesday">Tuesday</option>
								<option value="Wednesday">Wednesday</option>
								<option value="Thursday">Thursday</option>
								<option value="Friday">Friday</option>
								<option value="Saturday">Saturday</option>
								<option value="Sunday">Sunday</option>
							</Form.Select>{" "}
						</Form.Group>
						<Form.Group>
							<Form.Label>Time</Form.Label>
							<div className={style.time}>
								<Form.Select className={style.select}>
									<option>Hour</option>
									<option value="Monday">Monday</option>
									<option value="Tuesday">Tuesday</option>
									<option value="Wednesday">Wednesday</option>
									<option value="Thursday">Thursday</option>
									<option value="Friday">Friday</option>
									<option value="Saturday">Saturday</option>
									<option value="Sunday">Sunday</option>
								</Form.Select>{" "}
								<Form.Select className={style.select}>
									<option>Minute</option>
									<option value="Monday">Monday</option>
									<option value="Tuesday">Tuesday</option>
									<option value="Wednesday">Wednesday</option>
									<option value="Thursday">Thursday</option>
									<option value="Friday">Friday</option>
									<option value="Saturday">Saturday</option>
									<option value="Sunday">Sunday</option>
								</Form.Select>{" "}
							</div>
						</Form.Group>
					</Form>
				</div>
			</section>
			{/* Sharing */}
			<section className={style.sharing}>
				<h3 className={style.sectionTitle}>Sharing</h3>
				{/* group list */}
				<div className={style.groupsList}>
					{jobs?.postData?.sharing_groups && (
						<>
							{jobs.postData.sharing_groups.length > 0 ? (
								<>
									{jobs.postData.sharing_groups.map((job) => (
										<Group job={job} />
									))}
								</>
							) : (
								<>
									<h6 className={style.warnAdvice}>No groups selected...</h6>
								</>
							)}
						</>
					)}
					<GroupsPicker />
				</div>
			</section>
		</div>
	);
};

export default ScheduleLayer;
