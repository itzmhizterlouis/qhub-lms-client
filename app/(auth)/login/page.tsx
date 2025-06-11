"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation"; // Assuming you're using Next.js 13+
import FormHeading from "@/components/ui/Form/FormHeading";
import LoginForm from "../../../components/Login/LoginForm";
import FormFooter from "@/components/ui/Form/FormFooter";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/lib/graphql";

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [loginInput, { loading }] = useMutation(
      LOGIN
    );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // Reset error if both fields are filled
    setError(null);

  
    try {
      const { data } = await loginInput({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      toast.success("Login successful!");

      await fetch("/api/set-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: data.login.accessToken,
          email: data.login.user.email,
          firstName: data.login.user.firstName,
          lastName: data.login.user.lastName,
          role: data.login.user.role,
        }),
      });

      router.push(`/dashboard`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-full">
      <FormHeading title="Welcome Back" />
      <LoginForm emailRef={emailRef} passwordRef={passwordRef} />
      <FormFooter loading={loading} buttonText="Log In" error={error} showExtraText={true} />
    </form>
  );
};

export default Login;
