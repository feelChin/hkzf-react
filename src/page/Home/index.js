import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

import { API, URL } from '../../utils';

import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'

import SearchHeader from '../../components/SearchHeader'
import styles from './index.module.scss'

SwiperCore.use([Autoplay]);

const swiperConfig = {
    slidesPerView: '1',
    loop: true,
    autoplay: {
        delay: 4000
    }
}


const navs = [
    {
        id: 1,
        img: Nav1,
        title: '整租',
        path: '/houseList'
    },
    {
        id: 2,
        img: Nav2,
        title: '合租',
        path: '/houseList'
    },
    {
        id: 3,
        img: Nav3,
        title: '地图找房',
        path: '/map'
    },
    {
        id: 4,
        img: Nav4,
        title: '去出租',
        path: '/rent/add'
    }
]

const Home = () => {
    const { value } = JSON.parse(localStorage.getItem('hkzf_city')) || 'AREA%7C88cff55c-aaa4-e2e0';
    
    const navigate = useNavigate()

    const [banner, setbanner] = useState([]);
    const [groups, setgroups] = useState([]);
    const [news, setnews] = useState([]);

    useEffect(() => {
        async function getSwiper() {
            const res = await API.get('/home/swiper');
            setbanner(res.data.body)
        };

        async function getGroup() {
            const res = await API.get('/home/groups', {
                params: {
                    area: "AREA%7C88cff55c-aaa4-e2e0"
                }
            });
            setgroups(res.data.body)
        };

        async function getNews() {
            const res = await API.get(`/home/news?area=${value}`);
            setnews(res.data.body)
        };

        getSwiper()
        getGroup()
        getNews()
    }, []);

    function renderSwiper() {
        return banner.map(item => (
            <SwiperSlide key={item.id}>
                <img src={URL + item.imgSrc} alt="" />
            </SwiperSlide>
        ))
    }

    function renderNavs() {
        return navs.map(item => (
            <div key={item.id} onClick={() => navigate(item.path)}>
                <img src={item.img} alt="" />
                <h2>{item.title}</h2>
            </div>
        ))
    }

    function renderGroups() {
        return groups.map(item => (
            <div className={styles.groupsItem} key={item.id}>
                <div className={styles.text}>
                    <h5>{item.title}</h5>
                    <p>{item.desc}</p>
                </div>
                <div className={styles.img}>
                    <figure><img src={URL + item.imgSrc} alt="" /></figure>
                </div>
            </div>
        ))
    }

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
        <div className="page">
            <Swiper className={styles.swiper} {...swiperConfig}>
                {renderSwiper()}
                <SearchHeader />
            </Swiper>
            <section className={styles.homenav}>
                {renderNavs()}
            </section>
            <section className={styles.groups}>
                <div className={styles.title}>
                    <h5>租房小组</h5>
                    <span>更多</span>
                </div>
                <div className={styles.groupsItems}>
                    {renderGroups()}
                </div>
            </section>
            <section className={styles.news}>
                <div className={styles.title}>
                    <h5>最新资讯</h5>
                </div>
                <div className={styles.newsItems}>
                    {renderNews()}
                </div>
            </section>
        </div>
    )
}

export default Home