import React from "react";
import Header from "./Header";
const Main: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="col-span-10 h-screen grid grid-rows-12">
      <Header />
      <div className="row-span-10 overflow-auto">{children}</div>
    </div>
  );
};

export default Main;
