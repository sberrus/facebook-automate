// imports
import { useState, createContext, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// Login helpers
import { firebaseSignIn, firebaseSignInWithFacebook } from "../../helpers/AuthHelper";
import { getWorkspace } from "../../api/workspace/workspace.api";
// types
import { LoginProps, WorkspaceType } from "../../types";
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

	const [workspace, setWorkspace] = useState<WorkspaceType | null>(null);

	useEffect(() => {
		// check current session
		onAuthStateChanged(auth, async (user) => {
			if (!!user) {
				setUser(user);
				localStorage.setItem("credentials", JSON.stringify(user));
				// get workspace
				const workspaceRes = await getWorkspace();
				if (workspaceRes) {
					setWorkspace(workspaceRes);
				}
			} else {
				setUser(null);
			}
		});

		return () => {};
	}, []);

	// context properties
	let contextValue: AuthContextType = {
		workspace,
		user,

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
				await firebaseSignInWithFacebook();
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
