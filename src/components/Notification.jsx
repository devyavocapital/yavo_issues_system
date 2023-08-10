/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Notification = ({ socket, user }) => {
	const [notification, setNotification] = useState();
	const [notifications, setNotifications] = useState([]);
	const [show, setShow] = useState(false);

	useEffect(() => {
		socket.on("notificationResponse", (data) => setNotification(data));
	}, [socket]);

	useEffect(() => {
		if (notification !== undefined && notification.userAssignated === user.id) {
			setShow(true);
			setNotifications([...notifications, notification]);
		}
	}, [notification]);

	useEffect(() => {
		show &&
			setTimeout(() => {
				setShow(false);
				setNotification();
				setNotifications([]);
			}, 5000);
	}, [show]);

	return (
		show && (
			<div className="absolute z-30 bg-red-500 top-[100px] left-[0px] w-[400px] mb-5">
				<div className=" bg-white translate-x-2 px-3">
					{notifications.length > 0 &&
						notifications.map((n) => (
							<p key={n.nameClient}>
								Nuevo Ticket Asignado para: {n.nameClient}
							</p>
						))}
				</div>
			</div>
		)
	);
};

export default Notification;
