// imports
import { ChangeEvent, useEffect, useState } from "react";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import ImagePicker from "../components/imagepicker/ImagePicker";
// context
import useJobs from "../context/useJobs";
// imports
import style from "../jobsconfigure.module.scss";
import { Button } from "react-bootstrap";

const PostLayer = () => {
	// hooks
	const jobs = useJobs();
	// states
	const [showEmojis, setShowEmojis] = useState(false);
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");

	// input handlers
	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
		jobs?.setTitle(e.target.value);
	};
	const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(e.target.value);
		jobs?.setMessage(e.target.value);
	};

	//
	return (
		<div className={style.facebookPostLayer}>
			{/* title section */}
			<section className={style.title}>
				<h3 className={style.sectionTitle}>Title</h3>
				<input type="text" className={style.input} value={title} onChange={handleTitleChange} />
			</section>
			{/* text section */}
			<section className={style.text}>
				<h3 className={style.sectionTitle}>Message</h3>
				<div className={style.textInput}>
					<textarea className={style.textarea} value={message} onChange={handleMessageChange}></textarea>
					<div className={style.emojiPickerMenu}>
						{showEmojis && (
							<EmojiPicker
								lazyLoadEmojis={true}
								onEmojiClick={(emoji) => {
									setMessage((message) => {
										return message + emoji.emoji;
									});
									setShowEmojis(false);
								}}
								emojiStyle={EmojiStyle.FACEBOOK}
							/>
						)}
					</div>

					{!showEmojis && (
						<Button onClick={() => setShowEmojis(!showEmojis)} className={style.emojisPickerButton}>
							<i className="bi bi-emoji-sunglasses"></i>
						</Button>
					)}
				</div>
			</section>
			{/* attachments section*/}
			<section className={style.attachments}>
				<div className={style.attachment}>
					{/* Image Picker */}
					<ImagePicker />
					{jobs?.postData?.page_post.asset_src && <p>Image Picked ✅</p>}
				</div>
				{/* <div className={style.attachment}>
					<Button className={style.inputButtons}>
						<i className="bi bi-emoji-laughing"></i>emotion
					</Button>
				</div>
				<div className={style.attachment}>
					<Button className={style.inputButtons}>
						<i className="bi bi-geo-alt-fill"></i>location
					</Button>
				</div> */}
			</section>
		</div>
	);
};

export default PostLayer;
