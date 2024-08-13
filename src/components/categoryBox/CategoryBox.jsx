import { useDispatch, useSelector } from 'react-redux';
import styles from './categoryBox.module.css';
import React, { useState } from 'react'
import { addCategories, selectCategories } from '../../features/productsSlice/productsSlice';
import { useHomeContext } from '../home/HomeContext';

const CategoryBox = ({ selectData }) => {
    const {
        categories, setCategories,
        gender, setGender,
        active, setActive,
        setProducts,
        currentCategory, setCurrentCategory,


    } = useHomeContext()

    const [newCategoryImg, setNewCategoryImg] = useState("");
    const [newCategoryGender, setNewCategoryGender] = useState(true);
    const [newCategoryName, setNewCategoryName] = useState("");
    const dispatch = useDispatch()
    const categoriesData = useSelector(selectCategories)
    const handelClick = (e) => {
        setGender(e);
        setProducts(selectData.allProducts.filter((elem) => {
            return (elem.gender.trim().toLowerCase() === 'womens') === e
        }))
        setCategories(() => selectData.categories.filter((elem) => {
            return (elem.gender === 'womens') === e
        })
        )
        setCurrentCategory({})
    }
    const changeCategory = (category) => {
        setProducts(selectData.allProducts.filter((el) => {
            return el.categoryId === category.categoryId && ((el.gender === 'womens') === gender)
        }));
        setCurrentCategory(category);
    }
    return (
        <div className={styles.categories}>
            <div className={styles.changeGender}>
                <div className={gender ? styles.active : ""}
                    onClick={() => handelClick(true)}
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.19278 13.5375L6.06602 12.8196L6.23179 12.1564C5.16954 12.0125 4.13929 11.6902 3.18456 11.2032C3.07814 11.1394 3.01022 11.0272 3.00305 10.9034C2.99552 10.7796 3.04899 10.6598 3.14631 10.5827C3.15981 10.5737 4.50006 9.46762 4.50006 5.63532C4.50006 2.40326 5.2568 0.764386 6.75006 0.764386H6.97506C7.49312 0.208152 8.24434 -0.0698417 9.00005 0.0150247C10.4093 0.0150247 13.5 1.4306 13.5 5.63532C13.5 9.46762 14.8403 10.5737 14.85 10.5812C15.0159 10.7051 15.0498 10.9399 14.9257 11.1057C14.8966 11.1445 14.8602 11.1774 14.8185 11.2024C13.8646 11.694 12.833 12.0175 11.7691 12.1586L11.9348 12.8203L14.8073 13.5382C16.6854 14.0051 18.0028 15.6915 18 17.6253C18 17.8322 17.8321 18 17.625 18H0.375017C0.167912 18 5.72205e-06 17.8322 5.72205e-06 17.6253C-0.00305367 15.6913 1.31439 14.0044 3.19278 13.5375Z" fill="#939393" />
                    </svg>

                </div>
                <div className={!gender ? styles.active : ""}
                    onClick={() => handelClick(false)}
                >
                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.989 17.5343L18.514 15.7343C18.2887 14.861 17.6054 14.1588 16.7051 13.875L13.2217 12.7755C12.3722 12.4403 11.9836 11.1442 11.8996 10.6522C12.5469 10.1423 12.9634 9.41685 13.0634 8.62499C13.0491 8.48974 13.0828 8.35383 13.1592 8.23873C13.2826 8.20944 13.3836 8.1257 13.4307 8.01373C13.6586 7.49088 13.8017 6.93837 13.855 6.37499C13.8551 6.34437 13.8512 6.31389 13.8432 6.28425C13.7864 6.06533 13.6506 5.87215 13.4592 5.73824V3.74998C13.4592 2.54173 13.0697 2.04599 12.6596 1.75873C12.5813 1.17675 11.9234 0 9.50091 0C7.35164 0.0819844 5.6291 1.71387 5.54256 3.75001V5.73827C5.35115 5.87218 5.21529 6.06537 5.15859 6.28429C5.15058 6.31392 5.14661 6.34444 5.14672 6.37502C5.20001 6.93868 5.34306 7.49145 5.57106 8.01453C5.60535 8.12053 5.69527 8.20206 5.80856 8.2298C5.85291 8.25078 5.93603 8.35956 5.93603 8.62506C6.03664 9.41917 6.45553 10.1463 7.10613 10.6561C7.023 11.1473 6.63666 12.4426 5.81097 12.7696L2.29675 13.875C1.39711 14.1588 0.714298 14.8603 0.488599 15.7328L0.0135988 17.5328C-0.0401727 17.7336 0.0880031 17.9376 0.299898 17.9885C0.331552 17.9962 0.364097 18 0.396753 18.0001H18.6051C18.8237 18 19.0009 17.8321 19.0008 17.625C19.0008 17.5943 18.9968 17.5639 18.989 17.5343Z" fill="#939393" />
                    </svg>

                </div>

            </div>



            <div className={styles.categoriesCarusellBoxes}>
                {
                    categories.map((el) => {
                        if (el.gender === 'womens' === gender)
                            return (<div key={el.id}
                                onClick={() => changeCategory(el)}
                                className={`${styles.categoryBox} ${currentCategory.id === el.id ? styles.changedCategory : ""} `}>
                                <img src={el.src} alt="#" />
                                {el.category}
                            </div>)
                    })
                }
            </div>

            <div className={styles.categoriesAddBox}>
                <button className={styles.addCategory} onClick={() => setActive(!active)} >+</button>
                <div className={`${styles.addCategoryMenu} ${active ? styles.addCategoryMenuActive : ""}`}>
                    <h1 className={styles.firstChildren}>
                        добавить категория
                        <svg onClick={() => {
                            setActive(false)
                        }}
                            width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.55">
                                <path d="M17 1L1 17" stroke="#4F4F4F" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1 1L17 17" stroke="#4F4F4F" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                        </svg>

                    </h1>
                    <div className={styles.changeGenderBox}>
                        <button
                            onClick={() => {
                                setNewCategoryGender(true)
                            }}
                            className={`${styles.changeGenderCategory} ${newCategoryGender ? styles.changed : ""}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.25346 18.05L8.08126 17.0928L8.30209 16.2085C6.88695 16.0166 5.51442 15.5869 4.2425 14.9376C4.10073 14.8526 4.01024 14.7029 4.00069 14.5379C3.99067 14.3728 4.0619 14.2131 4.19155 14.1103C4.20953 14.0983 5.99505 12.6235 5.99505 7.51377C5.99505 3.20436 7.00319 1.01918 8.99255 1.01918H9.2923C9.98247 0.277536 10.9833 -0.0931224 11.99 0.020033C13.8675 0.020033 17.985 1.90747 17.985 7.51377C17.985 12.6235 19.7706 14.0983 19.7835 14.1083C20.0045 14.2735 20.0496 14.5866 19.8844 14.8076C19.8456 14.8594 19.7971 14.9032 19.7416 14.9366C18.4708 15.592 17.0964 16.0233 15.679 16.2115L15.8998 17.0938L19.7265 18.051C22.2286 18.6735 23.9837 20.9221 23.98 23.5004C23.98 23.7763 23.7563 24 23.4804 24H0.499567C0.223658 24 -3.05176e-05 23.7763 -3.05176e-05 23.5004C-0.00410652 20.9217 1.75102 18.6726 4.25346 18.05Z" fill="#939393" />
                            </svg>
                            женский
                        </button>
                        <button
                            onClick={() => {
                                setNewCategoryGender(false)
                            }}
                            className={`${styles.changeGenderCategory} ${!newCategoryGender ? styles.changed : ""}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.9859 23.379L23.3859 20.979C23.1012 19.8147 22.2382 18.8784 21.1009 18.5L16.7009 17.034C15.6279 16.587 15.1369 14.859 15.0309 14.203C15.8485 13.5231 16.3745 12.5558 16.5009 11.5C16.4828 11.3197 16.5254 11.1384 16.6219 10.985C16.7778 10.9459 16.9054 10.8343 16.9648 10.685C17.2527 9.98784 17.4334 9.25116 17.5009 8.49998C17.501 8.45916 17.496 8.41852 17.4859 8.379C17.4142 8.08711 17.2426 7.82953 17.0008 7.65098V4.99997C17.0008 3.38897 16.5088 2.72798 15.9908 2.34497C15.8919 1.569 15.0609 0 12.0009 0C9.28606 0.109313 7.11021 2.28516 7.0009 5.00002V7.65103C6.75912 7.82958 6.58751 8.08716 6.51588 8.37905C6.50576 8.41856 6.50074 8.45925 6.50088 8.50003C6.5682 9.25158 6.7489 9.98859 7.0369 10.686C7.08021 10.8274 7.19379 10.9361 7.3369 10.9731C7.39292 11.001 7.49792 11.1461 7.49792 11.5001C7.62499 12.5589 8.15412 13.5284 8.97593 14.2081C8.87093 14.8631 8.38292 16.5901 7.33995 17.0261L2.90093 18.5001C1.76454 18.8784 0.90204 19.8138 0.616946 20.9771L0.0169461 23.3771C-0.0509758 23.6447 0.110931 23.9168 0.378587 23.9847C0.418571 23.9949 0.459681 24 0.500931 24.0001H23.5009C23.7771 24 24.0009 23.7761 24.0008 23.4999C24.0008 23.4591 23.9958 23.4185 23.9859 23.379Z" fill="#939393" />
                            </svg>
                            мужской
                        </button>
                    </div>
                    <input type="text" value={newCategoryName} placeholder='категория'
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className={styles.categoryName} />

                    <label htmlFor="file" className={styles.imgBox}>
                        {
                            newCategoryImg ? <img src={newCategoryImg} alt="#" /> :
                                <svg width="261" height="202" viewBox="0 0 261 202" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="261" height="145" rx="5" fill="#D3D3D3" />
                                    <path d="M143.312 31H122.688C120.103 31 118 33.2618 118 36.042V53.6891C118 56.4693 120.103 58.7311 122.688 58.7311H133.82C134.267 58.7311 134.675 58.4576 134.872 58.0258C135.069 57.5942 135.021 57.0794 134.747 56.6993L131.682 52.4382L140.178 40.8147L145.656 47.845V49.9706C145.656 50.6668 146.181 51.2311 146.828 51.2311C147.475 51.2311 148 50.6668 148 49.9706V36.042C148 33.2618 145.897 31 143.312 31V31ZM141.047 38.0054C140.82 37.7144 140.484 37.5482 140.13 37.5549C139.777 37.5608 139.445 37.7375 139.227 38.0362L130.203 50.3825L127.13 46.111C126.908 45.8023 126.566 45.6219 126.203 45.6219C126.203 45.6219 126.202 45.6219 126.202 45.6219C125.838 45.6223 125.496 45.804 125.274 46.1137L122.695 49.72C122.301 50.2719 122.397 51.0632 122.91 51.4876C123.423 51.9123 124.158 51.8089 124.553 51.2572L126.206 48.9459L131.432 56.2101H122.688C121.395 56.2101 120.344 55.0791 120.344 53.6891V36.042C120.344 34.652 121.395 33.521 122.688 33.521H143.312C144.605 33.521 145.656 34.652 145.656 36.042V43.9207L141.047 38.0054ZM126.203 35.5378C124.264 35.5378 122.688 37.2341 122.688 39.3193C122.688 41.4046 124.264 43.1008 126.203 43.1008C128.142 43.1008 129.719 41.4046 129.719 39.3193C129.719 37.2341 128.142 35.5378 126.203 35.5378ZM126.203 40.5798C125.557 40.5798 125.031 40.0143 125.031 39.3193C125.031 38.6243 125.557 38.0588 126.203 38.0588C126.849 38.0588 127.375 38.6243 127.375 39.3193C127.375 40.0143 126.849 40.5798 126.203 40.5798ZM148 55.0126C148 55.7088 147.475 56.2731 146.828 56.2731H143.605V59.7395C143.605 60.4357 143.081 61 142.434 61C141.786 61 141.262 60.4357 141.262 59.7395V56.2731H138.039C137.392 56.2731 136.867 55.7088 136.867 55.0126C136.867 54.3164 137.392 53.7521 138.039 53.7521H141.262V50.2857C141.262 49.5895 141.786 49.0252 142.434 49.0252C143.081 49.0252 143.605 49.5895 143.605 50.2857V53.7521H146.828C147.475 53.7521 148 54.3164 148 55.0126Z" fill="white" />
                                    <path d="M96.0415 92.16C97.1455 91.744 97.8175 90.864 97.8175 89.712C97.8175 87.76 95.8175 86.624 93.4815 86.624C92.2655 86.624 90.9695 86.928 89.8015 87.584L90.3135 88.896C91.3055 88.288 92.4255 88 93.4335 88C94.9695 88 96.2015 88.688 96.2015 89.904C96.2015 90.944 95.3535 91.568 93.9295 91.568H91.5455V92.864H94.0415C95.6895 92.864 96.6655 93.472 96.6655 94.624C96.6655 96 95.2095 96.752 93.4975 96.752C92.3135 96.752 91.0175 96.384 90.0095 95.6L89.4495 96.784C90.6975 97.712 92.2495 98.128 93.6895 98.128C96.1215 98.128 98.2815 96.928 98.2815 94.864C98.2815 93.536 97.4335 92.544 96.0415 92.16ZM103.715 89.44C102.355 89.44 101.091 89.824 100.211 90.528L100.851 91.68C101.507 91.12 102.531 90.768 103.539 90.768C105.059 90.768 105.811 91.52 105.811 92.816V93.12H103.379C100.851 93.12 99.9711 94.24 99.9711 95.6C99.9711 97.072 101.187 98.096 103.107 98.096C104.435 98.096 105.379 97.648 105.891 96.88V98H107.347V92.88C107.347 90.56 106.035 89.44 103.715 89.44ZM103.363 96.912C102.195 96.912 101.491 96.384 101.491 95.536C101.491 94.816 101.923 94.224 103.443 94.224H105.811V95.408C105.427 96.384 104.515 96.912 103.363 96.912ZM116.353 89.52H110.113V98H111.649V90.864H116.353V89.52ZM122.422 89.44C121.174 89.44 120.086 89.92 119.398 90.864V89.52H117.926V101.104H119.462V96.72C120.166 97.632 121.222 98.096 122.422 98.096C124.902 98.096 126.71 96.368 126.71 93.76C126.71 91.168 124.902 89.44 122.422 89.44ZM122.294 96.752C120.678 96.752 119.446 95.568 119.446 93.76C119.446 91.968 120.678 90.784 122.294 90.784C123.926 90.784 125.158 91.968 125.158 93.76C125.158 95.568 123.926 96.752 122.294 96.752ZM134.771 89.52L131.843 96.304L128.883 89.52H127.283L131.027 97.984L130.755 98.576C130.339 99.552 129.875 99.888 129.139 99.888C128.563 99.888 128.035 99.664 127.619 99.264L126.963 100.416C127.491 100.928 128.323 101.2 129.139 101.2C130.435 101.2 131.411 100.64 132.163 98.848L136.275 89.52H134.771ZM142.236 93.584C143.164 93.248 143.772 92.56 143.772 91.712C143.772 90.336 142.252 89.408 140.188 89.408C139.1 89.408 138.044 89.632 136.94 90.192L137.356 91.376C138.284 90.944 139.164 90.72 140.028 90.72C141.324 90.72 142.188 91.168 142.188 91.936C142.188 92.656 141.468 93.072 140.332 93.072H138.892V94.176H140.444C141.692 94.176 142.428 94.624 142.428 95.408C142.428 96.272 141.484 96.8 140.044 96.8C139.004 96.8 137.884 96.512 137.068 95.984L136.604 97.152C137.548 97.76 138.796 98.112 140.06 98.112C142.316 98.112 144.012 97.072 144.012 95.536C144.012 94.56 143.372 93.872 142.236 93.584ZM146.347 98H147.755L152.939 91.824V98H154.475V89.52H153.083L147.883 95.696V89.52H146.347V98ZM163.777 89.52H156.033V90.864H159.137V98H160.673V90.864H163.777V89.52ZM169.267 92.4L166.883 92.384V89.52H165.347V98L169.027 98.016C171.299 98.032 172.579 97.008 172.579 95.168C172.579 93.424 171.427 92.416 169.267 92.4ZM168.899 96.848L166.883 96.832V93.504L168.899 93.536C170.307 93.552 171.011 94.032 171.011 95.152C171.011 96.288 170.291 96.864 168.899 96.848ZM123.838 112.384C123.838 109.44 121.662 107.664 117.902 107.52V106.384H116.414V107.52C112.638 107.664 110.462 109.424 110.462 112.384C110.462 115.328 112.638 117.088 116.414 117.232V118.416H117.902V117.232C121.678 117.104 123.838 115.344 123.838 112.384ZM117.902 115.984V108.784C120.702 108.944 122.302 110.192 122.302 112.368C122.302 114.576 120.75 115.808 117.902 115.984ZM112.014 112.384C112.014 110.176 113.566 108.96 116.414 108.784V115.984C113.63 115.808 112.014 114.592 112.014 112.384ZM129.675 118.096C132.219 118.096 134.075 116.288 134.075 113.76C134.075 111.232 132.219 109.44 129.675 109.44C127.131 109.44 125.259 111.232 125.259 113.76C125.259 116.288 127.131 118.096 129.675 118.096ZM129.675 116.752C128.043 116.752 126.811 115.568 126.811 113.76C126.811 111.952 128.043 110.784 129.675 110.784C131.307 110.784 132.523 111.952 132.523 113.76C132.523 115.568 131.307 116.752 129.675 116.752ZM142.3 109.52H134.556V110.864H137.66V118H139.196V110.864H142.3V109.52ZM147.128 118.096C149.672 118.096 151.528 116.288 151.528 113.76C151.528 111.232 149.672 109.44 147.128 109.44C144.584 109.44 142.712 111.232 142.712 113.76C142.712 116.288 144.584 118.096 147.128 118.096ZM147.128 116.752C145.496 116.752 144.264 115.568 144.264 113.76C144.264 111.952 145.496 110.784 147.128 110.784C148.76 110.784 149.976 111.952 149.976 113.76C149.976 115.568 148.76 116.752 147.128 116.752Z" fill="white" />
                                    <rect x="2" y="170" width="259" height="32" rx="16" fill="#C10016" />
                                    <path d="M97.056 190.24V180.8H88.848L88.72 184.352C88.608 187.632 88.24 190.176 86.72 190.24H86.24L86.224 194.384H88.16V192H96.752V194.384H98.672V190.24H97.056ZM90.544 184.544L90.624 182.56H95.008V190.24H89.328C90.192 189.344 90.448 187.088 90.544 184.544ZM104.058 192.112C106.714 192.112 108.618 190.288 108.618 187.728C108.618 185.168 106.714 183.36 104.058 183.36C101.434 183.36 99.5143 185.168 99.5143 187.728C99.5143 190.288 101.434 192.112 104.058 192.112ZM104.058 190.4C102.618 190.4 101.53 189.36 101.53 187.728C101.53 186.096 102.618 185.056 104.058 185.056C105.514 185.056 106.602 186.096 106.602 187.728C106.602 189.36 105.514 190.4 104.058 190.4ZM115.218 183.872C113.906 183.872 112.786 184.4 112.034 185.312C112.21 183.456 113.186 182.496 115.25 182.064L118.85 181.328L118.562 179.536L114.594 180.384C111.554 181.024 110.114 183.024 110.114 186.448C110.114 190.176 111.842 192.16 114.77 192.16C117.458 192.16 119.33 190.48 119.33 187.968C119.33 185.552 117.666 183.872 115.218 183.872ZM114.818 190.544C113.346 190.544 112.322 189.504 112.322 188.016C112.322 186.528 113.33 185.568 114.818 185.568C116.29 185.568 117.282 186.528 117.282 188.016C117.282 189.488 116.29 190.544 114.818 190.544ZM124.341 183.36C122.965 183.36 121.637 183.712 120.725 184.416L121.509 185.872C122.149 185.344 123.141 185.024 124.101 185.024C125.525 185.024 126.229 185.712 126.229 186.88V187.008H124.021C121.429 187.008 120.469 188.128 120.469 189.552C120.469 191.04 121.701 192.112 123.653 192.112C124.933 192.112 125.861 191.696 126.341 190.96V192H128.229V186.992C128.229 184.528 126.805 183.36 124.341 183.36ZM124.069 190.656C123.045 190.656 122.437 190.192 122.437 189.472C122.437 188.848 122.805 188.336 124.165 188.336H126.229V189.328C125.893 190.208 125.045 190.656 124.069 190.656ZM136.895 187.552C137.711 187.2 138.207 186.544 138.207 185.664C138.207 184.256 136.959 183.456 134.879 183.456H130.703V192H135.055C137.359 192 138.479 191.104 138.479 189.6C138.479 188.56 137.951 187.872 136.895 187.552ZM132.607 184.912H134.703C135.727 184.912 136.255 185.248 136.255 185.952C136.255 186.656 135.727 187.024 134.703 187.024H132.607V184.912ZM134.895 190.544H132.607V188.352H134.959C136.047 188.352 136.543 188.72 136.543 189.472C136.543 190.208 135.967 190.544 134.895 190.544ZM140.61 192H142.45L147.154 186.368V192H149.154V183.456H147.33L142.61 189.088V183.456H140.61V192ZM158.612 183.456H150.612V185.152H153.62V192H155.62V185.152H158.612V183.456ZM164.351 186.272L162.063 186.256V183.456H160.063V192L164.063 192.016C166.399 192.032 167.727 190.96 167.727 189.088C167.727 187.312 166.543 186.272 164.351 186.272ZM163.887 190.544L162.063 190.528V187.632L163.887 187.648C165.071 187.664 165.695 188.08 165.695 189.056C165.695 190.048 165.055 190.56 163.887 190.544Z" fill="white" />
                                </svg>


                        }
                        <input id='file' type="file" onChange={(e) => {
                            if (e.target.files[0]) {
                                setNewCategoryImg(URL.createObjectURL(e.target.files[0]))
                                e.target.value = null
                            }
                        }} />
                    </label>
                    <button className={styles.acceptCategory}
                        onClick={() => {
                            setNewCategoryImg("")
                            if (newCategoryImg && newCategoryName) {
                                dispatch(addCategories({
                                    categoryId: Math.round((Date.now() / 1000) + (Math.random() * 255)),
                                    category: newCategoryName,
                                    gender: newCategoryGender ? "womens" : "mens",
                                    src: newCategoryImg,
                                    subCategories: [],
                                }))
                                setCategories(categoriesData)
                                setNewCategoryName("")
                            }
                        }}
                    >добавить</button>
                </div>
            </div>

        </div>
    )
}

export default CategoryBox
