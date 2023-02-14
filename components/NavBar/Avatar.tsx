"use client";
import React, { use, useEffect, useState } from "react";

import { Avatar as Pic, Button } from "flowbite-react";
import { Dropdown } from "flowbite-react";
import pb from "@/lib/pocketbase";
import { create } from "zustand";
import { useStore } from "../useStore";

type Props = {};

export default function Avatar({}: Props) {
  // const [dummy, setDummy] = useState(1);
  let user = true;
  const data = pb.authStore.model;
  // const useStore = create((set) => ({
  //   count: 1,
  // }));
  // const { count } = useStore();
  const { count } = useStore();
  // const dummy = useStore((state) => state.dummy);
  return (
    <>
      {data ? (
        <Dropdown
          label={
            <Pic size="md" rounded={true} img="/chloe.png">
              <div className="space-y-1 font-medium dark:text-white">
                <div>Chloe Pratas </div>
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
              useStore.setState({ count: Math.random() });
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
      )}
      {/* {data ? (
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
      )} */}
    </>
  );
}
