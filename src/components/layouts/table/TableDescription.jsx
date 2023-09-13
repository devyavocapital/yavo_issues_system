import React from "react";

const TableDescription = ({
	status,
	creditNumber,
	nameClient,
	lastComment,
	expired,
}) => {
	return (
		<div className="flex md:gap-2 lg:gap-5">
			<span
				className={`relative text-black rounded-xl p-2 text-sm md:text-md lg:text-lg
                    ${status === "Pendiente" && "bg-[#FFF508]"}
                    ${status === "Finalizado" && "bg-[#00BB07]"}
                    ${status === "Por Atender" && "bg-[#FF0707]"}
                    ${status === "nonStatus" && "bg-[#9B9B9B]"}
                `}
			>
				{status}
				<span
					className={`absolute rounded-full w-5 h-5 -top-2 -right-2 border-2 border-black 
					${expired === 1 && "bg-green-400"}
					${expired === 2 && "bg-yellow-200"}
					${expired === 3 && "bg-red-700"}
					
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
					{nameClient}:{" "}
					<span className="text-gray-500 place-self-center truncate text-sm md:text-md lg:text-lg">
						{lastComment}
					</span>
				</p>
			</div>
		</div>
	);
};

export default TableDescription;
