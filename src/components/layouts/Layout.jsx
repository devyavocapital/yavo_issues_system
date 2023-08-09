import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { fetched } from "../../utils/fetched";
import Navigation from "./Navigation";

const Layout = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("yavocapital_session");

		if (!token) navigate("/");

		const getUser = async () => {
			const response = await fetched(
				token,
				`${import.meta.env.VITE_FRONTEND_API_URL}/login`,
				"GET",
			);

			setUser(response.usuario[0][0]);
			setLoading(false);
		};

		token && getUser();
	}, []);

	return loading ? (
		<Spinner />
	) : (
		<>
			<header>
				<Navigation user={user} />
			</header>
			<Outlet />
		</>
	);
};

export default Layout;
