import { Menu } from "@headlessui/react";

export default function Profile() {
  return (
    <Menu>
      <div className="relative">
        <Menu.Button
          className={`outline-none rounded-full border-2 border-white/0 hover:border-white/20`}
        >
          <img
            className="inline-block h-[2.375rem] w-[2.375rem] rounded-full"
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
            alt="Image Description"
          />
        </Menu.Button>
        <Menu.Items
          className={`bg-dark-blue border border-white/20 rounded-md absolute bottom-12 flex flex-col overflow-hidden`}
        >
          <Menu.Item>
            <a
              className={`hover:bg-cool-grey hover:text-white px-4 py-2 text-sm text-white whitespace-nowrap`}
              href="/account-settings"
            >
              Account settings
            </a>
          </Menu.Item>
          <Menu.Item>
            <a
              className={`hover:bg-cool-grey hover:text-white px-4 py-2 text-sm text-white whitespace-nowrap`}
              href="/account-settings"
            >
              Logout
            </a>
          </Menu.Item>
        </Menu.Items>
      </div>
    </Menu>
  );
}
