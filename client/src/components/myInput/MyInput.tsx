import { Form, Input } from "antd";

type MyInputProps = {
  name: string;
  placeholder: string;
  type?: string;
};

const MyInput = ({ name, placeholder, type = "text" }: MyInputProps) => {
  return (
    <Form.Item
      name={name}
      shouldUpdate={true}
      rules={[{ required: true, message: "Required field" }]}
    >
      <Input placeholder={placeholder} type={type} size="large" />
    </Form.Item>
  );
};

export default MyInput;
