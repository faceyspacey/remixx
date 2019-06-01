import React from 'react'
import universal from 'react-universal-component'

import styles from '../css/Switcher.css'

const UniversalComponent = universal(({ page }) => import(`./${page}`), {
  minDelay: 500
})
const Switcher = (props,state) => {
  console.log('Switcher', state)
  return (
    <div className={styles.switcher}>
      <UniversalComponent page={state.page} />
    </div>
  )
}


export default Switcher
