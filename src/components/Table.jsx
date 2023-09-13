import { Card } from "flowbite-react";
import { Fragment } from "react";
import { esStatus } from "../utils/statusFilters";
import Spinner from "./common/Spinner";
import TableAvatar from "./layouts/table/TableAvatar";
import TableDescription from "./layouts/table/TableDescription";
import ModuleComments from "./module/ModuleComments";

const Table = ({
	loading,
	issues,
	comments,
	category,
	showComments,
	handleComments,
	issueSelected,
	newComment,
}) => {
	return (
		<div className="w-full lg:w-11/12 mx-auto border">
			{loading ? (
				<div className="h-[500px] grid w-12/12">
					<Spinner aria-label="Extra large spinner example" size="xl" />
				</div>
			) : (
				issues.map((issue) => (
					<Fragment key={issue.NAMECLIENT}>
						<Card>
							<div className="grid grid-cols-[20%_70%_10%] items-center">
								<TableAvatar name={issue.FULLNAME} />

								<TableDescription
									creditNumber={issue.CREDITNUMBER}
									nameClient={
										issue.LASTNAME !== undefined
											? `${issue.NAMECLIENT} ${issue.LASTNAME} ${issue.MOTHERLASTNAME}`
											: issue.NAMECLIENT
									}
									status={esStatus(issue.STATUS)}
									lastComment={issue.ISSUE_DESC}
									expired={issue.STATUS_ISSUE}
								/>

								<div className="flex space-x-3 justify-end">
									{/* <ModalComment id={issue.id} /> */}
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
