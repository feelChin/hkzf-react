import { useState } from 'react'
import { CascadePicker  } from 'antd-mobile'

const CascadePickerFun = ({type,data,state,onCancel,onSave,defaultValue}) => {
	const [visible, setVisible] = useState(state)

	return (
		<>
			<CascadePicker
				className="CascadePickerFun"
				defaultValue={defaultValue}
				options={data}
				visible={visible}
				onClose={() => {
					setVisible(false)
					onCancel(type)
				}} 
				onConfirm={v => {
					onSave(v,type)
				}}
				onSelect={v => {
					
				}}
			/>
		</>
	)
}

export default CascadePickerFun