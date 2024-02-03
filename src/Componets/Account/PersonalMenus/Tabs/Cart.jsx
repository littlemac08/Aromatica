import React, { useEffect, useState } from 'react';
import { PiTrashThin, PiTrashFill, PiPlusSquareThin, PiMinusSquareThin, PiMinusSquareFill, PiPlusSquareFill } from "react-icons/pi";
import { database } from '../../../Commu/Sdk'
import { ref, get, set, onValue, remove  } from 'firebase/database';
import classes from './Cart.module.css';


const Cart = ({loginUserState}) => {
    const [itemList, setItemList] = useState(null);
    const [userList, setUserList] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const itemsRef = ref(database, 'shop/products');
                const itemsSnapshot = await get(itemsRef);
                const itemsData = itemsSnapshot.val();
                setItemList(itemsData);
            } catch (error) {
                console.error('아이템 가져오기 오류:', error);
            }
        };
    
        fetchData();
    }, []);
    
    useEffect(() => {
        const cartRef = ref(database, `users/${loginUserState}/cart`);
    
        const unsubscribe = onValue(cartRef, (snapshot) => {
            const cartData = snapshot.val();
            setUserList(cartData);
        });
    
        return () => unsubscribe();
    }, [loginUserState]);

    const exchangeCartList = userList && Object.entries(userList || {}).map(([key, value]) => ({
        count: value.count,
        url: value.url,
    }));
    
    const handlerTotalCount = exchangeCartList && exchangeCartList.reduce((total, item) => total + item.count, 0);
    const handlerTotalPrice = exchangeCartList ? exchangeCartList.reduce((total, item) => {
        const codeUrl = item.url;
        const codeItem = itemList[codeUrl];
        const codeTotalPrice = item.count * codeItem.price;
        return total + codeTotalPrice;
    }, 0) : 0;
    const handleDeleteItem = (itemUrl) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (userConfirmed) {
        // Firebase에서 해당 상품 데이터 삭제
        const cartRef = ref(database, `users/${loginUserState}/cart/${String(itemUrl)}`);
        remove(cartRef);
        // 로컬 state에서 해당 상품 삭제
        const updatedExchangeCartList = exchangeCartList.filter(item => item.url !== itemUrl);
        setUserList(updatedExchangeCartList);
        }
    };
    const showUserCartItems = exchangeCartList === null ? <div>Choose Aromatica’s products</div> : exchangeCartList.map((item,index)=>{
        const codeUrl = item.url
        const codeItem = itemList[codeUrl]
        const codeTotalPrice = item.count * codeItem.price
        return <li key={index}>
                    <span>{index+1}</span>
                    <div className={classes.personal_cart_infos_name}>
                        {codeItem.title1}
                    </div>
                    <div className={classes.personal_cart_infos_price}>
                        {codeItem.price.toLocaleString()}
                    </div>
                    <div className={classes.personal_cart_infos_icons_wrap1} onClick={()=>handleQuantityChange(item.url,item.count +1)}>
                        <div className={classes.personal_cart_infos_inde}>
                            <PiPlusSquareThin />
                        </div>
                        <div className={classes.personal_cart_infos_inde2}>
                            <PiPlusSquareFill />
                        </div>
                    </div>
                    <span>X</span>
                    <div className={classes.personal_cart_infos_count}>
                        {item.count}
                    </div>
                    <div className={classes.personal_cart_infos_icons_wrap1} onClick={()=>handleQuantityChange(item.url,item.count -1)}>
                        <div className={classes.personal_cart_infos_inde}>
                            <PiMinusSquareThin />
                        </div>
                        <div className={classes.personal_cart_infos_inde2}>
                            <PiMinusSquareFill />
                        </div>
                    </div>
                    <div className={classes.personal_cart_infos_tprice}>
                        {codeTotalPrice.toLocaleString()}
                    </div>
                    <div className={classes.personal_cart_infos_icons_wrap1} onClick={()=>handleDeleteItem(item.url)}>
                        <div className={classes.personal_cart_infs_trash}>
                            <PiTrashThin />
                        </div>
                        <div className={classes.personal_cart_infs_trash2}>
                            <PiTrashFill />
                        </div>
                    </div>
                </li>
    })
    const handleQuantityChange = (itemUrl, newCount) => {
        if (newCount === 0) {
            return;
        } else {
            // Firebase의 해당 상품 수량 업데이트
            const cartRef = ref(database, `users/${loginUserState}/cart/${itemUrl}`);
            set(cartRef, { ...userList[itemUrl], count: newCount }, () => {
                // set이 완료된 후에 실행될 코드
                const updatedExchangeCartList = exchangeCartList.map(item => {
                if (item.url === itemUrl) {
                    // 기존의 객체를 유지하면서 count만 변경
                    return { ...item, count: newCount };
                }
                return item;
                });
                setUserList(updatedExchangeCartList);
            });
        }
    };

    return (
        <div className={classes.personal_cart_tab_wrap}>
            <div className={classes.personal_cart_total_count}>
                <div>Products in cart</div>
                <span>:</span>
                <div>{handlerTotalCount}</div>
            </div>
            <ul className={classes.personal_cart_infos}>
                {showUserCartItems}
            </ul>
            <div className={classes.person_cart_total}>
                <div className={classes.person_cart_total_price}>
                    {`${handlerTotalPrice.toLocaleString()} 'won'`}
                </div>
                <div className={classes.person_cart_total_pay}>
                    <span>PAY NOW</span>
                </div>
            </div>
        </div>
    )
}

export default Cart