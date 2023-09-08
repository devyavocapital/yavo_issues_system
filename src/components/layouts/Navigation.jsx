import ModuleNotification from "../module/ModuleNotification";
import NavbarBrand from "./navbar/NavbarBrand";
import NavbarMenu from "./navbar/NavbarMenu";
import NavbarUser from "./navbar/NavbarUser";
/* eslint-disable react/prop-types */
import { Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
	const navigate = useNavigate();

	const handleSignOut = (e) => {
		e.preventDefault();
		localStorage.removeItem("yavo_tickets_session");
		navigate("/");
	};

	return (
		<Navbar fluid className="bg-cyan-700">
			<NavbarBrand />
			<div className="flex md:order-2 ">
				<NavbarMenu />

				<ModuleNotification />

				<NavbarUser handleSignOut={handleSignOut} />
			</div>
		</Navbar>
	);
};

export default Navigation;
