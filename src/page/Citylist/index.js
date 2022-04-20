import { useEffect, useState, useRef } from "react";
import {useNavigate}  from "react-router-dom"

import { List, AutoSizer } from 'react-virtualized';

import { API, URL, GetCurrentCity } from '../../utils'

import Error from "../../components/Error";
import NavHeader from "../../components/NavHeader"

import styles from './index.module.scss'

const formatCityList = (list) => {
    let cityList = {}
    let cityIndex = []

    list.forEach(item => {
        const first = item.short.substr(0, 1)

        if (cityList[first]) {
            cityList[first].push(item)
        } else {
            cityList[first] = [item]
        }
    })

    cityIndex = Object.keys(cityList).sort()

    return {
        cityList,
        cityIndex
    }
}

const formatCityIndex = (letter) => {
    switch (letter) {
        case "#":
            return "当前定位"
        case "hot":
            return "热门城市"
        default:
            return letter.toUpperCase()
    }
}

const Citylist = () => {
    const navigate = useNavigate()
    const listref = useRef();

    const [activeIndex, setactiveIndex] = useState(0);
    const [errorState, seterrorState] = useState(false);
    const [cityArr, setcityArr] = useState({
        cityList: [],
        cityIndex: [],
        gethotCity: []
    })

    const varCity = cityArr.cityIndex;
    const varCityList = cityArr.cityList;
    const hotCity = cityArr.gethotCity

    useEffect(() => {
        async function cityList() {
            const res = await API.get('/area/city?level=1');
            const { cityList, cityIndex } = formatCityList(res.data.body);

            const hot = await API.get('/area/hot');
            cityList['hot'] = hot.data.body
            cityIndex.unshift('hot')

            const curCity = await GetCurrentCity()
            cityList["#"] = [curCity];
            cityIndex.unshift('#');

            const gethotCity = [];
            cityList.hot.forEach(item => {
                gethotCity.push(item.label)
            });

            setcityArr({
                cityList: cityList,
                cityIndex: cityIndex,
                gethotCity: gethotCity
            })
        }
        cityList()
    }, []);

    function getRowHeight({ index }) {
        const width = document.body.offsetWidth
        const titleHeight = 36 / 375 * width;
        const nameHeight = 50 / 375 * width;

        const letter = varCity[index];

        return titleHeight + nameHeight * varCityList[letter].length
    }

    function rowRenderer({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    }) {

        const letter = varCity[index];

        return (
            <div key={key} style={style} className={styles.city}>
                <div className={styles.title}>{formatCityIndex(letter)}</div>
                {
                    varCityList[letter].map(item => {
                        return (
                            <div key={item.key} className={styles.name} onClick={() => rowRendererClick(item)}>
                                {item.label}
                            </div>
                        )
                    })
                }
            </div>
        );
    }

    function onRowsRendered({ startIndex }){
        if(activeIndex !== startIndex){
            setactiveIndex(startIndex)
        }
    }

    function rowRendererClick(item) {
        if (hotCity.includes(item.label)) {
            localStorage.setItem('hkzf_city', JSON.stringify(item))
            navigate(-1)
            seterrorState(false)
        }else{
            seterrorState(true)
        }
    }

    function renderCityeList() {
        return cityArr.cityIndex.map((item, index) => (
            <li key={item} className={styles.cityIndexItem} onClick={() => { cityeListClick(index) }}>
                <span className={activeIndex === index ? styles.indexActive : ''}>
                    {item === 'hot' ? '热' : item.toUpperCase()}
                </span>
            </li>
        ))
    }

    function cityeListClick(index){
        listref.current.scrollToRow(index)
        setactiveIndex(index)
    }

    function chooseErreo(){
        seterrorState(false)
    }
    
    return (
        <div className={`${styles.citylist} pageNopadding`}>
            <NavHeader>选择城市</NavHeader>
            <div className={styles.citylistFlex}>
                <AutoSizer>
                    {
                        ({ width, height }) => <List
                            ref={listref}
                            width={width}
                            height={height}
                            rowCount={cityArr.cityIndex.length}
                            rowHeight={getRowHeight}
                            rowRenderer={rowRenderer}
                            onRowsRendered={onRowsRendered}
                            scrollToAlignment="start"
                        />
                    }
                </AutoSizer>
                <ul className={styles.cityIndex}>
                    {renderCityeList()}
                </ul>
            </div>
            { errorState && <Error text="该城市暂时没有房源信息" Fu={chooseErreo} /> }
        </div>
    )
}

export default Citylist