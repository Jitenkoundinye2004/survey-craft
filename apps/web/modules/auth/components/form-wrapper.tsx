import React from "react";
import { AuthLayoutShell } from "@/modules/auth/components/auth-layout-shell";

interface FormWrapperProps {
  children: React.ReactNode;
  activeTab?: "login" | "signup";
}

export const FormWrapper = async ({ children, activeTab = "login" }: Readonly<FormWrapperProps>) => {
  return <AuthLayoutShell activeTab={activeTab}>{children}</AuthLayoutShell>;
};
