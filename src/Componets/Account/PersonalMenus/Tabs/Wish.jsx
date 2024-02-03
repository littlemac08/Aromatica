import React, { useEffect, useState } from 'react'
import { PiFileArrowUpFill, PiFileArrowUpThin, PiShoppingCartSimpleThin, PiShoppingCartSimpleFill, PiTrashThin, PiTrashFill } from "react-icons/pi";
import { get, onValue, ref, set } from 'firebase/database';
import { database } from '../../../Commu/Sdk'
import { Link } from 'react-router-dom';
import classes from './Wish.module.css'

const Wish = ({loginUserState}) => {
  const [heartList, setHeartList] = useState(null)
  const [itemHeartList, setItemHeartList]= useState(null)
  useEffect(() => {
    const fetchData = async () => {
        try {
            const itemsRef = ref(database, 'shop/products');
            const itemsWishSnapshot = await get(itemsRef);
            const itemsWishData = itemsWishSnapshot.val();
            if (itemsWishData !== null) {
              setItemHeartList(itemsWishData);
            }
          } catch (error) {
            console.error('아이템 가져오기 오류:', error);
        }
    };

    fetchData();
  }, [loginUserState]);
  useEffect(() => {
    const heartRef = ref(database, `users/${loginUserState}/heart`);

    const unsubscribe = onValue(heartRef, (snapshot) => {
        const heartData = snapshot.val();
        if (heartData !== null) {
          setHeartList(heartData);
        } else {
          setHeartList(null);
        }
    });

    return () => unsubscribe();
  }, [loginUserState]);

  async function handlerDeleteWishItem(item){
    const userConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (userConfirmed) {
      const heartRef = ref(database, `users/${loginUserState}/heart`);

      try {
          const snapshot = await get(heartRef);
          const heartData = snapshot.val();
          const updatedHeartData = heartData.filter(id => id !== item);
          await set(heartRef, updatedHeartData);

      } catch (error) {
          console.error('Error handling heart items:', error.message);
      }
    } else {
      return
    }
  }
  
  const handlerShowHeartList = heartList && heartList.map((item,index)=>{
    const wishCode = itemHeartList && itemHeartList[item]
    return  <li className={classes.wish_tab_body_items} key={index}>
              <div className={classes.wish_tab_body_items_no}>
                <span>{index+1}</span>
              </div>
              <div className={classes.wish_tab_body_itmes_title}>
                <span>{wishCode && wishCode.title1}</span>
              </div>
              <div className={classes.wish_tab_body_items_price}>
                <span>{wishCode && wishCode.price.toLocaleString()}</span>
              </div>
              <Link to={wishCode && `/shop/${wishCode.url}`}>
                <div className={classes.wish_tab_body_items_detail}>
                  <div className={classes.wish_tab_body_items_detail_icon}>
                    <div>
                      <PiFileArrowUpThin />
                    </div>
                    <div>
                      <PiFileArrowUpFill />
                    </div>
                  </div>
                  <span>
                    More
                  </span>
                </div>
              </Link>
              <div className={classes.wish_tab_body_items_cart} onClick={()=>handlerWishToCart(item)}>
                <div className={classes.wish_tab_body_items_cart_icon}>
                  <div>
                    <PiShoppingCartSimpleThin />
                  </div>
                  <div>
                    <PiShoppingCartSimpleFill />
                  </div>
                </div>
                <span>
                  Cart
                </span>
              </div>
              <div className={classes.wish_tab_body_items_trash} onClick={()=>handlerDeleteWishItem(item)}>
                <div className={classes.wish_tab_body_items_trash_icon}>
                  <div>
                        <PiTrashThin />
                    </div>
                    <div>
                        <PiTrashFill />
                    </div>
                </div>
                <span>
                  Trash
                </span>
              </div>
            </li>
  })

  async function handlerWishToCart(item){
      const cartName = item;
  
      // Dynamically create an object with the name derived from cartName
      // const cartObject = {
      //   url: cartName,
      //   count: 1,
      // };
  
      // Get the current userCart data from Firebase
      const useRef = ref(database, `users/${loginUserState}/cart`);
      const snapshot = await get(useRef);
      const currentCartData = snapshot.val();
  
      // Check if the product already exists in the userCart
      if (currentCartData && currentCartData[cartName]) {
        // If it does, ask for confirmation
        alert('Product already in cart');
      } else {
        const confirmCart = window.confirm('Would you like to add this product to your shopping cart?');
        if(confirmCart){
          // If it doesn't exist, add a new entry
          const updatedCartObject = {
            ...currentCartData,
            [cartName]: {
              url: cartName,
              count: 1,
            },
          };
          // Update the userCart data in Firebase
          set(useRef, updatedCartObject);
        } else {
          return 
        }
        // Log the updated cart data to the console
      }
  }

  return (
    <div className={classes.wish_tab_wrap}>
        <div className={classes.wish_tab_title}>
          <span>Wish List</span>
        </div>
        <ul className={classes.wish_tab_body}>
          {itemHeartList && heartList && handlerShowHeartList}
        </ul>
    </div>
  )
}

export default Wish
