// imports
import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../../app/firebase";
import UseAuth from "../../context/auth/UseAuth";
import { PageType } from "../../types";
import useJobs from "./context/useJobs";
// style
import style from "./jobsconfigure.module.scss";
import PostLayer from "./layout/PostLayer";
import ScheduleLayer from "./layout/ScheduleLayer";

/**
 * TODO: Incorporar manejo de errores para mostra pop-ups o lo uqe sea
 */

const JobConfigure = () => {
	// hooks
	const jobs = useJobs();
	const _auth = UseAuth();
	// states
	const [pages, setPages] = useState<PageType[]>(() => {
		if (_auth?.workspace?.linked_pages) {
			return _auth?.workspace?.linked_pages;
		}
		return [];
	});

	// methods
	const handlePageIDChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		jobs?.setPageID(e.target.value);
	};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Create new job
		const userRes = confirm("Create new Schedule?");
		if (userRes) {
			jobs?.sendJob();
		}
	};

	//
	useEffect(() => {
		if (_auth?.workspace?.linked_pages) {
			setPages(_auth?.workspace?.linked_pages);
		}

		return () => {};
	}, [_auth?.workspace?.linked_pages]);

	return (
		<div className={style.jobs}>
			<Form id="postConfig" onSubmit={handleSubmit}>
				<div className={style.action}>
					<Container className={style.container}>
						<span className={style.text}>NEW POST</span>

						{/* magic button */}
						<button type="submit" className={style.button}>
							Publish <i className="bi bi-send"></i>
						</button>
					</Container>
				</div>
				<Container className="h-100">
					<h5>Page Picker</h5>
					{pages.length > 0 ? (
						<>
							<Form.Select onChange={handlePageIDChange} required>
								<option>Pick a page</option>
								{pages.map((page) => (
									<option value={page.id} key={page.id}>
										{page.name}
									</option>
								))}
							</Form.Select>
						</>
					) : (
						<>
							No pages picked. Pick pages in <Link to="/app/account">account page</Link>
						</>
					)}
					<div className={style.layout}>
						{/* post layer */}
						<PostLayer />
						{/* schedule layer */}
						<ScheduleLayer />
					</div>
					{/* bottom stripe */}
				</Container>
			</Form>
		</div>
	);
};

export default JobConfigure;
