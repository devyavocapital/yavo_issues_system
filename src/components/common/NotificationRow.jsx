/* eslint-disable react/prop-types */

import IconDelete from "./IconDelete";
import IconReaded from "./IconReaded";

const NotificationRow = ({ notification }) => {
	return (
		<div
			key={notification.id}
			className="flex justify-between my-2 px-2 border-b-[1px] border-slate-300 last:border-none"
		>
			<div className="grid">
				<p className="text-xl">{notification.CLIENT}</p>
				<p className="text-[11px] ml-2">creado: {notification.CREATED_AT}</p>
			</div>
			<div className="flex gap-3 mr-5">
				<IconReaded readed={notification.READED} id={notification.id} />

				<IconDelete id={notification.id} />
			</div>
		</div>
	);
};

export default NotificationRow;
