import React from 'react'
import classes from './Footer.module.css'

const Footer = () => {
    return (
        <div className={classes.footer_wrap}>
            <div className={classes.footer_menus_wrap}>
                <div className={classes.footer_menus}>
                    <ul>
                        <li>Order / Inquiry</li>
                        <li>Social Media</li>
                        <li>B2B</li>
                        <li>Employment</li>
                    </ul>
                </div>
                <div className={classes.footer_title}>
                    <p>AROMATICA</p>
                </div>
                <div className={classes.footer_info}>
                    <div className={classes.footer_info_service}>
                        <span>Customer Service</span>
                        <span>1600-3689</span>
                        <span>MON - FRI 10 - 17  / Lunch 13 - 14</span>
                    </div>
                    <div className={classes.footer_info_address}>
                        <span>Aromatica Co. Ltd.</span>
                        <span>sh.lee@aromatica.co.kr</span>
                        <span>Gangnam-daero 162 gil 41-4</span>
                    </div>
                </div>
                <div className={classes.footer_terms}>
                    <span>© 2023 AROMATICA All rights reserved. In God we trust.</span>
                </div>
            </div>
            <div className={classes.footer_design_wrap}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

export default Footer