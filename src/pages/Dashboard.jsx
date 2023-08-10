import Table from "../components/Table";
import ModuleControl from "../components/module/ModuleControl";
/* eslint-disable react/prop-types */
import { useState } from "react";

const Dashboard = ({ socket }) => {
	const [refresh, setRefresh] = useState(false);
	console.log(refresh);
	return (
		<main className="w-full grid">
			<section className="mt-10">
				<ModuleControl socket={socket} setRefresh={setRefresh} />
			</section>
			<section className="w-full mt-10 mx-auto">
				<Table socket={socket} refresh={refresh} />
			</section>
		</main>
	);
};

export default Dashboard;
