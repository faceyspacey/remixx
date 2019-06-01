import React from 'react'
import styles from '../css/App.css'

const Article = (props,state) => {
  const { title, text, url } = state
  return (
    <div>
      <div className={styles.more}>{title}</div>

      <a
        className={styles.link}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    </div>
  )
}

export default Article