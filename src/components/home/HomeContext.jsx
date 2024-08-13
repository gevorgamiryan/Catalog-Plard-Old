import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { selectAllProducts } from "../../features/productsSlice/productsSlice";


const HomeContext = createContext();

const HomeContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [gender, setGender] = useState(true);
  const [changedSubCategory, setChangedSubCategory] = useState("");
  const [active, setActive] = useState(false);
  const [product, setProduct] = useState({});
  const [params, setParams] = useSearchParams({ category: "", categoryId: "" });
  const [article, setArticle] = useState("");

  const value = {
    products, setProducts,
    currentCategory, setCurrentCategory,
    categories, setCategories,
    gender, setGender,
    changedSubCategory, setChangedSubCategory,
    active, setActive,
    product, setProduct,
    params, setParams,
    article, setArticle
  }

  return (
    <HomeContext.Provider value={value} >
      {children}
    </HomeContext.Provider>
  );
};

const useHomeContext = () => useContext(HomeContext);

export { HomeContextProvider, useHomeContext };
