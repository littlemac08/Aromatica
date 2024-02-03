import React, { useRef, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { IoLogoDiscord } from "react-icons/io5";
import { FaApple } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { database } from '../Commu/Sdk'
import { ref, get  } from 'firebase/database';
import classes from './Account.module.css'


const Account = ({setAccountState, setLoginUserState, setManagerState}) => {
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');
    const idFocus = useRef(null);
    const pwFocus = useRef(null);
    function handlerLogModalOff(){
        setAccountState(false)
    }
    function handlerSignup(){
        setAccountState(false)
    }
    const loginUser = async (userId, password) => {
        const userRef = ref(database, `users/${userId}`);
        try {
            const snapshot = await get(userRef);
    
            if (snapshot.exists()) {
                const userData = snapshot.val();
    
                // 비밀번호 비교
                if (userData.password === password) {
                    setAccountState(false)
                    setLoginUserState(userId)
                    setManagerState(userData.account === 'business' ? true : false)
                } else {
                    alert('Incorrect password. Please try again.')
                    setInputPw('');
                    pwFocus.current.focus();
                }
            } else {
                alert('User not found. Please check your ID.')
                setInputId('');
                idFocus.current.focus();
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            // 로그인 중 오류 발생 시 필요한 동작 수행
        }
    };
    function handlerInputData(event){
        const { id, value } = event.target;

        let sanitizedValue;

        switch(id){
            case 'inputId': 
                sanitizedValue = value.replace(/[^A-Za-z0-9]/g, '');
                setInputId(sanitizedValue)
                break;

            case 'inputPw':
                sanitizedValue = value.replace(/[^A-Za-z0-9]/g, '');
                setInputPw(sanitizedValue)
                break;

            default:
                break;
        }
    }

    return (
        <div className={classes.account_modal_wrap}>
            <div className={classes.account_modal_bg} onClick={handlerLogModalOff}>
            </div>
            <div className={classes.account_modal_table}>
                <div className={classes.account_modal_table_title}>
                    <span>SIGN IN</span>
                </div>
                <div className={classes.account_modal_table_inputs}>
                    <input className={classes.account_modal_table_inputs_id} id='inputId' type="text" placeholder='ID' onChange={handlerInputData} value={inputId} ref={idFocus}/>
                    <input className={classes.account_modal_table_inputs_pw} id='inputPw' type="password" placeholder='PASSWORD' onChange={handlerInputData} value={inputPw} ref={pwFocus}/>
                </div>
                <div className={classes.account_modal_table_btns}>
                    <span className={classes.account_modal_table_btns_login} onClick={()=>loginUser(inputId,inputPw)}>CONTINUE</span>
                    <span className={classes.account_modal_table_btns_joinin}><Link to='/signup' onClick={handlerSignup}>Join Us</Link></span>
                    <div className={classes.account_modal_table_btns_text}>
                        <span>4,000 won points paid upon new join</span>
                    </div>
                    <div className={classes.account_modal_table_btns_find}>
                        <span>Can't Sign In?</span>
                    </div>
                </div>
                <div className={classes.account_modal_table_sns}>
                    <span><FcGoogle /></span>
                    <span><IoLogoDiscord /></span>
                    <span><FaApple /></span>
                    <span><FaMeta /></span>
                </div>
            </div>
        </div>
    )
}

export default Account