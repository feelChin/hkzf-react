import { Link,  useLocation, Outlet } from 'react-router-dom';
import styles from './index.module.scss'

const tabItems = [
	{
		title: '首页',
		icon: 'icon-ind',
		path: '/'
	},
	{
		title: '找房',
		icon: 'icon-findHouse',
		path: '/index/houseList'
	}, 
	{
		title: '资讯',
		icon: 'icon-infom',
		path: '/index/news'
	},
	{
		title: '我的',
		icon: 'icon-my',
		path: '/index/profile'
	}
];

const Nav = () => {
	const location = useLocation()

	function renderTabItems() {
		return tabItems.map(item => (
			<Link to={item.path} key={item.title} className={`${styles.item} ${item.path == location.pathname ? styles.active : ''}`}>
				<i className={`iconfont ${item.icon}`}></i>
				<span>{item.title}</span>
			</Link>
		))
	}
	return (
		<div className="noAnimationNav">
			<section className={styles.nav}>
				{renderTabItems()}
			</section>
			<Outlet />
		</div>
	)
}

export default Nav