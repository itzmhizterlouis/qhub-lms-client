import FormHeading from "@/components/ui/Form/FormHeading";

import RegisterForm from "@/components/Register/RegisterForm";
import React from "react";
import FormFooter from "@/components/ui/Form/FormFooter";
import { redirect } from "next/navigation";
const Register = () => {
  const directToVerifyEmail = async() => {
    "use server";
    redirect("/verify-email");
  };
  return (
    <div className="w-[450px]">
      <FormHeading title="Register an Organization" />
      <RegisterForm />
      <FormFooter
        clickFunction={directToVerifyEmail}
        buttonText="Sign Up"
        isSignUp={true}
        showExtraText={true}
      />
    </div>
  );
};

export default Register;
