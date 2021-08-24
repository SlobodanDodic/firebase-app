import React from "react";
import TopbarPage from "./TopbarPage";
import UsersPage from "../UserPages/UsersPage";

export default function Dashboard() {
  return (
    <div>
      <TopbarPage />
      <UsersPage />
    </div>
  );
}
