import React, { useEffect, useState } from "react";
import ReplyComponent from "./ReplyComponent";

const CommentReply = ({ reply ,comment}) => {
  const [replies, setReplies] = useState(reply);
  // useEffect(() => {
  //   setReplies(replies);
  // }, [reply]);
  console.log(reply)
  return (
    <div>
      {/* <ReplyComponent /> */}
      {replies?.map((rep) => (
        <ReplyComponent key={rep._id} reply={rep} />
      ))}
    </div>
  );
};

export default CommentReply;
