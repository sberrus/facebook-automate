import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { uploadFile } from "../../../../api/workspace/files.api";

const UploadFile = () => {
	// states
	const [file, setFile] = useState<File>();
	const [fileUrl, setFileUrl] = useState<null | string>(null);
	const [uploadingStatus, setUploadingStatus] = useState<"sending" | "waiting" | "done!">("sending");

	// methods
	const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (file) {
			await uploadFile(file);
		}
	};

	const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			const imgUrl = URL.createObjectURL(file);
			setFile(file);
			setFileUrl(imgUrl);
		}
	};
	//
	return (
		<div className="upload-file desktop">
			<Form onSubmit={handleFileUpload}>
				<Form.Group controlId="formFileSm" className="mb-3">
					{fileUrl ? (
						<>
							<div className="file-preview">
								<div className="image-container">
									<img src={fileUrl} alt="image preview" />
								</div>
								<div className="actions">
									<Button className="save" type="submit">
										Save file <i className="bi bi-cloud-arrow-up"></i>
									</Button>
								</div>
							</div>
						</>
					) : (
						<>
							<Form.Label>Please pick a file to upload</Form.Label>
							<Form.Control type="file" size="lg" onChange={handleFilePick} />
						</>
					)}
				</Form.Group>
			</Form>
		</div>
	);
};

export default UploadFile;
