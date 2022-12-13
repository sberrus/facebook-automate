// imports
import { useState, createContext, useEffect } from "react";
// Login helpers
// types
type JobsProviderProps = {
	children: JSX.Element;
};

interface AuthContextType {}

// context
export const JobsContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: JobsProviderProps) => {
	// Context value
	let contextValue: AuthContextType = {};

	return <JobsContext.Provider value={contextValue}>{children}</JobsContext.Provider>;
};

export default AuthProvider;
