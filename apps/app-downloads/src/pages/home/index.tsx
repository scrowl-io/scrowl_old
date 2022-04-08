import React from 'react'
import styles from './styles.module.scss'

export const Route = '/'
export const Name = 'Home'

export const Element = () => {
  return (
    <div className={styles.container}>
      <h1>{Name} Page</h1>
      <div>
        <a href="./scrowl.dmg">Download App (MAC)</a>
      </div>
    </div>
  )
}

export default {
  Route,
  Element,
}
