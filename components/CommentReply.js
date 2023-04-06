import React, { useEffect, useState } from "react";
import ReplyComponent from "./ReplyComponent";

const CommentReply = ({ commentId }) => {
  const [reply, setReply] = useState([]);
  const fetchReplies = async () => {
    const res = await fetch(`/api/post/comment/reply?commentId=${commentId}`);
    const data = await res.json();
    //console.log(data.data);
    setReply(data.data);
  };
  //console.log(reply);
  useEffect(() => {
    fetchReplies();
  },[reply]);
  return (
    <div>
      {/* <ReplyComponent /> */}
      {reply.map((rep) => (
        <ReplyComponent key={rep._id} reply={rep} />
      ))}
    </div>
  );
};

export default CommentReply;
