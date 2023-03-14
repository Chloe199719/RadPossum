"use client";
import React from "react";

import { Avatar as Pic, Button } from "flowbite-react";
import { Dropdown } from "flowbite-react";
import { useStore } from "../useStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import myLoader from "@/lib/imageloader";
import { session } from "@/types";
type Props = {};

export default function Avatar({}: Props) {
  const router = useRouter();
  const { count } = useStore();

  const { data: session, status } = useSession();
  // console.log(session);
  return (
    <>
      {status === "authenticated" ? (
        <div className="dropdown">
          <label tabIndex={0} className=" m-1 flex items-center gap-2">
            <div className="avatar">
              <div className="w-12 rounded-full flex">
                {" "}
                <Image
                  src={session?.user ? session.user.image! : "/chloe.jpg"}
                  alt={
                    session?.user ? session.user.name! : "Default Profile Pic"
                  }
                  loader={myLoader}
                  width={96}
                  height={96}
                />{" "}
              </div>{" "}
            </div>{" "}
            {session.user?.name}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-60"
          >
            <li>
              <div className="flex flex-col items-start">
                <p>{session.user?.name}</p>
                <p>{session.user?.email}</p>
              </div>
            </li>
            <hr className=" my-1" />
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/dashboard/codes">Codes</Link>
            </li>
            <li>
              <Link href="/dashboard/lessons">Lessons</Link>
            </li>
            <hr className=" my-1" />
            <li
              onClick={() => {
                signOut();
                useStore.setState({ count: Math.random() });
                router.push(`/`);
              }}
            >
              <a> Logout</a>
            </li>
          </ul>
        </div>
      ) : (
        // <Dropdown
        //   className=" hover:bg-gray-200"
        //   label={
        //     <Pic
        //       className=" hover:bg-gray-200"
        //       size="md"
        //       rounded={true}
        //       img={session.user?.image ? session.user?.image : "/chloe.png"}
        //     >
        //       <div className="space-y-1 font-medium dark:text-white">
        //         <div>{session.user?.name} </div>
        //       </div>
        //     </Pic>
        //   }
        //   arrowIcon={false}
        //   inline={true}
        // >
        //   <Dropdown.Header>
        //     <span className="block text-sm">{session.user?.name}</span>
        //     <span className="block truncate text-sm font-medium">
        //       {session.user?.email}
        //     </span>
        //   </Dropdown.Header>
        //   <Link href="/dashboard">
        //     {" "}
        //     <Dropdown.Item>Dashboard</Dropdown.Item>
        //   </Link>
        //   <Dropdown.Item>Settings</Dropdown.Item>
        //   <Link href="/dashboard/lessons">
        //     {" "}
        //     <Dropdown.Item>Lessons</Dropdown.Item>{" "}
        //   </Link>
        //   <Dropdown.Divider />
        //   <Dropdown.Item
        //     onClick={() => {
        //       signOut();
        //       useStore.setState({ count: Math.random() });
        //       router.push(`/`);
        //     }}
        //   >
        //     Sign out
        //   </Dropdown.Item>
        // </Dropdown>

        <button
          onClick={() => {
            signIn();
          }}
          className="btn btn-primary focus:ring-0 w-32"
        >
          {/* <Link className="w-full h-full" href="/login"> */}
          Login
          {/* </Link> */}
        </button>
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
