// imports
import { Container } from "react-bootstrap";
// style
import style from "./jobsconfigure.module.scss";
import PostLayer from "./layout/PostLayer";
import ScheduleLayer from "./layout/ScheduleLayer";

const JobConfigure = () => {
	return (
		<div className={style.jobs}>
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
