"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiArrowUpRight } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const data = [
    { url: "/", name: "Home" },
    { url: "/doctors/", name: "For Doctors" },
    { url: "/users/", name: "For Users" },
    { url: "/ice", name: "ICE" },
    { url: "/partners/", name: "Partners" },
    { url: "/resources", name: "Resources" },
    { url: "/about", name: "About Us" },
    { url: "/blog", name: "Blog" },
  ];

  const loginLinks = [
    {
      name: "Doctor",
      url: "https://doctor-portal-c4qbq7eraq-el.a.run.app",
    },
    {
      name: "User",
      url: "https://patient-web-c4qbq7eraq-el.a.run.app",
    },
  ];

  // Exact match for main pages
  const normalize = (p) =>
    p.endsWith("/") && p !== "/" ? p.slice(0, -1) : p;

  const isActive = (url) => {
    const current = normalize(pathname);
    const target = normalize(url);

    // "/" should only be active on exact home
    if (target === "/") return current === "/";

    // For others: active if same page OR inside that section
    return current === target || current.startsWith(target + "/");
  };

  const activeText =
    "bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(168,85,247,0.35)]";

  const inactiveText = "text-[#282672] hover:opacity-70";

  const ActivePrefixIcon = ({ isActiveLink }) =>
    isActiveLink ? <FiArrowRight size={16} aria-hidden="true" /> : null;

  return (
    <header
      className="
        sticky z-50 w-[95%] max-w-[1320px] mx-auto
        top-2
        md:!fixed md:top-4 md:left-1/2 md:-translate-x-1/2
      "
    >
      {/* pill conatainer */}
      <div
        className="
          bg-white/70 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)]
          border border-white/60 gap-2
          rounded-[18px] md:rounded-[50px]
        "
      >
        {/* items container */}
        <div className="flex items-center px-4 md:px-10 h-[64px] md:h-[72px]">
          <a href="/" className="flex items-center gap-2">
            <Image
              src="/images/ml_logo.png"
              alt="Medibank Logo"
              width={110}
              height={40}
              className="h-auto w-[96px] md:w-[110px]"
              priority
            />
          </a>

          {/* desktop menu */}
          <nav className="hidden lg:flex items-center ml-auto gap-6 text-[15px] font-semibold xl:gap-8 2xl:gap-10">
            {/* Home */}
            <a
              href="/"
              className={`group flex items-center gap-1 transition-all ${
                isActive("/") ? activeText : inactiveText
              }`}
            >
              <ActivePrefixIcon isActiveLink={isActive("/")} />
              Home
              <FiArrowUpRight
                size={18}
                className="transition-transform duration-200 group-hover:rotate-45"
              />
            </a>

            {/* For Doctors */}
            <a
              href="/doctors"
              className={`group flex items-center gap-1 transition-all ${
                isActive("/doctors") ? activeText : inactiveText
              }`}
            >
              <ActivePrefixIcon isActiveLink={isActive("/doctors")} />
              For Doctors
              <FiArrowUpRight
                size={18}
                className="transition-transform duration-200 group-hover:rotate-45"
              />
            </a>

            {/* For Users */}
            <a
              href="/users"
              className={`group flex items-center gap-1 transition-all ${
                isActive("/users") ? activeText : inactiveText
              }`}
            >
              <ActivePrefixIcon isActiveLink={isActive("/users")} />
              For Users
              <FiArrowUpRight
                size={18}
                className="transition-transform duration-200 group-hover:rotate-45"
              />
            </a>

            {/* ICE */}
            <a
              href="/ice"
              className={`group flex items-center gap-1 transition-all ${
                isActive("/ice") ? activeText : inactiveText
              }`}
            >
              <ActivePrefixIcon isActiveLink={isActive("/ice")} />
              ICE
              <FiArrowUpRight
                size={18}
                className="transition-transform duration-200 group-hover:rotate-45"
              />
            </a>

            {/* Partners */}
            {/* <a
              href="/partners"
              className={`group flex items-center gap-1 transition-all ${
                isActive("/partners") ? activeText : inactiveText
              }`}
            >
              <ActivePrefixIcon isActiveLink={isActive("/partners")} />
              Partners
              <FiArrowUpRight
                size={18}
                className="transition-transform duration-200 group-hover:rotate-45"
              />
            </a> */}

            {/* Resources dropdown */}
            <div className="relative group">
              <a
                href="/resources"
                className={`group flex items-center gap-1 transition-all ${
                  isActive("/resources") ? activeText : inactiveText
                }`}
              >
                <ActivePrefixIcon isActiveLink={isActive("/resources")} />
                Resources
                <FiArrowUpRight
                  size={18}
                  className="transition-transform duration-200 group-hover:rotate-45"
                />
              </a>

              <div className="absolute left-0 top-full hidden group-hover:block group-focus-within:block w-[160px] rounded-2xl bg-white shadow-xl border p-3">
                <a
                  className="block rounded-xl px-2 py-2 hover:bg-gray-50 text-[#282672]"
                  href="/resources#abha-abdm"
                >
                  ABHA / ABDM
                </a>
                <a
                  className="block rounded-xl px-2 py-2 hover:bg-gray-50 text-[#282672]"
                  href="/resources#health-guides"
                >
                  Health Guides
                </a>
                <a
                  className="block rounded-xl px-2 py-2 hover:bg-gray-50 text-[#282672]"
                  href="/resources#blogs"
                >
                  Blog
                </a>
                <a
                  className="block rounded-xl px-2 py-2 hover:bg-gray-50 text-[#282672]"
                  href="/resources#privacy-policy"
                >
                  Privacy policy
                </a>
              </div>
            </div>

            {/* About dropdown */}
            <div className="relative group">
              <a
                href="/about"
                className={`group flex items-center gap-1 transition-all ${
                  isActive("/about") ? activeText : inactiveText
                }`}
              >
                <ActivePrefixIcon isActiveLink={isActive("/about")} />
                About Us
                <FiArrowUpRight
                  size={18}
                  className="transition-transform duration-200 group-hover:rotate-45"
                />
              </a>

              <div className="absolute right-0 top-full hidden group-hover:block group-focus-within:block w-[130px] rounded-2xl bg-white shadow-xl border p-3">
                <a
                  className="block rounded-xl px-2 py-2 hover:bg-gray-50 text-[#282672]"
                  href="/about#about1"
                >
                  Our Story
                </a>
                <a
                  className="block rounded-xl px-2 py-2 hover:bg-gray-50 text-[#282672]"
                  href="/about#about2"
                >
                  Our Team
                </a>
                <a
                  className="block rounded-xl px-2 py-2 hover:bg-gray-50 text-[#282672]"
                  href="/about#about3"
                >
                  Careers
                </a>
                <a
                  className="block rounded-xl px-2 py-2 hover:bg-gray-50 text-[#282672]"
                  href="/about#about4"
                >
                  Contact Us
                </a>
              </div>
            </div>

            {/* Blog */}
            {/* <a
              href="/blog"
              className={`group flex items-center gap-1 transition-all ${
                isActive("/blog") ? activeText : inactiveText
              }`}
            >
              <ActivePrefixIcon isActiveLink={isActive("/blog")} />
              Blog
              <FiArrowUpRight
                size={18}
                className="transition-transform duration-200 group-hover:rotate-45"
              />
            </a> */}

            {/* Login dropdown */}
            <div className="relative group">
              <button
                type="button"
                className={`group flex items-center gap-1 transition-all ${inactiveText}`}
                aria-haspopup="true"
              >
                Login
                <FiArrowUpRight
                  size={18}
                  className="transition-transform duration-200 group-hover:rotate-45"
                />
              </button>

              <div className="absolute right-0 top-full hidden group-hover:block group-focus-within:block w-[150px] rounded-2xl bg-white shadow-xl border p-3">
                {loginLinks.map((link) => (
                  <a
                    key={link.name}
                    className="block rounded-xl px-3 py-2 text-center hover:bg-gray-50 text-[#282672]"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </nav>

          {/* mobile menu button */}
          <button
            className="lg:hidden ml-auto text-[32px] text-[#1d4ed8] px-2"
            onClick={() => setIsMobileMenuOpen((s) => !s)}
            aria-label="Open menu"
          >
            {isMobileMenuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-[520px] pb-2 md:pb-4" : "max-h-0"
          }`}
        >
          <div className="px-2 md:px-4 flex flex-col gap-2">
            {data
              .filter((i) => i.url !== "/blog")
              .map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`rounded-2xl border px-4 py-3 font-semibold transition-all ${
                    isActive(item.url)
                      ? `bg-white ${activeText} border-indigo-300`
                      : "bg-white text-[#282672]"
                  }`}
                >
                  {item.name}
                </a>
              ))}

            <div className="rounded-2xl border bg-white px-4 py-3">
              <p className="mb-3 font-semibold text-[#282672]">Login</p>
              <div className="grid grid-cols-2 gap-3">
                {loginLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-xl border border-indigo-100 px-4 py-2 text-center font-semibold text-[#282672] transition-all hover:bg-gray-50"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
