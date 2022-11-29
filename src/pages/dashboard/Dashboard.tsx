// imports
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
// styles
import style from "./dashboard.module.scss";

//
const Dashboard = () => {
	return (
		<div className={style.dashboard}>
			<Container>
				<Button className={style.newPostButton}>NEW POST</Button>
				{/* posts container */}
				<div className={style.postsContainer}>
					{/* post template */}
					<div className={style.post}>
						<Link to="/" className={style.postLink}>
							WHEATLEY <span className={style.scheduleDay}>EVERY WEDNESDAY</span>
						</Link>
						<div className={style.controllers}>
							<Link to="/" className={`${style.control}`}>
								<i className="bi bi-pencil-square"></i>
							</Link>
							<Link to="/" className={`${style.control}`}>
								<i className="bi bi-eye-fill"></i>
							</Link>
							<Link to="/" className={`${style.control}`}>
								<i className="bi bi-x-lg"></i>
							</Link>
						</div>
					</div>
					<div className={style.post}>
						<Link to="/" className={style.postLink}>
							WHEATLEY <span className={style.scheduleDay}>EVERY WEDNESDAY</span>
						</Link>
						<div className={style.controllers}>
							<Link to="/" className={`${style.control}`}>
								<i className="bi bi-pencil-square"></i>
							</Link>
							<Link to="/" className={`${style.control}`}>
								<i className="bi bi-eye-fill"></i>
							</Link>
							<Link to="/" className={`${style.control}`}>
								<i className="bi bi-x-lg"></i>
							</Link>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Dashboard;
