import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './Shop_detail_random.module.css'


const Shop_detail_random = ({shopData, nowSelect}) => {
    const [randomItems, setRandomItems] = useState([]);
    const [selectedRandomItems, setSelectedRandomItems] = useState(null);
    
        useEffect(() => {
            if (shopData) {
                const newRandomItems = Object.keys(shopData.products)
                .filter(productId => {
                    const product = shopData.products[productId];
                    return product.filter === nowSelect;
                })
                .map(productId => {
                    const product = shopData.products[productId];
                    return {
                    title: product.title1,
                    img: product.img,
                    url: product.url,
                    price: product.price
                    };
                });
        
                setRandomItems(newRandomItems);
            }
        }, [shopData, nowSelect]);
    
        useEffect(() => {
            const updatedRandomItems = getRandomItems(randomItems, 4);
            setSelectedRandomItems(updatedRandomItems);
            }, [randomItems]);
        
            function getRandomItems(array, numItems) {
            const shuffled = array.slice().sort(() => 0.5 - Math.random());
            return shuffled.slice(0, numItems);
        }
        const show = selectedRandomItems ? (
            selectedRandomItems.map((item, index) => (
                <li className={classes.shop_detail_random_item} key={index}>
                    <Link className={classes.shop_detail_random_item_link} to={`/shop/${item.url}`}>
                        <div className={classes.shop_detail_random_item_imgs}>
                            <img className={classes.shop_detail_random_item_imgs_imgs} src={item.img} alt={item.title1} />
                        </div>
                        <div className={classes.shop_detail_random_item_info}>
                            <span className={classes.shop_detail_random_item_title}>{item.title}</span>
                            <span className={classes.shop_detail_random_item_price}>{item.price.toLocaleString()} WON</span>
                        </div>
                    </Link>
                </li>
            ))
        ) : null;

    return (
        <div className={classes.shop_detail_random_wrap}>
            <ul className={classes.shop_detail_random_items}>
                {show}
                
            </ul>
        </div>
    )
}

export default Shop_detail_random