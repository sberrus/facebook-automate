// context
import { Container } from "react-bootstrap";
import UseAuth from "../../context/auth/UseAuth";
// styles
import style from "./account.module.scss";

//
const Account = () => {
	// hooks
	const auth = UseAuth();

	//get token
	const getLongLivedToken = async () => {
		const fbOauthToken = localStorage.getItem("fb_oauth");
		try {
			const fbRes = await fetch(
				`https://graph.facebook.com/v15.0/me?fields=id,name,email&access_token=${fbOauthToken}`
			);
			console.log(await fbRes.json());
		} catch (error) {
			console.log(error);
		}
	};

	/**
	 *
	 * *******LEER******
	 * VER DOCUMENTACION DE PARA REALIZAR LOGIN CON FACEBOOK
	 * https://www.npmjs.com/package/react-facebook-login
	 *
	 *
	 */
	return (
		<div className={style.account}>
			<Container>
				{/* current user data */}
				<section className={style.sessionData}>
					<h4 className={style.sectionTitle}>
						Facebook Managing Account:{" "}
						<span className={style.currentSession}>{auth?.workspace?.facebook_admin}</span>
					</h4>
					<h4 className={style.sectionTitle}>
						Current User: <span className={style.currentSession}>{auth?.user?.email}</span>
					</h4>
				</section>
				{/* current user actions */}
				<section className={style.actionsButtons}>
					{auth?.user?.providerData[0].providerId !== "facebook.com" && (
						<button className={style.action}>Change password</button>
					)}
					<button className={style.action} onClick={getLongLivedToken}>
						Get/Renew Token
					</button>
				</section>
				{/* token status */}
				<section className={style.tokenStatus}>
					<h5>Token Status:</h5>
					<p>
						<span className={style.statusCorrect}>
							<span className={style.dotStatus}></span>
							online
						</span>
					</p>

					<p>
						<span className={style.statusWarn}>
							<span className={style.dotStatus}></span>
							The token is close to expire, please renew
						</span>
					</p>

					<p>
						<span className={style.statusDanger}>
							<span className={style.dotStatus}></span>
							Token expired, please generate a new token
						</span>
					</p>

					<p>
						<span className={style.statusDanger}>
							<span className={style.dotStatus}></span>
							Error, talk to admin
						</span>
					</p>
					<p>
						<span className={style.statusDanger}>
							<span className={style.dotStatus}></span>
							No Long Lived Token. Generate a new token
						</span>
					</p>
				</section>
				{/* accounts linked to user */}
				<section className={style.linkedAccounts}>
					<div className={style.fbAccount}>
						<div className={style.logo}>
							<img src="https://graph.facebook.com/facebook/picture" alt="faceboook logo" />
						</div>
						<div className={style.fbAccountName}>Howe & Co 22 - [placeholder]</div>
						<div className={style.accountActionsButtons}>
							<button className={style.fbAccountUnlink}>
								<i className={`${style.icon} bi bi-trash3`}></i>
							</button>
						</div>
					</div>

					<div className={style.addNewAccount}>
						<button className={style.addNewAccountButton}>
							<i className={`${style.icon} bi bi-plus`}></i>
						</button>
					</div>
				</section>
			</Container>
		</div>
	);
};

export default Account;
