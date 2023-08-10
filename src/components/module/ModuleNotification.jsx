import { fetched } from "../../utils/fetched";
import { validateToken } from "../../utils/validateToken";
import NotificationRow from "../common/NotificationRow";
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const ModuleNotification = ({ socket, user }) => {
	const [notification, setNotification] = useState();
	const [myOwn, setMyOwn] = useState(false);
	const [allNotifications, setAllNotifications] = useState([]);
	const [panel, setPanel] = useState(false);

	useEffect(() => {
		socket.on("notificationResponse", (data) => setNotification(data));
	}, [socket]);

	useEffect(() => {
		if (notification !== undefined && notification.userAssignated === user.id)
			setMyOwn(true);
		if (notification === undefined) setMyOwn(false);
	}, [notification]);

	const showPanel = () => {
		setPanel(!panel);
		handleNotification();
	};

	const handleNotification = async () => {
		const token = validateToken();
		const notifications = await fetched(
			token,
			`${import.meta.env.VITE_FRONTEND_API_URL}/notifications`,
			"GET",
		);
		console.log(notifications.notifications[0]);
		setAllNotifications(notifications.notifications[0]);
	};

	return (
		<div className="grid mx-5">
			<button type="button" onClick={showPanel}>
				{myOwn ? (
					// rome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
						/>
					</svg>
				) : (
					// rome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
						/>
					</svg>
				)}
			</button>
			{panel && (
				<div className="w-[400px] h-auto bg-slate-100 border-slate-400 border-[1px] absolute top-[50px] right-[0px] rounded-xl">
					{allNotifications.length > 0 &&
						allNotifications.map(
							(n) =>
								n.ACTIVE && <NotificationRow key={n.id} notification={n} />,
						)}
				</div>
			)}
		</div>
	);
};

export default ModuleNotification;
