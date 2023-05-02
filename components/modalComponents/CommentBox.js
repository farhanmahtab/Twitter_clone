import { useRouter } from "next/router";
import React, { useState } from "react";
import Avatar from "../common/avatar/avatar";
import Button from "../common/button/button";
import style from "../common/post/post.module.css";
import { useSession } from "next-auth/react";
export default function CommentBox({
  placeholder = "Comment",
  btnTxt = "Tweet",
  marginLeft = "0px",
  head,
  showPrivacy = false,
  setNodes,
  setCommentCount,
  setCommentsList,
  fontSize = "1rem",

  avatarWidth = "40px",
}) {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const postid = router.query.id;
  const session = useSession();
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={style.post}
      style={{
        width: "100%",
        maxWidth: "600px",
        marginLeft,
        borderBottom: "none",
      }}
    >
      <section className={style.image}>
        <Avatar width={avatarWidth} image={session.data?.user.image}></Avatar>
      </section>
      <section className={style.body}>
        <form action="">
          <textarea
            style={{ height: "50px", width: "90%", fontSize: fontSize }}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            value={comment}
            placeholder={placeholder}
            type="text"
          />
        </form>

        {showPrivacy && (
          <div className={style.privacyShow}>
            <p>
              <span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-.25 10.48L10.5 17.5l-2-1.5v-3.5L7.5 9 5.03 7.59c1.42-2.24 3.89-3.75 6.72-3.84L11 6l-2 .5L8.5 9l5 1.5-1.75 1.73zM17 14v-3l-1.5-3 2.88-1.23c1.17 1.42 1.87 3.24 1.87 5.23 0 1.3-.3 2.52-.83 3.61L17 14z"></path>
                  </g>
                </svg>
              </span>
              Everyone can view
            </p>
          </div>
        )}
        {/* <div className={style.hr} style={{ marginBottom: "0px" }}></div> */}

        <div className={style.likeNcommnet}>
          {/* <div>
                        <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path></g></svg>
                    </div> */}
          <div>
            <Button
              disabled={comment == ""}
              style={{
                paddingBlock: ".5rem",
              }}
              onclick={async () => {
                setLoading(true);

                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify({
                  owner: session.data.user.id,
                  tweetText: comment,
                  head: head == null ? postid : head,
                });

                const requestOptions = {
                  method: "POST",
                  headers: myHeaders,
                  body: raw,
                  redirect: "follow",
                };

                try {
                  const response = await fetch(
                    "/api/v2/posts/comment",
                    requestOptions
                  );

                  const result = await response.json();

                  if (response.ok) {
                    if (setNodes) {
                      setNodes((state) => [result.tweet, ...state]);
                    }
                    if (setCommentCount) {
                      setCommentCount(result.comments);
                    }
                    if (setCommentsList) {
                      setCommentsList((state) => [result.tweet, ...state]);
                    }
                  }
                  // route.replace('/')
                } catch (error) {}

                setLoading(false);

                setComment("");
              }}
            >
              {btnTxt}
            </Button>
          </div>
          {/* <div>
                        <svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
                        <span>{comments}</span>

                    </div> */}
        </div>
      </section>
    </div>
  );
}
