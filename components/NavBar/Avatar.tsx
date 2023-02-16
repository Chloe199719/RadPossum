"use client";
import React, { use, useEffect, useState } from "react";

import { Avatar as Pic, Button } from "flowbite-react";
import { Dropdown } from "flowbite-react";
import pb from "@/lib/pocketbase";
import { useStore } from "../useStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {};

export default function Avatar({}: Props) {
  const data = pb.authStore.model;
  const router = useRouter();
  const { count } = useStore();

  return (
    <>
      {data ? (
        <Dropdown
          label={
            <Pic size="md" rounded={true} img="/chloe.png">
              <div className="space-y-1 font-medium dark:text-white">
                <div>{data.name} </div>
              </div>
            </Pic>
          }
          arrowIcon={false}
          inline={true}
        >
          <Dropdown.Header>
            <span className="block text-sm">{data.name}</span>
            <span className="block truncate text-sm font-medium">
              {data.email}
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
              router.push(`/`);
            }}
          >
            Sign out
          </Dropdown.Item>
        </Dropdown>
      ) : (
        <Button.Group>
          <Button className="focus:ring-0" color="gray">
            <Link className="w-full h-full" href="/signup">
              {" "}
              Signup
            </Link>
          </Button>
          <Button className="focus:ring-0" color="gray">
            <Link className="w-full h-full" href="/login">
              Login
            </Link>
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
