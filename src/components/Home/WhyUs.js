"use client";
import React, { useEffect, useRef, useState } from "react";
import {
	FaChevronCircleDown,
	FaChevronCircleUp,
} from "react-icons/fa";
import { createGsapContext } from "@/lib/gsap";

export default function WhyUs() {
	const blogList = [
		{
			imgurl: "/images/blogs/blog1.webp",
			title: "Digital Health Records",
			source: "I",
			path: "/blog/article1",
			content:
				"Store your medical records digitally at a centralised location and have the freedom to never carry your paper prescription or lab report",
		},
		{
			imgurl: "/images/blogs/blog2.webp",
			title: "Online consultation",
			source: "II",
			path: "/blog/article2",
			content:
				"Whether it&apos;s your first visit or a follow-up appointment, enjoy the convenience of visiting a doctor either in person or online.",
		},
		{
			imgurl: "/images/blogs/blog3.webp",
			title: "AI Health Analysis",
			source: "III",
			path: "/blog/article3",
			content:
				"As you start storing your lab reports, our AI will read the report and give you an overview of various parameters of your health in an easy-to-understand graph/ chart.",
		},
		{
			imgurl: "/images/blogs/blog4new.webp",
			title: "Lab reports",
			source: "IV",
			path: "/blog/article4",
			content:
				"Take proactive care of your health with regular health checks and blood tests using the great offers provided by our partners",
		},
		{
			imgurl: "/images/blogs/blog5new.webp",
			title: "SOS",
			source: "V",
			path: "/blog/article4",
			content:
				"Whether it’s with family members living abroad or healthcare providers during an emergency, our system is uniquely designed to share your records safely & securely",
		},
	];

	const [viewDetails, setViewDetails] = useState([]);
	const sectionRef = useRef(null);

	const handleViewDetailsClick = (title) => {
		if (!viewDetails.includes(title)) {
			setViewDetails([...viewDetails, title]); // Add the title to the viewDetails array
		} else {
			setViewDetails(viewDetails.filter((b) => b !== title)); // Remove the title from the viewDetails array
		}
	};

	useEffect(() => {
		return createGsapContext(sectionRef, (gsap) => {
			gsap.fromTo(
				".why-heading",
				{ y: 20, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%",
					},
				}
			);

			gsap.fromTo(
				".why-card",
				{ y: 24, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					ease: "power2.out",
					stagger: 0.08,
					scrollTrigger: {
						trigger: ".why-grid",
						start: "top 80%",
					},
				}
			);
		});
	}, []);

	return (
		<div ref={sectionRef} className="text-center">
			<h2 className="why-heading w-[90%] text-left md:text-[35px] m-auto py-6 md:leading-[52px] font-semibold text-[#000339] text-3xl leading-[25px]">
				Why <span style={{ color: "#6D4AFF" }}>Choose</span> Us?
			</h2>
			<h3 className="why-heading w-[90%] text-left m-auto text-[#000339] text-[17px] leading-[25px]">
				Transforming India&apos;s healthcare one step at a time with EHR
			</h3>
			<div className="flex py-6 justify-between items-center mxxxl:container w-[90%] m-auto xl:container">
				{/* Other Blogs */}
				<div className="why-grid flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-4 w-full justify-center">
					{blogList.map((item, index) => (
						<div
							key={index}
							className={`why-card relative flex sm:flex-wrap text-left border border-gray-300 rounded-[20px] p-4 ${
								index === blogList.length - 1
									? "col-span-2 sm:mx-[20%] justify-center"
									: ""
							}`}
						>
							{/* Icon Section */}
							<div className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
								<span className="text-sm font-bold">{item.source}</span>
							</div>

							{/* Content Section */}
							<div className="flex ml-8 items-start w-full">
								<button
									className="text-lg text-blue-500 rounded-full mt-2 w-max sm:hidden" // Only show on mobile
									onClick={() => handleViewDetailsClick(item.title)}
								>
									{viewDetails.includes(item.title) ? (
										<FaChevronCircleUp />
									) : (
										<FaChevronCircleDown />
									)}
								</button>
								<div className="flex flex-col items-center gap-2 w-full">
									<div className="font-bold text-lg w-[85%]">{item.title}</div>
									{/* Always show content on desktop, show conditionally on mobile */}
									<div
										className={`text-gray-600 w-[85%] text-sm ${viewDetails.includes(item.title) ? "block sm:block" : "hidden sm:block"}`}
									>
										{item.content}
									</div>
								</div>
							</div>

							{/* Arrow Icon */}
							<div
								className="absolute sm:h-1/2 w-[30px] md:w-[60px] ml-auto -bottom-0.5 -right-0.5 flex justify-center items-center"
								style={{
									backgroundColor: "white",
									borderRadius: "20px 0px 20px 0px", // Top-left, Top-right, Bottom-right, Bottom-left
									borderWidth: "1px 0px 0px 1px", // Top, Right, Bottom, Left
								}}
							>
								<span className="text-blue-500 text-xl transform rotate-45">
									&#8594;
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
			{/* <motion.div
				className="text-center my-1"
				variants={buttonVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
			>
				<a
					href="/blog"
					className="bg-[#6D4AFF] p-3 px-6 text-white rounded-[10px]"
				>
					View All
				</a>
			</motion.div> */}
		</div>
	);
}
