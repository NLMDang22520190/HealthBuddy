import React from "react";
import { Send, Link } from "lucide-react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Label } from "flowbite-react";

const SharePopover = ({
  onShareClick,
  iconColor = "text-black dark:text-white",
  iconSize = "w-5 h-5",
}) => {
  return (
    <Popover className="flex items-center">
      <PopoverButton className={iconColor}>
        <Send className={iconSize} />
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom-start"
        className="bg-white dark:bg-bg_content_dark bg-opacity-50  border dark:border-bg_divide_dark rounded-xl text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
      >
        <div
          onClick={onShareClick}
          className="flex cursor-pointer hover:bg-primary-dark hover:bg-opacity-35 justify-between w-48 p-4"
        >
          <Label className="cursor-pointer uppercase ">Copy link</Label>
          <Link></Link>
        </div>
      </PopoverPanel>
    </Popover>
  );
};

export default SharePopover;
