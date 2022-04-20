import ReactDOM from 'react-dom';
import { useState } from 'react';
import styles from './index.module.scss'

const Info = (props) => {
	return ReactDOM.createPortal(
			<InfoFn props={props} />,
		document.body
	);
};

const InfoFn = ({ props}) => {
	const {text,timeout,state} = props
	
	function renderText(){
		return(
			<div className={styles.text}>{text}</div>	
		)
	}
	
	return(
		<div className={styles.Info}>
			{ state && renderText() }
		</div>
	)
}

export default Info
