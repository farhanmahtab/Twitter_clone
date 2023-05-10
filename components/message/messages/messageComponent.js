import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";

import style from "./Message.module.css";
import Avatar from "@/components/common/avatar/avatar";
import { RecentMessageContext } from "@/providers/RecentMessageProvider";
export default function MessageComponent({ message, sender, showAvatar }) {
  const session = useSession();
  const [recentMsg] = useContext(RecentMessageContext);
  const [isMy, setIsMy] = useState(false);
  const [isUnseen, setIsUnseen] = useState(false);

  useEffect(() => {
    setIsMy(session.data?.user.id === message.sender);
    if (recentMsg.unseenMessages) {
      setIsUnseen(
        recentMsg.unseenMessages.some((msg) => {
          return msg.messageID === message._id;
        })
      );
    }
    return () => {};
  }, [session.data, message.sender, message.cus_id, recentMsg.unseenMessages]);
  console.log(recentMsg.unseenMessages)

  return (
    <>
      <div className={style.msgComponentWrapper}>
        {!showAvatar && <div style={{ width: "22px", color: "gray" }}></div>}
        <div className={style.msgComponentDiv}>
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
      {isUnseen && <div className={style.seenUnseen}>sent</div>}
    </>
  );
}
