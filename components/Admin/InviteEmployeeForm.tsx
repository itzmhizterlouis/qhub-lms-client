import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";
import { useMutation } from "@apollo/client";
import { INVITE_LMS_USER } from "@/lib/graphql";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";

const InviteEmployeeForm = ({ onBulkUpload }: { onBulkUpload: () => void }) => {
  const [role, setRole] = useState("lmsUser");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const [inviteEmployee] = useMutation(INVITE_LMS_USER);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const firstName = firstNameRef.current?.value?.trim();
    const lastName = lastNameRef.current?.value?.trim();
    const email = emailRef.current?.value?.trim();
    const organizationId = Cookies.get("organizationId");
    const token = Cookies.get("accessToken");

    if (!firstName || !lastName || !email || !role) {
      setError("Please fill all fields.");
      return;
    }
    if (!organizationId) {
      setError("Organization ID not found.");
      return;
    }

    setLoading(true);
    try {
      await inviteEmployee({
        variables: {
          lmsUserInput: {
            firstName,
            lastName,
            email,
            organizationId,
            role,
          },
        },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      });
      toast.success("Employee invited successfully!");
      // Optionally clear form fields
      if (firstNameRef.current) firstNameRef.current.value = "";
      if (lastNameRef.current) lastNameRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
      setRole("lmsUser");
    } catch (err: any) {
      console.error("Invite employee error:", err);
      setError(err.message || "Failed to invite employee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle className="border-b-2 px-6 pb-4">
          Invite Employee
        </SheetTitle>
        <SheetDescription className="px-6">
          Invite new employees to your organization.
        </SheetDescription>
      </SheetHeader>

      <div className="mt-4 px-6">
        <form className="flex flex-col gap-4" onSubmit={handleInvite}>
          <div className="w-full grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="first-name" className="text-sm font-medium">
                First Name
              </Label>
              <Input type="text" id="first-name" ref={firstNameRef} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="last-name" className="text-sm font-medium">
                Last Name
              </Label>
              <Input type="text" id="last-name" ref={lastNameRef} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" ref={emailRef} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Student" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lmsStudent">Student</SelectItem>
                <SelectItem value="organizationAdmin">Organization Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex">
            <Button className="bg-primary" type="submit" disabled={loading}>
              {loading ? "Inviting..." : "Invite Employee"}
            </Button>
          </div>
        </form>
        <p
          className=" mt-4 text-sm text-primary underline cursor-pointer"
          onClick={onBulkUpload}
        >
          Bulk Upload Employee
        </p>
      </div>
    </>
  );
};

export default InviteEmployeeForm;