/* eslint-disable react/prop-types */
import ModalForm from "./modals/ModalForm";

const ModuleControl = ({ socket, setRefresh }) => {
	const handleRefresh = () => {
		console.log("setRefresh");
		setRefresh(true);
	};

	return (
		<div className="w-8/12 mx-auto my-auto flex justify-between">
			<ModalForm socket={socket} />

			<div>
				<button type="button" onClick={handleRefresh}>
					{/* rome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
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
							d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
						/>
					</svg>
				</button>
			</div>
			{/* <ModuleFilters /> */}
		</div>
	);
};

export default ModuleControl;
