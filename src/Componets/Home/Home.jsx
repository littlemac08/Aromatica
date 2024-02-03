import React from 'react'
import MainVisual from './MainVisual'
import MainContent from './MainContent'
import MainPromotion from './MainPromotion'
import DesignBanner from './DesignBanner'
import Campaign from './Campaign'
import classes from './Home.module.css'

const Home = ({homeData, setInsiteBest, shopData}) => {
  return (
    <div className={classes.home_wrap}>
        <MainVisual homeData={homeData} />
        <MainContent homeData={homeData} shopData={shopData} setInsiteBest={setInsiteBest} />
        <MainPromotion homeData={homeData}/>
        <DesignBanner />
        <Campaign />
    </div>
  )
}

  export default Home