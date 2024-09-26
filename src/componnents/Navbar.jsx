import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { setLogin, setUserInfo, rmLogin } from '../features/authSlicer'
import { useEffect } from "react"
import { services } from '../utils/services'
/**
 * Renders a navigation bar component that displays the logo and allows users to sign in or sign out.
 *
 * @return {JSX.Element} The navigation bar component.
 */
const Navbar = () => {
    const { token, userInfo } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    /**
     * Use to retrieve user session, first by session storage (if available), then by cookies (if available).
     *
     */
    const checkStorageAndCookies = async () => {
        if (sessionStorage.getItem('authState') && !userInfo && !token) {
            console.log('-NavBar- retrieve token from sessionStorage')
            dispatch(setLogin({ token: sessionStorage.getItem('authState').token, rememberMe: true }))
            dispatch(setUserInfo({ userInfo: sessionStorage.getItem('authState').userInfo, initialized: true }))
        }
        if (document.cookie && !token && !userInfo) {
            const cok = document.cookie.split('token=')
            if (cok[1] !== "null" && cok[1] !== "undefined" && cok[1] !== false) {
                console.log('-NavBar- retrieve token from cookies')
                const userInfoFetch = await services.user.getProfile(cok[1])
                if (userInfoFetch.status !== 200) {
                    console.error("Credentials Token: unknown or Server Error")
                    return
                }
                console.log('-NavBar- dispatch setLogin & setUserInfo & initialiazed TRUE')
                dispatch(setLogin({ token: cok[1], rememberMe: true }))
                dispatch(setUserInfo({ userInfo: userInfoFetch.userInfo, initialized: true }))
            }
        }
    }

    useEffect(() => {
        checkStorageAndCookies()
    }, [token, userInfo])

    return (
        <nav className="navbar">
            <Link to={'/'} className="navbar__link">
                <img src="/argentBankLogo.png" alt="Logo de Argent Bank" className="navbar__link__logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            {
                (!token || !userInfo) && <Link to={'/login'} className="navbar__link">
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </Link>
            }
            {
                (token && userInfo) && <div className="authenticated">
                    <Link to={'/profile'} className="navbar__link">
                        <i className="fa fa-user-circle"></i>
                        {userInfo.firstName}
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