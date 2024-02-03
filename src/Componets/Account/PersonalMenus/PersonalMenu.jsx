import React, { useEffect, useState } from 'react'
import { PiHeartThin, PiHeartFill, PiShoppingCartSimpleThin, PiShoppingCartSimpleFill, PiClockThin, PiClockFill, PiClipboardTextThin, PiClipboardTextFill, PiCallBellThin, PiCallBellFill, PiArrowLineRightThin, PiUploadFill, PiUploadThin } from "react-icons/pi";
import Cart from './Tabs/Cart';
import Recent from './Tabs/Recent';
import classes from './PersonalMenu.module.css'
import Wish from './Tabs/Wish';
import Upload from './Tabs/Upload';

const PersonalMenu = ({personalMenus, setPersonalMenus, loginUserState, managerState}) => {
    const [personalTabState, setPersonalTabState] = useState('cart_tab');
    const [menuOpen, setMenuOpen] = useState(`${classes.personal_menu_wrap}`)
    const customId = managerState ? 'personal_product' : 'personal_contact'
    useEffect(()=>{
        if(personalMenus){
            setMenuOpen(`${classes.personal_menu_wrap_on}`)
        } else {
            setMenuOpen(`${classes.personal_menu_wrap}`)
        }

    },[personalMenus])

    function handlerPersonalTab(event) {
        const { id } = event.currentTarget
    
        switch(id) {
            case 'personal_cart':
                setPersonalTabState('cart_tab');
                break;
            case 'personal_recent':
                setPersonalTabState('recent_tab');
                break;
            case 'personal_wish':
                setPersonalTabState('wish_tab');
                break;
            case 'personal_history':
                setPersonalTabState('history_tab');
                break;
            case 'personal_contact':
                setPersonalTabState('contact_tab');
                break;
            case 'personal_product':
                setPersonalTabState('product_tab');
                break;
            default:
                break;

        }
    }

    function handlerPersonalMenuClose(){
        setPersonalMenus(false)
    }

  return (
    <div className={menuOpen}>
        <div className={classes.personal_menu_name}>
            <span>NAME PARTS</span>
            <span className={classes.personal_menu_close} onClick={handlerPersonalMenuClose}><PiArrowLineRightThin /></span>
        </div>
        <div className={classes.personal_menu_grade}>
            <span>grade</span>
        </div>
        <ul className={classes.personal_menu_titles}>
            <li id='personal_cart' onClick={handlerPersonalTab}>
                <div className={classes.personal_menu_icon_wrap}>
                    <div>
                        <PiShoppingCartSimpleThin />
                    </div>
                    <div>
                        <PiShoppingCartSimpleFill />
                    </div>
                </div>
                <span>Cart</span>
            </li>
            <li id='personal_recent' onClick={handlerPersonalTab}>
                <div className={classes.personal_menu_icon_wrap}>
                    <div>
                        <PiClockThin />
                    </div>
                    <div>
                        <PiClockFill />
                    </div>
                </div>
                <span>Recently</span>
            </li>
            <li id='personal_wish' onClick={handlerPersonalTab}>
                <div className={classes.personal_menu_icon_wrap}>
                    <div>
                        <PiHeartThin />
                    </div>
                    <div>
                        <PiHeartFill />
                    </div>
                </div>
                <span>Wish List</span>
            </li>
            <li id='personal_history' onClick={handlerPersonalTab}>
                <div className={classes.personal_menu_icon_wrap}>
                    <div>
                        <PiClipboardTextThin />
                    </div>
                    <div>
                        <PiClipboardTextFill />
                    </div>
                </div>
                <span>Payment History</span>
            </li>
            <li id={customId} onClick={handlerPersonalTab}>
                {managerState ? 
                    <div className={classes.personal_menu_icon_wrap}>
                        <div>
                            <PiUploadThin />
                        </div>
                        <div>
                            <PiUploadFill />
                        </div>
                    </div>
                :
                    <div className={classes.personal_menu_icon_wrap}>
                        <div>
                            <PiCallBellThin />
                        </div>
                        <div>
                            <PiCallBellFill />
                        </div>
                    </div>}
                {managerState ?
                    <span>Products Upload</span>
                :
                    <span>Contact Us</span>}
            </li>
        </ul>
        <ul className={classes.personal_menu_tabs}>
            {personalTabState === 'cart_tab' ? 
                <li id='cart_tab'>
                    <Cart loginUserState={loginUserState} />
                </li>
                :
                null
            }
            {personalTabState === 'recent_tab' ? 
                <li id='recent_tab'>
                    <Recent loginUserState={loginUserState} />
                </li>
                :
                null
            }
            {personalTabState === 'wish_tab' ? 
                <li id='wish_tab'>
                    <Wish loginUserState={loginUserState} />
                </li>
                :
                null
            }
            {personalTabState === 'history_tab' ? 
            <li id='history_tab'>
                Payment History
            </li>
                :
                null
            }
            {personalTabState === 'contact_tab' ? 
            <li id='contact_tab'>
                Contact Us
            </li>
                :
                null
            }
            {personalTabState === 'product_tab' ? 
            <li id='product_tab'>
                <Upload />
            </li>
                :
                null
            }
        </ul>
        <div className={classes.personal_menu_more}>
            <span>Edit Profile</span>
        </div>

    </div>
  )
}

export default PersonalMenu