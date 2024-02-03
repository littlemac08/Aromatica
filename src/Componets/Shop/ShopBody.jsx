import React, { useEffect, useMemo, useState } from 'react'
import { IoHeart,IoHeartOutline,IoCartOutline } from "react-icons/io5";
import { Link } from 'react-router-dom'
import { get, onValue, ref, set } from 'firebase/database';
import { database } from '../Commu/Sdk'
import classes from './Shop_body.module.css'


const ShopBody = ({keywordFilter, shopData, loginUserState}) => {
    const mostPoularDetail = shopData.products
    const selectedFilter = keywordFilter;
    // const filteredProducts = Object.values(mostPoularDetail).filter(product => product.filter === selectedFilter);
    const filteredProducts = useMemo(() => {
        return Object.values(mostPoularDetail).filter(product => product.filter === selectedFilter);
    }, [mostPoularDetail, selectedFilter]);
    
    const [heartStates, setHeartStates] = useState({});
    useEffect(() => {
        const heartRef = ref(database, `users/${loginUserState}/heart`);
        const unsubscribe = onValue(heartRef, snapshot => {
            const heartData = snapshot.val();
    
            if (heartData) {
                // heartData를 기반으로 상태 업데이트
                const updatedHeartStates = {};
                filteredProducts.forEach(product => {
                    updatedHeartStates[product.url] = heartData.includes(product.url);
                });
                
                // 상태 업데이트
                setHeartStates(updatedHeartStates);
            } else {
                setHeartStates({})
            }
        });
    
        return () => unsubscribe();
    }, [loginUserState, filteredProducts]);

    async function handlerHeartItems(itemUrl) {
        if (loginUserState) {
            const heartRef = ref(database, `users/${loginUserState}/heart`);
    
            try {
                const snapshot = await get(heartRef);
                const heartData = snapshot.val();
    
                if (heartData && heartData.includes(itemUrl)) {
                    // 이미 찜한 경우 데이터에서 삭제
                    const updatedHeartData = heartData.filter(url => url !== itemUrl);
                    await set(heartRef, updatedHeartData);
                } else {
                    // 찜하지 않은 경우 데이터에 추가
                    const updatedHeartData = [itemUrl, ...(heartData || [])];
                    await set(heartRef, updatedHeartData);
                }
            } catch (error) {
                console.error('Error handling heart items:', error.message);
            }
        }
    }


    async function handlerRecentItems(itemUrl) {
        if (loginUserState) {
            const recentRef = ref(database, `users/${loginUserState}/recent`);
    
            try {
                const snapshot = await get(recentRef);
                const recentData = snapshot.val();
                if(recentData){
                    if (recentData.length >= 5) {
                        recentData.shift(); // Remove the first item
                    } 
    
                    const updatedRecentData = recentData.filter(id => id !== itemUrl);
                    updatedRecentData.push(itemUrl);
                    await set(recentRef, updatedRecentData);
                } else {
                    await set(recentRef, [itemUrl])
                }
            } catch(error){
                console.error('recent Item Upload fail', error)
            }
        } else {
            return
        }
    }
    
    
    const productList = filteredProducts.map((product, productIndex) => (
        <div className={classes.shop_body_content} key={productIndex}>
            <Link to={`/shop/${product.url}`} onClick={()=>{handlerRecentItems(product.url)}}>
                <div className={classes.shop_body_img}>
                    <img src={product.img} alt={product.img} />
                </div>
                <div className={classes.shop_body_tag}>
                    <ul className={classes.shop_body_tag_wrap}>
                        <li>{product.tag1}</li>
                        <li>{product.tag2}</li>
                        <li>{product.tag3}</li>
                    </ul>
                </div>
                <div className={classes.shop_body_info}>
                    <div className={classes.shop_body_info_title}>
                        <p>{product.title1}</p>
                        <p>{product.title2}</p>
                    </div>
                    <div className={classes.shop_body_info_price}>{`${parseInt(product.price).toLocaleString()} won`}</div>
                </div>
            </Link>
            <div className={classes.heart_cart} onClick={()=>{handlerHeartItems(product.url)}}>
                <div className={classes.heart}>
                    {heartStates[product.url] ? 
                        <div>
                            <IoHeart />
                        </div>
                    :
                        <div>
                            <IoHeartOutline />
                        </div>
                    }
                </div>
                <div>
                    <IoCartOutline />
                </div>
            </div>
        </div>
    ))
    


    return (
        <div className={classes.shop_body_wrap}>
            {productList}

        </div>
    )
}

export default ShopBody