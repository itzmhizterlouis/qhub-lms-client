"use client"
import Image from "next/image";
import React from "react";
import logo from "@/public/sidebarlogo.svg";
import { sidebar } from "@/lib/data";
import Link from "next/link";
import { TbLogout2 } from "react-icons/tb";
const Sidebar = () => {
  const pathname = window.location.pathname;
  console.log(pathname);
  
  return (
    <aside className="col-span-2 text-xl  bg-primary-light/50 py-6 text-black h-screen justify-between flex flex-col ">
      <div>
        <div className="flex w-full justify-center items-center">
          <Image src={logo} alt="logo" priority />
        </div>
        <ul className="mt-8 flex flex-col items-start ">
          {sidebar.map((item, index) => (
            <li
              key={index}
              className={`flex items-center px-10 w-full gap-4 font-semibold  py-4  border-4 border-transparent ${pathname === item.link ? "bg-lightBlue border-l-primary " : ""}`}
            >
              <Image src={item.icon} alt={item.name} width={25} height={25} />
              <Link href={item.link} className=" ">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-10">
        <Link href="/login" className="flex gap-2 items-center text-red-500">
          <TbLogout2 />
          Logout
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
