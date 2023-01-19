// imports
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// context
import UseAuth from "../../context/auth/UseAuth";
// api
import { generateLongLivedToken, getLongLivedTokenStatus } from "../../api/token/token.api";
// styles
import style from "./account.module.scss";
import AddPageModal from "./components/AddPageModal";
import { PageType } from "../../types";
import { deletePage } from "../../api/workspace/workspace.api";
import { auth } from "../../app/firebase";
// types
type TokenStatusType = "ok" | "error" | "loading" | "server-error";
//
const Account = () => {
	// hooks
	const _auth = UseAuth();
	// states
	const [tokenStatus, setTokenStatus] = useState<TokenStatusType>("loading");

	/**
	 * handle if the token is valid
	 */
	const handleTokenStatus = async () => {
		try {
			// get token status
			const isValidToken = await getLongLivedTokenStatus();

			// Error fetching the token
			if (!isValidToken) {
				return setTokenStatus("error");
			}

			// set status ok
			return setTokenStatus("ok");
		} catch (error) {
			console.log(error);
			setTokenStatus("server-error");
		}
	};

	/**
	 * Generate new long lived token
	 */
	const handleGenerateLongLivedToken = async (response: any) => {
		const { accessToken } = response;
		try {
			const res = await generateLongLivedToken(accessToken);
			if (res.ok) {
				setTokenStatus("ok");
			}
		} catch (error) {
			console.log("🚀 ~ file: Account.tsx:38 ~ handleGenerateLongLivedToken ~ error", error);
		}
	};

	/**
	 * Delete the page from workspace page
	 * @param pageID facebook page id
	 */
	const handleDeletePage = async (page: PageType) => {
		const res = confirm(`are you sure you want to delete page ${page.name}?`);

		if (res) {
			try {
				await deletePage(page.id);
				window.location.reload();
			} catch (error) {
				console.log("🚀 ~ file: Account.tsx:60 ~ handleDeletePage ~ error", error);
			}
		}
	};

	useEffect(() => {
		if (auth.currentUser) {
			handleTokenStatus();
		}

		return () => {};
	}, [auth.currentUser]);

	return (
		<div className={style.account}>
			<Container>
				{/* current user data */}
				<section className={style.sessionData}>
					<h5 className={style.sectionTitle}>
						Current User: <span className={style.currentSession}>{_auth?.user?.email}</span>
					</h5>
					<h5 className={style.sectionTitle}>
						Facebook Account: <span className={style.currentSession}>{_auth?.workspace?.facebook_admin}</span>
					</h5>
				</section>
				{/* token status */}
				<section className={style.tokenStatus}>
					<h4>Token Status</h4>
					<div className={style.statusContainer}>
						{tokenStatus === "ok" && (
							<span className={style.statusCorrect}>
								<span className={style.dotStatus}></span>
								online
							</span>
						)}

						{tokenStatus === "error" && (
							<span className={style.statusDanger}>
								<span className={style.dotStatus}></span>
								Token error or not found, please generate a new token
							</span>
						)}

						{tokenStatus === "server-error" && (
							<span className={style.statusDanger}>
								<span className={style.dotStatus}></span>
								Server error, please try again later
							</span>
						)}
						{tokenStatus === "loading" && (
							<span className={style.statusLoading}>
								<span className={style.spinner}></span>
							</span>
						)}
					</div>
				</section>
				{/* current generate new token button */}
				{(tokenStatus === "error" || tokenStatus === "server-error") && (
					<section className={style.actionsButtons}>
						{_auth?.user?.providerData[0].providerId === "facebook.com" && (
							<>
								<FacebookLogin
									appId="929198114717885"
									callback={handleGenerateLongLivedToken}
									fields="email"
									render={(renderProps) => (
										<Button className={style.action} onClick={renderProps.onClick}>
											Generate new token
										</Button>
									)}
								/>
							</>
						)}
					</section>
				)}

				{/* accounts linked to user */}
				<section className={style.linkedAccounts}>
					<h4>Pages Linked</h4>

					{_auth?.workspace?.linked_pages && (
						<>
							{_auth?.workspace?.linked_pages.length > 0 ? (
								<>
									{_auth?.workspace?.linked_pages.map((page) => (
										<div className={style.fbAccount} key={page.id}>
											<div className={style.logo}>
												<img src={page.picture.data.url} alt={`${page.name} picture`} />
											</div>
											<div className={style.fbAccountName}>{page.name}</div>
											<div className={style.accountActionsButtons}>
												<button
													className={style.fbAccountUnlink}
													onClick={() => {
														handleDeletePage(page);
													}}
												>
													<i className={`${style.icon} bi bi-trash3`}></i>
												</button>
											</div>
										</div>
									))}
								</>
							) : (
								<p>No pages added! Please add a new page</p>
							)}
						</>
					)}

					<div className={style.addNewAccount}>
						<AddPageModal />
					</div>
				</section>
			</Container>
		</div>
	);
};

export default Account;
