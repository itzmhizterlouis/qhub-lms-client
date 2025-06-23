import CourseBuilder from "@/components/CourseBuilder";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Page = () => {
  const cookieStore = cookies();
  const role = cookieStore.get("role")?.value;
  console.log(role);
  
  if(role != "organizationOwner") {
    redirect('/dashboard');
  }
  return (
    <div className="p-6 h-full">
      <h2 className="font-semibold">Course Creation</h2>
      <CourseBuilder />
    </div>
  );
};

export default Page;
