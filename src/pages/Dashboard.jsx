import Table from "../components/Table";
import ModuleControl from "../components/module/ModuleControl";

const Dashboard = () => {
	return (
		<main className="w-full grid">
			<section className="mt-10">
				<ModuleControl />
			</section>
			<section className="w-full mt-10 mx-auto">
				<Table />
			</section>
		</main>
	);
};

export default Dashboard;
