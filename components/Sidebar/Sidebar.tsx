"use client"
import Image from "next/image";
import React from "react";
import logo from "@/public/sidebarlogo.svg";
import Link from "next/link";
import SidebarContent from "./SidebarContent";
import { TbLogout2 } from "react-icons/tb";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("firstName");
    Cookies.remove("lastName");
    Cookies.remove("email");
    Cookies.remove("role");
    Cookies.remove("organizationId");
    Cookies.remove("logo");
    router.push('/login')
  }

  return (
    <aside className=" max-md:hidden overflow-hidden bg-primary-light/50 py-6 text-black h-screen justify-between flex flex-col ">
      <div>
        <div className="flex  w-full justify-center items-center ">
          <Image
            src={logo}
            alt="logo"
            priority
            className="max-lg:w-20 cursor-pointer"
          />
          
        </div>
        <SidebarContent />
      </div>
      <div className="px-10">
        <p onClick={handleLogout} className="flex cursor-pointer gap-2 items-center text-red-500">
          <TbLogout2 />
          Logout
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
