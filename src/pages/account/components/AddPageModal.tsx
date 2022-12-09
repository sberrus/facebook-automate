import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { getAdminPages } from "../../../api/facebook/facebook";
// style
import style from "../account.module.scss";
import "./addpagemodal.scss";
// types

interface PageType {
	id: string;
	name: string;
	picture: {
		data: {
			height: number;
			width: number;
			is_silhouette: boolean;
			url: string;
		};
	};
}
const AddPageModal = () => {
	// states
	const [show, setShow] = useState(false);
	const [pages, setPages] = useState<PageType[]>([]);
	// methods
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//
	const handleAdminPages = async () => {
		try {
			const pages = await getAdminPages();
			setPages(pages.pages);
		} catch (error) {}
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
						<form
							id="addPage"
							onSubmit={(e) => {
								e.preventDefault();
								console.log(e.target);
							}}
						>
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
											<input type="radio" id={page.id} className={"radio"} value={page.id} />
										</label>
									))}
								</>
							) : (
								// https://www.pluralsight.com/guides/how-to-use-radio-buttons-in-reactjs
								<h5>Getting pages...{pages.length}</h5>
							)}
						</form>
					</section>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button type="submit" form="addPage" variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AddPageModal;
