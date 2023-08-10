import { fetched } from "../../utils/fetched";
import Notification from "../Notification";
import Navigation from "./Navigation";
/* eslint-disable react/prop-types */
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = ({ socket }) => {
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
			// console.log(response.usuario[0][0].email);
			setUser(response.usuario[0][0]);
			localStorage.setItem("userName", response.usuario[0][0].email);
			socket.emit("newUser", {
				user: response.usuario[0][0],
				socketID: socket.id,
			});
			setLoading(false);
		};

		token && getUser();
	}, []);

	return loading ? (
		<Spinner />
	) : (
		<>
			<header>
				<Navigation user={user} socket={socket} />
				{/* Aparece cada que llega una notificacion */}
				<Notification socket={socket} user={user} />
			</header>
			<Outlet />
		</>
	);
};

export default Layout;
