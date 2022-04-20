import { Route, Navigate, useLocation } from 'react-router'
import { HasAuth } from '../../utils'

const AuthRoute = ({children}) =>{
    const location = useLocation()

    if(!HasAuth()){
        return <Navigate to="/login" state={{ from: location }} replace={true} />
    }
    return children
}

export default AuthRoute