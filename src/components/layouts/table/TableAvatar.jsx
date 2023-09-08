import React from "react";

const TableAvatar = ({ name }) => {
	return (
		<div className="flex gap-5 md:gap-2">
			<img
				alt="User settings"
				src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
				className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] rounded-full"
			/>
			<h5 className="mb-1 text-md md:text-lg lg:text-xl font-medium text-gray-900 place-self-center">
				{name}
			</h5>
		</div>
	);
};

export default TableAvatar;
