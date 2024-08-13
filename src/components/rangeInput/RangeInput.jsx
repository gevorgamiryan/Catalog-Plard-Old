import React, { useEffect, useRef, useState } from 'react';
import styles from './rangeInput.module.css';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../../features/productsSlice/productsSlice';

const RangeInput = ({ value, setVal }) => {
    const selectProducts = useSelector(selectAllProducts);
    const leftHandeRef = useRef(null);
    const rightHandeRef = useRef(null);
    const inputBoxRef = useRef(null);
    const inputRef = useRef(null);
    const [isDragable, setIsdragable] = useState(false);
    const [isDragableRight, setIsdragableRight] = useState(false);
    const [scrollLeftProcent, setScrollLeftProcent] = useState(28);
    const [scrollRightProcent, setScrollRightProcent] = useState(68);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [maxValue, setMaxValue] = useState(0);

    useEffect(() => {
        const handleMouseUp = () => {
            setIsdragable(false);
            setIsdragableRight(false);
        };

        const handleMouseMove = (e) => {
            const rightRange = rightHandeRef.current;
            const leftRange = leftHandeRef.current;

            if (isDragable && e.clientX > inputRef.current.offsetLeft + 7 && e.clientX < (rightRange.getBoundingClientRect().x - rightRange.getBoundingClientRect().width / 2 - 2)) {
                setScrollLeftProcent((e.clientX - (leftRange.offsetWidth / 2) - inputRef.current.getBoundingClientRect().x) * 100 / inputRef.current.offsetWidth);
            } else if (isDragableRight && e.clientX - (rightRange.offsetWidth / 2) <= inputRef.current.offsetLeft + inputRef.current.offsetWidth && e.clientX - (rightRange.offsetWidth / 2) > (leftRange.getBoundingClientRect().x + leftRange.getBoundingClientRect().width)) {
                setScrollRightProcent((e.clientX - (rightRange.offsetWidth / 2) - inputRef.current.getBoundingClientRect().x) * 100 / inputRef.current.offsetWidth);
            }
        };

        document.body.addEventListener('mouseup', handleMouseUp);
        document.body.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.body.removeEventListener('mouseup', handleMouseUp);
            document.body.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isDragable, isDragableRight]);

    useEffect(() => {
        setMaxValue(() => {
            let current = 0;
            selectProducts.forEach(element => {
                if (value === "price" && element.price > current) {
                    current = element.price;
                } else if (value === "carat" && element.carat > current) {
                    current = element.carat;
                } else if (value === "weight" && element.weight > current) {
                    current = element.weight;
                } else if (value === "work" && element.work > current) {
                    current = element.work;
                }
            });
            return current;
        });
    }, [selectProducts, value]);

    useEffect(() => {
        const leftRange = leftHandeRef.current;
        const rightRange = rightHandeRef.current;
        const inputBox = inputBoxRef.current;

        if (leftRange) {
            leftRange.style.left = scrollLeftProcent + "%";
            setFrom(Math.round((maxValue * scrollLeftProcent) / 100));
            setVal(prev => ({ ...prev, from: Math.round((maxValue * scrollLeftProcent) / 100) }));
        }
        if (inputBox) {
            inputBox.style.left = leftRange.offsetLeft + 11 + "px";
            inputBox.style.width = rightRange.getBoundingClientRect().x - leftRange.getBoundingClientRect().x + "px";
        }
    }, [scrollLeftProcent, maxValue, setVal]);

    useEffect(() => {
        const leftRange = leftHandeRef.current;
        const rightRange = rightHandeRef.current;
        const inputBox = inputBoxRef.current;

        if (rightRange) {
            rightRange.style.left = scrollRightProcent + "%";
            setTo(Math.round((maxValue * scrollRightProcent) / 100));
            setVal(prev => ({ ...prev, to: Math.round((maxValue * scrollRightProcent) / 100) }));
        }
        if (inputBox) {
            inputBox.style.left = leftRange.offsetLeft + 11 + "px";
            inputBox.style.width = rightRange.getBoundingClientRect().x - leftRange.getBoundingClientRect().x + "px";
        }
    }, [scrollRightProcent, maxValue, setVal]);

    return (
        <div>
            <div className={styles.inputRangeInputs} ref={inputRef}>
                <div
                    className={styles.rangeLeft}
                    onMouseDown={() => setIsdragable(true)}
                    ref={leftHandeRef}
                ></div>
                <div className={styles.inputRngeInput} ref={inputBoxRef}></div>
                <div
                    className={styles.rangeRight}
                    onMouseDown={() => setIsdragableRight(true)}
                    ref={rightHandeRef}
                ></div>
            </div>
            <div className={styles.fromTo}>
                <input
                    type="text"
                    placeholder="От"
                    value={from ? from : ''}
                    onChange={(e) => {
                        if (+e.target.value || e.target.value === "") {
                            setFrom(+e.target.value);
                            setVal(prev => ({ ...prev, from: +e.target.value }));
                        }
                    }}
                />
                <svg width="12" height="12" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.167725 1.22852V0.337891H11.2068V1.22852H0.167725Z" fill="#4F4F4F" fillOpacity="0.55" />
                </svg>
                <input
                    type="text"
                    placeholder="До"
                    value={to ? to : ''}
                    onChange={(e) => {
                        if (+e.target.value || e.target.value === "") {
                            setTo(+e.target.value);
                            setVal(prev => ({ ...prev, to: +e.target.value }));
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default RangeInput;
