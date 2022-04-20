import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import { API } from '../../utils'
import NavHeader from '../../components/NavHeader'
import Error from '../../components/Error'

import { withFormik } from "formik"
import * as Yup from 'yup'

import styles from './index.module.scss'

const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

function Registered(props) {
    const navigate = useNavigate()
    const [error,seterror] = useState(false)

    const {status,values,handleChange,handleSubmit,handleBlur,errors,touched} = props

    useEffect(() =>{
        if(status == 200){
            navigate(-2)
        }else{
            if(status){
                seterror(true)
            }
        }
    },[status])

    function chooseError(){
        seterror(false)
    }
    return (
        <section className={`${styles.login} page`}>
            <NavHeader>账号注册</NavHeader>
            <form className={styles.loginFlex} onSubmit={handleSubmit}> 
                <input type="text" name='username' onBlur={handleBlur} onChange={handleChange} value={values.username} placeholder='请输入账号' autoComplete="off" />
                <div className={styles.error}>
                    { errors.username && touched.username && errors.username}
                </div>
                <input type="password" name='password' onBlur={handleBlur} onChange={handleChange} value={values.password} placeholder='请输入密码' autoComplete="off" />
                <div className={styles.error}>
                    { errors.password && touched.password && errors.password }
                </div>
                <button type="submit">确定注册</button>
            </form>
            { error && <Error text={status} Fu = {chooseError} /> }
        </section>
    )
}

Registered = withFormik(
    {
        mapPropsToValues : () => ({
            username : "",
            password : ""
        }),
        validationSchema: Yup.object().shape({
            username: Yup.string()
              .required('账号为必填项')
              .matches(REG_UNAME, '长度为5到8位，只能出现数字、字母、下划线'),
            password: Yup.string()
              .required('密码为必填项')
              .matches(REG_PWD, '长度为5到12位，只能出现数字、字母、下划线')
        }),
        handleSubmit : (values,{setValues,setStatus}) => {
            async function axiosFun(){
                const res = await API.post('/user/registered',values).then(res=>{
                    const { status, body, description } = res.data
                    console.log(res.data)
                    if(status === 200){
                        localStorage.setItem('hkzf_token',body.toke)
                        // window.location.replace('/index/profile');
                        setStatus(200)
                    }else{
                        setValues ({
                            username : "",
                            password : ""
                        },false)
                        setStatus('')
                        setStatus(description)
                    }
                })
            }
            axiosFun()
        }
    }
)(Registered)

export default Registered