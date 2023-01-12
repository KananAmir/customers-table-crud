import { Space, Spin } from "antd";
import React from "react";

const Loading = () => {
  return (
    <div style={{ width: "100%", height: '80vh', display: "flex", justifyContent: "center", alignItems:'center' }}>
      <Space size="middle">
        <Spin size="small" />
        <Spin />
        <Spin size="large" />
      </Space>
    </div>
  );
};

export default Loading;
