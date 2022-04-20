import { useNavigate } from "react-router-dom"

import styles from './index.module.scss'

const NavHeader = ({ children }) => {
	const navigate = useNavigate();
	return (
		<section className={`${styles.head} navbar`}>
			<i className="iconfont icon-back" onClick={() => navigate(-1)}></i>
			<h5>{children}</h5>
		</section>
	)
}

export default NavHeader
