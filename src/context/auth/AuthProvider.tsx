// imports
import { useState } from "react";
import { createContext } from "react";
import { User } from "firebase/auth";

// types
type AuthProviderProps = {
	children: JSX.Element;
};

interface AuthContextType {
	user: User | null;
}

// context
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);

	let contextValue: AuthContextType = {
		user,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

//Exportamos el provider del contexto para que este sea un componente de alto orden y el contexto pueda ser accedido desde cualquier parte del programa.
export default AuthProvider;
