import React from "react";
import classes from "@/styles/Sidebar.module.css";

export default function SideBarMenuItems({ text, Icon }) {
  return (
    <div className={classes.sidebarHover}>
      <Icon className={classes.icon} />
      <span>{text}</span>
    </div>
  );
}
