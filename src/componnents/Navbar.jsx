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
    if(userI === undefined){
        if(sessionStorage.getItem('token')){
            dispatch(setLogin({token: sessionStorage.getItem('token'), rememberMe: false}))
        }
        if(sessionStorage.getItem('userI')){
            dispatch(setUserInfo({userInfo: JSON.parse(sessionStorage.getItem('userI'))}))
        }
    }
    const checkCookies = async () => {
        if(document.cookie && isAuth === false) {
            const cok = document.cookie.split('token=')
            if(cok[1] !== "null" && cok[1] !== "undefined" && cok[1] !== false) {
                dispatch(setLogin({token: cok[1], rememberMe: true}))
                const userInfo = await services.user.getProfile(cok[1])
                if(userInfo.status !== 200){
                    console.error("Credentials Token: unknown or Server Error")
                    return
                }
                dispatch(setUserInfo({userInfo: userInfo.userInfo}))
            }        
        }
    }

    useEffect(() => {
        checkCookies()
    }, [])
    
    return (
        <nav className="navbar">
            <Link to={'/'} className="navbar__link">
                <img src="/argentBankLogo.png" alt="Logo de Argent Bank"className="navbar__link__logo"/>
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            {
                (!isAuth || !userI) && <Link to={'/signin'} className="navbar__link">
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