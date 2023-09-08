import { createContext, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
	const [filter, setFilter] = useState("all");
	const [newIssue, setNewIssue] = useState({});

	const handleFilter = (value) => {
		setFilter(value);
	};

	const handleNewIssue = (issue) => {
		setNewIssue(issue);
	};

	return (
		<GlobalContext.Provider
			value={{
				filter,
				handleFilter,
				newIssue,
				handleNewIssue,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export { GlobalProvider };

export default GlobalContext;
