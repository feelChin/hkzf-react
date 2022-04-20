import { useState } from 'react'
import { Picker  } from 'antd-mobile'

const PickerFun = ({type,data,state,onCancel,onSave,defaultValue}) => {
	const [visible, setVisible] = useState(state)
	return (
		<>
			<Picker 
				className='PickerFun'
				columns={data} 
				value={defaultValue} 
				visible={visible}
				onClose={() => {
					setVisible(false)
					onCancel(type)
				}}
				onConfirm={v => {
					onSave(v,type)
				}}
			/>
		</>
	)
}

export default PickerFun