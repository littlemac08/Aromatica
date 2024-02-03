import React from 'react'
import classes from './MainVisual.module.css'

const MainVisual = ({homeData}) => {
  const img = homeData.main_visual_img
  const title = homeData.main_visual_title
  const headline = homeData.main_visual_headline
  return (
    <div className={classes.main_visual}>
      <div className={classes.main_visual_img}>
        <img src={img} alt="" />
      </div>
      <div className={classes.main_visual_text}>
        <p>{title}</p>
        <p>{headline}</p>
      </div>
    </div>
  )
}

export default MainVisual