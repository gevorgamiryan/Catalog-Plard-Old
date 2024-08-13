import React, { useContext, useCallback, useEffect, useRef, useState, createContext } from 'react';
import styles from './home.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getCategories, getProducts, selectCategories, selectProductsSlice } from '../../features/productsSlice/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import SubCategories from '../subCategoris/SubCategories';
import CategoryBox from '../categoryBox/CategoryBox';
import axios from 'axios';
import ProductBox from '../productBox/ProductBox';
import RangeInput from '../rangeInput/RangeInput';
import CurrentProductAbout from '../currentProductAbout/CurrentProductAbout';
import AddProductPopUp from '../addProductPopUp/AddProductPopUp';
import { useHomeContext } from './HomeContext';

const monts = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

const Home = () => {
  const {
    products, setProducts,
    currentCategory, setCurrentCategory,
    setCategories,
    gender,
    setActive,

  } = useHomeContext()
  const selectData = useSelector(selectProductsSlice);
  const [activeFilterBox, setActiveFilterBox] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const dispatch = useDispatch();
  const filterRef = useRef(null);
  const [price, setPrice] = useState({ from: 0, to: 0 });
  const [weight, setWeight] = useState({ from: 0, to: 0 });
  const [carat, setCarat] = useState({ from: 0, to: 0 });
  const [work, setWork] = useState({ from: 0, to: 0 });
  const navigate = useNavigate();
  const [addPopUp, setAddPopUp] = useState(false);


  const handleFilter = useCallback(() => {

    setProducts(() => selectData.allProducts.filter((el) => {
      const date1 = new Date(dateFrom).getTime() < new Date(el.data).getTime();
      const date2 = new Date(dateTo).getTime() > new Date(el.data).getTime();
      if (el.gender === 'womens' !== gender) return false;
      else if (dateFrom && !date1) return false;
      else if (dateTo && !date2) return false;
      else if (el.price > price.to || el.price < price.from) return false;
      else if (el.weight > weight.to || el.weight < weight.from) return false;
      else if (el.carat > carat.to || el.carat < carat.from) return false;
      else if (el.work > work.to || el.work < work.from) return false;

      return true;


    }))
  })
  useEffect(() => async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/products");
      setProducts(data.filter((el) => el.gender === 'womens' === gender))
    } catch (err) {
      return err
    }
    if (!JSON.parse(sessionStorage.getItem("user"))) return navigate("/");
    dispatch(getCategories());
    dispatch(getProducts());
  }, [])


  useEffect(() => {
    setCategories(selectData.categories)
  }, [selectData.categories])

  useEffect(() => {
    setCurrentCategory({})
    setActive(false)
  }, [gender])

  return (
    <div className={styles.home}>
      <div className={styles.categoriesAddBox}>
        <CategoryBox selectData={selectData} />
      </div>
      <SubCategories selectData={selectData} />
      <div className={styles.products}>
        {
          products.map((el) => <ProductBox key={el.id * Math.random()}
            el={el}

          />)
        }
      </div>

      <div className={`${styles.filterBox} ${activeFilterBox ? styles.activeFilterBox : ""} `}>
        <div className={styles.filterBoxAfter} onClick={() => setActiveFilterBox(!activeFilterBox)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.172 5.73484H16.9543C17.2411 5.73484 17.4758 5.47678 17.4758 5.16137C17.4758 4.84596 17.2411 4.58789 16.9543 4.58789H16.172C15.8852 4.58789 15.6505 4.84596 15.6505 5.16137C15.6505 5.47678 15.8852 5.73484 16.172 5.73484Z" fill="white" />
            <path d="M23.8902 0.630824C23.7077 0.229391 23.3427 0 22.9515 0H1.04846C0.657335 0 0.292284 0.258064 0.109758 0.630824C-0.0727673 1.03226 -0.0206171 1.49104 0.214059 1.83513L9.41857 14.5663V22.853C9.41857 23.2832 9.62717 23.6559 9.96614 23.8566C10.1226 23.9427 10.279 24 10.4616 24C10.6702 24 10.8788 23.9427 11.0613 23.7993L13.9556 21.5914C14.3728 21.2473 14.6075 20.7312 14.6075 20.1864V14.5376L23.7859 1.83513C24.0206 1.49104 24.0728 1.03226 23.8902 0.630824ZM13.6688 13.9928C13.6167 14.0789 13.5645 14.1935 13.5645 14.3369V20.1577C13.5645 20.3584 13.4863 20.5305 13.3559 20.6452L10.4616 22.853V14.3369C10.4616 14.1362 10.3833 13.9642 10.253 13.8781L4.36 5.73477H13.8253C14.1121 5.73477 14.3468 5.4767 14.3468 5.16129C14.3468 4.84588 14.1121 4.58781 13.8253 4.58781H3.65597C3.6299 4.58781 3.57775 4.58781 3.55167 4.58781L1.04846 1.14695H22.9515L13.6688 13.9928Z" fill="white" />
          </svg>

          <pre>
            Ф
            и
            л
            ь
            т
            р
          </pre>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13L7 7L0.999999 1" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

        </div>

        <svg width="22" className={styles.helpSvg} height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" stroke="#C10016" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 7V11" stroke="#C10016" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 15H11.01" stroke="#C10016" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className={styles.dataChange}>


        </div>
        <div className={styles.dataChange}>
          <label htmlFor="date">
            {dateFrom ? (<pre>{dateFrom.getFullYear()} {monts[dateFrom.getMonth()]} {dateFrom.getDate()}</pre>) : 'дата'}
            <input
              onChange={(e) => {
                setDateFrom(e.target.value ? new Date(e.target.value) : "")
              }}
              type="date" id='date' className={styles.dateInput} onClick={(e) => e.target.showPicker()} />
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.2222 2.7998H2.77778C1.79594 2.7998 1 3.60569 1 4.5998V17.1998C1 18.1939 1.79594 18.9998 2.77778 18.9998H15.2222C16.2041 18.9998 17 18.1939 17 17.1998V4.5998C17 3.60569 16.2041 2.7998 15.2222 2.7998Z" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12.5557 1V4.6" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5.44434 1V4.6" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1 8.2002H17" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

          </label>
          <label htmlFor="dateto">
            {dateTo ? (<pre>{dateTo.getFullYear()} {monts[dateTo.getMonth()]} {dateTo.getDate()}</pre>) : 'дата'}
            <input type="date" id='dateto'
              onChange={(e) => {
                setDateTo(e.target.value ? new Date(e.target.value) : "")
              }}
              className={styles.dateInput}

              onClick={(e) => e.target.showPicker()} />
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.2222 2.7998H2.77778C1.79594 2.7998 1 3.60569 1 4.5998V17.1998C1 18.1939 1.79594 18.9998 2.77778 18.9998H15.2222C16.2041 18.9998 17 18.1939 17 17.1998V4.5998C17 3.60569 16.2041 2.7998 15.2222 2.7998Z" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12.5557 1V4.6" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5.44434 1V4.6" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1 8.2002H17" stroke="#C4C4C4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

          </label>
        </div>
        <div className={styles.inputRange}>
          <span>
            вес золота
          </span>
          <RangeInput setVal={setWeight} filterBtn={filterRef.current} value={"weight"} />


        </div>
        <div className={styles.inputRange}>
          <span>
            карат
          </span>
          <RangeInput setVal={setCarat} filterBtn={filterRef.current} value={"carat"} />


        </div>
        <div className={styles.inputRange}>
          <span>
            цена
          </span>
          <RangeInput setVal={setPrice} filterBtn={filterRef.current} value={"price"} />


        </div>
        <div className={styles.inputRange}>
          <span>
            цена производства
          </span>
          <RangeInput setVal={setWork} filterBtn={filterRef.current} value={"work"} />


        </div>
        <button ref={filterRef}
          onClick={() => handleFilter()}
          className={styles.acceptFilter}>
          сохранить
        </button>
      </div>
      <div className={styles.toAddPage} onClick={() => setAddPopUp(true)} >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 1V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 7H1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      </div>
      <CurrentProductAbout currentCategory={currentCategory}
      />
      <AddProductPopUp addPopUp={addPopUp} setAddPopUp={setAddPopUp} />
    </div>

  )
}
export default Home