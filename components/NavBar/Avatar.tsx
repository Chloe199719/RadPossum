import React from "react";
import chloeAvatar from "./chloe.png";
import { Avatar as Pic } from "flowbite-react";

type Props = {};

export default function Avatar({}: Props) {
  let user = true;
  return (
    <>{user ? <Pic size="md" img={chloeAvatar} /> : <button>Sign Up</button>}</>
  );
}
