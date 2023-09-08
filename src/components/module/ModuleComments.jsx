import React from "react";
import { esStatus } from "../../utils/statusFilters";
import ModalComment from "./modals/ModalComment";

const ModuleComments = ({
	comments,
	handleComments,
	issueSelected,
	newComment,
}) => {
	console.log(issueSelected);
	return (
		<div className="fixed z-20 right-0 top-0 w-full h-screen bg-slate-800  bg-opacity-80">
			<div className=" fixed w-3/4 lg:w-1/2 bg-cyan-700 right-0 h-screen opacity-100 bg-opacity-100">
				<button
					type="button"
					onClick={() => handleComments(0)}
					className="absolute p-3 m-3 border-2 border-cyan-700 hover:bg-white hover:rounded-xl"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<title>icon Close</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
				<h2 className="text-white text-center text-3xl lg:text-5xl my-5">
					{issueSelected.NAMECLIENT} -{" "}
					<span>{esStatus(issueSelected.STATUS)}</span>
				</h2>
				<h3 className="text-white text-center text-2xl my-5">
					Folio: {issueSelected.id}
				</h3>

				{issueSelected.USER_ASSIGNATED === null ? (
					<p className="text-white text-center text-xl my-5">
						No ha sido asignado
					</p>
				) : (
					<p className="text-white text-center text-xl my-5">
						Asignado a:{" "}
						<span className="font-bold text-2xl">
							{issueSelected.USER_ASSIGNATED}
						</span>
					</p>
				)}

				{/* <p className="text-white text-center text-lg my-5">
					{issueSelected.NAMECLIENT} -{" "}
					<span>{esStatus(issueSelected.STATUS)}</span>
				</p> */}
				<ul className="divide-y divide-gray-200">
					{comments.map((comment) => {
						return (
							<li className="py-3 sm:py-4 px-5 mx-2 mb-2" key={comment.id}>
								<div className="flex items-center space-x-4">
									<div className="shrink-0">
										<img
											alt="User settings"
											src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
											className="w-[50px] h-[50px] rounded-full"
										/>
									</div>
									<div className="min-w-0 flex-1">
										<p className=" text-xl font-medium text-gray-900 ">
											{comment.NOMBRECOMPLETO}:{" "}
											<span>{comment.DESCRIPTION}</span>
											<br />
											<span className="inline-flex items-center text-base font-semibold text-gray-900 ">
												Creado: {comment.CREATED_AT}
											</span>
										</p>
										{/* <p className="truncate text-sm text-gray-500 dark:text-gray-400">
										email@windster.com
									</p> */}
									</div>
								</div>
							</li>
						);
					})}
				</ul>
				<div className="grid w-4/12 mt-5 mx-auto">
					<ModalComment id={issueSelected.id} newComment={newComment} />
				</div>
			</div>
		</div>
	);
};

export default ModuleComments;
