import React from 'react';
import styles from './main.module.css';
import Header from '../header/Header';
import Routes from '../routes/Routes';
import { HomeContextProvider } from '../home/HomeContext';
const Main = () => {
    return (
        <HomeContextProvider>
            <div className={styles.main}>
                <div className={styles.container}>
                    <Header />
                    <Routes />
                </div>
            </div>
        </HomeContextProvider>
    )
}

export default Main
