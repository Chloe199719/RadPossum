import React from "react";
import chloeAvatar from "./chloe.png";
import { Avatar as Pic } from "flowbite-react";
import { Dropdown } from "flowbite-react";

type Props = {};

export default function Avatar({}: Props) {
  let user = true;
  return (
    <>
      {user ? (
        <Dropdown
          label={
            <Pic size="md" rounded={true} img={chloeAvatar}>
              <div className="space-y-1 font-medium dark:text-white">
                <div>Chloe Pratas</div>
              </div>
            </Pic>
          }
          arrowIcon={false}
          inline={true}
        >
          <Dropdown.Header>
            <span className="block text-sm">Chloe Pratas</span>
            <span className="block truncate text-sm font-medium">
              chloe@chloevision.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
      ) : (
        <button>Sign Up</button>
      )}
    </>
  );
}
