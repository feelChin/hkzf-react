import ReactDOM from 'react-dom';
import { useState } from 'react'
import styles from './index.module.scss'

const FilterMore = (props) => {
	return ReactDOM.createPortal(
			<FilterMoreChild props={props} />,
		document.body
	);
};

const FilterMoreChild = ({ props }) => {
	const { type, roomType, oriented, floor, characteristic, defaultValue, onCancel, onSave } = props;
	const [selectedValues, setselectedValues] = useState(defaultValue)

	function onTagClick(value) {
		const newselectedValues = [...selectedValues]
		if (newselectedValues.indexOf(value) <= -1) {
			newselectedValues.push(value)
		} else {
			const index = newselectedValues.findIndex(item => item === value)
			newselectedValues.splice(index, 1)
		}
		setselectedValues(newselectedValues)
	}

	function renderFilters(data = []) {
		return data.map(item => {
			const isSelected = selectedValues.indexOf(item.value) > -1
			return (
				<span key={item.value} className={`${styles.tag} ${isSelected ? styles.tagActive : ''}`} onClick={() => onTagClick(item.value)}>
					{item.label}
				</span>
			)
		})
	}

	return (
		<div className={styles.filterMore}>
			<div className={styles.mask} onClick={() => onCancel(type)}></div>
			<div className={styles.headClick}>
				<div onClick={() => onCancel()}>取消</div>
				<span></span>
				<div onClick={() => onSave(selectedValues, type)}>确定</div>
			</div>
			<div className={styles.tags}>
				<dl className={styles.dl}>
					<dt className={styles.dt}>户型</dt>
					<dd className={styles.dd}>
						{renderFilters(roomType)}
					</dd>
					<dt className={styles.dt}>朝向</dt>
					<dd className={styles.dd}>
						{renderFilters(oriented)}
					</dd>
					<dt className={styles.dt}>楼层</dt>
					<dd className={styles.dd}>
						{renderFilters(floor)}
					</dd>
					<dt className={styles.dt}>房屋亮点</dt>
					<dd className={styles.dd}>
						{renderFilters(characteristic)}
					</dd>
				</dl>
			</div>
		</div>
	)
}

export default FilterMore