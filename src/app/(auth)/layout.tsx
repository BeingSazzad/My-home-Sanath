import AuthLayout from "@/components/layout/AuthLayout";
import Navbar from "@/components/layout/Navbar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (    
    <>
      <Navbar />
      <AuthLayout>
        {children}
      </AuthLayout>    
    </>
  );
};

export default layout;
