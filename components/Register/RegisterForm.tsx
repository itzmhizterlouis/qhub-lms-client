
import React from "react";
import { Label } from "../ui/Form/Label";
import { Input } from "../ui/Form/Input";
import LabelInputContainer from "../ui/Form/LabelInputContainer";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Password from "./Password";
const RegisterForm = () => {

  return (
    <form className="mt-10 w-[450px]">
      <LabelInputContainer className="my-4">
        <Label htmlFor="name">Organization Name</Label>
        <Input
          id="name"
          placeholder="Dax Inc"
          type="text"
          // value={email}
          // onChange={handleEmailChange}
        />
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          placeholder="linkvault@dax.com"
          type="email"
          // value={email}
          // onChange={handleEmailChange}
        />
      </LabelInputContainer>
      <LabelInputContainer className="mb-4">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          placeholder="Technology"
          type="text"
          // value={email}
          // onChange={handleEmailChange}
        />
      </LabelInputContainer>
      <Password/>
    </form>
  );
};

export default RegisterForm;
