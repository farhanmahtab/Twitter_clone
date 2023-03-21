import { CogIcon } from '@heroicons/react/outline'
import React from 'react'
import styles from "../styles/Feed.module.css"
import PostBox from './PostBox'

export default function Feed() {
  return (
    <div className={styles.main}>
      <div className={styles.homeBar}>
          <h2>Home</h2>
          <CogIcon className={styles.homeBarIcon}/>
      </div>
      <PostBox/>
    </div>
  )
}
