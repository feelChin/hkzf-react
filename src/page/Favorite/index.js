import { useEffect,useState } from "react";

import { API } from "../../utils";

import NavHeader from "../../components/NavHeader";
import HouseItem from "../../components/HouseItem";
import NoHouse from "../../components/NoHouse";

import styles from "./index.module.scss"


const Favorite = () =>{
    const [list,setlist] =  useState([])

    useEffect(() =>{
        async function getFavorite(){
            const res = await API.get('/user/favorites')

            setlist(res.data.body)
        }
        getFavorite()
    },[])

    function renderHouseItem(){
        if(list.length == 0){
            return <NoHouse>没有找到房源，请您先去收藏自己喜欢的房源吧~</NoHouse>
        }

        return list.map(item =>(
            <HouseItem
                key={item.houseCode}
                houseCode={item.houseCode}
                src={item.houseImg}
                tags={item.tags}
                title={item.title}
                desc={item.desc}
                price={item.price}
            />
        ))
    }

    return(
        <div className={`${styles.favorite} page`}>
            <NavHeader>我的收藏</NavHeader>
            <div className={styles.flex}>
                {renderHouseItem()}
            </div>
        </div>  
    )
}

export default Favorite