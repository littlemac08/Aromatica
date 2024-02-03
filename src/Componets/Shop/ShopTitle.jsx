import React, { useEffect, useMemo, useRef, useState } from 'react'
import { PiArrowLineUpThin, PiArrowLineDownThin } from "react-icons/pi";
import classes from './Shop_title.module.css'

const Shop_title = ({categoryIndex, menuIndex, setKeywordFilter, insiteBest, setInsiteBest}) => {
    const [popupOn, setPopupOn] = useState(false);
    const [chooseMenu, setChooseMenu] = useState(categoryIndex);
    const [menuIndexChanger, setMenuIndexChanger] =useState(menuIndex);
    const popupRef = useRef(null);

    useEffect(() => {
        setChooseMenu(categoryIndex);
    }, [categoryIndex]);
    useEffect(() => {
        if(insiteBest === 'Best'){
        setMenuIndexChanger(1);
        setInsiteBest('');
        } else {
        setMenuIndexChanger(menuIndex);
        }
    }, [menuIndex, insiteBest, setInsiteBest]);
    const titleMenus2 = useMemo(() => [
        ["New Arrival", "Best", "Gift", "Event"],
        ["Essential Oil", "Synergy Oil", "Balm", "Roll On", "Defuser & Mist", "Aromatherapy Tools"],
        ["Shampoo", "Conditionner", "Treatment", "Scalp Tonic", "Hair Tools"],
        ["Wash", "Lotion", "Oil", "Hand", "Woman", "Mist", "Body Tools"],
        ["Cleanser", "Toner", "Serum & Essence", "Emulsion & Cream", "Soothing Gel", "Sun Care", "Facial Oil"],
        ["Dental", "Living"],
        ["Soap", "Refill", "Supplies", "Brand Goods"]
    ], []);

    useEffect(() => {
            setKeywordFilter(titleMenus2[categoryIndex][menuIndex]);
            setKeywordFilter(titleMenus2[chooseMenu][menuIndexChanger]);
    }, [categoryIndex, menuIndex, chooseMenu, menuIndexChanger, insiteBest, setKeywordFilter, titleMenus2]);

    function handlePopupOn(){
        setPopupOn(true);
    }
    function handlePopupOff(){
        setPopupOn(false);
    }

    const titleMenus = [
        'Recommend',
        'Aromatherapy',
        'Hair',
        'Body',
        'Skin',
        'Home',
        'Zero Waste'
    ]
    const subTitleMenus = [
        'Meet Aromatica’s Recommend Products',
        'Aromatherapy Products For You',
        'Natural Hair Products',
        'Natural Body Products',
        'Natural Skin Products',
        'Safe Home Care Products',
        'Zero Waste For Earth',
    ]

    const mainTitle = titleMenus[chooseMenu]
    const subTitle = subTitleMenus[chooseMenu]
    function titleChanger(index){
        setChooseMenu(index)
    }

    const popupMenusMap = titleMenus.map((popupMenus,popupMenuIndex)=>(
        mainTitle !== popupMenus ? <li ref={popupRef} id='popupWrap' key={popupMenuIndex} onClick={() => titleChanger(popupMenuIndex)}>{popupMenus}</li> : null
        ))
    const titlePopupClasses = `${classes.title_popup} ${popupOn ? classes.title_popup_on : ''}`;
    const titleSubShow = titleMenus2[chooseMenu].map((titleSubShowItems,titleSubShowIndex)=>(
        <li key={titleSubShowIndex} className={titleSubShowIndex === menuIndexChanger ? classes.title_sub_show_activate : ''} onClick={()=>setMenuIndexChanger(titleSubShowIndex)}>
            {titleSubShowItems}
        </li>
    ))

    return (
        <div className={classes.title_wrap}>
            <div className={classes.title_show}>
                <div className={classes.title_main} onClick={handlePopupOn} id='popupWrap'>
                    <button className={classes.title_btn}>
                        {popupOn ? <PiArrowLineUpThin /> : <PiArrowLineDownThin /> }
                    </button>
                    <div className={classes.title_text}>
                        <p>{mainTitle}</p>
                    </div>
                </div>
                <div className={classes.title_sub}>
                    <p>{subTitle}</p>
                </div>
            </div>
            <div className={classes.title_sub_show}>
                {titleSubShow}
            </div>
            <div className={titlePopupClasses}>
                <ul className={classes.title_menus}>
                    {popupMenusMap}
                    <li className={classes.popup_closed}>
                        <button onClick={handlePopupOff}>
                            <PiArrowLineUpThin />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Shop_title