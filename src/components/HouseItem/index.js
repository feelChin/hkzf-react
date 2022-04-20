import { useNavigate } from 'react-router-dom'
import { URL } from '../../utils'
import styles from './index.module.scss'

const HouseItem = ({ houseCode, src, tags, title, desc, price }) => {
    const navigate = useNavigate()
    return (
        <div className={styles.house}  onClick={() => navigate("/houseDetail",{state: houseCode})}>
            <div className={styles.imgWrap}>
                <img className={styles.img} src={URL + src} alt="" />
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.desc}>{desc}</div>
                <div>
                    {
                        tags.map((tag, index) => {
                            const tagClass = 'tag' + (index + 1)
                            return (
                                <span className={[styles.tag, styles[tagClass]].join(' ')} key={tag}>{tag}</span>
                            )
                        })
                    }
                </div>
                <div className={styles.price}>
                    <span className={styles.priceNum}>{price}</span> 元/月
                </div>
            </div>
        </div>
    )
}

export default HouseItem