import React from "react";
import Image from "next/image";
import ContactUs from "@/components/ContactUs";

export default function Page() {
	const founderData = [
		{
			Name: "Adi Vangveti",
			Designation: "CEO & Founder",
			Details:
				"Adi is an Australian expat of Indian origin, with nearly two decades of expertise in Business Development, Risk Management, and operations mainly with Australia’s most prominent banking and financial services organisations. He is renowned for his ability to establish and scale profitable business operations, forging strategic partnerships and streamlining business processes. Now, as the founder and CEO of Medibank, Adi’s goal is to drive innovation in India’s healthcare ecosystem by spearheading the development of the nation’s first patient-centric Electronic Health Record (EHR) platform.",
			imgurl: "/images/founders/adi-main.png",
		},
		{
			Name: "Dr. Srinivas K",
			Designation: "Chief Health Officer",
			Details:
				"Dr. Srinivas Kunku is a highly reputed, accomplished and award-winning ENT Surgeon and Otorhinolaryngologist with nearly two decades of clinical and surgical expertise. Currently anchoring advanced ENT care at SPARSH, Manipal & Cavalier Hospitals in Bangalore, Dr. Kunku also completed prestigious international fellowships in Micro Ear Surgery, Rhinoplasty, and FESS across Singapore, South Korea and alongside specialised training at the Tata Memorial Hospital. Known for his pioneering approach to patient-centric care and advanced surgical interventions, he has established a reputation as one of the region’s top specialists in both adult and paediatric otolaryngology which also netted him several accolades.",
			imgurl: "/images/founders/drsri.png",
		},
		{
			Name: "Murali Krishna",
			Designation: "Project Manager",
			Details:
				"Murali Krishna Kesapragada is a seasoned technology leader and Founder of Ivety Solutions, with expertise in algorithms, data science, machine learning, and product management. With over two decades of experience across Wipro, Satyam, and Operative, he specializes in AdTech, MarTech, cloud platforms, and building scalable, data-driven solutions.",
			imgurl: "/images/founders/murali1.png",
		},
		{
			Name: "Aman Dwivedi",
			Designation: "Sr. Full Stack Developer",
			Details:
				"Aman Dwivedi is a Sr. full-stack developer and Gen AI developer building scalable SaaS platforms. Skilled in Next.js, Node.js, Prisma, and cloud infrastructure, he specializes in multi-tenant architectures, automation, and AI-driven solutions, with a strong emphasis on performance, UI/UX precision, and product innovation for Indian markets.",
			imgurl: "/images/founders/aman-main.png",
		},
		{
			Name: "Deepthi Murikipudi",
			Designation: "AI/ML Engineer",
			Details:
				"Deepthi Murikipudi is an AI/ML engineer with expertise in quantitative research, algorithmic trading, and financial analytics. Skilled in Python, PyTorch, and data pipelines. She is particularly focused on healthtech in AI. She has been working on Medical data processing and Medical data diagnosis workflow flow.",
			imgurl: "/images/founders/deepthi.png",
		},
		{
			Name: "Meet Mathukiya",
			Designation: "Sr. App Developer",
			Details:
				"Meet Mathukiya is a Senior Flutter Developer specializing in cross-platform applications across Android, iOS, Web, and Windows. Proficient in GetX, Firebase, FCM, and REST API integration, he delivers scalable, high-performance apps with strong UI/UX focus. With industry experience, he builds reliable, user-centric digital solutions.",
			imgurl: "/images/founders/meet-main.png",
		},
		{
			Name: "D Krishna Kishore",
			Designation: "Head of Corporate Relations",
			Details:
				"D Krishna Kishore is a Senior Healthcare Executive with 20+ years of experience in hospital operations, corporate billing, and business development. Holding an MBA from NMIMS, he spent 14 years leading TPA and credit operations at Yashoda Super Speciality Hospitals. Formerly VP at Sri Visista Health Care, he excels at B2B deals, insurance ecosystems, and scaling healthcare revenue.",
			imgurl: "/images/founders/krishnamedibank.png",
		}
		
		
	];

	const largeFounders = founderData.slice(0, 2);
	const smallFounders = founderData.slice(2);

	const advisoryData = [
		{
			Name: "Dr Navin Bhambhani",
			Details:
				"Dr Navin is a Surgical Oncologist Consultant with more than 2 decades of experience and has special interest in Thoracic & GI Oncology. His focus is on developing the role of Minimal Access Surgery (MAS) including the role of Robotic Surgery in Oncology.",
			imgurl: "/images/doctors/Dr-Navin-B.png",
			Designation: "M.S., D.N.B., M.R.C.S. (Oncology)",
		},
		{
			Name: "Dr Ajay Dave",
			Details:
				"Dr Dave is an Ophthalmologist & Eye Surgeon based in New Delhi and has over 35 years of experience in the field of Ophthalmology. His areas of interest include Corneal Transplant, Cataract Surgeries, and Laser Refractive Surgeries.",
			imgurl: "/images/doctors/Dr-Ajay-D.png",
			Designation: "MBBS, MS – Ophthalmology",
		},
		{
			Name: "Dr Anjali Nagpal",
			Details:
				"Dr Anjali is a Senior Psychiatrist Consultant with over 25 years of experience. Neurobio feedback and diagnosing psychiatric illness using brain mapping is her field of interest. She has been featured as Global Top 50 Mental Health Leader of 2019 and 2020 by ET Now and World Mental Health Congress.",
			imgurl: "/images/doctors/Dr-Anjali-N.png",
			Designation: "MBBS, MD (Psychiatry)",
		},
		{
			Name: "Dr Kartikeya Kohli",
			Details:
				"Dr Kartikeya is a dedicated and highly skilled medical professional with 18 years of experience in Internal Medicine, Immuno-rheumatology and an advanced training in Nephrology. He has presented his research at various national conferences and is also a published author.",
			imgurl: "/images/doctors/Dr-Kartikeya-K.png",
			Designation: "MBBS, DNB - Gen Med, MRCP (UK)",
		},
		{
			Name: "Dr Anupam Bhargava",
			Details:
				"Dr Anupam is a Dentist, Endodontist and Implantologist. He has been in clinical practice since 1996 and has interest in the fields of Endodontics, restorative dentistry, and dental implants.",
			imgurl: "/images/doctors/Dr-Anupam-B.png",
			Designation: "BDS, MDS - Operative Dentistry",
		},
		{
			Name: "Dr Urmi Sanyal",
			Details:
				"Dr Urmi is a Senior Resident at Institute of Psychiatry (IOP), Kolkata. She manages the whole spectrum of mental health problems like Anxiety, PTSD, Depression, Bipolar disorder, Schizophrenia, Autistic Spectrum, Dementia, as well as drug abuse to name a few. She has special interest in Child Psychiatry.",
			imgurl: "/images/doctors/Dr-Urmi-S.png",
			Designation: "MBBS, MD (Psychiatry)",
		},
		{
			Name: "Dr Anurag Agarwal",
			Details:
				"Dr Anurag Agarwal is an ophthalmologist/eye surgeon from Mumbai with over 25 years of experience. His expertise involves canaloplasty, refractive surgery, corneal surgery, cataract surgery, Lasik eye surgery, and general eye surgery.",
			imgurl: "/images/doctors/Dr-Anurag-A.png",
			Designation: "MBBS, MS – Ophthalmology",
		},
		{
			Name: "Dr Khushi Bhambhani",
			Details:
				"With over a decade of experience in healthcare management, Dr Khushi is the Chief Operating Officer at Halani Healthcare in Mumbai. She is also a Consultant Anaesthesiologist and Pain Physician.",
			imgurl: "/images/doctors/Dr-Khushi-B.png",
			Designation: "MBBS, DNB – Anaesthesiology",
		},
	];

	return (
		<div>
			{/* Our Story */}
			<div
				id="about1"
				className="mx-10 md:mx-16 h-max flex flex-col md:flex-row items-center mb-8 md:mb-0 md:pt-[88px]"
			>
				<div className="md:container text-left text-[22px] pt-28 md:pt-16 w-full md:w-1/2">
					<h2
						className="
							relative
							font-bold
							text-[32px]
							text-[#0b137a]

							[-webkit-text-stroke:0.5px_transparent]
							bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_185%)]
							bg-clip-text
							[-webkit-background-clip:text]
						"
						>
						Our Story
					</h2>

					<div className="text-justify text-[15px] text-[#282672] py-8">
						India has witnessed remarkable digital advancements across various
						sectors, yet health records remain largely confined to pen, paper &
						folders, making them difficult to maintain and track. <br />
						<br />
						To bridge this gap and align with the nation&apos;s digitisation
						trend, Medibank was created as India&apos;s first patient-centric
						Electronic Health Record platform. By digitising healthcare records
						and utilising AI to generate health analysis charts of those
						records, Medibank aims to simplify access, streamline communication,
						and improve the overall experience for both patients and doctors,
						ensuring a more efficient and modern approach to healthcare
						management. <br />
						<br />
						We are working towards a healthcare system in India, where citizens
						have the option to visit any healthcare provider or institution in
						any part of the country without the need to carry physical
						medical records. <br />
					</div>
				</div>
				<div className="md:container flex justify-center w-full md:w-1/2">
					<Image
						src="/images/ourstorynew.webp"
						width={500}
						height={200}
						alt="Our Story"
						className="text-center rounded-xl"
					/>
				</div>
			</div>

			{/* Founding Team */}
			{/* <div className="bg-white md:pt-[88px]" id="about2">
				
				<div className="founding-team md:py-4 mx-10 md:mx-16 rounded-[30px] md:bg-[#F6F5FF]">
					<h2
						className="
							relative
							font-bold
							text-[32px]
							text-[#0b137a]
							text-center
							py-16
							[-webkit-text-stroke:0.5px_transparent]
							bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_185%)]
							bg-clip-text
							[-webkit-background-clip:text]
						"
						>
						The Founders
					</h2>

					<div className="flex justify-center gap-6 md:gap-10 items-center flex-wrap">
						{largeFounders.map((item, index) => (
							<div
								key={`large-founder-${index}`}
								className="group relative w-full max-w-[260px] md:max-w-[280px] overflow-hidden rounded-2xl bg-white shadow-sm"
							>
								<div className="relative h-[260px] md:h-[300px] sog_animation group-hover:rotate-y-180">
									<div className="absolute inset-0 backface_hidden overflow-hidden rounded-2xl">
										<Image
											src={item.imgurl}
											className="h-full w-full object-cover"
											width={612}
											height={612}
											alt={item.Name}
										/>
									</div>
									<div className="absolute inset-0 backface_hidden rotate-y-180 rounded-2xl border bg-gradient-to-r from-purple-200 via-purple-100 to-blue-200 text-black overflow-y-auto">
										<p className="p-4 text-[12px] leading-[16px] md:text-[13px] md:leading-[18px]">
											{item.Details}
										</p>
									</div>
								</div>
								<div className="p-4 text-center">
									<h4 className="text-lg font-semibold text-[#1B1B1B]">
										{item.Name}
									</h4>
									<p className="text-sm text-[#4C4C6D]">{item.Designation}</p>
								</div>
							</div>
						))}
					</div>
					<h2
						className="
							relative
							font-bold
							text-[32px]
							text-[#0b137a]
							text-center
							mt-8
							py-8
							[-webkit-text-stroke:0.5px_transparent]
							bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_185%)]
							bg-clip-text
							[-webkit-background-clip:text]
						"
						>
						The team that built MediBank
					</h2>
					{smallFounders.length > 0 && (
						<div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
							{smallFounders.map((item, index) => (
							<div
								key={`small-founder-${index}`}
								className="group relative w-full overflow-hidden rounded-2xl bg-white shadow-sm"
							>
								<div className="relative aspect-square w-full sog_animation group-hover:rotate-y-180">
									<div className="absolute inset-0 backface_hidden overflow-hidden rounded-2xl">
										<Image
											src={item.imgurl}
											className="h-full w-full object-cover"
											width={612}
											height={912}
											alt={item.Name}
										/>
									</div>
									<div className="absolute inset-0 backface_hidden rotate-y-180 rounded-2xl border bg-gradient-to-r from-purple-200 via-purple-100 to-blue-200 text-black overflow-y-auto">
										<p className="p-4 text-[12px] leading-[16px] md:text-[13px] md:leading-[18px]">
											{item.Details}
										</p>
									</div>
								</div>
								<div className="p-3 text-center">
									<h4 className="text-base font-semibold text-[#1B1B1B]">
										{item.Name}
									</h4>
									<p className="text-xs text-[#4C4C6D]">{item.Designation}</p>
								</div>
							</div>
							))}
						</div>
					)}
				</div>
			</div>*/}

			{/* Advisory Panel */}
			{/* <div className="bg-white">
				<div className="w-4/5 container py-16 pb-0">
					<div className="relative
							font-bold
							text-[32px]
							text-[#0b137a]
							text-center
							py-16
							[-webkit-text-stroke:0.5px_transparent]
							bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_185%)]
							bg-clip-text
							[-webkit-background-clip:text]">
						Advisory Panel
					</div>
					<div className="flex justify-around items-center flex-col md:flex-row w-full flex-wrap">
						{advisoryData.map((item, index) => {
							return (
								<div
									key={index}
									className="group w-full md:w-1/6 md:mx-1 mb-2 md:my-4 bg-white rounded-[10px]"
								>
									<div className="relative  h-56 sog_animation group-hover:rotate-y-180">
										<div className="absolute top-0 bottom-0 w-full h-full backface_hidden overflow-hidden rounded-[10px]">
											{" "}
											<Image
												src={item.imgurl}
												className=" rounded-[10px]"
												width="400"
												height="400"
												alt="profile-picture"
											/>
										</div>
										<div className=" absolute rounded-[10px] top-0 bottom-0 w-full h-full backface_hidden rotate-y-180 bg-gradient-to-r from-purple-200 via-purple-100 to-blue-200 border text-black">
											{" "}
											<p className="p-4 text-[13px] leading-[16px]">
												{item.Details}
											</p>
										</div>
									</div>
									<div className="text-center">{item.Name}</div>
									<div className="text-center text-[12px] py-2">
										{item.Designation}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div> */}

			{/* Doctors who helped us */}
			<div className="bg-white">
				<div className="w-4/5 container py-16 pb-0">
					<div className="relative
							font-bold
							text-[32px]
							text-[#0b137a]
							text-center
							py-16
							[-webkit-text-stroke:0.5px_transparent]
							bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_185%)]
							bg-clip-text
							[-webkit-background-clip:text]">
						The Doctors who helped us initially
					</div>
					<div className="flex justify-around items-center flex-col md:flex-row w-full flex-wrap">
						{advisoryData.map((item, index) => {
							return (
								<div
									key={index}
									className="group w-full md:w-1/5 md:mx-1 mb-2 md:my-4 bg-white rounded-[10px]"
								>
									<div className="relative  h-56 sog_animation group-hover:rotate-y-180">
										<div className="absolute top-0 bottom-0 w-full h-full backface_hidden overflow-hidden rounded-[10px]">
											{" "}
											<Image
												src={item.imgurl}
												className=" rounded-[10px]"
												width="400"
												height="400"
												alt="profile-picture"
											/>
										</div>
										<div className=" absolute rounded-[10px] top-0 bottom-0 w-full h-full backface_hidden rotate-y-180 bg-gradient-to-r from-purple-200 via-purple-100 to-blue-200 border text-black">
											{" "}
											{/* "Backcard (remove this line when make this section line)" */}
											<p className="p-4 text-[13px] leading-[16px]">
												{item.Details}
											</p>
										</div>
									</div>
									<div className="text-center">{item.Name}</div>
									<div className="text-center text-[12px] py-2">
										{item.Designation}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Careers */}
			<div id="about3" className="bg-white md:pt-[88px]">
				
				<div className="w-4/5 rounded-3xl container py-10 mt-6 bg-[#0b137a]">
					<div className="text-center text-white text-[28px] md:text-[48px] font-bold">
						Careers
					</div>
					<div className="text-center text-white md:text-[20px]">
						If you&apos;re passionate about joining our team and believe
						you&apos;d be a great fit, we&apos;d love to hear from you! Please
						send your resume to{" "}
						<a href="mailto:careers@medibank.in" className="text-white-600 bold italic underline">
							careers@medibank.in
						</a>
						, and let&apos;s explore the exciting opportunities together.
					</div>
				</div>
			</div>

			{/* Contact Us */}
			<div id="about4" className="bg-white md:pt-[88px] pb-12">
				<div className="mx-6 md:mx-16 p-6 md:p-8">
					<h2 className="text-center text-[36px] leading-tight font-bold text-[#12127A] mb-8">
						Get in Touch!
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
						<div>
							<ContactUs variant="about" showTitle={false} />
						</div>
						<div className="w-full">
							<iframe
								className="w-full h-[340px] md:h-[392px] rounded-3xl border border-[#E5E5EF]"
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.387854022113!2d78.37834407493604!3d17.44114078345521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93547b7c9039%3A0x852fa9e76e4ca65!2sWeWork%20Raheja%20Mindspace%20-%20Coworking%20%26%20Office%20Space%20in%20Madhpur%2C%20Hyderabad!5e0!3m2!1sen!2sin!4v1771228558321!5m2!1sen!2sin"
								width="auto"
								height="450"
								allowFullScreen=""
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							></iframe>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
