import React, { useEffect, useState } from 'react';
import styles from './productBox.module.css';
import { useDispatch } from 'react-redux';
import { deletProduct } from '../../features/productsSlice/productsSlice';
import { useHomeContext } from '../home/HomeContext';
const ProductBox = ({ el }) => {
    const dispatch = useDispatch()
    const [hidden, setHidden] = useState(false);

    const {
        setProduct,
        article, setArticle,
        products, setProducts
    } = useHomeContext()

    return (
        <div key={el.id} className={styles.productBox} >
            <img onClick={() => {
                setProduct(el)
            }} src={el.img["0"]} alt="#" />
            <div className={styles.articleBox}>
                {el.article}

                <div className={styles.priceBox}>
                    ${el.price}
                    <div className={`${styles.hiddenBox} ${hidden ? styles.visibleBox : ""}`}>
                        <svg
                            onClick={() => {
                                setArticle(el.article)
                            }}
                            width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4.6001H2.77778H17" stroke="#F44336" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5.4445 4.6V2.8C5.4445 2.32261 5.6318 1.86477 5.9652 1.52721C6.2986 1.18964 6.75078 1 7.22228 1H10.7778C11.2493 1 11.7015 1.18964 12.0349 1.52721C12.3683 1.86477 12.5556 2.32261 12.5556 2.8V4.6M15.2223 17.2V6.6C15.2223 5.49543 14.3268 4.6 13.2223 4.6H4.77783C3.67326 4.6 2.77783 5.49543 2.77783 6.6V17.2C2.77783 17.6774 2.96513 18.1352 3.29853 18.4728C3.63193 18.8104 4.08411 19 4.55561 19H13.4445C13.916 19 14.3682 18.8104 14.7016 18.4728C15.035 18.1352 15.2223 17.6774 15.2223 17.2Z" stroke="#F44336" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7.22217 9.1001V14.5001" stroke="#F44336" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.7778 9.1001V14.5001" stroke="#F44336" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.05116 2.89746H2.78915C2.31464 2.89746 1.85956 3.08596 1.52403 3.42149C1.1885 3.75702 1 4.2121 1 4.68661V17.2106C1 17.6851 1.1885 18.1402 1.52403 18.4757C1.85956 18.8113 2.31464 18.9998 2.78915 18.9998H15.3132C15.7877 18.9998 16.2428 18.8113 16.5783 18.4757C16.9138 18.1402 17.1023 17.6851 17.1023 17.2106V10.9486" stroke="#727272" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15.7605 1.55582C16.1163 1.19993 16.599 1 17.1023 1C17.6056 1 18.0883 1.19993 18.4442 1.55582C18.8001 1.9117 19 2.39438 19 2.89768C19 3.40097 18.8001 3.88365 18.4442 4.23953L10.3174 12.3663C10.0742 12.6095 9.76947 12.782 9.43579 12.8655V12.8655C8.04597 13.2129 6.78707 11.954 7.13452 10.5642V10.5642C7.21794 10.2305 7.39047 9.92579 7.63368 9.68258L15.7605 1.55582Z" stroke="#727272" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                    </div>
                    <svg
                        onClick={(e) => {
                            setHidden(!hidden)
                        }}
                        width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z" stroke="#B3B3B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z" stroke="#B3B3B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z" stroke="#B3B3B4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                </div>
                <div className={`${styles.deleteProduct} ${article === el.article ? styles.showedDelete : ""}`} onClick={(e) => e.stopPropagation()} >
                    <div className={styles.deleteBoxHead}>
                        удалить одел  {article}
                        <span onClick={() => {
                            setArticle("");
                        }}>
                            <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.55">
                                    <path d="M17 1.521L1 17.521" stroke="#4F4F4F" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M1 1.521L17 17.521" stroke="#4F4F4F" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                            </svg>

                        </span>


                    </div>
                    <div className={styles.dleteQuestion}>
                        <span>удалить одел  {article}</span>
                        <div className={styles.buttonsBox}>
                            <button className={styles.no} onClick={() => setArticle("")} >нет</button>
                            <button className={styles.yes} onClick={async () => {
                                dispatch(deletProduct(el))
                                setProducts(products.filter((item) => el.id !== item.id))
                                
                            setArticle("")
                            }}>да</button>
                    </div>
                </div>
            </div>

        </div>
        </div >
    )
}

export default ProductBox
