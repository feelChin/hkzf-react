
import styles from './index.module.scss'

const titleList = [
	{ title: '区域', type: 'area' },
	{ title: '方式', type: 'mode' },
	{ title: '租金', type: 'price' },
	{ title: '筛选', type: 'more' }
]

const FilterTitle = ({titleSelectdStatus,onClick}) => {
	function renderFilterTitle(){
		return titleList.map(item =>(
			<div key={item.type} className={styles.item} onClick={() => onClick(item.type)}>
				<div className={`${styles.dropdown} ${titleSelectdStatus[item.type] ? styles.selected : ''}`}>
					<span>{item.title}</span>
					<i className="iconfont icon-arrow" />
				</div>
			</div>
		))
	}
	return (
		<div className={styles.filterTitle}>
			{renderFilterTitle()}
		</div>
	)
}


export default FilterTitle