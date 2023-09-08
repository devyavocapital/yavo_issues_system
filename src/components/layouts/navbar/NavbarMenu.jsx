import { Navbar } from "flowbite-react";
import React from "react";
import useGlobal from "../../../../hooks/useGlobal";
import { statusFilters } from "../../../utils/statusFilters";

const NavbarMenu = () => {
	const { handleFilter } = useGlobal();
	return (
		<Navbar.Collapse>
			{statusFilters.map((status) => (
				<button
					type="button"
					onClick={() => handleFilter(status.name)}
					key={status.name}
					className="px-5 p-2 bg-cyan-700 rounded-xl text-white border-2 border-cyan-700 hover:text-black hover:bg-white hover:border-2 hover:border-cyan-700"
				>
					{status.text}
				</button>
			))}
		</Navbar.Collapse>
	);
};

export default NavbarMenu;
