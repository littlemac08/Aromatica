import React, { useCallback, useEffect, useState } from 'react'
import classes from './MainContent.module.css'
import { Link } from 'react-router-dom'

const MainContent = ({homeData, setInsiteBest, shopData}) => {
  const [mouseClick, setMouseClick] = useState(0)
  const [mouseOn, setMouseOn] = useState(0)
  const [mainRandomItems, setMainRandomItems] = useState('');
  const [mainRandomItemsImg, setMainRandomItemsImg] = useState('');

  
  const handlerMainItemCall = useCallback(() => {
    if (shopData) {
      const chooseItem = Object.values(shopData.products).slice(0, 3);
      setMainRandomItems(chooseItem);
      const chooseItemImgs = chooseItem.map(product => product.img);
      setMainRandomItemsImg(chooseItemImgs);
    }
  }, [shopData, setMainRandomItems, setMainRandomItemsImg]);
  
  useEffect(() => {
    handlerMainItemCall();
  }, [handlerMainItemCall]);
  

  function handlerMouseOver(index){
    setMouseOn(index)
  }
  const mostPopularItemImgs = mainRandomItemsImg && mainRandomItemsImg.map((mpImgs,mpImgIndex)=>
    <div className={classes.main_content_items_list_boxs} key={mpImgIndex} onMouseOver={()=>handlerMouseOver(mpImgIndex)} onClick={()=>handlerMouseClick(mpImgIndex)}>
      <div className={`${classes.main_content_items_list_boxs_titles} ${mouseOn === mpImgIndex ? classes.title_on : ''}`}>{mpImgIndex +1}st</div>
      <div className={classes.main_content_items_list_boxs_imgs}>
        <img className={`${mouseOn === mpImgIndex ? classes.most_mouse_on : ''}`} key={mpImgIndex} src={mpImgs} alt={`Most Popular Item ${mpImgIndex}`} />
      </div>
    </div>
  )
  function handlerMouseClick(index){
    setMouseClick(index)
  }
  const detailItem = mainRandomItems && mainRandomItems[mouseClick];
  const {
    img,
    title1,
    title2,
    tag1,
    tag2,
    tag3,
    ing1,
    ing2,
    ing3,
    ing4,
    ing5,
    detail,
    price,
    url
  } = detailItem;

  function handlerOnClickBest(){
    if(detailItem){
      setInsiteBest('Best')
    }
  }

  return (
    <div className={classes.main_content_wrap}>
      <div className={classes.main_content_title}>
        <span>Most Popular</span>
      </div>
      <div className={classes.main_content_items_wrap}>
        {detailItem &&
          <div className={classes.main_content_items_info}>
            <div className={classes.main_content_items_info_img}>
              <img src={img} alt="" />
            </div>
            <div className={classes.main_content_items_info_text}>
              <div className={classes.main_content_items_info_text_title}>
                <p>{title1}</p>
                <p>{title2}</p>
              </div>
              <div className={classes.main_content_items_info_text_ingredient}>
                <ul className={classes.main_content_items_info_text_ingredient_tag}>
                  <li>{tag1}</li>
                  <li>{tag2}</li>
                  <li>{tag3}</li>
                </ul>
                <ul className={classes.main_content_items_info_text_ingredient_name}>
                  {ing1 !== undefined ? <li>{ing1}</li> : null}
                  {ing2 !== undefined ? <li>{ing2}</li> : null}
                  {ing3 !== undefined ? <li>{ing3}</li> : null}
                  {ing4 !== undefined ? <li>{ing4}</li> : null}
                  {ing5 !== undefined ? <li>{ing5}</li> : null}
                </ul>
              </div>
              <div className={classes.main_content_items_info_text_detail}>
                <p>
                  {detail}
                </p>
              </div>
              <div className={classes.main_content_items_info_text_price}>
                <div className={classes.main_content_items_info_text_price_detail}>
                  {price.toLocaleString()} won
                </div>
                <Link to={`Shop/${url}`} className={classes.main_content_items_info_text_price_more}>
                  more
                </Link>
              </div>
            </div>
          </div>
        }
        <div className={classes.main_content_items_list}>
          <div className={classes.main_content_items_list_boxs_wrap}>
            {mostPopularItemImgs}
          </div>
          <div className={classes.main_content_items_list_more}>
            <Link to='/shop' onClick={handlerOnClickBest} className={classes.main_content_items_list_more_detail}>
              more
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainContent