import React, { useEffect, useState } from "react";
import Avatar from "../avatar/avatar";
import CommentBox from "@/components/modalComponents/CommentBox";
import style from "../../tweet/tweet.module.css";
import CommentUI from "@/components/common/comment/Comment";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import DropDown from "../dropDown/DropDown";
import Button from "../button/button";

export default function Comments({
  comment,
  setCommentsList,
  setCommentCount,
}) {
  const owner = comment.owner;

  const session = useSession();
  const router = useRouter();
  const url = "/api/v2/comments/" + comment._id;

  const [nodes, setNodes] = useState([]);
  const Delete = (_id) => {
    return (
      <Button
        onclick={async () => {
          const res = await fetch("/api/v2/comments/" + _id, {
            method: "DELETE",
          });
          const result = await res.json();

          if ((result.msg = "Comment deleted")) {
            if (setCommentsList) {
              setCommentsList((state) => {
                const st = state.filter((e) => e._id != _id);

                setCommentCount(st.length);
                return st;
              });
            }
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
  const Reply = (_id) => {
    return (
      <Button
        style={{
          backgroundColor: transparent,
          borderRadius: ".3rem",
        }}
      >
        Edit
      </Button>
    );
  };

  useEffect(() => {
    // fetch comments from "api/comments/"+comment._id

    async function getNodes() {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (data.comment) {
          setNodes(data.comment.commentsList);
        }
      } catch (e) {}
    }

    getNodes();

    return () => {};
  }, [router, url]);

  return (
    <div className="comment">
      <div className={style.tweetInner} key={comment._id}>
        <section className={style.image}>
          <Avatar width="40px" image={owner?.image}></Avatar>
          {nodes.length > 0 && (
            // <svg viewBox="0 0 24 24" aria-hidden="true" className={style.threeDot} ><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>
            //  svg vertical line with color var(--border-color)
            <div className="vLine"></div>
          )}
        </section>
        <section className={style.body}>
          <div className={"comment-header " + style["header"]}>
            <div className={style.names}>
              <span className={style["name"]}>{owner?.username}</span>
              <span className={style["username"]}>{owner?.username}</span>
              {/* <span>·</span> */}
            </div>
            {session.data?.user.id == owner._id && (
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
          <div className={style.mainTweet}>{comment.tweetText}</div>
          {nodes.length > 0 && <h3 className="replies">Replies</h3>}
          {nodes.length > 0 && (
            <div className="replies">
              {nodes.map((node) => {
                return (
                  <CommentUI
                    setNodes={setNodes}
                    nodes={nodes}
                    key={node._id}
                    comment={node}
                  />
                );
              })}
            </div>
          )}
          {/* <Button
                    onclick={() => {
                        router.query.modal = "comment"
                        router.push(router)
                    }}
                    style={{ width: "100px", paddingBlock: ".3rem", marginTop: "1rem" }} >Reply</Button> */}
        </section>
      </div>
      <CommentBox
        placeholder="Reply"
        marginLeft="3rem"
        head={comment._id}
        width="80%"
        avatarWidth="30px"
        setNodes={setNodes}
        btnTxt="Reply"
      ></CommentBox>

      <style jsx>{`
        .comment {
           {
            /* margin-bottom: 1rem; */
          }
          padding: 1rem;
          border-radius: 1rem;
        }
        .comment:hover {
          background-color: var(--bg-hover);
        }
        .vLine {
          margin-top: auto;
          margin-bottom: auto;
          margin-left: auto;
          margin-right: auto;
          width: 1.5px;
          height: 100%;
          background-color: #1e9df134;
        }
        .vLine {
          margin-top: auto;
          margin-bottom: auto;
          margin-left: auto;
          margin-right: auto;
          width: 2px;
          height: calc(100% - 155px);
          background-color: var(--primary-color);
          background-color: var(--border-color-2);
        }
        .comment-header {
          position: relative;
          align-items: flex-start;
        }
        .commentText {
          margin-bottom: 1rem;
        }
        .replies {
          margin-block: 1rem;
        }
      `}</style>
    </div>
  );
}
