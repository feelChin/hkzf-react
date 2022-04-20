import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

import { API, URL } from '../../utils'

import NavHeader from "../../components/NavHeader"
import HouseItem from "../../components/HouseItem"

import styles from './index.module.scss'

const BMap = window.BMap
let map

const Map = () => {
    const navigate = useNavigate()

    const [isShow, setisShow] = useState(false)
    const [houseList, sethouseList] = useState([])

    useEffect(() =>{
        map = new BMap.Map("container")
        initMap()
    },[])

    function initMap() {
        const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'))
        const point = new BMap.Point(115, 39)

        const myGeo = new BMap.Geocoder();
        myGeo.getPoint(label, function (point) {
            if (point) {
                map.centerAndZoom(point, 11);
                map.addControl(new BMap.NavigationControl())
                map.addControl(new BMap.ScaleControl())

                renderOverlays(value)
            }
        }, label)

        map.addEventListener('movestart',() =>{
            if(isShow == true){
                setisShow(false)
            }
        })
    }

    function renderOverlays(id) {
        async function axiosFun() {
            const res = await API.get(`/area/map?id=${id}`);
            const data = res.data.body

            const { nextZoom, type } = getTypeAndZoom()

            data.forEach(item => {
                createOverlays(item, nextZoom, type)
            })
        }
        axiosFun()
    }

    function getTypeAndZoom() {
        const zoom = map.getZoom()
        let nextZoom, type
        if (zoom >= 10 && zoom < 12) {
            nextZoom = 13
            type = 'circle'
        } else if (zoom >= 12 && zoom < 14) {
            nextZoom = 15
            type = 'circle'
        } else if (zoom >= 14 && zoom < 16) {
            type = 'rect'
        }
        return {
            nextZoom,
            type
        }
    }

    function createOverlays(data, zoom, type) {
        const {
            coord: { longitude, latitude },
            label: areaName,
            count,
            value
        } = data

        const areaPoint = new BMap.Point(longitude, latitude)

        if (type == 'circle') {
            createCircle(areaPoint, areaName, count, value, zoom)
        } else {
            createRect(areaPoint, areaName, count, value)
        }
    }

    function createCircle(point, name, count, id, zoom) {
        const label = new BMap.Label('', {
            position: point
        })

        label.id = id

        label.setContent(`
            <section class='bubble'>
                <p class='name'>${name}</p>
                <p>${count}套</p>
            </section>`
        )

        label.addEventListener('click', () => {
            renderOverlays(id)

            map.centerAndZoom(point, zoom);
            map.clearOverlays();
        })

        map.addOverlay(label)
    }

    function createRect(point, name, count, id) {
        const label = new BMap.Label('', {
            position: point
        })

        label.id = id

        label.setContent(`
            <section class='rect'>
                <p class='name'>${name}</p>
                <p>${count}套</p>
                <i class="arrow"></i>
            </section>`
        )

        label.addEventListener('click', (e) => {
            getHouseList(id)
            const target = e.changedTouches[0]
            const W = window.innerWidth
            const H = window.innerHeight
            const X = target.clientX
            const Y = target.clientY

            map.panBy(
                W / 2 - X,
                ( H - (W * 0.88)) / 2 - Y
            )
        })

        map.addOverlay(label)
    }

    function getHouseList(id) {
        async function axiosFun(){
            const res = await API.get(`/houses?cityId=${id}`)
            sethouseList(res.data.body.list)
            setisShow(true)
        }
        axiosFun()
    }

    function remderHouseItem(){
        return houseList.map(item => (
            <HouseItem 
                houseCode = {item.houseCode}
                src = {item.houseImg}
                tags = {item.tags}
                title = {item.title}
                desc = {item.desc}
                price = {item.price}
            />
        ))
    }

	return (
		<section className={`${styles.map} pageNopadding`}>
            <NavHeader>地图找房</NavHeader>
            <div className={styles.flex}>
                <section id='container'></section>
                <div  className={`${styles.houseList} ${isShow ? styles.active : ''}`}>
                    <div className={styles.titleWrap}>
                        <h1 className={styles.listTitle}>房屋列表</h1>
                        <div className={styles.titleMore} onClick={() => navigate("/index/houseList")}>更多房源</div>
                    </div>
                    <div className={styles.houseItems}>
                        {remderHouseItem()}
                    </div>
                </div>
            </div>
		</section>
	)
}

export default Map
