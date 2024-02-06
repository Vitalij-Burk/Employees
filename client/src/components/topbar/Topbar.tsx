import { Layout, Space, Typography } from "antd";
import styles from "./Topbar.module.css";
import {
  LoginOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import MyButton from "../myButton/MyButton";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth/authSlice";

const Topbar = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const OnLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("login");
    navigate("/login");
  };

  return (
    <Layout.Header className={styles.topbar}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <MyButton type="ghost">
            <Typography.Title level={1}>Employees</Typography.Title>
          </MyButton>
        </Link>
      </Space>
      {user ? (
        <MyButton
          type="ghost"
          icon={<LogoutOutlined />}
          onClick={OnLogoutClick}
        >
          Logout
        </MyButton>
      ) : (
        <Space>
          <Link to={Paths.register}>
            <MyButton type="ghost" icon={<UserOutlined />}>
              Sign up
            </MyButton>
          </Link>
          <Link to={Paths.login}>
            <MyButton type="ghost" icon={<LoginOutlined />}>
              Log in
            </MyButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};

export default Topbar;
