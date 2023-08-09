import { useContext } from "react";
import FilterContext from "../contexts/FilterContext";

const useFilter = () => {
	return useContext(FilterContext);
};

export default useFilter;
