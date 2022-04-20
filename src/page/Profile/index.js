import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

import { API, URL,HasAuth,GetToken,RemoveToken } from '../../utils'

const DEFAULT_AVATAR = URL + '/img/profile/avatar.png'
const DEFAULT_NICKNAME = "游客"

const menus = [
  { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorite' },
  { id: 2, name: '我的出租', iconfont: 'icon-ind' },
  { id: 3, name: '看房记录', iconfont: 'icon-record' },
  { id: 4, name: '成为房主', iconfont: 'icon-identity'},
  { id: 5, name: '个人资料', iconfont: 'icon-myinfo' },
  { id: 6, name: '联系我们', iconfont: 'icon-cust' }
]

const Profile = () =>{
    const navigate = useNavigate()

	const [isLogin, setisLogin] = useState(HasAuth())

	const [userInfo, setuserInfo] = useState({
        avatar:'',
        nickname:''
    })

    useEffect(() => {
		async function getUserInfo() {
			if (!isLogin) {
				return
			}
            
			const res = await API.get('./user')
  
			if(res.data.status === 200){
				const {avatar,nickname} = res.data.body
				setuserInfo(
					{
						avatar: URL + avatar,
						nickname:nickname
					}
				)
			}else{
                setisLogin(false)
            }
		}
		getUserInfo()
	}, [])


    function renderMenus(){
        return menus.map(item => (
            item.to ? 
                <div key={item.id} className={styles.menuItem} onClick={() => navigate(item.to)}>
                    <i className={`iconfont ${item.iconfont}`} />
                    <span>{item.name}</span>
                </div>
            :
                <div key={item.id} className={styles.menuItem}>
                    <i className={`iconfont ${item.iconfont}`} />
                    <span>{item.name}</span>
                </div>
        ))
    }

    async function logout(){
		await API.post('/user/logout',null,{
			headers:{
				authorization: GetToken()
			}
		}).then((res) =>{
			RemoveToken()
			setisLogin(false)
			setuserInfo(
				{
					avatar: DEFAULT_AVATAR,
					nickname: DEFAULT_NICKNAME
				}
			)
		})
	}

    return(
        <div className={`${styles.profile} page`}>
            <div className={styles.title}>
                <img className={styles.bg} src={ URL + '/img/profile/bg.png'} alt="" />
                <div className={styles.info}>
                    <div className={styles.user}>
                        <img className={styles.myIcon} src={ userInfo.avatar || DEFAULT_AVATAR} alt="" />
                        <h5>{userInfo.nickname || DEFAULT_NICKNAME}</h5>
                    </div>
                    {
                        isLogin ?
                            <div className={styles.login} onClick={() => logout()}>退出</div>
                        :
                            <div className={styles.login} onClick={() => navigate('/login')}>去登录</div>
                    }
                </div>
            </div>
            <div className={styles.menuItems}>
               {renderMenus()}
            </div>
            <div className={styles.ad}>
                <img src={URL + '/img/profile/join.png'} alt="" />
            </div>
        </div>
    )
}

export default Profile