import React from 'react'
import classes from './Campaign.module.css'
import { Link } from 'react-router-dom'

const Campaign = () => {
    return (
        <div className={classes.campaign_wrap}>
            <div className={classes.campaign_box1}>
                <div className={classes.campaign_box1_keywords}>
                    <span className={classes.campaign_box1_keywords_1}>The Story</span>
                    <span className={classes.campaign_box1_keywords_2}>Sustainable</span>
                    <span className={classes.campaign_box1_keywords_3}>Materials</span>
                </div>
                <div className={classes.campaign_box1_main_visual}>
                    <div className={classes.campaign_box1_main_visual_frame}>
                        <div className={classes.campaign_box1_main_visual_frame_top}>
                            <img src="./img/Campaign_box1_frame_1.jpeg" alt="" />
                        </div>
                        <div className={classes.campaign_box1_main_visual_frame_bottom}>
                            <div className={classes.campaign_box1_main_visual_frame_text_wrap}>
                                <div className={classes.campaign_box1_main_visual_frame_text_title}>
                                    <span>ROSE</span>
                                </div>
                                <div className={classes.campaign_box1_main_visaul_frame_text_sub}>
                                    <div className={classes.campaign_box1_main_visaul_frame_text_sub_wrap}>
                                        <p>AROMATICA is on a unique journey around the world</p>
                                        <p>in search of precious ingredients grown sustainably and ethically.</p>
                                        <p>Today, I will tell you the story of the third story, Rose (ROSE) raw material</p>
                                    </div>
                                    <div className={classes.campaign_box1_main_visaul_frame_text_sub_more}>
                                        <Link to='/'>More</Link>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.campaign_box1_main_visual_frame_2_img}>
                                <img src="./img/Campaign_box1_frame_2.jpeg" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className={classes.campaign_box1_main_visaul_add}>
                        <img src="./img/Campaign_box1_add_1.jpeg" alt="" />
                    </div>
                </div>
            </div>
            <div className={classes.campaign_box2}>
                <div className={classes.campaign_box2_keywords}>
                    <p>Total Rest for Me: Weekenders Bath</p>
                </div>
                <div className={classes.campaign_box2_main_visual}>
                    <div className={classes.campaign_box2_main_visaul_left}>
                        <div className={classes.campaign_box2_main_visaul_left_img}>
                            <img src="./img/Campaign_box2_frame_1.jpeg" alt="" />
                        </div>
                        <div className={classes.campaign_box2_main_visaul_left_text}>
                            <p>But sometimes there are times</p>
                            <p>when you really need it.</p>
                            <p>It's because it's important to</p>
                            <p>take care of yourself,</p>
                            <p>feel your thoughts,</p>
                            <p>and take care of your body and mind.</p>
                        </div>
                    </div>
                    <div className={classes.campaign_box2_main_visual_right}>
                        <div className={classes.campaign_box2_main_visaul_right_text}>
                            <p>Have you ever soaked in the bathtub</p>
                            <p>and had some time just for yourself?</p>
                            <p>With the unavoidable stress of a</p>
                            <p>busy life, it can be difficult to find</p>
                            <p>time for yourself.</p>
                        </div>
                        <div className={classes.campaign_box2_main_visaul_right_img}>
                            <img src="./img/Campaign_box2_frame_2.jpeg" alt="" />
                        </div>
                        <div className={classes.campaign_box2_main_visaul_right_more}>
                            <Link to='/'>More</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Campaign