import React, { useEffect, useState } from "react";
import ReplyComponent from "./ReplyComponent";

const CommentReply = ({ reply }) => {
  const [replies, setReplies] = useState(reply);
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
