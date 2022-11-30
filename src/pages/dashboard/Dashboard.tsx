// imports
import { Button, Container, Dropdown } from "react-bootstrap";
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
						{/* link */}
						<Link to="/" className={style.postLink}>
							WHEATLEY <span className={style.scheduleDay}>EVERY WEDNESDAY</span>
						</Link>
						{/* controls */}
						<div className={style.controllers}>
							<Button className={`${style.control}`}>
								<i className="bi bi-pencil-square"></i>
							</Button>
							<Dropdown drop="up">
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
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Dashboard;
