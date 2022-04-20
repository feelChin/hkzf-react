import ReactDOM from 'react-dom';
import styles from './index.module.scss'

const Loading = (props) => {
	return ReactDOM.createPortal(
			<LoadingFn props={props} />,
		document.body
	);
};

const LoadingFn = ({ props}) => {
	const {text,state} = props

	function renderText(){
		return(
			<div className={styles.text}>{text}</div>	
		)
	}
	
	return(
		<div className={styles.loading}>
			{ state && renderText() }
		</div>
	)
}

export default Loading
