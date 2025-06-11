"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import FormHeading from "@/components/ui/Form/FormHeading";
import RegisterForm from "@/components/Register/RegisterForm";
import FormFooter from "@/components/ui/Form/FormFooter";
import { useMutation } from "@apollo/client";
import { CREATE_USER_ORGANIZATION } from "@/lib/graphql";
import toast from "react-hot-toast";

const Register = () => {
  const [error, setError] = useState<string | null>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  // const categoryRef = useRef<HTMLSelectElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [createUserOrganizationInput, { loading }] = useMutation(
    CREATE_USER_ORGANIZATION
  );

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const phone = phoneRef.current?.value;
    const email = emailRef.current?.value;
    // const category = categoryRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (!firstName || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Reset error if validation passes
    setError(null);

    try {
      const { data } = await createUserOrganizationInput({
        variables: {
          input: {
            firstName,
            lastName,
            email,
            password,
            phone,
            role: "organizationOwner",
          },
        },
      });
      toast.success("Registration successful! Please verify your email.");
      console.log("Registration successful:", data);

      await fetch("/api/set-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: data.addOrganizationUser.accessToken,
          email: data.addOrganizationUser.email,
          firstName: data.addOrganizationUser.firstName,
          lastName: data.addOrganizationUser.lastName,
          role: data.addOrganizationUser.role,
        }),
      });

      router.push(`/verify-email?user=${data.addOrganizationUser._id}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <form className="w-full" onSubmit={handleRegister}>
      <FormHeading title="Register an Organization" />
      <RegisterForm
        firstNameRef={firstNameRef}
        lastNameRef={lastNameRef}
        emailRef={emailRef}
        phoneRef={phoneRef}
        passwordRef={passwordRef}
        confirmPasswordRef={confirmPasswordRef}
      />
      <FormFooter
        loading={loading}
        error={error}
        buttonText="Sign Up"
        isSignUp={true}
        showExtraText={true}
      />
    </form>
  );
};

export default Register;
