import React from 'react'
import classes from './MainPromotion.module.css'
import { Link } from 'react-router-dom'

const MainPromotion = ({homeData}) => {
    const promotionProduct = homeData.promotion
    const {
        title1,
        title2,
        title3,
        subtitle,
        img,
        url
    } = promotionProduct
  return (
    <div className={classes.main_promotion}>
        <div className={classes.main_promotion_wrap}>
            <div className={classes.main_promotion_text}>
                <div className={classes.main_promotion_titles}>
                    <p className={classes.main_promotion_titles_main}>
                        {title1}
                    </p>
                    <p className={classes.main_promotion_titles_main}>
                        {title2}
                    </p>
                    <p className={classes.main_promotion_titles_main}>
                        {title3}
                    </p>
                    <p className={classes.main_promotion_title_sub}>
                        {subtitle}
                    </p>
                </div>
                <div className={classes.main_promotion_title_more}>
                    <Link to={url}>more</Link>
                    <span></span>
                </div>
            </div>
            <div className={classes.main_promotion_img}>
                <img src={img} alt="promotion" />
            </div>
        </div>
    </div>
  )
}

export default MainPromotion