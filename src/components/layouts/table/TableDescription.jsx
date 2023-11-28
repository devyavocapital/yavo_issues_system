import React from "react";

const TableDescription = ({
	status,
	creditNumber,
	nameClient,
	// lastComment,
	expired,
}) => {
	return (
		<div className="flex md:gap-2 lg:gap-5">
			<span
				className={`relative rounded-xl p-2 text-sm md:text-md lg:text-lg font-bold border-2 bg-slate-900
                    ${status === "Pendiente" && "text-[#FFF508]"}
                    ${status === "Finalizado" && "text-[#00BB07]"}
                    ${status === "Por Atender" && "text-[#FF0707]"}
                    ${status === "nonStatus" && "text-[#9B9B9B]"}
                `}
			>
				{status}
				<span
					className={`absolute rounded-full w-5 h-5 -top-2 -right-2 border-2 border-black 
					${expired === "valid" && "bg-green-400"}
					${expired === "toExpired" && "bg-yellow-200"}
					${expired === "expired" && "bg-red-700"}
					${expired === null && "bg-slate-100"}
					
					`}
				>
					{""}
				</span>
			</span>
			<p className="text-gray-800 font-bold place-self-center italic text-sm md:text-md lg:text-lg lg:flex hidden">
				#Crédito: {creditNumber}
			</p>
			<div className="flex">
				<p className="text-gray-900 place-self-center text-sm md:text-md lg:text-lg">
					{nameClient}
					{/* {lastComment && (
						<span className="text-gray-500 place-self-center truncate text-sm md:text-md lg:text-lg">
							: {lastComment}
						</span>
					)} */}
				</p>
			</div>
		</div>
	);
};

export default TableDescription;
