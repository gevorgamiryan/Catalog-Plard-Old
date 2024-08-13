import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './subCategories.module.css';
import { useDispatch } from 'react-redux';
import { addSubCategory } from '../../features/productsSlice/productsSlice';
import { useHomeContext } from '../home/HomeContext';

const SubCategories = ({ selectData }) => {
    const scrollBoxRef = useRef(null);
    const scrollTumbRef = useRef(null);
    const changedSubCategoryRef = useRef(null);
    const [activeAddBox, setActiveAddBox] = useState(false);
    const [newSubCategoryName, setNewSubCategoryName] = useState("");
    const dispatch = useDispatch();
    const buttonsGroupBox = useRef(null);
    const [isDragable, setIsDragable] = useState(false);
    let initialClientX = 0;
    const {

        setProducts,
        currentCategory, setCurrentCategory,
        gender,
        changedSubCategory, setChangedSubCategory
    } = useHomeContext()
    const timeOut = useCallback(() => {
        return setTimeout(() => {
            if (scrollTumbRef.current && scrollBoxRef) {
                scrollTumbRef.current.style.transform = `translateX(${(changedSubCategoryRef.current.getBoundingClientRect().x - buttonsGroupBox.current.getBoundingClientRect().x - 15)}px)`;
                scrollTumbRef.current.style.width = `${changedSubCategoryRef.current.offsetWidth + 30}px`;
            }
        }, 400)
    }, [])

    useEffect(() => {
        timeOut()
    }, [changedSubCategory, currentCategory.categoryId])
    clearTimeout(timeOut)

    document.body.onmouseup = () => {
        setIsDragable(false);
    };
    document.body.addEventListener("click", () => {
        if (activeAddBox) setActiveAddBox(false)
    })
    document.body.onmousemove = (e) => {
        if (isDragable) {
            setIsDragable(true);
            if (initialClientX > e.clientX) {
                buttonsGroupBox.current.scrollLeft += 3;
                initialClientX = e.clientX;
            } else {
                buttonsGroupBox.current.scrollLeft -= 3;
                initialClientX = e.clientX;
            }
        }
    };


    useEffect(() => {
        setChangedSubCategory(null);
        if (scrollTumbRef.current && changedSubCategoryRef) {
            scrollTumbRef.current.style.transition = "0.3s";
            scrollTumbRef.current.style.transform = `translateX(18px)`;
            setTimeout(() => {
                scrollTumbRef.current.style.transition = "";
            }, 0)

        }
    }, [currentCategory.id]);




    return (
        <div className={styles.subCategoriesBox}>
            {currentCategory.subCategories ? (
                <div className={styles.subCategories}>
                    <div
                        onMouseDown={(e) => {
                            setIsDragable(true);
                            initialClientX = e.clientX;
                        }}
                        ref={buttonsGroupBox}
                        className={styles.btnsGroup}
                    >
                        <button
                            className={`${styles.btns}`}
                            onClick={(e) => {
                                setChangedSubCategory("");
                                setProducts(() => selectData.allProducts.filter((el) => el.categoryId === currentCategory.categoryId));
                                e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

                            }}
                            style={{ fontWeight: !changedSubCategory ? '900' : '' }}
                            ref={!changedSubCategory ? changedSubCategoryRef : null}
                        >
                            {currentCategory.category}
                        </button>
                        {currentCategory.subCategories.map((el, index) => (
                            <button
                                style={{ fontWeight: `${changedSubCategory === el ? 900 : ''}` }}
                                onClick={(e) => {
                                    setChangedSubCategory(el);
                                    setProducts(() =>
                                        selectData.allProducts.filter(
                                            (item) =>
                                                item.categoryId === currentCategory.categoryId &&
                                                item.subCategory.trim().toLowerCase() === el.trim().toLowerCase()
                                                && item.gender === 'womens' === gender
                                        )
                                    );
                                    e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });


                                }}
                                ref={changedSubCategory === el ? changedSubCategoryRef : null}
                                key={index + " " + el + " " + currentCategory.categoryId }
                                className={styles.btns}
                            >
                                {el}
                            </button>
                        ))}
                    </div>
                    <div className={styles.scrollBar} ref={scrollBoxRef}>
                        <div className={styles.scrollTumb} ref={scrollTumbRef} ></div>
                    </div>
                </div>
            ) : (
                ''
            )}
            {currentCategory.categoryId && (
                <div className={styles.addSubCategoryBox} onClick={(e) => e.stopPropagation()}>
                    <button className={styles.addSubCategoryBtn} onClick={() => setActiveAddBox(!activeAddBox)}>
                        +
                    </button>
                    {activeAddBox && (
                        <div className={styles.add}>
                            <h1>
                                {currentCategory.category} : добавить подкатегория
                                <svg
                                    onClick={() => {
                                        setActiveAddBox(false)
                                    }}
                                    width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.55">
                                        <path d="M17 1L1 17" stroke="#4F4F4F" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M1 1L17 17" stroke="#4F4F4F" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                </svg>
                            </h1>
                            <input
                                type="text"
                                value={newSubCategoryName}
                                onChange={(e) => {
                                    setNewSubCategoryName(e.target.value);
                                }}
                                placeholder="подкатегория"
                            />
                            <button
                                onClick={() => {
                                    if (newSubCategoryName.trim()) {
                                        dispatch(
                                            addSubCategory({
                                                ...currentCategory,
                                                subCategories: [...new Set([...currentCategory.subCategories, newSubCategoryName.trim()])],
                                            })
                                        );
                                        setCurrentCategory({
                                            ...currentCategory,
                                            subCategories: [...new Set([...currentCategory.subCategories, newSubCategoryName.trim()])],
                                        });
                                        setNewSubCategoryName('');
                                    }
                                }}
                                className={styles.addBtn}
                            >
                                добавить
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SubCategories;
