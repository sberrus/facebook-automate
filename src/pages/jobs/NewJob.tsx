// imports
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
// components
import ImagePicker from "./components/imagepicker/ImagePicker";
// style
import style from "./newjob.module.scss";

const NewJob = () => {
	// states
	const [text, setText] = useState("");
	const [showEmojis, setShowEmojis] = useState(false);

	return (
		<div className={style.jobs}>
			<Container className="h-100">
				<div className={style.layout}>
					{/* facebook layer */}
					<div className={style.facebookPostLayer}>
						{/* title section */}
						<section className={style.title}>
							<h3 className={style.sectionTitle}>Title</h3>
							<input type="text" className={style.input} />
						</section>
						{/* text section */}
						<section className={style.text}>
							<h3 className={style.sectionTitle}>Text</h3>
							<div className={style.textInput}>
								<textarea
									className={style.textarea}
									value={text}
									onChange={(e) => {
										setText(e.target.value);
									}}
								></textarea>
								<div className={style.emojiPickerMenu}>
									{showEmojis && (
										<EmojiPicker
											lazyLoadEmojis={true}
											onEmojiClick={(emoji) => {
												setText(text + emoji.emoji);
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
							</div>
							<div className={style.attachment}>
								<Button className={style.inputButtons}>
									<i className="bi bi-emoji-laughing"></i>emotion
								</Button>
							</div>
							<div className={style.attachment}>
								<Button className={style.inputButtons}>
									<i className="bi bi-geo-alt-fill"></i>location
								</Button>
							</div>
						</section>
					</div>

					{/* schedule layer */}
					<div className={style.scheduleLayer}>
						{/* schedule section */}
						<section className={style.schedule}>
							<h3 className={style.sectionTitle}>Schedule</h3>
							<div className={style.scheduleConfig}>
								Every: <button className={style.dayBadge}>[day]</button>{" "}
								<button className={style.hourBadge}>[hour]</button>
							</div>
						</section>
						{/* Sharing */}
						<section className={style.sharing}>
							<h3 className={style.sectionTitle}>Sharing</h3>
							{/* group list */}
							<div className={style.groupsList}>
								{/* group template */}
								<div className={style.group}>
									<div className={style.groupInfoContainer}>
										<div className={style.imgContainer}>
											<img
												src="https://www.agilealliance.org/wp-content/uploads/2015/12/6225033182695c4f0d8296344a11313f.jpeg"
												alt="img"
											/>
										</div>
										<div className={style.groupInfo}>
											<div className={style.groupTitle}>North Marston C Of E School</div>
											<div className={style.groupScope}>Private/Public group</div>
										</div>
									</div>
									<div className={style.groupSchedule}>
										<div className={style.groupScheduleConfig}>
											<button className={style.dayBadge}>[day]</button>{" "}
											<button className={style.hourBadge}>[hour]</button>
										</div>
									</div>
								</div>
								{/* end group template */}

								<div className={style.group}>
									<div className={style.groupInfoContainer}>
										<div className={style.imgContainer}>
											<img
												src="https://www.agilealliance.org/wp-content/uploads/2015/12/6225033182695c4f0d8296344a11313f.jpeg"
												alt="img"
											/>
										</div>
										<div className={style.groupInfo}>
											<div className={style.groupTitle}>North Marston C Of E School</div>
											<div className={style.groupScope}>Private/Public group</div>
										</div>
									</div>
									<div className={style.groupSchedule}>
										<div className={style.groupScheduleConfig}>
											<button className={style.dayBadge}>[day]</button>{" "}
											<button className={style.hourBadge}>[hour]</button>
										</div>
									</div>
								</div>
								<div className={style.group}>
									<div className={style.groupInfoContainer}>
										<div className={style.imgContainer}>
											<img
												src="https://www.agilealliance.org/wp-content/uploads/2015/12/6225033182695c4f0d8296344a11313f.jpeg"
												alt="img"
											/>
										</div>
										<div className={style.groupInfo}>
											<div className={style.groupTitle}>North Marston C Of E School</div>
											<div className={style.groupScope}>Private/Public group</div>
										</div>
									</div>
									<div className={style.groupSchedule}>
										<div className={style.groupScheduleConfig}>
											<button className={style.dayBadge}>[day]</button>{" "}
											<button className={style.hourBadge}>[hour]</button>
										</div>
									</div>
								</div>
								<div className={style.group}>
									<div className={style.groupInfoContainer}>
										<div className={style.imgContainer}>
											<img
												src="https://www.agilealliance.org/wp-content/uploads/2015/12/6225033182695c4f0d8296344a11313f.jpeg"
												alt="img"
											/>
										</div>
										<div className={style.groupInfo}>
											<div className={style.groupTitle}>North Marston C Of E School</div>
											<div className={style.groupScope}>Private/Public group</div>
										</div>
									</div>
									<div className={style.groupSchedule}>
										<div className={style.groupScheduleConfig}>
											<button className={style.dayBadge}>[day]</button>{" "}
											<button className={style.hourBadge}>[hour]</button>
										</div>
									</div>
								</div>
								<div className={style.group}>
									<div className={style.groupInfoContainer}>
										<div className={style.imgContainer}>
											<img
												src="https://www.agilealliance.org/wp-content/uploads/2015/12/6225033182695c4f0d8296344a11313f.jpeg"
												alt="img"
											/>
										</div>
										<div className={style.groupInfo}>
											<div className={style.groupTitle}>North Marston C Of E School</div>
											<div className={style.groupScope}>Private/Public group</div>
										</div>
									</div>
									<div className={style.groupSchedule}>
										<div className={style.groupScheduleConfig}>
											<button className={style.dayBadge}>[day]</button>{" "}
											<button className={style.hourBadge}>[hour]</button>
										</div>
									</div>
								</div>
								<div className={style.group}>
									<div className={style.groupInfoContainer}>
										<div className={style.imgContainer}>
											<img
												src="https://www.agilealliance.org/wp-content/uploads/2015/12/6225033182695c4f0d8296344a11313f.jpeg"
												alt="img"
											/>
										</div>
										<div className={style.groupInfo}>
											<div className={style.groupTitle}>North Marston C Of E School</div>
											<div className={style.groupScope}>Private/Public group</div>
										</div>
									</div>
									<div className={style.groupSchedule}>
										<div className={style.groupScheduleConfig}>
											<button className={style.dayBadge}>[day]</button>{" "}
											<button className={style.hourBadge}>[hour]</button>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
					{/* bottom stripe */}
				</div>
			</Container>
			<div className={style.bottomStripe}>
				<Container className={style.container}>
					<span className={style.text}>NEW POST</span>
					<button className={style.button}>
						Publish <i className="bi bi-send"></i>
					</button>
				</Container>
			</div>
		</div>
	);
};

export default NewJob;
