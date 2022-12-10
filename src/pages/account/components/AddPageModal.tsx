import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { getAdminPages } from "../../../api/facebook/facebook";
import UseAuth from "../../../context/auth/UseAuth";
// style
import style from "../account.module.scss";
import "./addpagemodal.scss";
// types
import { PageType } from "../../../types";

const AddPageModal = () => {
	// hooks
	const auth = UseAuth();
	// states
	const [show, setShow] = useState(false);
	const [pages, setPages] = useState<PageType[]>([]);
	const [selectedOption, setSelectedOption] = useState<string | null>();
	// methods
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//handlers
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(selectedOption);
	};

	//
	const handleRadiobuttonSelection = (e: ChangeEvent<HTMLInputElement>) => {
		setSelectedOption(e.target.value);
	};

	// get the pages and check if
	const handleAdminPages = async () => {
		try {
			// get admin pages
			const pages = await getAdminPages();
			const linkedPages = auth?.workspace?.linked_pages;
			let workspacePagesIds: string[] = [];

			if (linkedPages) {
				workspacePagesIds = linkedPages.map((page) => {
					return page.id;
				});
			}
			if (pages) {
				// get the list of pages that are not present in workspace
				const notLinkedPages = pages.filter((page) => {
					return !workspacePagesIds.includes(page.id);
				});
				setPages(notLinkedPages);
			}
		} catch (error) {
			console.log("🚀 ~ file: AddPageModal.tsx:50 ~ handleAdminPages ~ error", error);
		}
	};
	//
	useEffect(() => {
		if (show) {
			handleAdminPages();
		}
		return () => {};
	}, [show]);

	return (
		<>
			<Button variant="primary" onClick={handleShow} className={style.addNewAccountButton}>
				<i className={`${style.icon} bi bi-plus`}></i>
			</Button>

			<Modal show={show} onHide={handleClose} className="add-page-modal">
				<Modal.Header closeButton>
					<Modal.Title>Select a new page</Modal.Title>
				</Modal.Header>
				<Modal.Body className="body">
					<section className="linkedAccounts">
						<form id="addPage" onSubmit={handleSubmit}>
							{pages.length > 0 ? (
								<>
									{pages.map((page) => (
										<label className="fbAccountButton" key={page.id}>
											<div className="logo">
												<img
													src={page.picture.data.url}
													alt={`${page.name} picture`}
													title={`${page.name} picture`}
												/>
											</div>
											<div className="fbAccountName">{page.name}</div>
											<input
												type="radio"
												id={page.id}
												className={"radio"}
												checked={selectedOption === page.id}
												onChange={handleRadiobuttonSelection}
												value={page.id}
											/>
										</label>
									))}
								</>
							) : (
								// https://www.pluralsight.com/guides/how-to-use-radio-buttons-in-reactjs
								<h5>No pages to add or all pages added{pages.length}</h5>
							)}
						</form>
					</section>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button type="submit" form="addPage" variant="primary">
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AddPageModal;
