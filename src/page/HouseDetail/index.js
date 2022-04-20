import { useEffect, useState } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

import NavHeader from '../../components/NavHeader'
import HousePackage from '../../components/HousePackage'
import HouseItem from '../../components/HouseItem';
import Error from '../../components/Error';
import Info from "../../components/Info";

import { API, URL, HasAuth } from '../../utils'

import styles from './index.module.scss'

SwiperCore.use([Autoplay]);
const swiperConfig = {
    slidesPerView: '1',
    loop: true,
    autoplay: {
        delay: 4000
    }
}

const recommendHouses = [
    {
      id: 1,
      src:  '/img/message/1.png',
      desc: '72.32㎡/南 北/低楼层',
      title: '安贞西里 3室1厅',
      price: 4500,
      tags: ['随时看房']
    },
    {
      id: 2,
      src: '/img/message/2.png',
      desc: '83㎡/南/高楼层',
      title: '天居园 2室1厅',
      price: 7200,
      tags: ['近地铁']
    },
    {
      id: 3,
      src: '/img/message/3.png',
      desc: '52㎡/西南/低楼层',
      title: '角门甲4号院 1室1厅',
      price: 4300,
      tags: ['集中供暖']
    }
  ]

const BMap = window.BMap

const HouseDetail = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [id,setid] = useState(location.state)
    const [isFavorite,setisFavorite] = useState(false)

    const [isError,setisError] = useState(false)
    const [isInfo, setisInfo] = useState(false)
    const [isInfoTime, setisInfoTime] = useState(true)

    const [house, setHouse] = useState({
        community: "",
        coord: "",
        description: "",
        floor: "",
        houseImg: [],
        oriented: "",
        price: "",
        roomType: "",
        size: "",
        supporting: "",
        tags: [],
        title: ""
    })

    useEffect(() => {
        async function getHouseDetail() {
            const res = await API.get(`/houses/${id}`)

            const {
                community,
                coord,
                description,
                floor,
                houseImg,
                oriented,
                price,
                roomType,
                size,
                supporting,
                tags,
                title
            } = res.data.body


            setHouse({
                community: community,
                coord: coord,
                description: description,
                floor: floor,
                houseImg: houseImg,
                oriented: oriented,
                price: price,
                roomType: roomType,
                size: size,
                supporting: supporting,
                tags: tags,
                title: title
            })

            renderMap(community, coord)
        }

        async function checkFavorite(){
            if(!HasAuth()){
                return
            }

            const res = await API.get(`/user/favorites/${id}`)

            const { status, body } = res.data

            if(status == 200){
                setisFavorite( body.isFavorite )
            }
        }

        getHouseDetail()
        checkFavorite()
    }, [])

    function renderSwiper() {
        return house.houseImg.map(item => (
            <SwiperSlide key={item}>
                <img src={URL + item} alt="" />
            </SwiperSlide>
        ))
    }

    function renderTags() {
        return house.tags.map((item, index) => {
            let tagClass = ''
            if (index > 2) {
                tagClass = 'tag3'
            } else {
                tagClass = 'tag' + (index + 1)
            }

            return (
                <span key={item} className={[styles.tag, styles[tagClass]].join(' ')}>
                    {item}
                </span>
            )
        })
    }

    function renderHouseInfo() {
        return (
            <div className={styles.info}>
                <h3 className={styles.infoTitle}>{house.title}</h3>
                <div className={styles.tags}>
                    <div>{renderTags()}</div>
                </div>
                <div className={styles.infoPrice}>
                    <div className={styles.infoPriceItem}>
                        <div>
                            {house.price}
                            <span className={styles.month}>/月</span>
                        </div>
                        <div>租金</div>
                    </div>
                    <div className={styles.infoPriceItem}>
                        <div>{house.roomType}</div>
                        <div>房型</div>
                    </div>
                    <div className={styles.infoPriceItem}>
                        <div>{house.size}平米</div>
                        <div>面积</div>
                    </div>
                </div>
                <div className={styles.infoBasic}>
                    <div className={styles.flex}>
                        <div>
                            <span className={styles.title}>装修：</span>
                            精装
                        </div>
                        <div>
                            <span className={styles.title}>楼层：</span>
                            {house.floor}
                        </div>
                    </div>
                    <div className={styles.flex}>
                        <div>
                            <span className={styles.title}>朝向：</span>
                            {house.oriented}
                        </div>
                        <div>
                            <span className={styles.title}>类型：</span>普通住宅
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function renderHouseMap() {
        return (
            <div className={styles.map}>
                <div className={styles.mapTitle}>
                    小区：
                    <span>{house.community}</span>
                </div>
                <div className={styles.mapContainer} id="map"></div>
            </div>
        )
    }

    function renderMap(community, coord) {
        const { latitude, longitude } = coord

        const map = new BMap.Map('map')
        const point = new BMap.Point(longitude, latitude)
        map.centerAndZoom(point, 17)

        const label = new BMap.Label('', {
            position: point,
            offset: new BMap.Size(0, -36)
        })

        const labelStyle = {
            position: 'absolute',
            zIndex: -7982820,
            backgroundColor: 'rgb(238, 93, 91)',
            color: 'rgb(255, 255, 255)',
            height: 25,
            padding: '5px 10px',
            lineHeight: '14px',
            borderRadius: 3,
            boxShadow: 'rgb(204, 204, 204) 2px 2px 2px',
            whiteSpace: 'nowrap',
            fontSize: 12,
            userSelect: 'none'
        }


        label.setStyle(labelStyle)
        label.setContent(`
            <span>${community}</span>
            <div class="${styles.mapArrow}"></div>
        `)
        map.addOverlay(label)
    }

    function renderAbout() {
        return (
            <div className={styles.about}>
                <div className={styles.houseTitle}>房屋配套</div>
                {
                    house.supporting.length === 0 ?
                        <div className={styles.titleEmpty}>暂无数据</div>
                        :
                        <HousePackage list={house.supporting} />
                }
            </div>
        )
    }

    function renderProfile() {
        return (
            <div className={styles.set}>
                <div className={styles.houseTitle}>房源概况</div>
                <div>
                    <div className={styles.contact}>
                        <div className={styles.user}>
                            <img src={URL + '/img/avatar.png'} alt="头像" />
                            <div className={styles.useInfo}>
                                <div>王女士</div>
                                <div className={styles.userAuth}>
                                    <i className="iconfont icon-auth" />
                                    已认证房主
                                </div>
                            </div>
                        </div>
                        <span className={styles.userMsg}>发消息</span>
                    </div>

                    <div className={styles.descText}>
                        {house.description || '暂无房屋描述'}
                    </div>
                </div>
            </div>
        )
    }

    function renderLike() {
        return (
            <div className={styles.recommend}>
                <div className={styles.houseTitle}>猜你喜欢</div>
                <div className={styles.likeItems}>
                    {
                        recommendHouses.map(item => (
                            <HouseItem {...item} key={item.id} />
                        ))
                    }
                </div>
            </div>
        )
    }

    function renderFavorite(){
        return(
            <div className={styles.fixedBottom}>
                <div className={styles.flex} onClick={() => handleFavorite()}>
                    <img src={ URL + (isFavorite ? '/img/star.png' : '/img/unstar.png') } className={styles.favoriteImg} alt="收藏" />
                    <span className={styles.favorite}>
                    {isFavorite ? '已收藏' : '收藏'}
                    </span>
                </div>
                <div className={styles.flex}>在线咨询</div>
                <div className={styles.flex}>
                    <a href="tel:400-618-4000" className={styles.telephone}>电话预约</a>
                </div>
            </div>
        )
    }

    async function handleFavorite(){
        if(!HasAuth()){
            setisError(true)
            return
        }

        if( isFavorite ){
            const res = await API.delete(`/user/favorites/${id}`)
            
            setisFavorite(false)

            if(res.data.status === 200){
                setisInfo(true)
                setTimeout(() =>{
                    setisInfoTime(false)
                },600)
            }
        }else{
            const res = await API.post(`/user/favorites/${id}`)
            setisFavorite(true)
        }
    }

    function goLogin(){
        navigate('/login')
    }

    function goclose(){
        setisError(false)
    }

    return (
        <div className={`${styles.houseDetail} page`}>
            <NavHeader>{house.community}</NavHeader>
            <div className={styles.flexOnce}>
                <Swiper className={styles.swiper} {...swiperConfig}>
                    {renderSwiper()}
                </Swiper>
                {renderHouseInfo()}
                {renderHouseMap()}
                {renderAbout()}
                {renderProfile()}
                {renderLike()}
                {renderFavorite()}
            </div>
            { isInfo && <Info text="已取消收藏" state={isInfoTime} />}
            {  isError && <Error double={true} text="登录才能收藏房源，是否去登录" Fu={goLogin} CloseFu={goclose} /> }
        </div>
    )
}

export default HouseDetail