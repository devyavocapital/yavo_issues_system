import { Button, Toast } from "flowbite-react";
import useSocket from "../../hooks/useSocket";
import useUser from "../../hooks/useUser";
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Notification = () => {
	const { user } = useUser();
	const { socket } = useSocket();
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
			<div className="absolute z-30 top-[100px] left-[0px] mb-5">
				{notifications.length > 0 &&
					notifications.map((n) => (
						<Toast key={n.nameClient}>
							<div className="flex items-start">
								<div className="ml-3 text-sm font-normal">
									<span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
										Te han asignado el ticket de:
									</span>
									<div className="mb-2 text-sm font-normal">{n.nameClient}</div>
									<div className="flex-start flex gap-2">
										<div className="w-full">
											<Button size="xs">Actualizar</Button>
										</div>
									</div>
								</div>
								<Toast.Toggle />
							</div>
						</Toast>
					))}
			</div>
		)
	);
};

export default Notification;
