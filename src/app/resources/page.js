"use client";

import React, { useEffect } from "react";
import Image from "next/image";

const blogs = [
	{
		imgurl: "/images/blogs/blog1.webp",
		title: "Need of the Hour: India Needs EHR Framework",
		description:
			"As a developing nation, India has the second-largest population in the world with an ever-growing...",
		source: "TOI",
		readTime: "2 min read",
		path: "/blog/article1",
	},
	{
		imgurl: "/images/blogs/blog2.webp",
		title: "Digitalisation of Healthcare Data: The Next Startup Boom",
		description:
			"In much the same way India's digital banking revolution brought formal banking within the reach of anyone...",
		source: "ET CONTRIBUTORS",
		readTime: "2 min read",
		path: "/blog/article2",
	},
	{
		imgurl: "/images/blogs/blog4new.webp",
		title:
			"Electronic Health Records: Adoption and Overcoming Challenges for India",
		description:
			"Considering the massive amount of medical and healthcare records being generated across multiple institutions...",
		source: "Medibank",
		readTime: "2 min read",
		path: "/blog/article4",
	},
	{
		imgurl: "/images/blogs/blog3.webp",
		title:
			"India Bullish on AI in Healthcare Without Electronic Health Records",
		description:
			"With more than 75% of outpatients and more than 60% of inpatients in India being treated in private healthcare...",
		source: "Medibank",
		readTime: "2 min read",
		path: "/blog/article3",
	},
];

