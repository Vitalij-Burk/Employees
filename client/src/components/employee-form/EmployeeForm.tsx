import { Employee } from "@prisma/client";
import { Card, Form, Space } from "antd";
import MyInput from "../myInput/MyInput";
import ErrorMessage from "../error-message/ErrorMessage";
import MyButton from "../myButton/MyButton";

type EmployeeFormProps<T> = {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  employee?: T;
};

const EmployeeForm = ({
  onFinish,
  title,
  error,
  employee,
  btnText,
}: EmployeeFormProps<Employee>) => {
  return (
    <Card title={title} style={{ width: "30rem" }}>
      <Form name="employee-form" onFinish={onFinish} initialValues={employee}>
        <MyInput type="text" name="firstName" placeholder="First Name" />
        <MyInput type="text" name="lastName" placeholder="Last Name" />
        <MyInput type="number" name="age" placeholder="Age" />
        <MyInput type="text" name="address" placeholder="Address" />
        <Space>
          <ErrorMessage message={error} />
          <MyButton htmlType="submit">{btnText}</MyButton>
        </Space>
      </Form>
    </Card>
  );
};

export default EmployeeForm;
