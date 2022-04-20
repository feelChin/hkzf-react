import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API,GetCurrentCity } from '../../utils'

import styles from './index.module.scss'


let timerId = null;

const Search = () =>{
    const navigate = useNavigate()
    const [list,setlist] = useState([])

    function setValue(e){
        let value = e.target.value
   
        if(value == ''){
            console.log(12)
            return
        }
   
        clearTimeout(timerId)
        timerId = setTimeout( async () =>{
            const res = await API.get("area/community",{
                params:{
                    name:value,
                    id:localCity
                }
            })
            setlist(res.data.body)
            console.log(res.data.body)
        },500)
    }
    
    const localCity = JSON.parse(localStorage.getItem('hkzf_city')).value;
    
    useEffect(() =>{
        

    },[])

    function renderList(){
        return list.map(item =>(
            <li key={item.communityName} onClick={() => navigate("/houseDetail",{state: item.community})}>
                {item.communityName}
            </li>
        ))
    }

    return(
        <div className={`${styles.searchBox} page`}>
          <div className={styles.head}>
                <input type="text" onChange={(e) => setValue(e)} placeholder="请输入小区或地址"/>
                <button onClick={() => navigate(-1)}>取消</button>
            </div>
            <div className={styles.flex}>
                <ul>{renderList()}</ul>
            </div>
        </div>
    )
}

export default Search