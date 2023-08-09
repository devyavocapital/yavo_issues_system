import { createContext, useState } from "react";

const FilterContext = createContext();

// eslint-disable-next-line react/prop-types
const FilterProvider = ({ children }) => {
	const [filter, setFilter] = useState("all");
	const [newIssue, setNew] = useState({});
	const [commentInitial, setCommentInitial] = useState({});
	const [isNew, setIsNew] = useState(false);

	const handleFilter = (value) => {
		setFilter(value);
	};

	const handleNewIssue = (newIssue) => {
		setNew(newIssue);
	};

	const handleComment = (newComment) => {
		setCommentInitial(newComment);
	};

	const handleSetNew = (value) => {
		setIsNew(value);
	};

	return (
		<FilterContext.Provider
			value={{
				filter,
				handleFilter,
				newIssue,
				handleNewIssue,
				commentInitial,
				handleComment,
				isNew,
				handleSetNew,
			}}
		>
			{children}
		</FilterContext.Provider>
	);
};

export { FilterProvider };

export default FilterContext;
