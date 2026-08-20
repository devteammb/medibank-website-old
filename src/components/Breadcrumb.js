import React from "react";
import Link from "next/link";

const Breadcrumb = ({ items, textColor }) => {
	return (
		<nav className="flex mb-4 py-4" aria-label="Breadcrumb">
			<ol className="inline-flex pl-0 text-[#282672] items-center space-x-1 md:space-x-3">
				{items.map((item, index) => (
					<li key={index} className="inline-flex items-center">
						{index > 0 && <span className="mx-2 text-gray-400">&gt;</span>}
						<Link
							href={item.href}
							className={`text-sm md:text-[18px] font-medium ${
								textColor ? textColor : "text-[#282672]"
							} hover:text-blue-500`}
						>
							{item.label}
						</Link>
					</li>
				))}
			</ol>
		</nav>
	);
};

export default Breadcrumb;
