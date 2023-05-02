import { SelectedTweetContext } from "@/providers/SelectedTweet";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";
import Tweet from "../tweet/tweet";
import Post from "../common/post/post";
import CommentBox from "./CommentBox";

export default function ModalTweet() {
  const [tweet, setTweet] = useContext(SelectedTweetContext);
  return (
    <div style={{ textAlign: "start" }}>
      <Tweet tweet={tweet}></Tweet>
      <CommentBox marginLeft="1.4rem"></CommentBox>
    </div>
  );
}
