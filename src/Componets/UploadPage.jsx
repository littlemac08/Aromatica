import React, { useRef, useState } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, set, ref as databaseRef } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import classes from './UploadPage.module.css'

const UploadPage = ({shopData, setShopData}) => {
    const [maincategoryState, setMaincategoryState] = useState('recomend');
    // const [uploadProduct, setUploadProduct] = useState(null);
    const [productTitle1State, setProductTitle1State] = useState(''); //title1
    const [productTitle1Check, setProductTitle1Check] = useState(false);
    const [productTitle2State, setProductTitle2State] = useState(''); //title2
    const [productTitle2Check, setProductTitle2Check] = useState(false);
    const [productImg1State, setProductImg1State] = useState(''); 
    const [productImg1TumbState, setProductImg1TumbState] = useState(''); //mainImgUrl 
    const [productImg2State, setProductImg2State] = useState(''); 
    const [productImg2TumbState, setProductImg2TumbState] = useState(''); //thumbImg2Url
    const [productImg3State, setProductImg3State] = useState(''); 
    const [productImg3TumbState, setProductImg3TumbState] = useState('');  //thumbImg3Url
    const [productImg4State, setProductImg4State] = useState('');
    const [productImg4TumbState, setProductImg4TumbState] = useState(''); //thumbImg4Url
    const [productCategoryState, setProductCategoryState] = useState('');
    const [tag1, setTag1] = useState('');
    const [tag2, setTag2] = useState('');
    const [tag3, setTag3] = useState('');
    const [price, setPrice] = useState('');
    const [ing1, setIng1] = useState('');
    const [ing2, setIng2] = useState('');
    const [ing3, setIng3] = useState('');
    const [ing4, setIng4] = useState('');
    const [ing5, setIng5] = useState('');
    const [detail, setDetail] = useState('');
    const [detailInfoTitle, setDetailInfoTitle] = useState('');
    const [detailInfoDes, setDetailInfoDes] = useState('');
    const [detailIngIng, setDetailIngIng] = useState('')
    const [detailHowEff, setDetailHowEff] = useState('');
    const [detailHowUsage, setDetailHowUsage] = useState('');
    const navigate = useNavigate();

    const handlerClear = () => {
        setProductTitle1State('');
        setProductTitle1Check(false);
        setProductTitle2State('');
        setProductTitle2Check(false);
        setProductImg1State('');
        setProductImg1TumbState('');
        setProductImg2State('');
        setProductImg2TumbState('');
        setProductImg3State('');
        setProductImg3TumbState('');
        setProductImg4State('');
        setProductImg4TumbState('');
        setProductCategoryState('');
        setTag1('');
        setTag2('');
        setTag3('');
        setPrice('');
        setIng1('');
        setIng2('');
        setIng3('');
        setIng4('');
        setIng5('');
        setDetail('');
        setDetailInfoTitle('');
        setDetailInfoDes('');
        setDetailIngIng('');
        setDetailHowEff('');
        setDetailHowUsage('');
    }
    const title1InputRef = useRef()
    const title2InputRef = useRef()
    

    const isTitleDuplicate = (event) => {
        const id = event.target.id

        switch(id){
            case 'title1_check' : 
                if(productTitle1State === ''){
                    alert('plase fill in the blank');
                    setProductTitle1Check(false);
                } else if(productTitle1State !== ''){
                    const isDuplicate = Object.values(shopData.products).some((product)=>{
                        return (
                            product.title1 === productTitle1State ||
                            product.title2 === productTitle1State
                        )
                    })
                    if(isDuplicate){
                        alert('title1 is duplicate')
                        setProductTitle1State('');
                        setProductTitle1Check(false);
                        title1InputRef.current.focus();
                    } else {
                        setProductTitle1Check(true);
                    }
                }
                break;
            case 'title2_check' :
                if(productTitle2State === ''){
                    alert('plase fill in the blank');
                    setProductTitle1Check(false);
                } else if(productTitle2State !== ''){
                    const isDuplicate = Object.values(shopData.products).some((product)=>{
                        return (
                            product.title1 === productTitle2State ||
                            product.title2 === productTitle2State
                        )
                    })
                    if(isDuplicate){
                        alert('Title2 is duplicate')
                        setProductTitle2State('');
                        setProductTitle2Check(false);
                        title2InputRef.current.focus();
                    } else {
                        setProductTitle2Check(true);
                    }
                }
                break;
            default :
                return
        }
    }
    const handlerProductTitle = (event) => {
        const value = event.target.value
        const id = event.target.id
        switch(id) {
            case 'product_title1' : 
                setProductTitle1State(value);
                setProductTitle1Check(false);
                break;
        case 'product_title2' : 
                setProductTitle2State(value);
                setProductTitle2Check(false)
                break;
        default : 
            return
        }
    }
    const handlerSwitchImg = (id, img) => {
        switch (id) {
            case 'main_img':
                img && setProductImg1State(prevState => ({ ...prevState, img }));
                break;
            case 'thumb_img2':
                img && setProductImg2State(prevState => ({ ...prevState, img }));
                break;
            case 'thumb_img3':
                img && setProductImg3State(prevState => ({ ...prevState, img }));
                break;
            case 'thumb_img4':
                img && setProductImg4State(prevState => ({ ...prevState, img }));
                break;
            default:
                return;
        }
    }
    const storage = getStorage();


    
    const handlerImageLoad = (event) => {
        const img = event.target.files[0]
        const id = event.target.id
        handlerSwitchImg(id,img)
    };
    const handleUpload = async (id) => {
        const image = getImageByProductId(id);
    
        if (image instanceof File) {
            const storageRef = ref(storage, `images/${image.name}`);
            
            // Upload the file using uploadBytes
            uploadBytes(storageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    getImageByProductUrl(id, downloadURL)
                });

            });
        } else {
            console.error('Invalid file type. Please provide a File object.');
        }
    };

    const getImageByProductId = (id) => {
        switch (id) {
            case 'main_img_button':
                return productImg1State.img;
            case 'thumb_img2_button':
                return productImg2State.img;
            case 'thumb_img3_button':
                return productImg3State.img;
            case 'thumb_img4_button':
                return productImg4State.img;
            default:
                return null;
        }
    };
    const getImageByProductUrl = (id, url) => {
        switch (id) {
            case 'main_img_button':
                return setProductImg1TumbState(url) 
            case 'thumb_img2_button':
                return setProductImg2TumbState(url)  
            case 'thumb_img3_button':
                return setProductImg3TumbState(url)  
            case 'thumb_img4_button':
                return setProductImg4TumbState(url)
            default:
                return null;
        }
    };

    function handlerMainCategory(event){
        const mainCategory = event.target.value
        setMaincategoryState(mainCategory)
    }
    const handlerCategoryValue = (event) => {
        const value = event.target.value

        return (
            setProductCategoryState(value)
        ) 
    }

    const handlerShowSubCategory = () =>{
        switch(maincategoryState){
            case 'recomend' :
                return <select value={productCategoryState} onChange={handlerCategoryValue}>
                            <option value="New Arrival">New Arrival</option>
                            <option value="Best">Best</option>
                            <option value="Gift">Gift</option>
                            <option value="Event">Event</option>
                        </select>
            case 'aromatherapy' :
                return <select value={productCategoryState} onChange={handlerCategoryValue}>
                            <option value="Essential Oil">Essential Oil</option>
                            <option value="Synergy Oil">Synergy Oil</option>
                            <option value="Balm">Balm</option>
                            <option value="Roll On">Roll On</option>
                            <option value="Defuser & Mist">Defuser & Mist</option>
                            <option value="Aromatherapy Tools">Aromatherapy Tools</option>
                        </select>
            case 'hair' :
                return <select value={productCategoryState} onChange={handlerCategoryValue}>
                            <option value="Shampoo">Shampoo</option>
                            <option value="Conditionner">Conditionner</option>
                            <option value="Treatment">Treatment</option>
                            <option value="Scalp Tonic">Scalp Tonic</option>
                            <option value="Hair Tools">Hair Tools</option>
                        </select>
            case 'body' :
                return <select value={productCategoryState} onChange={handlerCategoryValue}>
                            <option value="Wash">Wash</option>
                            <option value="Lostion">Lostion</option>
                            <option value="Oil">Oil</option>
                            <option value="Hand">Hand</option>
                            <option value="Woman">Woman</option>
                            <option value="Mist">Mist</option>
                            <option value="Body Tools">Body Tools</option>
                        </select>
            case 'skin' :
                return <select value={productCategoryState} onChange={handlerCategoryValue}>
                            <option value="Cleanser">Cleanser</option>
                            <option value="Toner">Toner</option>
                            <option value="Serum & Essence">Serum & Essence</option>
                            <option value="Emulsion & Cream">Emulsion & Cream</option>
                            <option value="Soothing Gel">Soothing Gel</option>
                            <option value="Sun Care">Sun Care</option>
                            <option value="Facial Oil">Facial Oil</option>
                        </select>
            case 'home' :
                return <select value={productCategoryState} onChange={handlerCategoryValue}>
                            <option value="Dental">Dental</option>
                            <option value="Living">Living</option>
                        </select>
            case 'zero' :
                return <select value={productCategoryState} onChange={handlerCategoryValue}>
                            <option value="Soap">Soap</option>
                            <option value="Refill">Refill</option>
                            <option value="Supplies">Supplies</option>
                            <option value="Brand Goods">Brand Goods</option>
                        </select>
            default:
                return;
        }
    }

    const handlerTag = (event) => {
        const id = event.target.id
        const value = event.target.value
        switch(id) {
            case 'tag1' : 
                setTag1(value)
                break;
            case 'tag2' : 
                setTag2(value)
                break;
            case 'tag3' : 
                setTag3(value)
                break;
            default:
                return
        }
    }

    const handlerPrice = (event) => {
        const value = event.target.value.replace(/[^0-9]/g, '');
        setPrice(value)
    }
    const handlerIng = (event) => {
        const id = event.target.id
        const value = event.target.value
        switch(id){
            case 'ing1' :
                setIng1(value);
                break;
            case 'ing2' :
                setIng2(value);
                break;
            case 'ing3' :
                setIng3(value);
                break;
            case 'ing4' :
                setIng4(value);
                break;
            case 'ing5' :
                setIng5(value);
                break;
            default :
                return;
        }
    }

    const handlerDetailInfoamtion = (event) => {
        const value = event.target.value
        const id = event.target.id

        switch(id){
            case 'detail' :
                setDetail(value)
                break;
            case 'detail_info_title' :
                setDetailInfoTitle(value)
                break;
            case 'detail_info_des' :
                setDetailInfoDes(value)
                break;
            case 'detail_ing_ing' :
                setDetailIngIng(value)
                break;
            case 'detail_how_eff' :
                setDetailHowEff(value)
                break;
            case 'detail_how_usage' :
                setDetailHowUsage(value)
                break;
            default:
                return;
        }
    }



    const addProduct = () => {
        const existingProducts = shopData.products || {};
        const productUrlGenerator = 'product' + (Object.keys(existingProducts).length + 1);

        if (productTitle1Check && productTitle2Check) {
        if (!detail || !detailHowUsage || !detailHowEff || !ing1 || !ing2 || !ing3 || !ing4 || !ing5 || !price || !tag1 || !tag2 || !tag3 || !productTitle1State || !productTitle2State) {
            alert('Please fill in all required fields.');
            return;
        }
        const newProduct = {
            [productUrlGenerator] : {
                url: productUrlGenerator,
                detail,
                detail_how: {
                    efficacy:detailHowEff,
                    usage : detailHowUsage
                },
                detail_info: {
                    description: detailInfoDes,
                    title: detailInfoTitle,
                },
                ing1,
                ing2,
                ing3,
                ing4,
                ing5,
                detail_ing: {
                    ingredients: detailIngIng,
                },
                detail_thum: {
                    thum1:productImg1TumbState,
                    thum2:productImg2TumbState,
                    thum3:productImg3TumbState,
                    thum4:productImg4TumbState,
                },
                img:productImg1TumbState,
                filter:productCategoryState,
                price,
                tag1,
                tag2,
                tag3,
                title1: productTitle1State,
                title2: productTitle2State,
            }
        }
        const newUploadProduct = { ...existingProducts, ...newProduct };
        // setUploadProduct(newUploadProduct);
        productUploadServer(newUploadProduct, setShopData, productUrlGenerator);
        } else {
            alert('Please check product titles before adding.');
        }
    };
    const productUploadServer = (product, setShopData, url) => {

        const database = getDatabase();
        
        const uploadPathRef = databaseRef(database, 'shop/products');
        
        set(uploadPathRef, product)
            .then(() => {
                setShopData((prevData) => ({
                    ...prevData,
                    products: Array.isArray(prevData.products) ? Object.values(product) : product,
                }));
                handlerClear();
                // setUploadProduct();
                const movePage = window.confirm('are you move to Main page?')
                if(movePage){
                    navigate('/')
                } else {
                    return
                }
            })
            .catch((error) => {
                console.error('Error writing data to Firebase: ', error);
            });
    };

    const handlerRest = () => {
        const restConfirm = window.confirm('are you sure rest everything?')
        if(restConfirm){
            handlerClear();
            // setUploadProduct();
        } else {
            return
        }
    }


    return (
        <div className={classes.product_upload_wrap}>
            <div className={classes.product_upload_title}>
                <div className={classes.product_upload_title_bg}></div>
                <span className={classes.product_upload_title_txt}>
                    Product Upload
                </span>
            </div>
            <div className={classes.product_upload_buttons}>
                <div className={classes.product_upload_button_rest} onClick={handlerRest}>Rest</div>
                <div className={classes.product_upload_button_submit} onClick={addProduct}>Submit</div>
            </div>
            <div className={classes.product_upload_body}>
                <div className={classes.product_upload_header}>
                    <span>Product Information</span>
                </div>
                <div className={classes.product_upload_body_layer1}>
                    <div className={classes.product_upload_body_layer1_infos1}>
                        <div className={classes.product_upload_body_layer1_infos1_titles}>
                            <div className={classes.product_upload_body_layer1_infos1_title1}>
                                <span>Product Title I</span>
                                <div className={classes.product_upload_body_layer1_infos1_titles_input}>
                                    <input type="text" id='product_title1' value={productTitle1State} onChange={handlerProductTitle} ref={title1InputRef}/>
                                    {productTitle1Check ?
                                    <div className={classes.title_input_checked}>Done</div>
                                    :
                                    <div id='title1_check' onClick={isTitleDuplicate}>Check Here</div>
                                    }
                                </div>
                            </div>
                            <div className={classes.product_upload_body_layer1_infos1_title2}>
                                <span>Product Title II</span>
                                <div className={classes.product_upload_body_layer1_infos1_titles_input}>
                                    <input type="text" id='product_title2' value={productTitle2State} onChange={handlerProductTitle} ref={title2InputRef}/>
                                    {productTitle2Check ?
                                    <div className={classes.title_input_checked}>Done</div>
                                    :
                                    <div id='title2_check' onClick={isTitleDuplicate}>Check Here</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={classes.product_upload_body_layer1_infos1_imgs}>
                            <ul className={classes.product_upload_body_layer1_infos1_imgs_wrap}>
                                <li>
                                    <div>
                                        <input type="file" id='main_img' onChange={handlerImageLoad}/>
                                        {productImg1TumbState !== '' ? <img src={productImg1TumbState} alt="" /> : null}
                                        <span>
                                            Main Image
                                        </span>
                                        <span>
                                            Upload
                                        </span>
                                    </div>
                                    {productImg1TumbState ?
                                        <button className={classes.img_checked}>
                                            Done
                                        </button>
                                        :
                                        <button onClick={() => handleUpload('main_img_button')}>
                                        Check
                                        </button>
                                    }
                                </li>
                                <li>
                                    <div>
                                        <input type="file" id='thumb_img2' onChange={handlerImageLoad} />
                                        {productImg2TumbState !== '' ? <img src={productImg2TumbState} alt="" /> : null}
                                        <span>
                                            Thumb Image II
                                        </span>
                                        <span>
                                            Upload
                                        </span>
                                    </div>
                                    {productImg2TumbState ?
                                        <button className={classes.img_checked}>
                                            Done
                                        </button>
                                        :
                                        <button onClick={() => handleUpload('thumb_img2_button')}>
                                        Check
                                        </button>
                                    }
                                </li>
                                <li>
                                    <div>
                                        <input type="file" id='thumb_img3' onChange={handlerImageLoad} />
                                        {productImg3TumbState !== '' ? <img src={productImg3TumbState} alt="" /> : null}
                                        <span>
                                            Thumb Image III
                                        </span>
                                        <span>
                                            Upload
                                        </span>
                                    </div>
                                    {productImg3TumbState ?
                                        <button className={classes.img_checked}>
                                            Done
                                        </button>
                                        :
                                        <button onClick={() => handleUpload('thumb_img3_button')}>
                                        Check
                                        </button>
                                    }
                                </li>
                                <li>
                                    <div>
                                        <input type="file" id='thumb_img4' onChange={handlerImageLoad} />
                                        {productImg4TumbState !== '' ? <img src={productImg4TumbState} alt="" /> : null}
                                        <span>
                                            Thumb Image IV
                                        </span>
                                        <span>
                                            Upload
                                        </span>
                                    </div>
                                    {productImg4TumbState ?
                                        <button className={classes.img_checked}>
                                            Done
                                        </button>
                                        :
                                        <button onClick={() => handleUpload('thumb_img4_button')}>
                                        Check
                                        </button>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={classes.product_upload_body_layer1_infos2}>
                        <div className={classes.product_upload_body_layer1_infos2_item1}>
                            <div className={classes.product_upload_body_layer1_infos2_filter}>
                                <div className={classes.product_upload_body_layer1_infos2_filter_title}>
                                    Choose Product Filter
                                </div>
                                <div className={classes.product_upload_body_layer1_infos2_filter_body}>
                                    <div>
                                        <span>
                                            Main Category
                                        </span>
                                        <select onChange={handlerMainCategory}>
                                            <option value="recomend">Recomend</option>
                                            <option value="aromatherapy">Aromatherapy</option>
                                            <option value="hair">Hair</option>
                                            <option value="body">Body</option>
                                            <option value="skin">Skin</option>
                                            <option value="home">Home</option>
                                            <option value="zero">Zero Waste</option>
                                        </select>
                                    </div>
                                    <div>   
                                        <span>
                                            Sub Category
                                        </span>
                                            {handlerShowSubCategory()}
                                    </div>
                                </div>
                            </div>
                            <div className={classes.product_upload_body_layer1_infos2_tags}>
                                <div className={classes.product_upload_body_layer1_infos2_tag}>
                                    <span>
                                        Tag 1
                                    </span>
                                    <input type="text" id='tag1' onChange={handlerTag}/>
                                </div>
                                <div className={classes.product_upload_body_layer1_infos2_tag}>
                                    <span>
                                        Tag 2
                                    </span>
                                    <input type="text" id='tag2' onChange={handlerTag}/>
                                </div>
                                <div className={classes.product_upload_body_layer1_infos2_tag}>
                                    <span>
                                        Tag 3
                                    </span>
                                    <input type="text" id='tag3' onChange={handlerTag}/>
                                </div>
                            </div>
                            <div className={classes.product_upload_body_layer1_infos2_price}>
                                <span>Price</span>
                                <input type="text" onChange={handlerPrice} value={price}/>
                            </div>
                        </div>
                        <div className={classes.product_upload_body_layer1_infos2_item2}>
                            <span className={classes.product_upload_body_layer1_infos2_item2_title}>Ingredient</span>
                            <ul className={classes.product_upload_body_layer1_infos2_item2_body}>
                                <li>
                                    <span>No.1</span>
                                    <input type="text" id='ing1' onChange={handlerIng}/>
                                </li>
                                <li>
                                    <span>No.2</span>
                                    <input type="text" id='ing2' onChange={handlerIng} />
                                </li>
                                <li>
                                    <span>No.3</span>
                                    <input type="text" id='ing3' onChange={handlerIng} />
                                </li>
                                <li>
                                    <span>No.4</span>
                                    <input type="text" id='ing4' onChange={handlerIng} />
                                </li>
                                <li>
                                    <span>No.5</span>
                                    <input type="text" id='ing5' onChange={handlerIng} />
                                </li>
                            </ul>
                        </div>
                        <div className={classes.product_upload_body_layer1_infos2_item3}>
                            <span className={classes.product_upload_body_layer1_infos2_item3_title}>How to Use the Upload</span>
                            <div className={classes.product_upload_body_layer1_infos2_item3_body}>
                                <div>
                                    <span>1. Product title</span>
                                    <span>Enter Title 1 and 2 and click OK.</span>
                                </div>
                                <div>
                                    <span>2. Product Image</span>
                                    <span>The first image is basically a thumbnail and detail slider</span> 
                                </div>
                                <div>
                                    <span>3. Product Filter</span>
                                    <span>Filters function to distinguish the displayed categories of products.</span> 
                                </div>
                                <div>
                                    <span>4. Product tag</span>
                                    <span>Tag displayed in the main image of the product</span> 
                                </div>
                                <div>
                                    <span>5. Product Ingredient</span>
                                    <span>Please include 5 representative ingredients of the product</span> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.product_upload_body_layer2}>
                    <div>
                        <span>Product Detail</span>
                        <span>
                            Enter a brief description of the product
                        </span>
                        <textarea type="text" placeholder='Embrace tranquility with our soothing body wash. Lavender for meditation, Marjoram for comfort. Elevate your ritual' id='detail' onChange={handlerDetailInfoamtion}/>
                    </div>
                    <div>
                        <div>
                            <span>Product Info Title</span>
                            <span>Enter the main ingredients of the product</span>
                            <textarea type="text" placeholder='Vitamin Serum · Dark spot care · Citrus vitality' id='detail_info_title' onChange={handlerDetailInfoamtion}/>
                        </div>
                        <div>
                            <span>Product Info Description</span>
                            <span>include a description of the product ingredients</span>
                            <textarea type="text" placeholder='Aromatica’s Blemish Care Vitamin C Oil Serum Fat-soluble vitamin C, bakuchiol, and ferulic acid, which are mild on the skin, are captured in a refreshing radiant oil capsule to effectively deliver active ingredients.' id='detail_info_des' onChange={handlerDetailInfoamtion}/>
                        </div>
                    </div>
                    <div>
                        <span>Product Ingredient</span>
                        <span>
                            Enter a brief description of the product
                        </span>
                        <textarea type="text" placeholder='Water-soluble vitamin C derivative (2%), fat-soluble vitamin C derivative, bakuchiol (0.5%), tocopherol, ferulic acid, octuple hyaluronic acid, panthenol, orange oil, neroli oil' id='detail_ing_ing' onChange={handlerDetailInfoamtion} />
                    </div>
                    <div>
                        <div>
                            <span>Product Efficacy</span>
                            <span>Add the effectiveness of your product</span>
                            <textarea type="text" placeholder='Vitamin Serum · Dark spot care · Citrus vitality' id='detail_how_eff' onChange={handlerDetailInfoamtion}/>
                        </div>
                        <div>
                            <span>Product Usage</span>
                            <span>include instructions for using the product</span>
                            <textarea type="text" placeholder='Aromatica’s Blemish Care Vitamin C Oil Serum Fat-soluble vitamin C, bakuchiol, and ferulic acid, which are mild on the skin, are captured in a refreshing radiant oil capsule to effectively deliver active ingredients.' id='detail_how_usage' onChange={handlerDetailInfoamtion}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadPage
