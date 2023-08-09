import { createContext, useState } from "react";

const FilterContext = createContext();

// eslint-disable-next-line react/prop-types
const FilterProvider = ({ children }) => {
	const [filter, setFilter] = useState("all");

	const handleFilter = (value) => {
		setFilter(value);
	};

	return (
		<FilterContext.Provider value={{ filter, handleFilter }}>
			{children}
		</FilterContext.Provider>
	);
};

export { FilterProvider };

export default FilterContext;
