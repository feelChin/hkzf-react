import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import { API, GetCurrentCity } from '../../utils';

import styles from './index.module.scss'

function SearchHeader({ class_Name }) {
	const navigate = useNavigate();
	const [location, setLocation] = useState('');

	useEffect(() => {
		async function curCity() {
			const getcurCity = await GetCurrentCity()
			setLocation(getcurCity.label)
		}
		curCity()
	}, []);

	return (
		<div className={`${styles.search} ${class_Name}`}>
			<div className={styles.location} onClick={() => navigate('/citylist')}>
				<span className="name">{location}</span>
				<i className="iconfont icon-arrow" />
			</div>
			<div className={styles.form} onClick={() => navigate('/search')}>
				<i className="iconfont icon-seach" />
				<span className="text">请输入小区或地址</span>
			</div>
			<i className={`iconfont icon-map ${styles.iconMap}`} onClick={() => navigate('/map')} />
		</div>
	)
}

export default SearchHeader
