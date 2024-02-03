import React, { useState } from 'react'
import { BsSearch } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import classes from './Header.module.css'


const Header = ({setCategoryIndex, setMenuIndex, setAccountState, loginUserState, setPersonalMenus}) => {
    const [category1, setCategory1] = useState(null)
    //JASON Data processing required
    const menuItems = ["Shop", "Brand", "Sustainability", "Aromatica In Life", "Benefits"]

    const subMenuItemTitles = [
        ["Recommend", "Aromatherapy", "Hair", "Body", "Skin", "Home", "Zero Waste"]
    ]
    const subMenuItems = [
        [
            ["New Arrival","Best","Gift","Event"],
            ["Essential Oil", "Synergy Oil", "Balm", "Roll On", "Defuser & Mist", "Aromatherapy Tools"],
            ["Shampoo", "Conditionner", "Treatment", "Scalp Tonic", "Hair Tools"],
            ["Wash", "Lostion", "Oil", "Hand", "Woman", "Mist", "Body Tools"],
            ["Cleanser", "Toner", "Serum & Essence", "Emulsion & Cream", "Soothing Gel", "Sun Care", "Facial Oil"],
            ["Dental", "Living"],
            ["Soap", "Refill", "Supplies", "Brand Goods"]
        ]
    ]

    const [isVisibleMenu, setIsVisibleMenu] = useState(false);
    const initialActivateState = subMenuItems.map(menuGroup => 
        menuGroup.map(menu => 
            menu.map(() => false)
        )
    );
    const [isActivate, setIsActivate] = useState(initialActivateState);
        
    function gnbSelected (index){
        if(index === isVisibleMenu){
            return classes.selected;
        }
        return '';
    }
    const headerLow1Bg = isVisibleMenu !== false ? classes.header_row1_on : classes.header_row1;
    const haederGnbSubMenu = isVisibleMenu !== false ? classes.header_gnb_sub_menu_on : classes.header_gnb_sub_menu;
    const handlerMouseOn = (index) => {
        setIsVisibleMenu(index);
        setCategory1(menuItems[index])
    }
    const handlerMouseOff = () => {
        setIsVisibleMenu(false)
    }
    
    const handleActivate = (groupIndex, index, itemIndex) => {
        setIsActivate(prevState => {
            const updatedItems = [...prevState];
            updatedItems[groupIndex][index][itemIndex] = true;
            return updatedItems;
        });
    };
    
    const handleDeActivate = (groupIndex, index, itemIndex) => {
        setIsActivate(prevState => {
            const updatedItems = [...prevState];
            updatedItems[groupIndex][index][itemIndex] = false;
            return updatedItems;
        });
    };

    function handlerLogModalOn(){
        if(loginUserState){
            setPersonalMenus(true);
        } else {
            setAccountState(true)
            setPersonalMenus(false);
        }
    }
    

    return (
        <div className={classes.header_wrap}>
            <div className={headerLow1Bg}>
                <div className={classes.header_logo_wrap}>
                    <Link to='/'>
                        <img src="https://aromatica.co.kr/layout/basic/img/logotype_w_new.png" alt="TOP LOGO" />
                    </Link>
                </div>
                <ul className={classes.header_gnb_wrap}>
                    {menuItems.map((item,index)=>(
                        <li key={index} onMouseOver={()=>handlerMouseOn(index)} className={gnbSelected(index)}>
                            <Link to={item.toLowerCase()}>
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className={classes.header_side_wrap}>
                    <div>
                        <div onClick={handlerLogModalOn}>
                            {loginUserState ?   
                                <span className={classes.login_after}><IoPersonCircleOutline /></span>
                                :
                                <span className={classes.login_before}>Login</span>
                            }
                        </div>
                        <span className={classes.header_search_icon}><BsSearch /></span>
                    </div>
                </div>
            </div>
            <div className={classes.header_gnb_sub_wrap} onMouseLeave={handlerMouseOff}>
                <div> 
                    <div className={haederGnbSubMenu}>
                        {subMenuItemTitles.map((titleGroup, titleGroupIndex)=>(isVisibleMenu === titleGroupIndex && (
                            <div key={titleGroupIndex} className={classes.header_gnb_sub_titles}>
                                {titleGroup.map((titles, titleIndex)=>(
                                    <span key={titleIndex}>
                                        {titles}
                                    </span>
                                ))}
                            </div>
                        )))}
                        {subMenuItems.map((menuGroup, groupIndex) => (isVisibleMenu === groupIndex && (
                                <div key={groupIndex} className={classes.header_gnb_sub_menus}>
                                    {menuGroup.map((menu, index)=>(
                                        <ul key={index}>
                                            {menu.map((menuItem, itemIndex)=>(
                                                <li key={itemIndex} 
                                                onMouseOver={() => handleActivate(groupIndex, index, itemIndex)}
                                                onMouseOut={() => handleDeActivate(groupIndex, index, itemIndex)}
                                                className={isActivate[groupIndex][index][itemIndex] ? classes.activate : ''}>
                                                    <Link to={`/${category1.toLowerCase()}`} onClick={() => {setCategoryIndex(index); setMenuIndex(itemIndex)} }>
                                                        {menuItem}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    ))}
                                </div>
                        )))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header