import React, { useRef, useState } from 'react'
import styles from './registrationPage.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { addUser, setUser } from '../../features/productsSlice/productsSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NewUser } from '../../data';
const RegistrationPage = () => {
    const [direction, setDirection] = useState(false);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [resetPassword, setResetPassword] = useState("");
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [resetPswVisible, setResetPswVisible] = useState(false);
    const [fullname, setFullname] = useState("");
    const fullnameRegExp = /^[A-Z]+[a-z]+\s[A-Z]+[a-z]+/;
    const valideFullname = useRef(null)
    const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const emailRef = useRef(null);
    const passwordRegExp = /[a-zA-Z0-9]{6,}/;
    const passwordRef = useRef(null);

    return (
        <div className={styles.registrationPage} >

            <div className={styles.registrationBox}>


                <div className={`${styles.imgBox}`} style={{ left: direction ? 0 : "100%", transform: direction ? "" : "translateX(-100%)" }} >
                    <div className={styles.fill}>
                        <span>Plard</span>Gold
                    </div>
                </div>
                <form className={styles.form} style={{ left: direction ? "100%" : "", transform: direction ? "translateX(-100%)" : "" }} >
                    <h1>
                        {
                            direction && <svg
                                onClick={() => setDirection(false)}
                                width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.370829 7.84678L7.93297 0.359267C8.42053 -0.124934 9.20906 -0.118654 9.69165 0.371768C10.1742 0.862191 10.1693 1.65211 9.67919 2.13631L4.27503 7.48736H18.7563C19.4441 7.48736 20 8.04515 20 8.73524C20 9.42533 19.4441 9.98319 18.7563 9.98319H4.27503L9.67919 15.3342C10.1692 15.8184 10.173 16.6084 9.69165 17.0988C9.4479 17.3459 9.12699 17.4706 8.80608 17.4706C8.49014 17.4706 8.17426 17.3509 7.93297 17.1112L0.370829 9.62371C0.134504 9.38912 0.000198364 9.06961 0.000198364 8.73519C0.000198364 8.40088 0.133276 8.08266 0.370829 7.84678Z" fill="#BDBDBD" />
                            </svg>
                        }
                        {direction ? "Регистрация" : "вход"}

                    </h1>
                    {
                        direction && <div className={styles.children}>
                            <span ref={valideFullname}>полное имя</span>
                            <input autoComplete='off' type="text" value={fullname} onChange={(e) => {
                                setFullname(e.target.value)
                            }} />
                        </div>
                    }
                    <div className={styles.children}>
                        <span ref={emailRef}>Эл. адрес</span>
                        <input autoComplete='off' type="text" value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    </div>
                    <label htmlFor='psw' className={styles.children}>
                        <span ref={passwordRef}>пароль</span>
                        <input autoComplete='off' type={passwordVisible ? "text" : "password"} id='psw' value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                        <i className={passwordVisible ? "fa fa-eye-slash" : "fa fa-eye"} onClick={() => {
                            setPasswordVisible(!passwordVisible)
                        }} ></i>

                    </label >
                    {
                        !direction && <label className={styles.checkBoxDiv} htmlFor="checkBox">
                            <input autoComplete='off' id='checkBox' type="checkbox" />
                            Запомни меня
                        </label>
                    }
                    {direction && <label htmlFor='resetPsw' className={styles.children}>
                        <span>пароль</span>
                        <input autoComplete='off' id='resetPsw' type={resetPswVisible ? 'text' : "password"} value={resetPassword}
                            onChange={(e) => {
                                setResetPassword(e.target.value)
                            }} />
                        <i className={resetPswVisible ? "fa fa-eye-slash" : "fa fa-eye"} onClick={(e) => {
                            setResetPswVisible(!resetPswVisible)
                        }}></i>
                    </label>}
                    <button type='button' onClick={async () => {
                        if (!direction) {
                            const { data } = await axios.get("http://localhost:4000/users");
                            const loginedUser = data.find((el) => {
                                return el.email === email.trim() && el.password === password.trim();
                            })
                            if (loginedUser) {
                                dispatch(setUser(loginedUser))
                                navigate("/home")
                            }
                        } else {
                            valideFullname.current.style.color = "";
                            emailRef.current.style.color = "";
                            passwordRef.current.style.color = ""
                            if (!fullnameRegExp.test(fullname)) {
                                valideFullname.current.style.color = "red";
                            }
                            if (!emailRegExp.test(email)) {
                                emailRef.current.style.color = "red";
                            }
                            if (password.trim() !== resetPassword.trim() || !passwordRegExp.test(password)) {
                                passwordRef.current.style.color = "red"
                            }
                            else if ((password.trim() == resetPassword.trim() && passwordRegExp.test(password)) && emailRegExp.test(email) && fullnameRegExp.test(fullname)) {
                                dispatch(addUser({ ...new NewUser(fullname, email, password) }))
                                setPassword("");
                                setEmail("");
                                setResetPassword("");
                                setFullname("");
                                setDirection(!direction)
                            }
                        }
                    }}>
                        {
                            direction ? "Регистрация" : "вход"
                        }
                    </button>

                    {
                        !direction &&
                        <div className={styles.cuestionBox}>
                            <span className={styles.cuestion}>
                                забыли пароль?
                            </span>

                            <h3 className={styles.getPasw} onClick={() => setDirection(true)}>
                                Регистрация
                            </h3>
                        </div>

                    }
                </form>
            </div>

        </div>
    )
}

export default RegistrationPage
