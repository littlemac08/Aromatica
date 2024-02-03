import React from 'react'
import classes from './Yet.module.css'

const Yet = () => {
  return (
    <div className={classes.yet_wrap}>
        <div className={classes.yet_title}>
            미구현 페이지입니다.
        </div>
        <div className={classes.yet_bg}>
            <img src="/img/yet.jpg" alt="" />
        </div>
    </div>
  )
}

export default Yet