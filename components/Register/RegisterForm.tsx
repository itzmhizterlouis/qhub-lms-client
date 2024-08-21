"use client";
import React, { useState } from "react";
import { Label } from "../ui/Form/Label";
import { Input } from "../ui/Form/Input";
import LabelInputContainer from "../ui/Form/LabelInputContainer";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Password from "./Password";
const RegisterForm = ({
  registerInput,
  setRegisterInput,
}: {
  registerInput: {
    name: string;
    email: string;
    category: string;
    password: string;
    confirmPassword: string;
  };
  setRegisterInput: (registerInput: {
    name: string;
    email: string;
    category: string;
    password: string;
    confirmPassword: string;
  }) => void;
}) => {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInput({ ...registerInput, name: e.target.value });
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInput({ ...registerInput, email: e.target.value });
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegisterInput({ ...registerInput, category: e.target.value });
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInput({ ...registerInput, password: e.target.value });
    setShowConfirmPassword(true);
  };
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegisterInput({ ...registerInput, confirmPassword: e.target.value });
  };

  return (
    <div className="mt-10 ">
      <LabelInputContainer className="my-4">
        <Label htmlFor="name">Organization Name</Label>
        <Input
          id="name"
          placeholder="Dax Inc"
          type="text"
          value={registerInput.name}
          onChange={handleNameChange}
        />
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          placeholder="linkvault@dax.com"
          type="email"
          value={registerInput.email}
          onChange={handleEmailChange}
        />
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="category">Category</Label>
        <select
          name=""
          id=""
          className="flex outline-none h-10 w-full border-none bg-gray-50  text-black  shadow-input rounded-md px-3 py-2 text-sm  
          
          "
          value={registerInput.category}
          onChange={handleCategoryChange}
        >
          <option value="">--Select an option--</option>
          <option value="Technology">Technology</option>
          <option value="Design">Design</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Business">Business</option>
        </select>
      </LabelInputContainer>
      <Password
        label="Password"
        onChange={handlePasswordChange}
        value={registerInput.password}
      />
      {showConfirmPassword && (
        <Password
          label="Confirm Password"
          onChange={handleConfirmPasswordChange}
          value={registerInput.confirmPassword}
        />
      )}
    </div>
  );
};

export default RegisterForm;
