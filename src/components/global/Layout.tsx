import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-full max-w-[450px] m-auto bg-white relative">
      {children}
    </div>
  );
};

export default Layout;
