// imports
import { Container } from "react-bootstrap";
import { auth } from "../../app/firebase";
// style
import style from "./jobsconfigure.module.scss";
import PostLayer from "./layout/PostLayer";
import ScheduleLayer from "./layout/ScheduleLayer";

const JobConfigure = () => {
	const showToken = async () => {
		console.log(await auth.currentUser?.getIdToken());
	};
	return (
		<div className={style.jobs}>
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
						<button className={style.button}>
							Publish <i className="bi bi-send"></i>
						</button>
					</Container>
				</div>
			</Container>
		</div>
	);
};

export default JobConfigure;
