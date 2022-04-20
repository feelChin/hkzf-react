import { useState } from 'react'

import styles from './index.module.scss'

const FilterPicker = ({children}) => {
	return (
		<div className={styles.filterPicker}>
			{children}
		</div>
	)
}

export default FilterPicker