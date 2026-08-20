import React from "react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
export default function page() {
	const blogList = [
		{
			imgurl: "/images/blogs/blog1.webp",
			title: "Need of the Hour: India Needs EHR Framework",
			source: "TOI",
			path: "/blog/article1",
		},
		{
			imgurl: "/images/blogs/blog2.webp",
			title: "Digitalisation of Healthcare Data: The Next Startup Boom",
			source: "ET CONTRIBUTORS",
			path: "/blog/article2",
		},
		{
			imgurl: "/images/blogs/blog3.webp",
			title:
				"India Bullish on AI in Healthcare Without Electronic Health Records",
			source: "ETHealthWorld",
			path: "/blog/article3",
		},
		{
			imgurl: "/images/blogs/blog4new.webp",
			title:
				"Electronic Health Records: Adoption and Overcoming Challenges for India",
			source: "Medibank",
			path: "/blog/article4",
		},
		{
			imgurl: "/images/art5Mb1.png",
			title:
				"The Future of Healthcare: How EHR can Transform Patient Care in India",
			source: "Medibank",
			path: "/blog/article5",
		},
	];

	const breadcrumbItems = [
		{ label: "Home", href: "/" },
		{ label: "Blog", href: "/blog" },
	];
	return (
		<div className="mt-[100px]">
			<div className="relative overflow-hidden bg-gradient-to-b from-[#c8badb] via-[#c3b4d8] to-[#b6a3cc]">
				<div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[88px] overflow-hidden">
					<div className="herowavebackground" aria-hidden="true" />
				</div>

				<div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[88px] overflow-hidden">
					<div className="herowavebackground rotate-180" aria-hidden="true" />
				</div>

				<div className="w-[90%] max-w-[1240px] m-auto py-16 md:py-20">
					<Breadcrumb items={breadcrumbItems} textColor="text-white" />
					<div className="relative z-10 text-center my-10 text-[30px] md:text-[36px] font-bold tracking-tight text-white">
						Blogs
					</div>
					<div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 w-full items-stretch">
						{blogList.map((item, index) => {
							return (
								<Link
									key={index}
									href={item.path}
									className="group flex h-full flex-col rounded-2xl border border-white/60 bg-white/95 p-4 shadow-[0_8px_28px_rgba(25,19,45,0.16)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(25,19,45,0.25)]"
								>
									<div className="overflow-hidden rounded-xl">
										<Image
											src={item.imgurl}
											alt={item.title}
											className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
											width="358"
											height="240"
											loading="lazy"
										/>
									</div>
									<div className="flex grow flex-col justify-between pt-4">
										<div className="text-left text-[24px] leading-[32px] font-medium text-[#1b204a]">
											{item.title}
										</div>
										<div className="mt-4 text-left text-[#636384] text-[14px]">
											Source: {item.source}
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
