import { Card, Form, Row, Space, Typography } from "antd";
import Layout from "../components/layout/Layout";
import MyInput from "../components/myInput/MyInput";
import PasswordInput from "../components/passwordInput/PasswordInput";
import MyButton from "../components/myButton/MyButton";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../paths";
import { UserData, useLoginMutation } from "../app/services/auth";
import { isErrorWithMessage } from "../utils/is-error-with-message";
import { useState } from "react";
import ErrorMessage from "../components/error-message/ErrorMessage";

const Login = () => {
  const navigate = useNavigate()
  const [loginUser, loginUserResult] = useLoginMutation()
  const [ error, setError ] = useState('')

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap()
      navigate("/")
    } catch (error) {
      const maybeError = isErrorWithMessage(error)

      if (maybeError) {
        setError(error.data.message)
      } else {
        setError("Some error")
      }
    }
  }

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Log in" style={{ width: "30rem" }}>
          <Form onFinish={login}>
            <MyInput name="email" placeholder="Email" type="email" />
            <PasswordInput name="password" placeholder="Password" />
            <MyButton type="primary" htmlType="submit">
              Log in
            </MyButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Don't have an account? <Link to={Paths.register}>Sign up</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;
