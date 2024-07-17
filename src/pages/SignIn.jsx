import { useSelector, useDispatch } from 'react-redux'
import { setLogin, setUserInfo } from '../features/authSlicer'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import {services} from '../utils/services'


const SignIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoadingAuth, setIsLoadingAuth] = useState(false)
    const [isError, setIsError] = useState(false)
    const sessionStorage = window.sessionStorage
    const handleSignIn = async (e) => {
        e.preventDefault()
        setIsError(false)
        setIsLoadingAuth(true)
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        const loginResult = await services.user.getLogin(username, password)        
        //console.log(loginResult)
        if(loginResult.status !== 200){
            setIsError(loginResult)
            return
        }
        const rememberMe = document.getElementById('remember')
        sessionStorage.setItem('userI', JSON.stringify(loginResult.userInfo))
        sessionStorage.setItem('token', loginResult.token)
        if(rememberMe.checked){
            dispatch(setLogin({token: loginResult.token,rememberMe: true}))

        } else {
            dispatch(setLogin({token: loginResult.token,rememberMe: false}))
        }
        setIsLoadingAuth(false)
        navigate("/account")
    }

    return <>
        <section className="content__container signin">
            <div className="signin__content">
                <i className="fa fa-user-circle sign-in-icon signin__content__icon"></i>
                <h1 className="signin__content__title">Sign In</h1>
                <form className="signin__content__form">
                    <div className="signin__content__form__group">
                        <label htmlFor="username" className="signin__content__form__group__label">Username</label>
                        <input type="text" name="username" id="username" className="signin__content__form__group__input" autoComplete="username"/>
                    </div>
                    <div className="signin__content__form__group">
                        <label htmlFor="password" className="signin__content__form__group__label">Password</label>
                        <input type="password" name="password" id="password" className="signin__content__form__group__input" autoComplete="current-password"/>
                    </div>
                    <div className="signin__content__form__group signin__content__form__group--remember">
                        <input type="checkbox" name="remember" id="remember" className="signin__content__form__group__input signin__content__form__group__input--remember"/>
                        <label htmlFor="remember" className="signin__content__form__group__label signin__content__form__group__label--remember">Remember me</label>
                    </div>
                    {
                        isError && <p className="signin__content__form__error">{isError.status} - {isError.message}</p>
                    }
                    {
                        isLoadingAuth && <p className="signin__content__form__loading"><img src="/loader.png" alt="loader" className="signin__content__form__loading__img" />Checking credentials...</p>
                    }
                    <button className="signin__content__form__btn" onClick={handleSignIn}>Sign In</button>
                </form>
            </div>            
        </section>
    </>
}

export default SignIn