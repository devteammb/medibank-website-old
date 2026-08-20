"use client";

import { useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import IcePatientLookupScreens from "@/components/IcePatientLookupScreens";

const doctorSteps = [
  {
    label: "Step 1",
    content: "Enter Credentials",
  },
  {
    label: "Step 2",
    content: (
      <>
        Scan the <span className="font-extrabold">QR Code</span> of patient or
        Enter <span className="font-extrabold">MID</span>
      </>
    ),
  },
  {
    label: "Step 3",
    content:
      "You will be able to see all the medical history of patient with any ongoing consultation he/she is going through.",
  },
];

const dummyIceLogins = {
  Doctor: {
    id: "doctor.ice@medibank.demo",
    password: "Doctor@123",
    pin: "112233",
  },
  Staff: {
    id: "ICE-STAFF-001",
    password: "Staff@123",
    pin: "445566",
  },
};

const modes = {
  password: {
    secretLabel: "Password",
    secretName: "password",
    secretPlaceholder: "••••••••••••",
    forgotText: "Forgot Password ?",
    submitText: "Submit",
    prompt: "Don’t have account? Sign Up",
    actionText: "Login with PIN",
    nextMode: "pin",
  },
  pin: {
    secretLabel: "Pin",
    secretName: "pin",
    secretPlaceholder: "••••••••••",
    forgotText: "Forgot Pin ?",
    submitText: "Submit",
    prompt: "Don’t have PIN? Create Now",
    actionText: "Login with ID, Password",
    nextMode: "password",
  },
  createPin: {
    secretLabel: "Pin",
    secretName: "pin",
    secretPlaceholder: "••••••••••",
    confirmLabel: "Confirm your PIN",
    submitText: "Create Pin",
    actionText: "Login with ID, Password",
    nextMode: "password",
  },
};

function PasswordInput({ id, label, name, placeholder, value, onChange }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[12px] font-extrabold text-[#071f9f] sm:text-[13px]"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type="password"
          required
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="h-[46px] w-full rounded-[7px] border border-[#cbd1f4] bg-white px-4 pr-11 text-[13px] font-medium text-[#071f9f] outline-none transition placeholder:text-[#a9b2e4] focus:border-[#3d4ed8] focus:ring-4 focus:ring-[#d6dbff]/70 sm:h-[50px]"
        />
        <FiEyeOff
          aria-hidden="true"
          className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#071f9f]"
        />
      </div>
    </div>
  );
}

export default function DoctorIceLoginForm({
  userType = "Doctor",
  onLoginSuccess,
}) {
  const [mode, setMode] = useState("password");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formValues, setFormValues] = useState({
    loginId: "",
    password: "",
    pin: "",
    confirmPin: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const currentMode = modes[mode];
  const normalizedUserType = userType === "Staff" ? "Staff" : "Doctor";
  const loginId = normalizedUserType.toLowerCase();
  const dummyLogin = dummyIceLogins[normalizedUserType];

  const updateField = (field) => (event) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: event.target.value,
    }));
    setErrorMessage("");
  };

  const fillDummyCredentials = () => {
    setFormValues({
      loginId: dummyLogin.id,
      password: dummyLogin.password,
      pin: dummyLogin.pin,
      confirmPin: dummyLogin.pin,
    });
    setErrorMessage("");
  };

  const completeDummyLogin = () => {
    fillDummyCredentials();
    onLoginSuccess?.(normalizedUserType);
    setIsLoggedIn(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredSecret =
      mode === "password" ? formValues.password : formValues.pin;
    const expectedSecret =
      mode === "password" ? dummyLogin.password : dummyLogin.pin;
    const isCreatePinValid =
      mode !== "createPin" || formValues.confirmPin === dummyLogin.pin;

    if (
      formValues.loginId === dummyLogin.id &&
      enteredSecret === expectedSecret &&
      isCreatePinValid
    ) {
      onLoginSuccess?.(normalizedUserType);
      setIsLoggedIn(true);
      return;
    }

    setErrorMessage(
      `Use the dummy ${normalizedUserType.toLowerCase()} credentials shown below, or click Bypass ICE Login.`,
    );
  };

  const handleModeToggle = () => {
    setMode(currentMode.nextMode);
    setErrorMessage("");
  };

  const handleCreatePin = () => {
    setMode("createPin");
    setErrorMessage("");
  };

  if (isLoggedIn) {
    return (
      <div className="mt-8">
        <IcePatientLookupScreens userType={normalizedUserType} />
      </div>
    );
  }

  return (
    <>
      <form className="mt-9 space-y-4 sm:mt-10" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor={`${loginId}-id`}
            className="mb-2 block text-[12px] font-extrabold text-[#071f9f] sm:text-[13px]"
          >
            {normalizedUserType} ID
          </label>
          <input
            id={`${loginId}-id`}
            name={`${loginId}Id`}
            type={normalizedUserType === "Staff" ? "text" : "email"}
            required
            autoComplete="username"
            value={formValues.loginId}
            onChange={updateField("loginId")}
            placeholder={
              normalizedUserType === "Staff"
                ? "Enter Staff ID"
                : "doctor@gmail.com"
            }
            className="h-[46px] w-full rounded-[7px] border border-[#cbd1f4] bg-white px-4 text-[13px] font-medium text-[#071f9f] outline-none transition placeholder:text-[#a9b2e4] focus:border-[#3d4ed8] focus:ring-4 focus:ring-[#d6dbff]/70 sm:h-[50px]"
          />
        </div>

        <PasswordInput
          id={`${loginId}-${currentMode.secretName}`}
          label={currentMode.secretLabel}
          name={currentMode.secretName}
          placeholder={currentMode.secretPlaceholder}
          value={formValues[currentMode.secretName]}
          onChange={updateField(currentMode.secretName)}
        />

        {mode === "createPin" ? (
          <PasswordInput
            id={`${loginId}-confirm-pin`}
            label={currentMode.confirmLabel}
            name="confirmPin"
            placeholder="••••••••••"
            value={formValues.confirmPin}
            onChange={updateField("confirmPin")}
          />
        ) : (
          <button
            type="button"
            className="ml-auto block text-[10px] font-extrabold text-[#071f9f] transition hover:text-[#a2028f]"
          >
            {currentMode.forgotText}
          </button>
        )}

        {errorMessage ? (
          <p className="rounded-xl border border-[#ffd8df] bg-[#fff3f5] px-4 py-3 text-left text-[12px] font-bold leading-snug text-[#e0273e]">
            {errorMessage}
          </p>
        ) : null}

        <div className="relative pt-3">
          <button
            type="submit"
            className="h-[47px] w-full rounded-[18px] bg-gradient-to-b from-[#a2028f] to-[#0e1896] text-[16px] font-extrabold text-white shadow-[0_16px_28px_rgba(14,24,150,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_34px_rgba(14,24,150,0.28)] focus:outline-none focus:ring-4 focus:ring-[#d6dbff] sm:h-[51px]"
          >
            {currentMode.submitText}
          </button>
        </div>
      </form>

      <div className="mt-5 rounded-[18px] border border-[#d6dbff] bg-[#f7f8ff] p-4 text-left shadow-[0_14px_28px_rgba(14,24,150,0.08)]">
        <p className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#a2028f]">
          Dummy ICE bypass login
        </p>
        <div className="mt-3 space-y-1.5 text-[12px] font-bold text-[#071f9f]">
          <p>
            ID: <span className="font-extrabold">{dummyLogin.id}</span>
          </p>
          <p>
            Password:{" "}
            <span className="font-extrabold">{dummyLogin.password}</span>
          </p>
          <p>
            PIN: <span className="font-extrabold">{dummyLogin.pin}</span>
          </p>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={fillDummyCredentials}
            className="h-11 rounded-[14px] border border-[#071f9f] bg-white text-[12px] font-extrabold text-[#071f9f] transition hover:bg-[#eef1ff] focus:outline-none focus:ring-4 focus:ring-[#d6dbff]"
          >
            Fill Dummy Login
          </button>
          <button
            type="button"
            onClick={completeDummyLogin}
            className="h-11 rounded-[14px] bg-gradient-to-b from-[#a2028f] to-[#0e1896] text-[12px] font-extrabold text-white shadow-[0_12px_22px_rgba(14,24,150,0.22)] transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#d6dbff]"
          >
            Bypass ICE Login
          </button>
        </div>
      </div>

      <div className="mt-5 text-center">
        {currentMode.prompt ? (
          <button
            type="button"
            onClick={mode === "pin" ? handleCreatePin : undefined}
            className="text-[11px] font-extrabold italic text-[#071f9f] transition hover:text-[#a2028f]"
          >
            {currentMode.prompt}
          </button>
        ) : null}

        <div className="mt-5 flex items-center gap-3 text-[15px] font-extrabold text-[#071f9f]">
          <span className="h-px flex-1 bg-[#8a98dc]" />
          OR
          <span className="h-px flex-1 bg-[#8a98dc]" />
        </div>

        <button
          type="button"
          onClick={handleModeToggle}
          className="mt-4 text-[13px] font-extrabold italic text-[#071f9f] underline underline-offset-2 transition hover:text-[#a2028f]"
        >
          {currentMode.actionText}
        </button>
      </div>

      <div className="mt-9 rounded-[20px] border border-[#e8c2ed] bg-white px-5 py-7 shadow-[0_18px_50px_rgba(14,24,150,0.06)] sm:px-7 sm:py-8">
        <h2 className="text-center text-[18px] font-extrabold text-[#071f9f] sm:text-[20px]">
          How it works?
        </h2>

        <div className="mt-7 space-y-7 sm:mt-8 sm:space-y-8">
          {doctorSteps.map((step) => (
            <div
              key={step.label}
              className="grid grid-cols-[82px_1fr] items-start gap-3 text-[#071f9f] sm:grid-cols-[96px_1fr] sm:gap-4"
            >
              <span className="inline-flex h-[30px] items-center justify-center rounded-full bg-[#0e2aa9] px-4 text-[10px] font-extrabold text-white shadow-[0_10px_20px_rgba(14,42,169,0.16)] sm:h-[34px] sm:px-5 sm:text-[12px]">
                {step.label}
              </span>
              <p className="min-h-[30px] pt-[5px] text-[12px] font-medium leading-[1.12] sm:min-h-[34px] sm:pt-[6px] sm:text-[15px]">
                {step.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
