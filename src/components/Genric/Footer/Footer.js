import Link from "next/link";
import Image from "next/image";
import { MdAlternateEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";


export default function Footer() {
	return (
		<footer className="relative z-10 bg-white text-[#0D0B4C]">
			<div className="container mx-auto px-6 py-14">
				<div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_0.9fr]">
					<div className="space-y-5">
						<Image
							src="/images/medibank-logo.png"
							alt="MediBank logo"
							width={122}
							height={85}
							loading="lazy"
						/>
						<p className="text-base md:text-[15px] text-[#1D225B] leading-tight max-w-sm">
							India&apos;s First Health Identity Infrastructure. Your complete medical history - secure, portable, and always with you.
						</p>
					</div>

					<div className="space-y-4">
						<h4 className="text-2xl md:text-[20px] font-semibold">Contact Us</h4>

						<ul className="list-none p-0 m-0 space-y-3 text-base md:text-[15px] text-[#1D225B]">
							{/* Email */}
							<li className="flex items-center gap-2.5">
							<MdAlternateEmail size={20} />
							<a
								href="mailto:contact@medibank.in"
								className="hover:text-[#5C4AFF]"
							>
								contact@medibank.in
							</a>
							</li>

							{/* Address */}
							<li className="flex items-center gap-2.5">
							<IoLocationOutline size={20} className="mt-[2px]" />
							<a
								href="https://maps.app.goo.gl/nspnknPVhS5T4skU8"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-[#5C4AFF] leading-relaxed"
							>
								WeWork-Raheja Mindspace,<br/> Building 9, Madhapur,<br/> Hyderabad,
								Telangana 500081
							</a>
							</li>
						</ul>
					</div>

					<div className="space-y-4">
						<h4 className="text-2xl md:text-[20px] font-semibold">Quick Links</h4>
						<ul className="list-disc pl-5 space-y-3 text-base md:text-[15px] text-[#1D225B]">
							<li>
								<Link href="/resources/#resources2" className="hover:text-[#5C4AFF]">
									Health Guides
								</Link>
							</li>
							<li>
								<Link href="/resources/#resources3" className="hover:text-[#5C4AFF]">
									Blog
								</Link>
							</li>
							<li>
								<Link href="/resources/#resources1" className="hover:text-[#5C4AFF]">
									ABHA
								</Link>
							</li>
							<li>
								<Link href="/policy" className="hover:text-[#5C4AFF]">
									Policy
								</Link>
							</li>
							<li>
								<Link href="/about/" className="hover:text-[#5C4AFF]">
									About Us
								</Link>
							</li>
						</ul>
					</div>

					<div className="space-y-4">
						<h4 className="text-2xl md:text-[20px] font-semibold">Follow Us:</h4>
						<div className="flex gap-3">
							<Link
								href="https://linkedin.com/"
								className="flex h-12 w-12 items-center justify-center"
							>
								<Image
									src="/images/LlinkedInMedi.png"
									alt="LinkedIn"
									width={44}
									height={44}
									loading="lazy"
								/>
							</Link>
							<Link
								href="https://www.whatsapp.com/"
								className="flex h-12 w-12 items-center justify-center"
							>
								<Image
									src="/images/fb.png"
									alt="WhatsApp"
									width={44}
									height={44}
									loading="lazy"
								/>
							</Link>
							<Link
								href="https://instagram.com/"
								className="flex h-12 w-12 items-center justify-center"
							>
								<Image
									src="/images/instaMedi.png"
									alt="Instagram"
									width={44}
									height={44}
									loading="lazy"
								/>
							</Link>
							<Link
								href="https://x.com/"
								className="flex h-12 w-12 items-center justify-center"
							>
								<Image
									src="/images/twitter.png"
									alt="Twitter"
									width={44}
									height={44}
									loading="lazy"
								/>
							</Link>
							
						</div>
					</div>
				</div>

				<div className="mt-14 border-t border-[#CDD2E7] pt-6 text-base md:text-[20px] text-[#1D225B] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<p>© 2026 MediBank. All rights reserved.</p>
					<p className="text-sm text-[#1D225B]">
						Made with{" "}
						<span
							className="
							inline-block
							bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)]
							bg-clip-text
							text-transparent
							"
							aria-hidden="true"
						>
							❤
						</span>{" "}
						in India
					</p>

				</div>
			</div>
		</footer>
	);
}
