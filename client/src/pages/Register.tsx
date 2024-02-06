import { Card, Form, Row, Space, Typography } from "antd";
import Layout from "../components/layout/Layout";
import MyInput from "../components/myInput/MyInput";
import PasswordInput from "../components/passwordInput/PasswordInput";
import MyButton from "../components/myButton/MyButton";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../paths";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { useState } from "react";
import { useRegisterMutation } from "../app/services/auth";
import { User } from "@prisma/client";
import { isErrorWithMessage } from "../utils/is-error-with-message";
import ErrorMessage from "../components/error-message/ErrorMessage";

type RegisterData = Omit<User, "id"> & {confirmPassword: string}

const Register = () => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)  
  const [error, setError] = useState("")
  const [registerUser] = useRegisterMutation()

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap()

      navigate("/")
    } catch (error) {
      const maybeError = isErrorWithMessage(error);

      if (maybeError) {
        setError(error.data.message);
      } else {
        setError("Some error");
      }
    }
  }

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Sign up" style={{ width: "30rem" }}>
          <Form onFinish={register}>
            <MyInput name="name" placeholder="Name" />
            <MyInput name="email" placeholder="Email" type="email" />
            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput name="confirmPassword" placeholder="Repeat a password" />
            <MyButton type="primary" htmlType="submit">
              Sign up
            </MyButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Already have an account? <Link to={Paths.login}>Log in</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Register;
