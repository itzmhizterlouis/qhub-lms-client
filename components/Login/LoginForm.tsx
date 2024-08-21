import React from "react";
import LabelInputContainer from "@/components/ui/Form/LabelInputContainer";
import { Label } from "@/components/ui/Form/Label";
import { Input } from "@/components/ui/Form/Input";
import Password from "@/components/Register/Password";
const LoginForm = ({
  loginInput,
  setLoginInput,
}: {
  loginInput: {
    email: string;
    password: string;
  };
  setLoginInput: (loginInput: { email: string; password: string }) => void;
}) => {
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInput({ ...loginInput, email: e.target.value });
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInput({ ...loginInput, password: e.target.value });
  };
  return (
    <div className="mt-10">
      <LabelInputContainer className="my-4">
        <Label htmlFor="name">Email Address</Label>
        <Input
          id="email"
          placeholder="linkvault@dax.com"
          type="email"
          value={loginInput.email}
          onChange={handleEmailChange}
        />
      </LabelInputContainer>
      <Password
        label="Password"
        onChange={handlePasswordChange}
        value={loginInput.password}
      />
    </div>
  );
};

export default LoginForm;
