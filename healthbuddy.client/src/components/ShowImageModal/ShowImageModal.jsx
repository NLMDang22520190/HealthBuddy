import React from "react";
import { Modal } from "antd";

const ShowImageModal = ({ show, onCancel, image }) => {
  return (
    <Modal
      title=""
      centered
      open={show}
      onCancel={onCancel}
      footer={[]}
      width={{
        xs: "100%",
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "100%",
        xxl: "100%",
      }}
      height={{
        xs: "100%",
        sm: "100%",
        md: "100%",
        lg: "100%",
        xl: "100%",
        xxl: "100%",
      }}
    >
      <div className="flex justify-center items-center">
        <img src={image} alt="post" className="rounded-xl min-h-screen" />
      </div>
    </Modal>
  );
};

export default ShowImageModal;
