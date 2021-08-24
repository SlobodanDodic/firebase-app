import React from "react";
import { BsPeopleFill, BsServer } from "react-icons/bs";

export const LeftbarData = [
  {
    title: "Fire Users",
    path: "/",
    icon: <BsPeopleFill />,
    classes: "links",
  },
  {
    title: "Fetch Users",
    path: "/fetch-users",
    icon: <BsServer />,
    classes: "links",
  },
];
