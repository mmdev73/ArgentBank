import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { setLogin, setUserInfo, rmLogin } from '../features/authSlicer'
import { useEffect } from "react"
import {services} from '../utils/services'
const Navbar = () => {
    const isAuth = useSelector((state) => state.auth.token)
    const userI = useSelector((state) => state.auth.userInfo)
    const dispatch = useDispatch()
    const sessionStorage = window.sessionStorage
    const getUserInfoNv = async (isAuthToken) => {
        if(!isAuthToken){
            console.log("JWT malformed : Token === " + isAuthToken)
            return
        }
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${isAuthToken}`,
            },
        })
        const data = await response.json()
        if(data.status === 400 || data.status === 401){
            console.log("Credentials Token: invalid")
        }
    
        if(data.status === 200){
            dispatch(setUserInfo({userInfo: data.body}))
        }
    
        if(data.status === 500){
            console.log("Credentials Token: unknown - Server Error")
        }
    }

    if(userI === undefined){
        if(sessionStorage.getItem('token')){
            dispatch(setLogin({token: sessionStorage.getItem('token'), rememberMe: false}))
        }
        if(sessionStorage.getItem('userI')){
            dispatch(setUserInfo({userInfo: JSON.parse(sessionStorage.getItem('userI'))}))
        }
    }
    if(document.cookie && isAuth === false) {
        const cok = document.cookie.split('token=')
        console.log(cok[1])
        if(cok[1] !== "null" && cok[1] !== "undefined" && cok[1] !== false) {
            dispatch(setLogin({token: cok[1], rememberMe: true}))
            const userInfo = async () => await services.user.getProfile(cok[1])
            if(userInfo.status !== 200) return
            dispatch(setUserInfo({userInfo: userInfo.userInfo}))
            //getUserInfoNv(cok[1])
        }        
    }
    
    return (
        <nav className="navbar">
            <Link to={'/'} className="navbar__link">
                <img src="/argentBankLogo.png" alt="Logo de Argent Bank"className="navbar__link__logo"/>
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            {
                !isAuth && <Link to={'/signin'} className="navbar__link">
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </Link>
            }
            {
                (isAuth && userI) && <div className="authenticated">
                        <Link to={'/user'} className="navbar__link">
                            <i className="fa fa-user-circle"></i>
                            {userI.firstName}
                        </Link>
                        <Link to={'/'} className="navbar__link" onClick={() => dispatch(rmLogin())}>
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </Link>
                    </div>
            }            
        </nav>
    )
}

export default Navbar