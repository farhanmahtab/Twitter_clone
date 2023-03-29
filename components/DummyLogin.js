import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Modal from "./Modal";
import Comment from "./Comment";
export default function Test() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <Modal>
      <Comment />
    </Modal>
  );
  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session.user.email} <br />
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   );
  // }
  // return (
  //   <>
  //     Not signed in <br />
  //     <button onClick={() => signIn()}>Sign in</button>
  //   </>
  // );

  //   <>
  //   {router.query.modal == "comment" && (

  //   )}
  // </>
}
