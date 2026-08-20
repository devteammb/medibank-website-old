"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createGsapContext } from "@/lib/gsap";

export default function BlogSection() {
	const blogList = [
		{
			imgurl: "/images/blogs/blog1.webp",
			title: "Need of the Hour: India Needs EHR Framework",
			source: "TOI",
			path: "/blog/article1",
			content: "Content for Need of the Hour: India Needs EHR Framework",
		},
		{
			imgurl: "/images/blogs/blog2.webp",
			title: "Digitalisation of Healthcare Data: The Next Startup Boom",
			source: "ET CONTRIBUTORS",
			path: "/blog/article2",
			content: "Content for Digitalisation of Healthcare Data",
		},
		{
			imgurl: "/images/blogs/blog3.webp",
			title:
				"India Bullish on AI in Healthcare Without Electronic Health Records",
			source: "ETHealthWorld",
			path: "/blog/article3",
			content: "Content for India Bullish on AI in Healthcare",
		},
		{
			imgurl: "/images/blogs/blog4new.webp",
			title:
				"Electronic Health Records: Adoption and Overcoming Challenges for India",
			source: "appknox",
			path: "/blog/article4",
			content: "Content for Electronic Health Records: Adoption",
		},
	];

	const [mainBlog, setMainBlog] = useState(blogList[0]); // Set the initial main blog
	const [isSwitching, setIsSwitching] = useState(false);
	const sectionRef = useRef(null);

	const handleBlogClick = (blog) => {
		if (blog.title !== mainBlog.title) {
			setIsSwitching(true); // Trigger the switching animation
			setTimeout(() => {
				setMainBlog(blog);
				setIsSwitching(false); // Reset the animation state
			}, 500); // Match the duration of the animation
		}
	};

	useEffect(() => {
		return createGsapContext(sectionRef, (gsap) => {
			gsap.fromTo(
				".blog-heading",
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
				".blog-main",
				{ y: 24, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.9,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".blog-main",
						start: "top 80%",
					},
				}
			);

			gsap.fromTo(
				".blog-card",
				{ y: 16, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.7,
					ease: "power2.out",
					stagger: 0.1,
					scrollTrigger: {
						trigger: ".blog-list",
						start: "top 80%",
					},
				}
			);

			gsap.fromTo(
				".blog-button",
				{ y: 16, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.7,
					ease: "power2.out",
					scrollTrigger: {
						trigger: ".blog-button",
						start: "top 85%",
					},
				}
			);
		});
	}, []);

	// Get other blogs limited to 3 only
	const otherBlogs = blogList
		.filter((blog) => blog.title !== mainBlog.title)
		.slice(0, 3);

	return (
		<div ref={sectionRef} className="text-center">
			<div className="blog-heading text-3xl md:text-[35px]  md:leading-[52px] font-semibold text-[#000339] leading-[25px]">
				Blogs
			</div>
			<div className="flex flex-col sm:flex-row py-6 justify-between items-center mxxxl:container w-[90%] m-auto xl:container">
				{/* Main Blog Section with Animation */}
				{/* for desktop view */}
				<div className="blog-main sm:w-[45%] hidden md:block">
					{!isSwitching && (
						<div
							key={mainBlog.title}
							className="main-blog shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] bg-white mb-6"
						>
							<a href={mainBlog.path} tabIndex="0">
								<Image
									src={mainBlog.imgurl}
									alt={mainBlog.title}
									className="rounded-[7px] w-full h-[300px] object-cover"
									width={500}
									height={300}
									loading="lazy"
								/>
							</a>
							<div className="text-left p-6 py-2 font-bold">
								{mainBlog.title}
							</div>
							<div className="text-left px-6 text-[#636384] text-[14px] mb-2">
								Source: {mainBlog.source}
							</div>
							<p className="text-left px-6 pb-6">{mainBlog.content}</p>
						</div>
					)}
				</div>
				{/* for mobile view */}
				<div className="blog-main sm:w-[45%] block md:hidden">
					{!isSwitching && (
						<div
							key={mainBlog.title}
							className="main-blog shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] bg-white mb-6 p-4 flex min-h-[125px]"
						>
							<a href={mainBlog.path} tabIndex="0">
							<div className="flex-shrink-0">
								<Image
									src={mainBlog.imgurl}
									alt={mainBlog.title}
									className="rounded-[7px] object-cover min-w-[120px]"
									width="120"
									height="100"
									loading="lazy"
								/>
							</div>
							</a>
							{/* Blog Content */}
							<div className="flex flex-col pl-4 text-left">
								<div className="text-left font-bold">
									{mainBlog.title}
								</div>
								<div className="text-left text-[#636384] text-[14px]">
									Source: {mainBlog.source}
								</div>
								{/* <p className="text-left">{mainBlog.content}</p> */}
							</div>
						</div>
					)}
				</div>

				{/* Other Blogs */}
				<div className="blog-list flex flex-col gap-4 sm:w-[50%] justify-center">
					{otherBlogs.map((item, index) => (
						<div
							key={index}
							className="blog-card flex shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[10px] p-4 bg-white cursor-pointer transition-transform hover:scale-105"
							onClick={() => handleBlogClick(item)}
						>
							{/* Blog Image */}
							<div className="flex-shrink-0">
								<Image
									src={item.imgurl}
									alt={item.title}
									className="rounded-[7px]"
									width="120"
									height="100"
									loading="lazy"
								/>
							</div>

							{/* Blog Content */}
							<div className="flex flex-col justify-center pl-4 text-left">
								<div className="font-bold">{item.title}</div>
								<div className="text-[#636384] text-[14px]">
									Source: {item.source}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className="blog-button text-center my-1">
				<a
					href="/blog"
					className="bg-[#6D4AFF] p-3 px-6 text-white rounded-[20px]"
				>
					View All
				</a>
			</div>
		</div>
	);
}
