import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PiFileArrowUpFill, PiFileArrowUpThin } from "react-icons/pi";
import { database } from '../../../Commu/Sdk'

import classes from './Recent.module.css'
import { get, onValue, ref } from 'firebase/database';


const Recent = ({loginUserState}) => {
  const [recentList, setRecentList] = useState(null)
  const [productCall, setProductCall] = useState(null)
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const productCallRef = ref(database, 'shop/products');
        const productCallSnapshot = await get(productCallRef);
        const productCallData = productCallSnapshot.val();
        if(productCallData !== null){
          setProductCall(productCallData);
        }
      } catch (error) {
        console.error('product Data Call Fail',error)
      }
    }
    fetchData()
  },[loginUserState])


  useEffect(()=>{
        const recentRef = ref(database, `users/${loginUserState}/recent`);

        const unsubscribe = onValue(recentRef, (snapshot)=> {
          const recentData = snapshot.val();
          if(recentData !== null) {
            setRecentList(recentData)
          } else {
            setRecentList(null)
          }
        });
        return () => unsubscribe();
  },[loginUserState])

  const exchangeRecentList = recentList && Object.entries(recentList || {}).map(([key,value]) => ({
    index: key,
    url:value
  }))
  const handlerRecentItemShow = exchangeRecentList && exchangeRecentList.map((item,index)=>{
    const recentCode = productCall[item.url]

    return <li className={classes.personal_recent_tab_item} id={index}>
            <div className={classes.personal_recent_tab_item_no}>
              {index+1}
            </div>
            <div className={classes.personal_recent_tab_item_title}>
              <span>
                {recentCode.title1}
              </span>
              <span>
                {recentCode.title2}
              </span>
            </div>
            <div className={classes.personal_recent_tab_item_price}>
              {recentCode.price.toLocaleString()}
            </div>
            <div className={classes.personal_recent_tab_item_url}>
              <Link to={`shop/${item.url}`}>
                <div className={classes.personal_recent_tab_item_url_icon}>
                  <div>
                    <PiFileArrowUpFill />
                  </div>
                  <div>
                    <PiFileArrowUpThin />
                  </div>
                </div>
                <span>
                  more
                </span>
              </Link>
              </div>
          </li>
  })
  return (
    <div className={classes.personal_recent_tab_wrap}>
        <div className={classes.personal_recent_tab_title}>
            <span>Recent Items</span>
        </div>
        <ul className={classes.personal_recent_tab_items}>
          {handlerRecentItemShow}
        </ul>
    </div>
  )
}

export default Recent