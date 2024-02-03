import React, { useState } from 'react'
import ShopTitle from './ShopTitle'
import classes from './Shop.module.css'
import ShopBody from './ShopBody'

const Shop = ({categoryIndex, menuIndex, shopData, insiteBest, setInsiteBest, loginUserState}) => {
    const [keywordFilter, setKeywordFilter] = useState('New Arrival')
    return (
        <div className={classes.shop_wrap}>
            <div className={classes.show_category_banner}>
                <img src="./img/Shop_new_arrival.jpg" alt="new arrival" />
            </div>
            <ShopTitle
                categoryIndex={categoryIndex}
                menuIndex={menuIndex}
                setKeywordFilter={setKeywordFilter} 
                insiteBest={insiteBest}
                setInsiteBest={setInsiteBest}
                />
            <ShopBody keywordFilter={keywordFilter} shopData={shopData} loginUserState={loginUserState}/>
        </div>
    )
}

export default Shop