export default function Page() {
	useEffect(() => {
		const sectionAliases = {
			resources1: "abha-abdm",
			resources2: "health-guides",
			resources3: "blogs",
			resources4: "privacy-policy",
		};

		const scrollToHashSection = () => {
			const currentHash = decodeURIComponent(window.location.hash.replace("#", ""));

			if (!currentHash) {
				return;
			}

			const normalizedHash = sectionAliases[currentHash] || currentHash;
			const section = document.getElementById(normalizedHash);

			if (!section) {
				return;
			}

			requestAnimationFrame(() => {
				setTimeout(() => {
					section.scrollIntoView({ behavior: "smooth", block: "start" });
				}, 80);
			});
		};

		scrollToHashSection();
		window.addEventListener("hashchange", scrollToHashSection);
		window.addEventListener("load", scrollToHashSection);

		return () => {
			window.removeEventListener("hashchange", scrollToHashSection);
			window.removeEventListener("load", scrollToHashSection);
		};
	}, []);

	return (
		<div className="mt-[100px]">
			<div id="abha-abdm" className="scroll-mt-28 bg-white px-5 py-6 sm:px-8 md:px-16 md:py-8">
				<span id="resources1" className="sr-only" aria-hidden="true" />
				<h1 className="text-[30px] font-semibold text-[#1B1570] sm:text-[38px] md:text-[42px]">
					Resources
				</h1>

				<div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
					<div className="text-left text-[14px] leading-[1.6] text-[#1D2A65] md:w-[58%] md:text-[16px] md:leading-[1.55] md:text-justify">
						<div className="py-3 text-[22px] font-semibold text-[#1B1570]">
							ABHA / ABDM
						</div>
						Ayushman Bharat Digital Mission (ABDM) aims to develop the backbone
						necessary to support the integrated digital health infrastructure of
						the country. It will bridge the existing gap amongst different
						stakeholders of healthcare ecosystem through digital highways. ABHA
						(Ayushman Bharat Health Account), created as part of ABDM number is
						a 14-digit number that will uniquely identify you as a participant
						in India’s digital healthcare ecosystem. ABHA number will establish
						a strong and trustable identity for you that will be accepted by
						healthcare providers across the country. It also helps you to link
						all healthcare benefits ranging from public health programmes to
						insurance schemes to your unique ABHA number and avoid long lines
						for registration at HFR registered healthcare facilities across the
						country. If you haven’t already, you can generate your ABHA number
						directly from the government website using the link below.

						<div className="mt-7 md:mt-8 text-left">
							<a
								href="https://abha.abdm.gov.in/abha/v3/register"
								target="__blank"
								className="inline-flex items-center justify-center rounded-[10px] bg-gradient-to-b from-[#d81b60] via-[#7b1fa2] to-[#3b0aa3] px-6 py-3 text-[14px] font-medium text-white shadow-[0_8px_20px_rgba(123,31,162,0.35)] transition-transform duration-200 hover:scale-[1.02]"
							>
								Register Now
							</a>
						</div>
					</div>
					<div className="mx-auto w-full max-w-[460px] md:mx-0 md:w-[42%] md:max-w-none">
						<div className="overflow-hidden rounded-[16px] ">
							<Image
								src="/images/abha-pic.png"
								className="h-full w-full object-cover"
								alt="ABHA and ABDM awareness"
								width="640"
								height="1511"
							/>
						</div>
					</div>
				</div>
			</div>
			<div id="health-guides" className="scroll-mt-28 bg-white px-5 py-10 text-black sm:px-8 md:px-16">
				<span id="resources2" className="sr-only" aria-hidden="true" />
				<div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
					<div className="relative mx-auto w-full max-w-[460px] md:mx-0 md:w-[42%] md:max-w-none">
						<div className="overflow-hidden rounded-[16px]">
							<Image
								src="/images/health-guides.png"
								className="h-full w-full object-cover"
								alt="she"
								width="640"
								height="1511"
							/>
						</div>
					</div>
					<div className="text-left text-[14px] leading-[1.6] text-[#1D2A65] md:w-[58%] md:text-[16px] md:leading-[1.55] md:text-justify">
						<div className="py-3 text-[22px] font-semibold text-[#1B1570]">
							Health Guides
						</div>
						At Medibank we are not only working on improving healthcare
						co-ordination in India, but also want to educate people about
						healthy lifestyle options, tips and precautions that can be taken to
						avoid falling sick in the first place. This section of ours is a
						knowledge base of articles curated from various sources like
						Doctors, medical journals, research papers and other trustworthy
						sites that can help users to prevent a lot of common problems and
						lead a healthy lifestyle. Kindly note that this is only a place of
						general advice and knowledge as each individual situation is
						different and for specific individual needs, please consult a
						doctor.

						<div className="mt-7 md:mt-8 text-left">
							<a
								href="/health-guides"
								className="inline-flex items-center justify-center rounded-[10px] bg-gradient-to-b from-[#d81b60] via-[#7b1fa2] to-[#3b0aa3] px-6 py-3 text-[14px] font-medium text-white shadow-[0_8px_20px_rgba(123,31,162,0.35)] transition-transform duration-200 hover:scale-[1.02]"
							>
								View Guides
							</a>
						</div>
					</div>
				</div>
			</div>
			<div id="blogs" className="scroll-mt-28 bg-[#f3f2f4] px-5 py-10 sm:px-8 md:px-16">
				<span id="resources3" className="sr-only" aria-hidden="true" />
				<h2 className="text-[30px] font-semibold text-[#1f2677] sm:text-[32px]">Blogs</h2>
				<div className="-mx-5 mt-5 overflow-x-auto px-5 sm:-mx-8 sm:px-8 md:mx-0 md:overflow-visible md:px-0">
					<div className="flex w-max gap-4 md:grid md:w-auto md:grid-cols-2 md:gap-6 xl:grid-cols-4">
						{blogs.map((blog) => (
							<a
								key={blog.title}
								href={blog.path}
								className="w-[280px] shrink-0 rounded-[18px] border border-[#a32fb6] bg-[#e8e0ea] p-3 shadow-[0_2px_8px_rgba(68,43,132,0.08)] transition-transform duration-200 hover:-translate-y-1 md:w-auto md:shrink"
							>
							<Image
								src={blog.imgurl}
								alt={blog.title}
								width={320}
								height={190}
								className="h-[190px] w-full rounded-[16px] object-cover"
							/>
							<div className="px-1 pb-1 pt-4">
								<h3 className="line-clamp-2 text-[22px] leading-[1.25] text-[#1f2677] md:text-[20px]">
									{blog.title}
								</h3>
								<p className="mt-2 line-clamp-2 text-[14px] leading-[1.5] text-[#5d6296] md:text-[13px]">
									{blog.description}
								</p>
								<div className="mt-8 flex items-center justify-between text-[13px] text-[#6369a1]">
									<span>Source: {blog.source}</span>
									{/* <span>{blog.readTime}</span> */}
								</div>
							</div>
							</a>
						))}
					</div>
				</div>
				<div className="mt-10 text-center">
					<a
						href="/blog"
						className="inline-flex items-center rounded-[12px] bg-gradient-to-b from-[#d81b60] via-[#7b1fa2] to-[#3b0aa3] px-10 py-3 text-[16px] font-medium text-white shadow-[0_10px_18px_rgba(123,31,162,0.35)]"
					>
						View All
					</a>
				</div>
			</div>
			<div id="privacy-policy" className="scroll-mt-28 bg-white px-5 py-10 text-black sm:px-8 md:px-16">
				<span id="resources4" className="sr-only" aria-hidden="true" />
				<div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
					<div className="text-left text-[14px] leading-[1.6] text-[#1D2A65] md:w-[58%] md:text-[16px] md:leading-[1.55] md:text-justify">
						<div className="py-3 text-[22px] font-semibold text-[#1B1570]">
							Privacy Policy
						</div>
						We understand the sensitive nature of health data and peoples
						concern around the safety of their personal data and health records.
						That’s why, we are developing MediBank on HL7 FHIR standards so it
						is designed to be flexible, adaptable and can be used in a wide
						range of settings with different health care information systems.
						This done in combination with an AES-256bit encryption which is
						currently the strongest and commonly used encryption method. We have
						also put in place multi factor authentication protocols to ensure no
						health record or data is accessed without user permission. Our
						privacy policy clearly explains all that a user needs to know about
						what information we collect, how we store it, use it and share it
						with. Please click below to read more about it.
						<div className="mt-7 md:mt-8 text-left">
							<a
								href="/policy/"
								className="inline-flex items-center justify-center rounded-[10px] bg-gradient-to-b from-[#d81b60] via-[#7b1fa2] to-[#3b0aa3] px-6 py-3 text-[14px] font-medium text-white shadow-[0_8px_20px_rgba(123,31,162,0.35)] transition-transform duration-200 hover:scale-[1.02]"
							>
								Read More
							</a>
						</div>
					</div>
					<div className="mx-auto w-full max-w-[460px] md:mx-0 md:w-[42%] md:max-w-none">
						<div className="overflow-hidden rounded-[16px]">
							<Image
								src="/images/privacy-policy.png"
								className="h-full w-full object-cover"
								alt="she"
								width="640"
								height="1511"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
