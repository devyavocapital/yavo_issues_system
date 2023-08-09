import { Accordion, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import useFilter from "../../hooks/useFilter";
import { fetched } from "../utils/fetched";
import { validateToken } from "../utils/validateToken";
import ModalComment from "./module/modals/ModalComment";

const TableContainer = () => {
	const { filter } = useFilter();
	const [issues, setIssues] = useState();
	const [comments, setComments] = useState();
	const [sortAll, setSortAll] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getIssues = async () => {
			const token = validateToken();
			const response = await fetched(
				token,
				`${import.meta.env.VITE_FRONTEND_API_URL}/issues`,
				"GET",
			);
			setIssues(response.issue);
			setComments(response.comments[0]);
		};

		getIssues();
	}, []);

	useEffect(() => {
		if (filter === "all") {
			setSortAll(issues);
		}

		if (filter !== "all") {
			setSortAll(issues.filter((issue) => issue.STATUS === filter && issue));
		}

		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, [issues, filter]);

	return loading ? (
		<Spinner aria-label="Extra large spinner example" size="xl" />
	) : (
		<Accordion collapseAll>
			{sortAll.map((issue) => (
				<Accordion.Panel key={issue.id}>
					<Accordion.Title className={"text-xl"}>
						{issue.NAMECLIENT} -{" "}
						<span
							className={` w-[20px] h-[20px] rounded-lg p-2 text-black
							${issue.STATUS === "pendient" && "bg-[#FFF508]"}
							${issue.STATUS === "finished" && "bg-[#00BB07]"}
							${issue.STATUS === "attending" && "bg-[#FF0707]"}
							${issue.STATUS === "nonStatus" && "bg-[#9B9B9B]"}	
					`}
						>
							{issue.CREDITNUMBER}
						</span>
					</Accordion.Title>
					<Accordion.Content>
						<div className="w-10/12 flex justify-between text-2xl mx-auto">
							<p>NSS: {issue.SOCIALNUMBER}</p>
							<p>Tarjeta: {issue.CARDNUMBER}</p>
							<p>Fecha de incidencia: {issue.CREATED_AT}</p>
							<p className="">
								Asignado a:{" "}
								{issue.USER_ASSIGNATED === undefined
									? "Sin asignar"
									: issue.USER_ASSIGNATED}
							</p>
						</div>
						{comments.map(
							(comment, index) =>
								comment.ID_ISSUE === issue.id && (
									<div
										key={comment.ID}
										className="grid grid-cols-[60%_20%_20%] my-5"
									>
										<div className="w-11/12">
											{index === 0 && (
												<h3 className="mb-2 text-xl">Comentarios:</h3>
											)}
											<p>{comment.DESCRIPTION}</p>
										</div>
										<div className="w-11/12">
											<h3 className="mb-2 text-xl">Creado por:</h3>
											<p className="uppercase">{comment.NOMBRECOMPLETO}</p>
										</div>
										<div className="w-11/12">
											{index === 0 && (
												<h3 className="mb-2 text-xl">Fecha de comentario:</h3>
											)}
											<p>{comment.CREATED_AT}</p>
										</div>
									</div>
								),
						)}

						<ModalComment />
					</Accordion.Content>
				</Accordion.Panel>
			))}
		</Accordion>
	);
};

export default TableContainer;
