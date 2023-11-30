import { Card } from "flowbite-react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { esStatus } from "../utils/statusFilters";
import { validateExpired } from "../utils/validateExpired";
import Spinner from "./common/Spinner";
import TableAvatar from "./layouts/table/TableAvatar";
import TableDescription from "./layouts/table/TableDescription";
import ModuleComments from "./module/ModuleComments";

const Table = ({
	loading,
	issues = [],
	comments,
	// category,
	showComments,
	handleComments,
	issueSelected,
	newComment,
}) => {
	const { user } = useUser();

	return (
		<div className="w-full lg:w-11/12 mx-auto border">
			{loading ? (
				<div className="h-screen grid w-12/12 place-items-center">
					<Spinner aria-label="Extra large spinner example" size="xl" />
				</div>
			) : (
				issues?.map((issue) => (
					<Fragment key={issue.nameClient}>
						<Card>
							<div className="grid grid-cols-[20%_65%_15%] items-center">
								<TableAvatar name={issue.nameClient} />
								<TableDescription
									creditNumber={issue.creditNumber}
									nameClient={
										issue.lastnameClient !== undefined
											? `${issue.nameClient} 
												${
													issue.lastnameClient === null ||
													issue.lastnameClient === "null"
														? ""
														: issue.lastnameClient
												} 
												${
													issue.motherLastnameClient === null ||
													issue.lastnameClient === "null"
														? ""
														: issue.motherLastnameClient
												}`
											: issue.nameClient
									}
									status={esStatus(issue.status)}
									// lastComment={issue.initialComment}
									expired={validateExpired({
										days: issue.daysConfig,
										dateCreated: issue.created_At,
									})}
								/>

								<div className="flex space-x-3 justify-end">
									{user.category === 1 && (
										<Link to={`/dashboard/edit/${issue.id}`}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="icon icon-tabler icon-tabler-edit"
												width="44"
												height="44"
												viewBox="0 0 24 24"
												strokeWidth="1.5"
												stroke="currentColor"
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<title>icon Edit</title>
												<path stroke="none" d="M0 0h24v24H0z" fill="none" />
												<path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
												<path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
												<path d="M16 5l3 3" />
											</svg>
										</Link>
									)}
									<button
										type="button"
										className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300"
										onClick={() => handleComments(issue)}
									>
										<p>Ver Comentarios</p>
									</button>
								</div>
							</div>
						</Card>
					</Fragment>
				))
			)}
			{showComments && (
				<ModuleComments
					comments={comments}
					handleComments={handleComments}
					issueSelected={issueSelected}
					newComment={newComment}
				/>
			)}
		</div>
	);
};

export default Table;
