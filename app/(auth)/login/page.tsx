import FormHeading from "@/components/ui/Form/FormHeading";
import React from "react";
import LoginForm from "../../../components/Login/LoginForm";
import FormFooter from "@/components/ui/Form/FormFooter";
import { redirect } from "next/navigation";
const Login = () => {
  const directToDashboard = async () => {
    "use server";
    redirect("/dashboard");
  };
  return (
    <div>
      <FormHeading title="Welcome Back" />
      <LoginForm />
      <FormFooter
        clickFunction={directToDashboard}
        buttonText="Log In"
        showExtraText={true}
      />
    </div>
  );
};

export default Login;
