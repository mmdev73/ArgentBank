import { useSelector, useDispatch } from 'react-redux'
import { setLogin, setUserInfo } from '../features/authSlicer'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'


const SignIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoadingAuth, setIsLoadingAuth] = useState(false)
    const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(false)
    const [isError, setIsError] = useState(false)
    
    const handleSignIn = (e) => {
        e.preventDefault()
        console.log('Sign In')
        setIsError(false)
        setIsLoadingAuth(true)
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        //console.log(username, password)
        login(username, password)
    }
    
    const login = async (username, password) => {
        console.log("login() :" + username + " " + password)
        const response = await fetch('http://localhost:3001/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                email: username,
                password: password
            })
        })
        const data = await response.json()
        console.log(data)
        if(data.status === 400){
            setIsError(true)
            console.log("Credentials : invalid")
            document.querySelector('.signin__content__text').innerText = `${data.status} - ${data.message}`
        }
    
        if(data.status === 200){
            console.log("Credentials : valid")
            document.querySelector('.signin__content__text').innerText = ""
            const rememberMe = document.getElementById('remember')
            console.log('rememberMe checked : ' + rememberMe.checked)
            if(rememberMe.checked){
                console.log('rememberMe checked : FORCE TRUE')
                dispatch(setLogin({token: data.body.token,rememberMe: true}))
            } else {
                console.log('rememberMe checked : DEFAULT FALSE')
                dispatch(setLogin({token: data.body.token,rememberMe: false}))
            }
            getUserInfo(data.body.token)
        }
    
        if(data.status === 500){
            console.log("Credentials : unknown - Server Error")
            document.querySelector('.signin__content__text').innerText = `${data.status} - ${data.message}`
        }
    }
    const getUserInfo = async (isAuthToken) => {
        console.log("getUserInfo() :" + isAuthToken)
        setIsLoadingAuth(false)
        setIsLoadingUserInfo(true)
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
        console.log(data)
        if(data.status === 400 || data.status === 401){
            setIsError(true)
            console.log("Credentials Token: invalid")
        }
    
        if(data.status === 200){
            console.log("Credentials Token: valid")
            dispatch(setUserInfo({userInfo: data.body}))
            setIsLoadingUserInfo(false)          
            navigate("/user")
        }
    
        if(data.status === 500){
            console.log("Credentials Token: unknown - Server Error")
        }
    }
    return <>
        <section className="signin">
            <div className="signin__content">
                <i className="fa fa-user-circle sign-in-icon signin__content__icon"></i>
                <h1 className="signin__content__title">Sign In</h1>
                <p className='signin__content__text'></p>
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
                        isError && <p className="signin__content__form__error">Invalid credentials</p>
                    }
                    {
                        isLoadingAuth && <p className="signin__content__form__loading">Checking credentials...</p>
                    }
                    {
                        isLoadingUserInfo && <p className="signin__content__form__loading">Loading user...</p>
                    }
                    <button className="signin__content__form__btn" onClick={handleSignIn}>Sign In</button>
                </form>
            </div>            
        </section>
    </>
}

export default SignIn