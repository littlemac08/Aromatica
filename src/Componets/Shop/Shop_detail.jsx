import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { SlArrowRight,SlArrowLeft } from "react-icons/sl";
import { useParams } from 'react-router-dom';
import { FaApplePay } from "react-icons/fa";
import { ref, get, set  } from 'firebase/database';
import { database } from '../Commu/Sdk'
import ShopDetailRandom from './Shop_detail_random';


import classes from './Shop_detail.module.css'

const Shop_detail = ({shopData, loginUserState}) => {
    const [nowSelect, setNowSelect] = useState(null)
    const [productData, setProductData] = useState(null);
    const { productId } = useParams();
    useEffect(()=>{
      const filterValue = productData?.filter;

      if(filterValue){
        setNowSelect(filterValue)
      }
    },[productData])

    const [imgState, setImgState] = useState(0);
    const [imgPrevState, setImgPrevState] = useState(0);
    const [imgRightButton, setImgRightButton] = useState(true);
    const [imgLeftButton, setImgLeftButton] = useState(false);

    const [tabState, setTabState] = useState("Information");
    const [countState, setCountState] = useState(1);

    const [buttonOnOff, setButtonOnOff] = useState(false);
    const tabs = ["Information","ingredient","How to use"]

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://aromatica-7f432-default-rtdb.asia-southeast1.firebasedatabase.app/shop/products/${productId}.json`);
          setProductData(response.data);
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };
      fetchData();
    }, [productId]);



    const imgs = productData?.detail_thum ? Object.values(productData.detail_thum) : [];

    function countInc(){
      setCountState((prevCount) => prevCount + 1);
    }
    function countDnc(){
      setCountState((prevCount) => (prevCount === 1 ? 1 : prevCount - 1));
    }
    function imgRight(){
      setImgLeftButton(false)
      setImgRightButton(true)
      setImgState(
        (prev)=>{
          setImgPrevState(prev);
          return prev === imgs.length -1 ? 0 : prev +1
        }
      )
    }
    function imgLeft(){
      setImgRightButton(false)
      setImgLeftButton(true)
      setImgState(
        (prev)=>{
          setImgPrevState(prev)
          return prev === 0 ? imgs.length -1 :prev -1
        }
      )
    }
    const imgStateBar = imgs.map((item, index)=>(
      <span key={index} className={`${classes.shop_detail_main_items_img_state_bar} ${imgState === index ? classes.shop_detail_main_items_img_state_bar_on : ''}`}></span>
    ))
    
    const cartOn = buttonOnOff ? 
      `${classes.shop_detail_main_items_text_buy_func_cart_on}` : `${classes.shop_detail_main_items_text_buy_func_cart}`
    const nowOff = buttonOnOff ?
      `${classes.shop_detail_main_items_text_buy_func_now_off}` : `${classes.shop_detail_main_items_text_buy_func_now}`

    function handlerButtonOn(){
      setButtonOnOff(true)
    }
    function handlerButtonOut(){
      setButtonOnOff(false)
    }

    const tabMapping = {
      "Information": "detail_info",
      "ingredient": "detail_ing",
      "How to use": "detail_how",
    };
    const chooseData = productData && productData[tabMapping[tabState]]

    async function handlerOnUserCart() {
      if (loginUserState === null) {
        alert('Please log in first');
      } else {
        const cartName = productData.url;
    
        // Dynamically create an object with the name derived from cartName
        // const cartObject = {
        //   url: cartName,
        //   count: countState,
        // };
    
        // Get the current userCart data from Firebase
        const useRef = ref(database, `users/${loginUserState}/cart`);
        const snapshot = await get(useRef);
        const currentCartData = snapshot.val();
    
        // Check if the product already exists in the userCart
        if (currentCartData && currentCartData[cartName]) {
          // If it does, ask for confirmation
          alert('Product already in cart.');
        } else {
          const confirmCart = window.confirm('Would you like to add this product to your shopping cart?');
          if(confirmCart){
            // If it doesn't exist, add a new entry
            const updatedCartObject = {
              ...currentCartData,
              [cartName]: {
                url: cartName,
                count: countState,
              },
            };
            // Update the userCart data in Firebase
            set(useRef, updatedCartObject);
            setCountState(1)
          } else {
            return 
          }
          // Log the updated cart data to the console
        }
      }
    }

  return (
    <div className={classes.shop_detail_wrap}>
      <div className={classes.shop_detail_main}>
        <div className={classes.shop_detail_main_title}>
          <span>{productData && `${productData.title1} ${productData.title2}`}</span>
          </div>
        <div className={classes.shop_detail_main_items}>
          <div className={classes.shop_detail_main_items_img}>
            <div className={classes.shop_detail_main_items_img_button}>
              <span className={classes.shop_detail_main_items_img_button_left} onClick={imgLeft}><SlArrowLeft /></span>
              <span className={classes.shop_detail_main_items_img_button_right} onClick={imgRight}><SlArrowRight /></span>
            </div>
            <div className={classes.shop_detail_main_items_img_state}>
              {imgStateBar}
            </div>
            <ImgSlider imgs={imgs} imgRightButton={imgRightButton} imgLeftButton={imgLeftButton} imgState={imgState} imgPrevState={imgPrevState}/>
          </div>
          <div className={classes.shop_detail_main_items_text}>
            <Tab tabs={tabs} setTabState={setTabState} chooseData={chooseData}/>
            <div className={classes.shop_detail_main_items_text_price}>
              {productData && `${parseInt(productData.price).toLocaleString()} won`}
            </div>
            <div className={classes.shop_detail_main_items_text_buy}>
              <div className={classes.shop_detail_main_items_text_buy_choose}>
                <div className={classes.shop_detail_main_items_text_buy_dec} onClick={countDnc}>-</div>
                <div className={classes.shop_detail_main_items_text_buy_number}>{countState}</div>
                <div className={classes.shop_detail_main_items_text_buy_inc} onClick={countInc}>+</div>
              </div>
              <div className={classes.shop_detail_main_items_text_buy_func}>
                <div className={classes.shop_detail_main_items_text_buy_func_insite}>
                  <div className={cartOn} onMouseOver={handlerButtonOn} onMouseOut={handlerButtonOut} onClick={handlerOnUserCart}>
                    Cart
                  </div>
                  <div className={nowOff} onMouseOver={handlerButtonOut} onMouseOut={handlerButtonOut}>
                    Buy Now
                  </div>
                </div>
                <div className={classes.shop_detail_main_items_text_buy_func_outsite}>
                  <div className={classes.shop_detail_main_items_text_buy_func_apay}>
                    <div>
                      <FaApplePay />
                    </div>
                  </div>
                </div>
                <div className={classes.shop_detail_main_items_text_buy_func_promotxt}>
                  <span>4,000 won points paid upon new join</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <ShopDetailRandom shopData={shopData} nowSelect={nowSelect} />
    </div>
  )
}

