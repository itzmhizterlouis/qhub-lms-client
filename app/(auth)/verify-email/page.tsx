
import FormHeading from "@/components/ui/Form/FormHeading";
import React from "react";
import VerifyForm from "../../../components/Verify-email/VerifyForm";
import FormFooter from "@/components/ui/Form/FormFooter";
import useVerifyForm from "@/hooks/useVerifyForm";
const VerifyEmail = () => {
 
  return (
    <div>
      <FormHeading title="Verify Your Email" />
      <p className="max-w-xs my-4 text-center">
        Please check your email for a 6 digits code and enter the code in the
        box below
      </p>
      <VerifyForm />
     
    </div>
  );
};

export default VerifyEmail;
