import AuthGuard from "./AuthGuard";
import ModelPage from "@/views/model";
import React from "react";

export const LayoutGuard = () => {
  return (
    <AuthGuard>
      <ModelPage />
    </AuthGuard>
  );
};
