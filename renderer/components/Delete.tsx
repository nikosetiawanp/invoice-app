import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import IconWarningRed from "../assets/icon-warning-red.svg";

export default function Delete() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm px-8 py-4 rounded-full bg-red hover:bg-red-hover"
      >
        Delete
      </button>
      <Dialog
        className={`bg-black/50 fixed top-0 left-16 w-full h-full flex justify-center items-center`}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Dialog.Panel
          className={`bg-dark-blue p-8 rounded-lg flex flex-col items-center gap-4 shadow-lg w-full max-w-lg`}
        >
          <div className="flex items-start gap-8">
            <Image
              src={IconWarningRed}
              width={80}
              height={80}
              className="top-0"
            />
            <div>
              <Dialog.Title className={`font-semibold text-2xl mb-2`}>
                Are you sure?
              </Dialog.Title>
              <Dialog.Description
                className={`text-left text-sm text-white/50 mb-4`}
              >
                Do you really want to delete invoice #XM9141? This process
                cannot be undone.
              </Dialog.Description>
            </div>
          </div>

          <div className="flex justify-end gap-4 w-full">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-cool-grey hover:bg-cool-grey-hover hover:bg-white/10 text-white rounded-lg py-2 px-4"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-red hover:bg-red-hover text-white rounded-lg py-2 px-4"
            >
              Delete
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
