import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import style from "./Message.module.css";
import Avatar from "@/components/common/avatar/avatar";
export default function MessageComponent({ message, showAvatar }) {
  const session = useSession();
  const [isMy, setIsMy] = useState(false);
  useEffect(() => {
    setIsMy(session.data?.user.id === message.sender);
    return () => {};
  }, [session.data, message.sender]);

  return (
    <div className={style.msgComponentWrapper}>
      {!isMy && showAvatar && (
        <Avatar width="20px" image={message.senderImage} />
      )}
      {!showAvatar && <div style={{ width: "22px" }}></div>}

      <div className={style.msgComponentDiv}>
        {/* <div>{isMy ? "y" : "n"}</div> */}
        <div
          className={`${style.msgComponent} ${
            isMy ? style.msgComponentMy : style.msgComponentNotMy
          }`}
        >
          {message.body}
        </div>
      </div>
      {isMy && showAvatar && (
        <Avatar width="20px" image={session.data?.user.image} />
      )}
      {!showAvatar && <div style={{ width: "22px" }}></div>}
    </div>
  );
}
