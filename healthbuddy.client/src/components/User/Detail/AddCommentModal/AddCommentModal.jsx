import React from "react";
import { Modal } from "antd";
import { Label, Textarea } from "flowbite-react";

const AddCommentModal = ({ open, onCancel }) => {
  return (
    <Modal
      title="Post New Comment"
      open={open}
      centered
      onCancel={onCancel}
      width={{
        xs: "85%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
      footer={[
        <div className="flex gap-1 justify-end">
          <button
            className="rounded-xl bg-primary-dark flex items-center justify-center border-2 shadow-lg hover:bg-gradient-to-br hover:from-secondary-dark hover:to-primary-dark text-white transition duration-300 cursor-pointer active:scale-[0.98] px-5 py-2 uppercase"
            onClick={onCancel}
          >
            Post
          </button>
          <button
            className="px-4 py-2 rounded-xl bg-transparent flex items-center justify-center border-2 border-compleprimary-100 shadow-lg hover:bg-compleprimary-100 text-compleprimary-100 hover:text-white duration-300 cursor-pointer active:scale-[0.98]  uppercase"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>,
      ]}
    >
      <div className="flex flex-col gap-4">
        <Textarea
          placeholder="Write your comment here..."
          className="h-32 bg-gray-200"
        />
      </div>
    </Modal>
  );
};

export default AddCommentModal;
