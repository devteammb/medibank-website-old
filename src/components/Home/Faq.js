"use client";
import React, { useEffect, useRef } from "react";
import Accordion from "@/components/Blocks/Accordion";
import { createGsapContext } from "@/lib/gsap";

const data = [
	// Same FAQ data as provided
	{
		ques: "What is Medibank?",
		ans: "Medibank is India&apos;s first cloud-based Electronic Health Records (EHR) platform, with centralized digital health records accessible to both users through an app and doctors through a cloud-based web portal.",
	},
	{
		ques: "What is EHR?",
		ans: "A digital version of a patient's medical history that's designed to be shared across multiple healthcare providers and organisations. EHRs can include information from multiple practices, providers, and locations.",
	},
	{
		ques: "What’s the difference between EMR & EHR?",
		ans: "The main difference between an Electronic Medical Record (EMR) and an Electronic Health Record (EHR) is that an EMR is limited to a single practice, while an EHR can be used across multiple practices and healthcare organizations.",
	},
	{
		ques: "Is my data secure?",
		ans: "The short answer is yes. Medibank is designed using HL7 FHIR standards and AES-256-bit encryption—the strongest and most commonly used encryption standard today—making it flexible, adaptable, and usable across a wide range of healthcare information systems.",
	},
	{
		ques: "Who can access my data?",
		ans: "Primarily, your data can only be accessed by healthcare providers such as doctors and hospitals. However, Medibank is designed so that users receive a notification requesting permission each time access is needed, except during emergencies.",
	},
	{
		ques: "Is Medibank free to use?",
		ans: "Users can register on Medibank and create an account for free. However, to use the full functionality and take full advantage of the system, users must pay a low-cost subscription fee.",
	},
	{
		ques: "What is the cost to use the app?",
		ans: "We want Medibank to be accessible to everyone without a huge financial impact. The exact pricing is still under review, but rest assured we will keep it as low as possible mainly to cover the costs associated with the upkeep and maintenance of such a huge system.",
	},
	{
		ques: "How long is the data stored?",
		ans: "Data on Medibank is stored indefinitely; however, access is only available with an active membership. If users decide to stop using the app at any point, they can download their data.",
	},
	{
		ques: "What happens to my data if I stop using the app?",
		ans: "We will notify users well in advance when their membership is due for renewal. If a user decides to discontinue their membership, they will have 60 days to download their data. A further 30-day buffer can be provided upon request, after which the data will be removed from our systems.",
	},
];

const Faq = () => {
	const [showAllQuestions, setShowAllQuestions] = React.useState(false);
	const sectionRef = useRef(null);

	useEffect(() => {
		return createGsapContext(sectionRef, (gsap) => {
			gsap.fromTo(
				".faq-heading",
				{ y: 24, opacity: 0 },
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
				".faq-item",
				{ y: 16, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.7,
					ease: "power2.out",
					stagger: 0.08,
					scrollTrigger: {
						trigger: ".faq-list",
						start: "top 80%",
					},
				}
			);
		});
	}, []);
	return (
		<div ref={sectionRef} className="bg-white py-16">
			<div className="container mx-auto">
				<h2
					className="faq-heading"
					style={{
						fontSize: "50px",
						fontWeight: "400",
						lineHeight: "63px",
						textAlign: "center",
						textUnderlinePosition: "from-font",
						textDecorationSkipInk: "none",
					}}
				>
					Frequently Asked Questions
				</h2>

				<div className="faq-list md:w-3/4 mx-auto">
					{data
						.slice(0, showAllQuestions ? data.length : 5)
						.map((item, index) => (
							<div key={index} className="faq-item">
								<Accordion
									index={index}
									ques={item.ques}
									ans={item.ans}
								/>
							</div>
						))}

					{data.length > 5 && (
						<button
							className="faq-item text-blue-500 font-semibold text-sm"
							onClick={() => setShowAllQuestions(!showAllQuestions)}
						>
							{showAllQuestions ? "Show less" : "Show more"}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Faq;
