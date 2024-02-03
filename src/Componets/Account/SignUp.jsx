import React, { useEffect, useState } from 'react'
import { PiCheckThin, PiWarningThin } from "react-icons/pi";
import { ref, set, get, child } from 'firebase/database';
import { database } from '../Commu/Sdk';
import classes from './SignUp.module.css'


const SignUp = ({setShowHeader}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [userId, setUserId] = useState('');
    const [userIdCheck, setUserIdCheck] = useState(false);
    const [userPw, setUserPw] = useState('');
    const [userPwC, setUserPwC] = useState(''); 
    const [passwordCheck, setPasswordCheck] = useState('');
    const [userName, setUserName] = useState('');
    const [alarm, setAlarm] = useState('');
    const [isMale, setIsMale] = useState(false);
    const [isFemale, setIsFemale] = useState(false);
    const [phone, setPhone] = useState('010');
    const [phone2, setPhone2] = useState('');
    const [phone3, setPhone3] = useState('');
    const [emailId, setEmailId] = useState('');
    const [emailAdd, setEmailAdd] = useState('');
    const [personal, setPersonal] = useState(true);
    const [business, setBusiness] = useState(false);
    const [termCheck1, setTermCheck1] = useState(false);
    const [termCheck2, setTermCheck2] = useState(false);
    const [termCheck3, setTermCheck3] = useState(false);
    const [termCheck4, setTermCheck4] = useState(false);
    const [termCheck5, setTermCheck5] = useState(false);
    const [usercode, setUsercode] = useState('');

    const dataPath = `users/${usercode}`
    
    useEffect(() => {
        setShowHeader(false);
    
        return () => {
            setShowHeader(true);
        };
    }, [setShowHeader]);
    const checkDuplicateUserId = async (userIdToCheck) => {
        const usersRef = ref(database, 'users');
        
        try {
            const snapshot = await get(child(usersRef, userIdToCheck));
    
            if (snapshot.exists()) {
                // 중복된 아이디가 존재함
                return true;
            } else {
                // 중복된 아이디가 존재하지 않음
                return false;
            }
        } catch (error) {
            console.error('Error checking duplicate userId:', error);
            return false; // 오류 발생 시 기본적으로 중복 여부를 false로 처리
        }
    };

    async function handlerIdCheck(){
        if(userId === ''){
            alert('Please enter the ID you wish to use.')
        } else {
            const isDuplicate = await checkDuplicateUserId(userId);
            if (isDuplicate) {
                alert('This ID is already in use by someone else.')
            } else {
                setIsChecked(!isChecked)
                setUserIdCheck(!userIdCheck)
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    useridcheck: true,
                }));
            }
        }

    }
    function handlerPWCheck(event){
        const sanitizedValue = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        setUserPwC((prevValue)=>sanitizedValue)

        const confirm = event.target.value
        if(passwordCheck === confirm){
            setAlarm('')
        } else {
            setAlarm('password')
        }
    }
    function handlerMaleCheck(){
        setIsFemale(false)
        setIsMale(true)
        setUserData((prevUserData) => ({
            ...prevUserData,
            gender: 'male',
        }));
    }
    function handlerFemaleCheck(){
        setIsMale(false)
        setIsFemale(true)
        setUserData((prevUserData) => ({
            ...prevUserData,
            gender: 'female',
        }));
    }
    function handlerPersonalCheck(){
        setBusiness(false)
        setPersonal(true)
        setUserData((prevUserData) => ({
            ...prevUserData,
            account: 'personal',
        }));
    }
    function handlerBusinessCheck(){
        setPersonal(false)
        setBusiness(true)
        setUserData((prevUserData) => ({
            ...prevUserData,
            account: 'business',
        }));
    }


    const handlePhoneChange = (event) => {
        const sanitizedValue = event.target.value.replace(/[^0-9]/g, '');
        setPhone((prevValue)=>sanitizedValue)
        setUserData((prevUserData) => ({
            ...prevUserData,
            phone1: event.target.value,
        }));
    };
    function handlerTerm1(){
        setTermCheck1(!termCheck1)
        setUserData((prevUserData) => ({
            ...prevUserData,
            term1: true,
        }));
    }
    function handlerTerm2(){
        setTermCheck2(!termCheck2)
        setUserData((prevUserData) => ({
            ...prevUserData,
            term2: true,
        }));
    }
    function handlerTerm3(){
        setTermCheck3(!termCheck3)
        setUserData((prevUserData) => ({
            ...prevUserData,
            term3: true,
        }));
    }
    function handlerTerm4(){
        setTermCheck4(!termCheck4)
        setUserData((prevUserData) => ({
            ...prevUserData,
            term4: true,
        }));
    }
    function handlerTerm5(){
        setTermCheck5(!termCheck5)
        setUserData((prevUserData) => ({
            ...prevUserData,
            term5: true,
        }));
    }

    const [userData, setUserData] = useState({
        userid : '',
        useridcheck : '',
        password : '',
        username : '',
        gender : '',
        phone1 : '010',
        phone2 : '',
        phone3 : '',
        emailid : '',
        emailadd : '',
        term1: '',
        term2: '',
        term3: '',
        term4: '',
        term5: '',
        account: '',
    });


    function handlerInputChanger(event) {
        const { id, value } = event.target;
    
        let sanitizedValue;
    
        switch (id) {
            case 'phone2':
            case 'phone3':
                sanitizedValue = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                if (id === 'phone2') {
                    setPhone2(sanitizedValue);
                } else {
                    setPhone3(sanitizedValue);
                }
                break;
    
            case 'username':
                sanitizedValue = value.replace(/[^A-Za-z]/g, '');
                setUserName(sanitizedValue);
                break;
    
            case 'userid':
                sanitizedValue = value.replace(/[^A-Za-z0-9]/g, '');
                setUserId(sanitizedValue);
                setUsercode(sanitizedValue);
                break;
    
            case 'password':
                sanitizedValue = value.replace(/[^A-Za-z0-9]/g, '');
                setUserPw(sanitizedValue);
                break;
    
            case 'emailid':
                sanitizedValue = value.replace(/[^A-Za-z0-9]/g, '');
                setEmailId(sanitizedValue);
                break;
    
            case 'emailadd':
                sanitizedValue = value.replace(/[^A-Za-z0-9.]/g, '');
                setEmailAdd(sanitizedValue);
                break;
    
            default:
                break;
        }
    
        setUserData((prevData) => ({
            ...prevData,
            [id]: sanitizedValue || value,
        }));
    
        // 패스워드 체크 업데이트
        setPasswordCheck(value);
    }
    
    function handlerSubmit() {
        // userData 객체의 속성들을 배열로 만듭니다.

        const userDataKeys = Object.keys(userData);
    
        // 작성되지 않은 필드를 저장할 배열을 만듭니다.
        const missingFields = [];
    
        // userDataKeys 배열을 순회하면서 각 속성이 존재하는지 확인합니다.
        userDataKeys.forEach((key) => {
            // 속성 값이 빈 문자열 또는 undefined라면 해당 필드가 작성되지 않았다고 판단합니다.
            if (userData[key] === '' || userData[key] === undefined) {
                missingFields.push(key);
            }
        });
    
        // 만약 작성되지 않은 필드가 있다면 알림 메시지를 표시합니다.
        if (missingFields.length > 0) {
            const missingFieldsMessage = `Please fill in the following fields: ${missingFields.join(', ')}`;
            alert(missingFieldsMessage);
        } else if(alarm !== ''){
            alert('Passwords do not match.')
        } else {
            uploadUserData(dataPath,userData)
            window.history.back();
            alert('Congratulations on joining us')
        }
    }


    const uploadUserData = (dataPath, userData) => {
        const dataRef = ref(database, dataPath);

        set(dataRef, userData)
            .then(() => {
                
            })
            .catch((error) => {
                alert('An error occurred. Please contact the administrator.')
            });
    };

    return (
        <div className={classes.signup_wrap}>
            <div className={classes.signup_title}>
                <span>SIGN UP</span>
            </div>
            <div className={classes.signup_info_wrap}>
                <div className={classes.signup_info}>
                    <div className={classes.signup_info_sub}>
                        <span>USER INFOMATION</span>
                    </div>
                    <div className={classes.signup_info_body}>
                        <ul className={classes.signup_info_titles}>
                            <li>ID</li>
                            <li>PASSWORD</li>
                            <li>CONFIRM PASSWORD</li>
                            <li>NAME</li>
                            <li>GENDER</li>
                            <li>PHONE NUMBER</li>
                            <li>E-MAIL</li>
                            <li>ACCOUNT-TYPE</li>
                        </ul>
                        <ul className={classes.signup_info_blanks}>
                            <li className={classes.signup_info_blanks_userid}>
                                <input type="text" id="userid" value={userId} autoComplete="off" required onChange={handlerInputChanger}/>
                                <div className={classes.singup_info_blanks_userid_check}>
                                    {isChecked ? 
                                        <span>
                                            <PiCheckThin onClick={handlerIdCheck} />
                                        </span>
                                        : 
                                        <span className={classes.check_blank_icon} onClick={handlerIdCheck}>
                                            <span>
                                                Check
                                            </span>
                                            <span>
                                                Here
                                            </span>
                                        </span>
                                    }       
                                </div>
                            </li>
                            <li className={classes.signup_info_blanks_userpw}>
                                <input type="password" id="password" value={userPw} autoComplete="off" required onChange={handlerInputChanger} />
                            </li>
                            <li className={classes.signup_info_blanks_userpw_check}>
                                <input type="password" id="confirm" value={userPwC} autoComplete="off" required onChange={handlerPWCheck} />
                            </li>
                            <li className={classes.signup_info_blanks_username}>
                                <input type="text" id="username" value={userName} autoComplete="off" required onChange={handlerInputChanger} />
                            </li>
                            <li className={classes.signup_info_blanks_gender}>
                                <div className={classes.signup_info_blanks_gender_male} onClick={handlerMaleCheck}>
                                    <span>MALE</span>
                                    <span>
                                        {isMale ? 
                                            <span><PiCheckThin /></span>
                                            :
                                            <span className={classes.gender_blank}></span>
                                        }
                                    </span>
                                </div>
                                <div className={classes.signup_info_blanks_gender_female} onClick={handlerFemaleCheck}>
                                    <span>FEMALE</span>
                                    <span>
                                        {isFemale ?
                                        <span><PiCheckThin /></span>
                                        :
                                        <span className={classes.gender_blank}></span>
                                        }
                                    </span>
                                </div>
                            </li>
                            <li className={classes.signup_info_blanks_phone}>
                                <input type="text" id='phone1' value={phone} onChange={handlePhoneChange} autoComplete="off" />
                                <input type="text" id='phone2' value={phone2} autoComplete="off" required onChange={handlerInputChanger} maxLength="4" />
                                <input type="text" id='phone3' value={phone3} autoComplete="off" required onChange={handlerInputChanger} maxLength="4" />
                            </li>
                            <li className={classes.signup_info_blanks_email}>
                                <input type="text" id='emailid' value={emailId} className={classes.signup_info_blanks_email_id} autoComplete="off" required onChange={handlerInputChanger} />
                                <span>@</span>
                                <input type="text" id='emailadd' value={emailAdd} className={classes.signup_info_blanks_email_add} autoComplete="off" required onChange={handlerInputChanger} />
                            </li>
                            <li className={classes.signup_info_blanks_account}>
                                <div>
                                    <div className={classes.singup_info_blank_personal} onClick={handlerPersonalCheck} >
                                        <span>PERSONAL</span>
                                        <span>
                                            {personal ? 
                                                <span><PiCheckThin /></span>
                                                :
                                                <span className={classes.gender_blank}></span>
                                            }
                                        </span>
                                    </div>
                                    <div className={classes.singup_info_blank_business} onClick={handlerBusinessCheck} >
                                        <span>BUSINESS</span>
                                        <span>
                                            {business ? 
                                                <span><PiCheckThin /></span>
                                                :
                                                <span className={classes.gender_blank}></span>
                                            }
                                        </span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className={classes.signup_info_footer}>
                        {alarm === 'password' ? <span><PiWarningThin /> Passwords do not match.</span> : null }
                    </div>
                </div>
                    <div className={classes.signup_term}>
                        <div className={classes.signup_term_sub}>
                            <span>TERMS & CONDITIONS</span>
                        </div>
                        <ul className={classes.signup_term_list}>
                            <li className={classes.signup_term_list_items}>
                                <div className={classes.signup_term_list_items_text}>
                                    <span className={classes.signup_term_list_items_text_title}>
                                        term title1
                                    </span>
                                    <span className={classes.signup_term_list_items_text_doc}>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </span>
                                </div>
                                <div className={classes.signup_term_list_items_check} onClick={handlerTerm1}>
                                    { termCheck1 ? 
                                        <span className={classes.term_check}>
                                            <PiCheckThin />
                                        </span>
                                        :
                                        <span className={classes.term_blank}>agree</span>
                                    }
                                </div>
                            </li>
                            <li className={classes.signup_term_list_items}>
                                <div className={classes.signup_term_list_items_text}>
                                    <span className={classes.signup_term_list_items_text_title}>
                                        term title2
                                    </span>
                                    <span className={classes.signup_term_list_items_text_doc}>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </span>
                                </div>
                                <div className={classes.signup_term_list_items_check} onClick={handlerTerm2}>
                                    { termCheck2 ? 
                                        <span className={classes.term_check}>
                                            <PiCheckThin />
                                        </span>
                                        :
                                        <span className={classes.term_blank}>agree</span>
                                    }
                                </div>
                            </li>
                            <li className={classes.signup_term_list_items}>
                                <div className={classes.signup_term_list_items_text}>
                                    <span className={classes.signup_term_list_items_text_title}>
                                        term title3
                                    </span>
                                    <span className={classes.signup_term_list_items_text_doc}>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </span>
                                </div>
                                <div className={classes.signup_term_list_items_check} onClick={handlerTerm3}>
                                    { termCheck3 ? 
                                        <span className={classes.term_check}>
                                            <PiCheckThin />
                                        </span>
                                        :
                                        <span className={classes.term_blank}>agree</span>
                                    }
                                </div>
                            </li>
                            <li className={classes.signup_term_list_items}>
                                <div className={classes.signup_term_list_items_text}>
                                    <span className={classes.signup_term_list_items_text_title}>
                                        term title4
                                    </span>
                                    <span className={classes.signup_term_list_items_text_doc}>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </span>
                                </div>
                                <div className={classes.signup_term_list_items_check} onClick={handlerTerm4}>
                                    { termCheck4 ? 
                                        <span className={classes.term_check}>
                                            <PiCheckThin />
                                        </span>
                                        :
                                        <span className={classes.term_blank}>agree</span>
                                    }
                                </div>
                            </li>
                            <li className={classes.signup_term_list_items}>
                                <div className={classes.signup_term_list_items_text}>
                                    <span className={classes.signup_term_list_items_text_title}>
                                        term title5
                                    </span>
                                    <span className={classes.signup_term_list_items_text_doc}>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </span>
                                </div>
                                <div className={classes.signup_term_list_items_check} onClick={handlerTerm5}>
                                    { termCheck5 ? 
                                        <span className={classes.term_check}>
                                            <PiCheckThin />
                                        </span>
                                        :
                                        <span className={classes.term_blank}>agree</span>
                                    }
                                </div>
                            </li>

                        </ul>
                    </div>
            </div>
            <div className={classes.signup_submit} >
                <span onClick={handlerSubmit}>JOIN US</span>
                <span onClick={()=>window.history.back()}>LEAVE</span>
            </div>
        </div>
    )
}

export default SignUp


