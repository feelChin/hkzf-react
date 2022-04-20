import { useState } from 'react'
import styles from './index.module.scss'

const HOUSE_PACKAGE = [
	{
		id: 1,
		name: '衣柜',
		icon: 'icon-wardrobe'
	},
	{
		id: 2,
		name: '洗衣机',
		icon: 'icon-wash'
	},
	{
		id: 3,
		name: '空调',
		icon: 'icon-air'
	},
	{
		id: 4,
		name: '天然气',
		icon: 'icon-gas'
	},
	{
		id: 5,
		name: '冰箱',
		icon: 'icon-ref'
	},
	{
		id: 6,
		name: '暖气',
		icon: 'icon-Heat'
	},
	{
		id: 7,
		name: '电视',
		icon: 'icon-vid'
	},
	{
		id: 8,
		name: '热水器',
		icon: 'icon-heater'
	},
	{
		id: 9,
		name: '宽带',
		icon: 'icon-broadband'
	},
	{
		id: 10,
		name: '沙发',
		icon: 'icon-sofa'
	}
]


const HousePackage = ({ select, list,onSelect }) => {
	const [selectedNames, setselectedNames] = useState([])

	function toggleSelect(name) {
		let newSelectedNames
		if (selectedNames.indexOf(name) > -1) {
			newSelectedNames = selectedNames.filter(item => item !== name)
		} else {
			newSelectedNames = [...selectedNames, name]
		}
		onSelect(newSelectedNames)
		setselectedNames(selectedNames)
	}


	function renderItems() {
		let data;
	
		if (select) {
			data = HOUSE_PACKAGE
		} else {
			data = HOUSE_PACKAGE.filter(v => list.includes(v.name))
		}
		
		return data.map(item => {
			const isSelected = selectedNames.indexOf(item.name) > -1
			return (
				<li key={item.id} className={[styles.item, isSelected ? styles.active : ''].join(' ')} onClick={select && (() => toggleSelect(item.name))} >
					<i className={`iconfont ${item.icon} ${styles.icon}`} />
					{item.name}
				</li>
			)
		})
	}

	return(
		<ul className={styles.housepackage} > 
			{renderItems()} 
		</ul>
	)
}

export default HousePackage
