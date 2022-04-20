import { useState, useEffect } from 'react'

import { API, GetCurrentCity } from '../../../utils'

import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'

import CascadePickerFun from '../CascadePicker'
import PickerFun from '../Picker'

import styles from './index.module.scss'


const Filter = ({onFilter}) => {
	const [titleSelectdStatus, settitleSelectdStatus] = useState({
		area: false,
		mode: false,
		price: false,
		more: false
	})
	const [selectedData, setselectedData] = useState({
		area: ['area', 'null', null, null],
		mode: ['null'],
		price: ['null'],
		more: []
	})
	const [openType, setopenType] = useState('')
	const [filtersData, setfiltersData] = useState({})


	function onTitleClick(type) {
		const newtitleSelectdStatus = { ...titleSelectdStatus }

		Object.keys(titleSelectdStatus).forEach(key => {
			if (key === type) {
				newtitleSelectdStatus[type] = true
				return
			}
			const selectedVal = selectedData[key]
			if (key === 'area' && selectedVal[1] !== 'null') {
				newtitleSelectdStatus[key] = true
			} else if (key === 'mode' && selectedVal[0] !== 'null') {
				newtitleSelectdStatus[key] = true
			} else if (key === 'price' && selectedVal[0] !== 'null') {
				newtitleSelectdStatus[key] = true
			} else if (key === 'more' && selectedVal.length !== 0) {
				newtitleSelectdStatus[key] = true
			} else {
				newtitleSelectdStatus[key] = false
			}
		})

		settitleSelectdStatus(newtitleSelectdStatus)
		setopenType(type)
	}

	function onSave(value, type) {
		const newtitleSelectdStatus = { ...titleSelectdStatus }

		if (type === 'area' && value[1] !== 'null') {
			newtitleSelectdStatus[type] = true
		} else if (type === 'mode' && value[0] !== 'null') {
			newtitleSelectdStatus[type] = true
		} else if (type === 'price' && value[0] !== 'null') {
			newtitleSelectdStatus[type] = true
		} else if (type === 'more' && value.length !== 0) {
			newtitleSelectdStatus[type] = true
		} else {
			newtitleSelectdStatus[type] = false
		}

		setTimeout(() =>{
			settitleSelectdStatus(newtitleSelectdStatus)
			setopenType('')
			setselectedData({
				...selectedData,
				[type]: value
			})
		})
	}

	function onCancel(type) {
		const newtitleSelectdStatus = { ...titleSelectdStatus }
		const selectedVal = selectedData[type]

		if (type === 'area' && selectedVal[1] !== 'null') {
			newtitleSelectdStatus[type] = true
		} else if (type === 'mode' && selectedVal[0] !== 'null') {
			newtitleSelectdStatus[type] = true
		} else if (type === 'price' && selectedVal[0] !== 'null') {
			newtitleSelectdStatus[type] = true
		} else if (type === 'more' && selectedVal.length !== 0) {
			newtitleSelectdStatus[type] = true
		} else {
			newtitleSelectdStatus[type] = false
		}
		
		settitleSelectdStatus(newtitleSelectdStatus)
		setopenType('')
	}

	useEffect(() => {
		async function getFiltersData() {
			const { value } = JSON.parse(localStorage.getItem('hkzf_city'));
			const res = await API.get(`/houses/condition?id=${value}`)
			setfiltersData(res.data.body)
		}

		if(!filtersData.area){
			getFiltersData()
		}
		
		const { area, mode, price, more } = selectedData;
		const filters = {}
		
		const areaFilter = area.filter(item =>{
			return item !== 'null' && item !== null
		})
		if(areaFilter.length > 1){
			filters.area = areaFilter[areaFilter.length - 1]
		}

		filters.mode = mode
		filters.price = price
		filters.more = more.join(',')

		onFilter(filters)

	}, [selectedData])


	function renderFilterPicker() {
		const { area, subway, rentType, price } = filtersData

		if (openType === 'more') {
			return null
		}

		let data = []
		const defaultValue = selectedData[openType]

		switch (openType) {
			case 'area':
				data = [area, subway]
				if (data[0] !== undefined) {
					return <FilterPicker>
						<CascadePickerFun
							type={openType}
							data={data}
							state={true}
							onCancel={onCancel}
							onSave={onSave}
							defaultValue={defaultValue}
						/>
					</FilterPicker>
				}
				break;
			case 'mode':
				data.push(rentType)
				if (data[0] !== undefined) {
					return <FilterPicker>
						<PickerFun
							type={openType}
							data={data}
							state={true}
							onCancel={onCancel}
							onSave={onSave}
							defaultValue={defaultValue}
						/>
					</FilterPicker>
				}
				break;
			case 'price':
				data.push(price)
				if (data[0] !== undefined) {
					return <FilterPicker>
						<PickerFun
							type={openType}
							data={data}
							state={true}
							onCancel={onCancel}
							onSave={onSave}
							defaultValue={defaultValue}
						/>
					</FilterPicker>
				}
				break;
			default:
				break;
		}
	}

	function renderFilterMore() {
		const { roomType, oriented, floor, characteristic } = filtersData
		const defaultValue = selectedData.more

		if (openType == 'more') {
			return <FilterMore
				type={openType}
				roomType={roomType}
				oriented={oriented}
				floor={floor}
				characteristic={characteristic}
				onCancel={onCancel}
				onSave={onSave}
				defaultValue={defaultValue}
			/>
		}
	}

	return (
		<div className={styles.filterRoot}>
			<div className={styles.content}>
				<FilterTitle 
					titleSelectdStatus={titleSelectdStatus} 
					onClick={onTitleClick} 
				/>
				{renderFilterPicker()}
				{renderFilterMore()}
			</div>
		</div>
	)
}


export default Filter