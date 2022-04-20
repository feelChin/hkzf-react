import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SearchHeader from '../../components/SearchHeader'
import { API } from "../../utils"

import { List, AutoSizer, WindowScroller, InfiniteLoader } from 'react-virtualized';
import 'react-virtualized/styles.css';

import Filter from "./Filter"
import HouseItem from "../../components/HouseItem"
import NoHouse from "../../components/NoHouse";
import Loading from "../../components/Loading";
import Info from "../../components/Info";

import styles from './index.module.scss'

const { value } = JSON.parse(localStorage.getItem('hkzf_city'));

const HouseList = () => {
    const navigate = useNavigate();
    
    const [data, setdata] = useState([])
    const [list, setlist] = useState([])
    const [count, setcount] = useState(0)

    const [isLoading, setisLoading] = useState(true)
    const [isInfo, setisInfo] = useState(false)


    function onFilter(value) {
        setisLoading(true)
        setdata(value)
    }

    useEffect(() => {
        async function searchHouse() {
            const res = await API.get('/houses', {
                params: {
                    cityId: value,
                    ...data,
                    start: 1,
                    end: 20
                }
            })

            setisLoading(false)
            const { list, count } = res.data.body
            
            if(count){
                setisInfo(true)
            }

            setlist(list)
            setcount(count)

            setTimeout(() => {
                setisInfo(false)
            }, 1300);
        }
        searchHouse()
    }, [data])

    function rowRenderer({ key, index, style }) {
        const house = list[index]
        if (!house) {
            return <div key={key} style={style} className={styles.loading}>loading</div>
        }
        return (
            <div key={key} style={style} >
                <HouseItem
                    style={style}
                    key={key}
                    houseCode={house.houseCode}
                    src={house.houseImg}
                    tags={house.tags}
                    title={house.title}
                    desc={house.desc}
                    price={house.price}
                />
            </div>
        )
    }

    function isRowLoaded({ index }) {
        return !!list[index];
    }

    function loadMoreRows({ startIndex, stopIndex }) {
        return new Promise(resolve => {
            API.get('/houses', {
                params: {
                    cityId: value,
                    ...data,
                    start: startIndex,
                    end: stopIndex
                }
            }).then(res => {
                const { list: newList } = res.data.body
                let join = [...list, ...newList]
                setlist(join)
                resolve()
            })
        })
    }

    function renderHouseList() {
        if (count === 0 && !isLoading) {
            return <NoHouse>没有找到房源，请您换个搜索条件吧~</NoHouse>
        }
        return (
            <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={loadMoreRows}
                rowCount={count}
            >
                {({ onRowsRendered, registerChild }) => (
                    <AutoSizer >
                        {({ width, height }) => (
                            <List
                                width={width}
                                height={height}
                                onRowsRendered={onRowsRendered}
                                ref={registerChild}
                                rowHeight={121}
                                rowRenderer={rowRenderer}
                                rowCount={count}
                            />
                        )}
                    </AutoSizer>
                )}
            </InfiniteLoader>
        )
    }

    return (
        <div className={`${styles.houselist} page`}>
            <Loading text="加载中..." state={isLoading} />
            <Info text={`一共找到条${count}数据`} state={isInfo} />

            <div className={styles.head}>
                <i className="iconfont icon-back" onClick={() => navigate(-1)}></i>
                <SearchHeader class_Name={styles.searchHeader} />
            </div>
            <Filter onFilter={onFilter} />
            <div className={styles.wrapper} >
                {renderHouseList()}
            </div>
        </div>
    )
}


export default HouseList


{/* <InfiniteLoader
                    isRowLoaded={isRowLoaded}
                    loadMoreRows={loadMoreRows}
                    rowCount={count}
                >
                    {({ onRowsRendered, registerChild }) => (
                        <WindowScroller>
                            {({ height, isScrolling, scrollTop }) => (
                                <AutoSizer>
                                    {({ width}) => (
                                        <List
                                            onRowsRendered={onRowsRendered}
                                            ref={registerChild}
                                            autoHeight // 设置高度为 WindowScroller 最终渲染的列表高度
                                            width={width} // 视口的宽度
                                            height={height} // 视口的高度
                                            rowCount={count} // List列表项的行数
                                            rowHeight={121} // 每一行的高度
                                            rowRenderer={renderHouseList} // 渲染列表项中的每一行
                                            isScrolling={isScrolling}
                                            scrollTop={scrollTop}
                                        />
                                    )}
                                </AutoSizer>
                            )}
                        </WindowScroller>
                    )}
                </InfiniteLoader> */}