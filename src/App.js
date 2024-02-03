import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppProvider } from './Componets/Commu/DataContext';
import { fetchDataForComponent } from './Componets/Commu/Util'; // 경로를 프로젝트에 맞게 수정
import Header from './Componets/Header';
import Home from './Componets/Home/Home';
import Footer from './Componets/Footer';
import Shop from './Componets/Shop/Shop';
import ShopDetail from './Componets/Shop/Shop_detail';
import Account from './Componets/Account/Account';
import SignUp from './Componets/Account/SignUp';
import PersonalMenu from './Componets/Account/PersonalMenus/PersonalMenu';
import UploadPage from './Componets/UploadPage';
import './App.css';
import Yet from './Componets/Yet';



function App() {
  const [accountState, setAccountState] = useState(false);
  const [loginUserState, setLoginUserState] = useState(null);
  const [managerState, setManagerState] = useState(null);
  const [personalMenus, setPersonalMenus] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [insiteBest, setInsiteBest] = useState('')
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [menuIndex, setMenuIndex] = useState(0);
  const [homeData, setHomeData] = useState(null);
  const [shopData, setShopData] = useState(null);


  useEffect(() => {

    const fetchHomeData = async () => {
        const data = await fetchDataForComponent('home');
        setHomeData(data);
    };

    const fetchShopData = async () => {
        const data = await fetchDataForComponent('shop');
        setShopData(data);
    };
    fetchHomeData();
    fetchShopData();
  }, []);

  return (
    <Router>
      <AppProvider>
        {accountState && <Account setAccountState={setAccountState} setLoginUserState={setLoginUserState} setManagerState={setManagerState} />}
        {showHeader ? <Header setCategoryIndex={setCategoryIndex} setMenuIndex={setMenuIndex} setAccountState={setAccountState} loginUserState={loginUserState} setPersonalMenus={setPersonalMenus} /> : null}
        <PersonalMenu personalMenus={personalMenus} setPersonalMenus={setPersonalMenus} loginUserState={loginUserState} managerState={managerState}/>
        <Routes>
          {homeData && <Route path="/" element={<Home homeData={homeData} shopData={shopData} setInsiteBest={setInsiteBest} />} />}
          {shopData && <Route path="/shop" element={<Shop shopData={shopData} categoryIndex={categoryIndex} menuIndex={menuIndex} insiteBest={insiteBest} setInsiteBest={setInsiteBest} loginUserState={loginUserState} />} />}
          <Route path="/shop/:productId" element={<ShopDetail shopData={shopData} loginUserState={loginUserState}/>} />
          <Route path="/signup" element={<SignUp setShowHeader={setShowHeader}/>} />
          <Route path="/upload" element={<UploadPage shopData={shopData} setShopData={setShopData}/>} />
          <Route path="/brand" element={<Yet />} />
          <Route path="/sustainability" element={<Yet />} />
          <Route path="/aromatica in life" element={<Yet />} />
          <Route path="/benefits" element={<Yet />} />
        </Routes>
        <Footer />
      </AppProvider>
    </Router>
  );
}

export default App;
