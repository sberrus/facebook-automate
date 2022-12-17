// imports
import { Container, Form } from "react-bootstrap";
import { auth } from "../../app/firebase";
import useJobs from "./context/useJobs";
// style
import style from "./jobsconfigure.module.scss";
import PostLayer from "./layout/PostLayer";
import ScheduleLayer from "./layout/ScheduleLayer";

const JobConfigure = () => {
	// hooks
	const jobs = useJobs();

	//
	const showToken = async () => {
		console.log(await auth.currentUser?.getIdToken());
	};

	// methods
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Create new job
		const userRes = confirm("Create new Schedule?");
		if (userRes) {
			jobs?.sendJob();
		}
	};

	//
	return (
		<div className={style.jobs}>
			<Form id="postConfig" onSubmit={handleSubmit}>
				<button onClick={showToken}>.</button>
				<Container className="h-100">
					<div className={style.layout}>
						{/* post layer */}
						<PostLayer />
						{/* schedule layer */}
						<ScheduleLayer />
					</div>
					{/* bottom stripe */}
					<div className={style.action}>
						<Container className={style.container}>
							<span className={style.text}>NEW POST</span>

							{/* magic button */}
							<button type="submit" className={style.button}>
								Publish <i className="bi bi-send"></i>
							</button>
						</Container>
					</div>
				</Container>
			</Form>
		</div>
	);
};

export default JobConfigure;
