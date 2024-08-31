import React from "react";
import Header from "./Header";
const Main: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="max-md:col-span-12 col-span-10 h-screen row-span-10">
      <Header />
      <div className="row-span-10 overflow-auto">{children}</div>
    </div>
  );
};

export default Main;
