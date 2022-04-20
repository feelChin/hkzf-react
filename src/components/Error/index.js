import styles from './index.module.scss'

const Error = ({text,double,Fu,CloseFu}) => {
	return (
		<section className={styles.error}>
			<div className={styles.errorBox}>
                <h5>{text}</h5>
                {
                    double ?
                    <div className={styles.list}>
                        <button className={styles.active} onClick={() => Fu()}>确定</button>
                        <button onClick={() => CloseFu()}>取消</button>
                    </div>
                    :
                    <div className={styles.list}>
                        <button className={styles.active} onClick={() => Fu()}>确定</button>
                    </div>
                }
            </div>
		</section>
	)
}

export default Error
