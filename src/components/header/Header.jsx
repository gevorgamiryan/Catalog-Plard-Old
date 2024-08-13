import React, { useCallback, useEffect, useState } from 'react';
import styles from './header.module.css';
import { Link, json } from 'react-router-dom';
import searchIcon from '../../assets/headerFiles/ico.png';
import Logo from '../../assets/headerFiles/Mask Group.png';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser, selectAllProducts, selectProductsSlice } from '../../features/productsSlice/productsSlice';
import avatar from '../../assets/headerFiles/6f46a8b29caf6fb95ff4ef4be52ede57.jpg'
import { useHomeContext } from '../home/HomeContext';


const Header = () => {
    const [open, setOpen] = useState(false);
    const selectProducts = useSelector(selectProductsSlice);
    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    const [filterValue, setFilterValue] = useState("");
    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem("user")))
        setOpen(false)
    }, [selectProducts.user])
    const products = useSelector(selectAllProducts);

    const { setProducts, setCurrentCategory } = useHomeContext()

    const filter = useCallback(() => {
        if (filterValue.trim()) {
            setProducts(products.filter((el) => {
                return el.article.toLowerCase().includes(filterValue.toLowerCase());
            }));
            setCurrentCategory({});
        }
        setFilterValue("");
    }, [filterValue])
    return (
        <header className={styles.header}>
            <Link to={'/home'}>
                <img className={styles.logoImg} src={Logo} alt="Logo" />
            </Link>
            <label className={styles.searchBox} htmlFor="inp">
                <input autoComplete='off' id='inp' className={styles.input} type="text"
                    onChange={(e) => setFilterValue(e.target.value)}
                    placeholder='Поиск' value={filterValue} />
                <button className={styles.searchButton} onClick={filter} ><img src={searchIcon} alt="#" /></button>
            </label>
            <div className={styles.signInBox}
                onClick={() => setOpen(!open)}>
                {
                    user && user.id ?
                        <div className={styles.localUserBox}>
                            <div className={styles.userImg}
                                style={{ backgroundImage: `url(${avatar})` }}></div>
                            <h1 className={styles.userName}>{user.fullname}</h1>
                            <i className="material-icons" style={{
                                fontWeight: 100,
                                transform: open ? "rotateX(180deg)" : "rotateX(0)",
                                transition: ".5s",
                                userSelect: "none",

                            }}>&#xe313;</i>
                            <div onClick={(e) => e.stopPropagation()}
                                className={`${styles.logOutBox} ${open === true ? styles.active : ""}`}>
                                <Link className={styles.LinkToUserData} to={'/'}>личные данные</Link>
                                <Link className={styles.LinkToCreateUser} to={'/'}>Создать пользователя</Link>
                                <Link className={styles.logOut} to={'/'} onClick={() => {
                                    dispatch(logOutUser())
                                    setUser({})
                                }} >выход
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M7.97344 14.6667H1.99334C1.62656 14.6667 1.32891 14.368 1.32891 14V2.00002C1.32891 1.63202 1.62659 1.33337 1.99334 1.33337H7.97344C8.34087 1.33337 8.63787 1.03538 8.63787 0.666715C8.63787 0.298053 8.34087 0 7.97344 0H1.99334C0.894343 0 0 0.897356 0 2.00002V14C0 15.1027 0.894343 16 1.99334 16H7.97344C8.34087 16 8.63787 15.702 8.63787 15.3333C8.63787 14.9647 8.34087 14.6667 7.97344 14.6667Z" fill="#939393" />
                                        <path d="M15.802 7.52543L11.7622 3.52543C11.5017 3.26675 11.0805 3.27011 10.8226 3.5321C10.5648 3.7941 10.5675 4.21609 10.8293 4.47477L13.7163 7.33342H5.98011C5.61267 7.33342 5.31567 7.63141 5.31567 8.00007C5.31567 8.36873 5.61267 8.66676 5.98011 8.66676H13.7163L10.8293 11.5254C10.5675 11.7841 10.5655 12.2061 10.8226 12.4681C10.9529 12.6001 11.1243 12.6667 11.2957 12.6667C11.4645 12.6667 11.6333 12.6027 11.7622 12.4747L15.802 8.47471C15.9283 8.34939 16 8.1787 16 8.00004C16 7.82145 15.929 7.65145 15.802 7.52543Z" fill="#939393" />
                                    </svg>
                                </Link>

                            </div>

                        </div> : <Link to={'/'} className={styles.linkToLogIn}>вход</Link>
                }
            </div>
        </header>
    )
}

export default Header
