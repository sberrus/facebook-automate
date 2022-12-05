// imports
import { useState, createContext, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// Login helpers
import { FacebookUserTypes, firebaseSignIn, firebaseSignInWithFacebook, LoginProps } from "../../helpers/AuthHelper";
import { getWorkspace, WorkspaceType } from "../../helpers/WorkspaceHelper";

// types
type AuthProviderProps = {
	children: JSX.Element;
};

interface AuthContextType {
	workspace: WorkspaceType | null;
	user: User | null;
	loginWithEmail: ({ email, password }: LoginProps) => {};
	loginWithFacebook: () => {};
	signOut: () => void;
	isLogged: () => boolean;
}

// context
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
	// hooks
	const navigate = useNavigate();
	const auth = getAuth();

	// state
	const [user, setUser] = useState<User | null>(() => {
		return JSON.parse(localStorage.getItem("credentials")!);
	});

	const [workspace, setWorkspace] = useState(() => {
		return JSON.parse(localStorage.getItem("workspace")!);
	});

	// methods
	const manageWorkspace = async (email: string) => {
		const workspace = await getWorkspace(email);

		localStorage.setItem("workspace", JSON.stringify(workspace));
		setWorkspace(workspace);
	};

	useEffect(() => {
		// check current session
		onAuthStateChanged(auth, (user) => {
			if (!!user) {
				setUser(user);
				localStorage.setItem("credentials", JSON.stringify(user));
				// get Workspace
				manageWorkspace(user.email!);
			} else {
				setUser(null);
			}
		});

		return () => {};
	}, []);

	// context properties
	let contextValue: AuthContextType = {
		user,
		workspace,

		// login
		async loginWithEmail({ email, password }) {
			try {
				await firebaseSignIn({ email, password });
			} catch (error) {
				console.log(error);
			}
		},

		// login with facebook provider
		async loginWithFacebook() {
			try {
				const fbAuthRes = (await firebaseSignInWithFacebook()) as FacebookUserTypes;
				localStorage.setItem("fb_oauth", fbAuthRes._tokenResponse.oauthAccessToken);
			} catch (error) {
				console.log(error);
			}
		},

		// logout
		async signOut() {
			await signOut(auth);

			// clear session data
			localStorage.removeItem("credentials");
			navigate("/");
		},

		// status
		isLogged() {
			return !!user;
		},
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

//Exportamos el provider del contexto para que este sea un componente de alto orden y el contexto pueda ser accedido desde cualquier parte del programa.
export default AuthProvider;
