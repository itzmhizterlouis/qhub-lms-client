"use client";
import FormHeading from "@/components/ui/Form/FormHeading";
import React, { useState } from "react";
import LoginForm from "../../../components/Login/LoginForm";
import FormFooter from "@/components/ui/Form/FormFooter";

const Login = () => {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleSubmit = async (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (loginInput.email === "" || loginInput.password === "") {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    setLoginInput({ email: "", password: "" });
    window.location.href = "/dashboard";
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormHeading title="Welcome Back" />
      <LoginForm loginInput={loginInput} setLoginInput={setLoginInput} />
      <FormFooter buttonText="Log In" error={error} showExtraText={true} />
    </form>
  );
};

export default Login;
