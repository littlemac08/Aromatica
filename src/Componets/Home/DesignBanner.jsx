import React from 'react'
import classes from './DesignBanner.module.css'

const DesignBanner = () => {
    const designData = {
        box1: {
            title: 'Life Pairs',
            img: './img/DesignBanner1.jpeg'
        },
        box2: {
            title: 'With',
            img: './img/DesignBanner2.jpeg'
        },
        box3: {
            title:'Aromatherapy',
            img: './img/DesignBanner3.png'
        }
    }
    const { box1, box2, box3 } = designData

    return (
        <div className={classes.design_banner_wrap}>
            <div className={classes.design_banner_box1}>
                <span>{box1.title}</span>
                <div className={classes.design_banner_box1_img}>
                    <img src={box1.img} alt="" />
                </div>
            </div>
            <div className={classes.design_banner_box2}>
                <span>{box2.title}</span>
                <div className={classes.design_banner_box2_img}>
                    <img src={box2.img} alt="" />
                </div>
            </div>
            <div className={classes.design_banner_box3}>
                <span>{box3.title}</span>
                <div className={classes.design_banner_box3_img}>
                    <img src={box3.img} alt="" />
                </div>
            </div>
            <span className={classes.design_circle}></span>
        </div>
    )
}

export default DesignBanner