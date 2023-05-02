import React, { useEffect, useState } from "react";
import Avatar from "../avatar/avatar";
import CommentBox from "@/components/modalComponents/CommentBox";
import style from "../../tweet/tweet.module.css";
import { useSession } from "next-auth/react";
import DropDown from "../dropDown/DropDown";
import Button from "../button/button";
import { useRouter } from "next/router";
export default function Comment({ comment, setNodes, nodes }) {
  const session = useSession();
  const router = useRouter();
  const Delete = (_id) => {
    return (
      <Button
        onclick={async () => {
          const res = await fetch("/api/v2/comments/" + _id, {
            method: "DELETE",
          });
          const result = await res.json();

          if ((result.msg = "Comment deleted")) {
            nodes = nodes.filter((e) => e._id != comment._id);
            setNodes(nodes);
          }
        }}
        style={{ backgroundColor: "red", borderRadius: ".3rem" }}
      >
        Delete
      </Button>
    );
  };
  const Edit = (_id) => {
    return (
      <Button
        style={{
          backgroundColor: "var(--primary-color)",
          borderRadius: ".3rem",
        }}
      >
        Edit
      </Button>
    );
  };
  return (
    <div className="main">
      <div className="lLine"></div>
      <div className={style.tweetInner} key={comment._id}>
        <section className={style.image}>
          <Avatar width="30px" image={comment.owner.image}></Avatar>
          {comment.nodes.length > 0 && (
            // <svg viewBox="0 0 24 24" aria-hidden="true" className={style.threeDot} ><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>
            //  svg vertical line with color var(--border-color)
            <div className="vLine"></div>
          )}
        </section>
        <section className={style.body}>
          <div className={"comment-header " + style["header"]}>
            <div className={style.names}>
              <span className={style["name"]}>{comment.owner.username}</span>
              {/* <span className={style["username"]}>{owner?.username}</span> */}
              {/* <span>·</span> */}
            </div>
            {session.data?.user.id == comment.owner._id && (
              <DropDown width={"150px"} options={[Delete(comment._id)]}>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className={style.threeDot}
                >
                  <g>
                    <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                  </g>
                </svg>
              </DropDown>
            )}
          </div>
          <div className={"commentText " + style.mainTweet}>
            {comment.tweetText}
          </div>
          {/* <Button
            onclick={() => {
                router.query.modal = "comment"
                router.push(router)
            }}
            style={{ width: "100px", paddingBlock: ".3rem", marginTop: "1rem" }} >Reply</Button> */}
        </section>
      </div>

      <style jsx>{`
        .main {
          position: relative;
          margin-bottom: 0.5rem;

          border-radius: 1rem;
          border: 1px solid var(--border-color-2);
          padding: 1rem;
        }
        .main:hover {
          background-color: var(--bg-hover);
        }
        .lLine {
          position: absolute;
          left: -1.85rem;
          top: -0.7rem;

          width: 1.8rem;
          height: 1.8rem;
          background-color: transparent;

          border-bottom-left-radius: 0.8rem;
          border-bottom: 2px solid var(--border-color-2);
          border-left: 2px solid var(--border-color-2);
        }
        .comment-header {
          position: relative;
          align-items: flex-start;
        }
        .commentText {
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}
