import React from "react";
import styles from "./Layout.module.css";
import { Layout as AntLayout } from "antd";
import Topbar from "../topbar/Topbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.main}>
      <Topbar />
      <AntLayout.Content style={{ height: '100%' }}>
        {children}
      </AntLayout.Content>
    </div>
  );
};

export default Layout;
