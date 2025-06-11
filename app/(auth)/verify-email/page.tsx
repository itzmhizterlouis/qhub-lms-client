"use client"
import FormHeading from "@/components/ui/Form/FormHeading";
import React from "react";
import VerifyForm from "../../../components/Verify-email/VerifyForm";
import { useRouter, useSearchParams } from "next/navigation";

const VerifyEmail = () => {
 const searchParams = useSearchParams();
  const userId = searchParams.get("user");
  const router = useRouter();
  if (!userId) {
    router.push('/register');
  }
  return (
    <div>
      <FormHeading title="Verify Your Email" />
      <p className="max-w-[280px] mx-auto sm:max-w-xs my-4 text-center max-sm:text-sm">
        Please check your email for a 6 digits code and enter the code in the
        box below
      </p>
      <VerifyForm userId={userId} />
     
    </div>
  );
};

export default VerifyEmail;
