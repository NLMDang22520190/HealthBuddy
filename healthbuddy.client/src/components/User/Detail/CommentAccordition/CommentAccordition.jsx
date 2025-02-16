import React, { useState } from "react";
import { Accordion, Label, Textarea } from "flowbite-react";
import { Avatar } from "antd";
import { ArrowUp, ArrowDown, Ellipsis } from "lucide-react";
import { useSelector } from "react-redux";

const CommentAccordition = () => {
  const [newMessage, setNewMessage] = useState("");
  const auth = useSelector((state) => state.auth);

  if (!auth.isAuthenticated) {
    return null;
  }

  return (
    <div className="flex sticky bottom-40 md-lg:bottom-24 bg-bg_light dark:bg-bg_content_dark ">
      <Accordion className="flex-1 dark:border-transparent border-transparent">
        <Accordion.Panel>
          <Accordion.Title className="dark:focus:ring-transparent focus:ring-transparent rounded-lg hover:rounded-lg hover:bg-transparent focus:bg-transparent  dark:hover:bg-transparent dark:bg-transparent">
            <Label className="flex gap-2 items-center text-xl font-semibold mb-1">
              Write your comment here <ArrowDown className="size-6" />
            </Label>
          </Accordion.Title>
          <Accordion.Content className="bg-transparent dark:bg-transparent divide-y dark:divide-bg_divide_dark divide-bg_divide_light p-0">
            <div className="px-4 flex items-start gap-2 mt-2 mb-2 md-lg:mb-3">
              <div className="flex-1 p-0.5 rounded-lg bg-gradient-to-tr from-primary-dark to-secondary-dark ">
                <Textarea
                  className="focus:ring-transparent dark:focus:ring-transparent rounded-lg  dark:bg-bg_content_dark bg-bg_light dark:border-transparent border-transparent"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Write your comment here"
                />
              </div>
              <button
                className={`p-4 rounded-xl flex items-center justify-center border-2 shadow-lg text-white transition duration-300 cursor-pointer active:scale-[0.98] uppercase ${
                  newMessage.trim()
                    ? "bg-primary-dark hover:bg-gradient-to-br hover:from-secondary-dark hover:to-primary-dark"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!newMessage.trim()} // Disable button when there's no input
              >
                {newMessage.trim() ? (
                  <ArrowUp className="size-6" />
                ) : (
                  <Ellipsis className="size-6" />
                )}
              </button>
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
};

export default CommentAccordition;
