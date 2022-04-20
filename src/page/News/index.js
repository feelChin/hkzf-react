import { useState, useEffect } from 'react'

import { API,URL } from '../../utils';

import styles from './index.module.scss'

const News = () => {
    const [news, setnews] = useState([]);

    const { value } = JSON.parse(localStorage.getItem('hkzf_city'));

    useEffect(() => {
        async function getNews() {
            const res = await API.get(`/home/news?area=${value}`);
            setnews(res.data.body)
        };
        getNews()
    }, []);

    function renderNews() {
        return news.map(item => (
            <div className={styles.newsItem} key={item.id}>
                <div className={styles.img}>
                    <figure><img src={URL + item.imgSrc} alt="" /></figure>
                </div>
                <div className={styles.text}>
                    <h5>{item.title}</h5>
                    <div className={styles.from}>
                        <span>{item.from}</span>
                        <span>{item.date}</span>
                    </div>
                </div>
            </div>
        ))
    }

    return (
        <div className={`${styles.news} page`}>
            <div className={styles.title}>
                <h5>最新资讯</h5>
            </div>
            <div className={styles.newsItems}>
                {renderNews()}
            </div>
        </div>
    )
}

export default News