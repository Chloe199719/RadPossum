"use client";
import React from "react";

import { Avatar as Pic, Button } from "flowbite-react";
import { Dropdown } from "flowbite-react";
import { useStore } from "../useStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
type Props = {};

export default function Avatar({}: Props) {
  const router = useRouter();
  const { count } = useStore();

  const { data: session, status } = useSession();
  console.log(session);
  return (
    <>
      {status === "authenticated" ? (
        <Dropdown
          label={
            <Pic
              size="md"
              rounded={true}
              img={session.user?.image ? session.user?.image : "/chloe.png"}
            >
              <div className="space-y-1 font-medium dark:text-white">
                <div>{session.user?.name} </div>
              </div>
            </Pic>
          }
          arrowIcon={false}
          inline={true}
        >
          <Dropdown.Header>
            <span className="block text-sm">{session.user?.name}</span>
            <span className="block truncate text-sm font-medium">
              {session.user?.email}
            </span>
          </Dropdown.Header>
          <Link href="/dashboard">
            {" "}
            <Dropdown.Item>Dashboard</Dropdown.Item>
          </Link>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Link href="/dashboard/lessons">
            {" "}
            <Dropdown.Item>Lessons</Dropdown.Item>{" "}
          </Link>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={() => {
              signOut();
              useStore.setState({ count: Math.random() });
              router.push(`/`);
            }}
          >
            Sign out
          </Dropdown.Item>
        </Dropdown>
      ) : (
        <Button.Group>
          <Button
            onClick={() => {
              signOut();
            }}
            className="focus:ring-0"
            color="gray"
          >
            {/* <Link className="w-full h-full" href="/signup"> */} Signup
            {/* </Link> */}
          </Button>
          <Button
            onClick={() => {
              signIn();
            }}
            className="focus:ring-0"
            color="gray"
          >
            {/* <Link className="w-full h-full" href="/login"> */}
            Login
            {/* </Link> */}
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
