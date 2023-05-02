import React, { useContext, useState } from "react";
import Button from "../button/button";
import styles from "./SignUpDiv.module.css";
// import { ModalContext } from '@/providers/ModalProvider';
import TwitterLogo from "../svg/TwitterLogo";
import { useRouter } from "next/router";
import { MODAL_QUERY_SIGNIN, MODAL_QUERY_SIGNUP } from "@/helper/constStrings";
import { signIn } from "next-auth/react";

export default function SignUpDiv() {
  // const [ modal, setModal ] = useContext(ModalContext)
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <div className={`${styles.signUpDiv}`}>
      <TwitterLogo></TwitterLogo>
      <h1>New to Twitter?</h1>
      <p>Sign up now to get your own personalized timeline!</p>

      <Button
        onclick={() => {
          router.push("/" + MODAL_QUERY_SIGNIN);
          // modal.showSignIn = true;
          // modal.showModal = true
          // setModal({ ...modal })
        }}
        style={{ paddingBlock: ".5rem" }}
      >
        Log in
      </Button>

      <button
        className={`${styles.btnOutline} btn-primary`}
        onClick={async () => {
          // modal.showSignUp = true;
          // setModal({ ...modal })
          // router.push("/" + MODAL_QUERY_SIGNUP);
          setLoading(true);
          const res = await signIn("github", { callbackUrl: "/" });
          setLoading(false);
        }}

        // style={{
        //     backgroundColor: "White",
        //     color: "Black",
        //     border: "1px var(--border-color) solid",
        //     paddingBlock: ".5rem",
        //     // marginBlock: "1rem"
        // }}
      >
        {loading ? "Loading" : "Sign up with Github"}
      </button>
      <button
        className={`${styles.btnOutline} btn-primary`}
        onClick={() => {
          // modal.showSignUp = true;
          // setModal({ ...modal })
          router.push("/" + MODAL_QUERY_SIGNUP);
        }}
        // style={{
        //     backgroundColor: "White",
        //     color: "Black",
        //     border: "1px var(--border-color) solid",
        //     paddingBlock: ".5rem",
        //     // marginBlock: "1rem"
        // }}
      >
        Create account
      </button>

      <p>
        By signing up, you agree to the <span>Terms of Service</span> and
        <span>Privacy Policy</span>, including <span>Cookie Use</span>.
      </p>
    </div>
  );
}

// import React, { useContext } from 'react'
// import Button from '../button/button';
// import styles from "./SignUpDiv.module.css"
// import { ModalContext } from '@/providers/ModalProvider';
// import TwitterLogo from '../svg/TwitterLogo';

// export default function SignUpDiv() {
//     const [ modal, setModal ] = useContext(ModalContext)
//     return (
//         <div className={`${styles.signUpDiv} ${modal.showModal && styles.showSignIn}`}

//         >
//             <TwitterLogo></TwitterLogo>
//             <h1>New to Twitter?</h1>
//             <p>Sign up now to get your own personalized timeline!</p>

//             {modal.showSignIn || <Button
//                 onclick={() => {
//                     modal.showSignIn = true;
//                     modal.showModal = true
//                     setModal({ ...modal })
//                 }}
//                 style={{ paddingBlock: ".5rem", }}
//             >Log in</Button>}

//             <button
//                 className={`${styles.btnOutline} btn-primary`}
//                 onClick={() => {
//                     modal.showSignUp = true;
//                     setModal({ ...modal })
//                 }}
//             // style={{
//             //     backgroundColor: "White",
//             //     color: "Black",
//             //     border: "1px var(--border-color) solid",
//             //     paddingBlock: ".5rem",
//             //     // marginBlock: "1rem"
//             // }}
//             >Sign up with Github</button>
//             <button
//                 className={`${styles.btnOutline} btn-primary`}
//                 onClick={() => {
//                     modal.showSignUp = true;
//                     setModal({ ...modal })
//                 }}
//             // style={{
//             //     backgroundColor: "White",
//             //     color: "Black",
//             //     border: "1px var(--border-color) solid",
//             //     paddingBlock: ".5rem",
//             //     // marginBlock: "1rem"
//             // }}
//             >Create account</button>
//             {modal.showSignIn && <>
//                 <form action="">

//                     <div className={styles[ "input-group" ]}>
//                         <input required type="email" name="email" className={styles[ "input" ]} />
//                         <label className={styles[ "user-label" ]}>Email</label>
//                     </div>
//                     <div className={styles[ "input-group" ]}>
//                         <input required type="password" autoComplete='false' name="password" className={styles[ "input" ]} />
//                         <label className={styles[ "user-label" ]}>Password</label>
//                     </div>
//                     <input className='btn-primary' type="submit"
//                         style={{
//                             paddingBlock: ".5rem",
//                             backgroundColor: 'black'
//                         }}
//                     />
//                 </form>
//             </>
//             }
//             <p>By signing up, you agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>, including <span>Cookie Use</span>.</p>
//         </div>
//     )
// }
