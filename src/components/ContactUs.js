"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactUs({ variant = "default", showTitle = true }) {
  const form = useRef();
  const [Status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const isAboutVariant = variant === "about";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      validateForm(updatedData);
      return updatedData;
    });
  };

  const validateForm = (data) => {
    const isValid = data.user_name && data.user_email && data.message;
    setIsFormValid(isValid);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_aczee3c", "template_ei9und1", form.current, {
        publicKey: "3-ylVZWMmQV166aWN",
      })
      .then(
        () => {
          form.current.reset();
          setFormData({ user_name: "", user_email: "", message: "" });
          setIsFormValid(false);
          setStatus("Message Sent Successfully.");
          setTimeout(() => {
            setStatus("");
          }, 3000);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div
      className={`flex flex-col justify-center w-full ${
        isAboutVariant ? "items-start" : "items-center"
      }`}
    >
      {showTitle && (
        <h1 className="text-center text-[28px] md:text-[48px] font-bold mb-8">
          Get in Touch!
        </h1>
      )}
      <form
        ref={form}
        onSubmit={sendEmail}
        className={`flex flex-col w-full ${
          isAboutVariant ? "items-start" : "items-center"
        }`}
      >
        <div className="flex flex-col md:flex-row w-full gap-4 mb-6">
          <div className="flex-1">
            <label
              className={`block mb-2 ${
                isAboutVariant
                  ? "text-[22px] leading-none text-[#1A1A5E] font-medium"
                  : "text-sm font-medium"
              }`}
            >
              Name
            </label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              placeholder={isAboutVariant ? "Eg. Ravi Raj" : ""}
              className={`w-full px-4 rounded-xl border border-[#DBDDEA] focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                isAboutVariant
                  ? "h-[50px] bg-white text-[14px] placeholder:text-[#9A9AB3]"
                  : "h-10 bg-gray-200"
              }`}
            />
          </div>
          <div className="flex-1">
            <label
              className={`block mb-2 ${
                isAboutVariant
                  ? "text-[22px] leading-none text-[#1A1A5E] font-medium"
                  : "text-sm font-medium"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              placeholder={isAboutVariant ? "Eg. raviraj@gmail.com" : ""}
              className={`w-full px-4 rounded-xl border border-[#DBDDEA] focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                isAboutVariant
                  ? "h-[50px] bg-white text-[14px] placeholder:text-[#9A9AB3]"
                  : "h-10 bg-gray-200"
              }`}
            />
          </div>
        </div>

        <div className="w-full mb-6">
          <label
            className={`block mb-2 ${
              isAboutVariant
                ? "text-[22px] leading-none text-[#1A1A5E] font-medium"
                : "text-sm font-medium"
            }`}
          >
            Message
          </label>
          <textarea
            className={`w-full px-4 py-4 rounded-xl border border-[#DBDDEA] focus:outline-none focus:ring-2 focus:ring-purple-300 ${
              isAboutVariant
                ? "h-[156px] bg-white text-[14px] placeholder:text-[#9A9AB3]"
                : "h-28 bg-gray-200"
            }`}
            name="message"
            value={formData.message}
            placeholder={
              isAboutVariant
                ? "Please let us know how we can help you!!"
                : "Please leave your mobile number and message."
            }
            onChange={handleChange}
          />
        </div>

        <div className={`w-full ${isAboutVariant ? "text-left" : "text-center"}`}>
          <input
            type="submit"
            value="Submit"
            disabled={!isFormValid}
            className={`h-10 px-6 text-center text-white font-semibold rounded-md ${
              isAboutVariant ? "min-w-[120px]" : "md:w-[20%]"
            } ${
              isFormValid
                ? "bg-purple-600 hover:bg-purple-700 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          />
        </div>
      </form>

      {Status && <p className="mt-4 text-green-600 text-lg font-semibold">{Status}</p>}
    </div>
  );
}