export default Shop_detail


const ImgSlider = ({imgs,imgRightButton,imgLeftButton,imgState,imgPrevState}) => {
  const thumSlider = imgs.map((item, index) => {
    let basic = '';
    let imgClass = ''; 
  
    if (imgRightButton) {
      basic = classes.thumbR;
      imgClass = index === imgState ? classes.thumbNow : index === imgPrevState ? classes.thumbPrevR : '';
    } else if (imgLeftButton) {
      basic = classes.thumbL;
      imgClass = index === imgState ? classes.thumbNow : index === imgPrevState ? classes.thumbPrevL : '';
    }
  
    return (
      <img
        key={index}
        src={item}
        alt="thumb"
        className={`${basic} ${imgClass}`.trim()} 
      />
    );
  });

  return (
      <div className={classes.shop_detail_main_items_img_slider}>
        {thumSlider}
      </div>
  )
}


const Tab = ({tabs, setTabState, chooseData}) => {
  function tabHandler(item){
    setTabState(item)
  }
  const tabsShow = tabs.map((tabItem, tabIndex) =>(
    <li key={tabIndex} onClick={()=>tabHandler(tabItem)}>{tabItem}</li>
  ))
  return (
      <div className={classes.shop_detail_main_items_text_show}>
        <ul className={classes.shop_detail_main_items_text_show_tab}>
          {tabsShow}
        </ul>
        <ul className={classes.shop_detail_main_items_text_show_text}>
          <TabContent chooseData={chooseData}/>
        </ul>
      </div>
  )
}

const TabContent = ({chooseData}) => {
  const conditionA = ["title","description"]
  const conditionB = ["ingredients"]
  const conditionC = ["usage","efficacy"]

  const isConditionAMet = conditionA.every(key => chooseData && chooseData[key] !== undefined);
  const isConditionBMet = conditionB.every(key => chooseData && chooseData[key] !== undefined);
  const isConditionCMet = conditionC.every(key => chooseData && chooseData[key] !== undefined);

  return (
      isConditionAMet ? (
        <li>
          <p>{chooseData.title}</p>
          <span>{chooseData.description}</span>
        </li>
      ) : isConditionBMet ? (
        <li>
          <span>{chooseData.ingredients}</span>
        </li>
      ) : isConditionCMet ? (
        <li>
          <p>{chooseData.usage}</p>
          <span>{chooseData.efficacy}</span>
        </li>
      ) : null
    )
}
