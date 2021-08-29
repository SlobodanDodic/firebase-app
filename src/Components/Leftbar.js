import React from "react";
import { BsPeopleFill, BsServer, BsBraces } from "react-icons/bs";

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
  {
    title: "Skills",
    path: "/skills",
    icon: <BsBraces />,
    classes: "links",
  },
];
