"use client";
import FormHeading from "@/components/ui/Form/FormHeading";
import RegisterForm from "@/components/Register/RegisterForm";
import React, { useState } from "react";
import FormFooter from "@/components/ui/Form/FormFooter";

const Register = () => {
  const [registerInput, setRegisterInput] = useState({
    name: "",
    email: "",
    category: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (registerInput.password !== registerInput.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (
      registerInput.name === "" ||
      registerInput.email === "" ||
      registerInput.category === "" ||
      registerInput.password === "" ||
      registerInput.confirmPassword === ""
    ) {
      setError("All fields are required");
      return;
    }
    setError("");
    setRegisterInput({
      name: "",
      email: "",
      category: "",
      password: "",
      confirmPassword: "",
    });
    window.location.href = "/verify-email";
  };
  return (
    <form className="w-[450px]" onSubmit={handleSubmit}>
      <FormHeading title="Register an Organization" />
      <RegisterForm
        registerInput={registerInput}
        setRegisterInput={setRegisterInput}
      />
      <FormFooter
        error={error}
        buttonText="Sign Up"
        isSignUp={true}
        showExtraText={true}
      />
    </form>
  );
};

export default Register;
