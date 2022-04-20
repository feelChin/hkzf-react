import { URL } from '../../utils'
import styles from './index.module.scss'

const NoHouse = ({ children }) => {
	return(
		<div className={styles.root}>
			<img className={styles.img} src={URL + '/img/not-found.png'} alt="" />
			<p className={styles.msg}>{children}</p>
		</div>
	)
}
	

export default NoHouse
