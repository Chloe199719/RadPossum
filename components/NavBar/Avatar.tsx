"use client";
import React from "react";

import { Avatar as Pic, Button } from "flowbite-react";
import { Dropdown } from "flowbite-react";
import pb from "@/lib/pocketbase";

type Props = {
  data: any;
};

export default function Avatar({ data }: Props) {
  let user = true;
  return (
    <>
      {/* {data ? (
        <Dropdown
          label={
            <Pic size="md" rounded={true} img="/chloe.png">
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
          <Dropdown.Item
            onClick={() => {
              pb.authStore.clear();
            }}
          >
            Sign out
          </Dropdown.Item>
        </Dropdown>
      ) : (
        <Button.Group>
          <Button className="focus:ring-0" color="gray">
            Signup
          </Button>
          <Button className="focus:ring-0" color="gray">
            Login
          </Button>
        </Button.Group>
      )} */}
      {data ? (
        <div>{data.name}</div>
      ) : (
        <Button.Group>
          <Button className="focus:ring-0" color="gray">
            Signup
          </Button>
          <Button className="focus:ring-0" color="gray">
            Login
          </Button>
        </Button.Group>
      )}
    </>
  );
}
