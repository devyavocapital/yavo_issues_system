import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useSocket from "../../../hooks/useSocket";
import useUser from "../../../hooks/useUser";
import { getCurrentUser } from "../../utils/fetched";
import Notification from "../Notification";
import Spinner from "../common/Spinner";
import Navigation from "./Navigation";

const Layout = () => {
	const { handleUser } = useUser();
	const { socket } = useSocket();
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("yavo_tickets_session");
		if (!token) {
			navigate("/");
			return;
		}

		const getUser = async () => {
			const currentUser = await getCurrentUser(token);
			console.log(currentUser);
			handleUser(currentUser);
			// localStorage.setItem("userName", currentUser.email);
			currentUser !== null &&
				socket.emit("newUser", {
					user: currentUser,
					socketID: socket.id,
				});
			setLoading(false);
		};

		getUser();
	}, [navigate, socket]);

	return loading ? (
		<Spinner />
	) : (
		<>
			<header>
				<Navigation />
				{/* Aparece cada que llega una notificacion */}
				<Notification />
			</header>
			<Outlet />
		</>
	);
};

export default Layout;
