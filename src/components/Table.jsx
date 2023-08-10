/* eslint-disable react/prop-types */
import TableContainer from "./TableContainer";

const Table = ({ socket, refresh }) => {
	return (
		<div className="w-11/12 mx-auto border">
			<TableContainer socket={socket} refresh={refresh} />
		</div>
	);
};

export default Table;
