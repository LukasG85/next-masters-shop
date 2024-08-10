import { SignIn } from "@clerk/nextjs";
import React from "react";

export default function Pageś() {
  return (
    <div className="mt-40 flex items-center justify-center ">
    <SignIn />
    </div>
  )
}