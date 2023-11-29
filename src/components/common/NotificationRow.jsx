import { dateFormated } from "../../utils/formatDate";
import IconDelete from "./IconDelete";
import IconReaded from "./IconReaded";

const NotificationRow = ({
	notification,
	allNotifications,
	setAllNotifications,
}) => {
	return (
		<div
			key={notification._id}
			className="flex justify-between my-2 px-2 border-b-[1px] border-slate-300 last:border-none"
		>
			<div className="grid">
				<p className="text-xl">{notification.nameClient}</p>
				{notification.created_At && (
					<p className="text-[11px] ml-2">
						creado: {dateFormated(notification.created_At)}
					</p>
				)}
			</div>
			<div className="flex gap-3 mr-5">
				<IconReaded readed={notification.readed} id={notification._id} />

				<IconDelete
					id={notification._id}
					setAllNotifications={setAllNotifications}
					allNotifications={allNotifications}
				/>
			</div>
		</div>
	);
};

export default NotificationRow;
