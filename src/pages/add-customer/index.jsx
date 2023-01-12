import React from "react";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { addCustomerAction } from "../../redux/action/customers.actions";

const AddCustomer = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const onFinish = (values) => {
    let obj = {
      companyName: values.companyName,
      contactTitle: values.contactTitle,
      address: {
        city: values.city,
        country: values.country,
      },
    };
    console.log("Success:", obj);
    dispatch(addCustomerAction(obj));
    form.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Company Name"
          name="companyName"
          rules={[
            {
              required: true,
              message: "Please input your Company Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contact Title"
          name="contactTitle"
          rules={[
            {
              required: true,
              message: "Please input your Contact Title!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="City"
          name="city"
          rules={[
            {
              required: true,
              message: "Please input your City!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Country"
          name="country"
          rules={[
            {
              required: true,
              message: "Please input your Country!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCustomer;
