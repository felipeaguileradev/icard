import React from "react";
import { TopMenu } from "../../components/Admin";
import { useAuth } from "../../hooks";
import { LoginAdmin } from "../../pages/Admin";
import { SideMenu } from "../../components/Admin/SideMenu/SideMenu";
import "./AdminLayout.scss";

export const AdminLayout = ({ children }) => {
  const { auth } = useAuth();

  if (!auth) return <LoginAdmin />;
  return (
    <div className="admin-layout">
      <div className="admin-layout__menu">
        <TopMenu />
      </div>
      <div className="admin-layout__main-content">
        <SideMenu>{children}</SideMenu>
      </div>
    </div>
  );
};
