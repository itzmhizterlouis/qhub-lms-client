"use client"
import Button from "@/components/ui/Button";
import React from "react";
import { FaCheck } from "react-icons/fa";

const Verified = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = "/login";
  };
  return (
    <form className="flex items-center flex-col" onSubmit={handleSubmit}>
      <div className="bg-primary p-6 w-fit rounded-full">
        <FaCheck className="text-6xl text-white" />
      </div>
      <h1 className="text-2xl font-semibold mt-4">Email Verified</h1>
      <p className="max-w-xs my-4 text-center">
        Your email has been verified. Please proceed to login
      </p>
      <Button text="Login" />
    </form>
  );
};

export default Verified;
