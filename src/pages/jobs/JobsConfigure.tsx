// imports
import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { auth } from "../../app/firebase";
import UseAuth from "../../context/auth/UseAuth";
import { PageType } from "../../types";
import useJobs from "./context/useJobs";
// style
import style from "./jobsconfigure.module.scss";
import PostLayer from "./layout/PostLayer";
import ScheduleLayer from "./layout/ScheduleLayer";

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

	//
	const showToken = async () => {
		console.log(await auth.currentUser?.getIdToken());
	};

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
				{/* <button onClick={showToken}>.</button> */}
				<Container className="h-100">
					<h5>Page</h5>
					<Form.Select onChange={handlePageIDChange} required>
						<option>Pick a page</option>
						{pages.length > 0 ? (
							<>
								{pages.map((page) => (
									<option value={page.id} key={page.id}>
										{page.name}
									</option>
								))}
							</>
						) : (
							<></>
						)}
					</Form.Select>
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
