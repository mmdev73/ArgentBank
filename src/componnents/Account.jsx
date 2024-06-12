import { accountsBalances } from "../assets/accounts"
import { useSelector, useDispatch } from 'react-redux'
import { useState } from "react"
import AccountItem from "./AccountItem"
import {Navigate} from "react-router-dom"
import { setUserInfo } from '../features/authSlicer'
const Account = () => {
    const userI = useSelector((state) => state.auth.userInfo).userInfo
    console.log(userI)
    const token = useSelector((state) => state.auth.token)
    const dispatch = useDispatch()
    if(!userI || userI === undefined) {
        return <Navigate to="/signin" />
    }

    const [showEditName, setShowEditName] = useState(false)
    const [isInvalidFirstName, setIsInvalidFirstName] = useState(false)
    const [isInvalidLastName, setIsInvalidLastName] = useState(false)

    const handleEditName = (e) => {
        console.log('Edit Name')
        e.preventDefault()
        const firstName = document.getElementById('firstName').value
        const lastName = document.getElementById('lastName').value
        
        console.log(isInvalidFirstName, isInvalidLastName)
        if(!isInvalidFirstName && !isInvalidLastName){
            console.log('Update User Info')
            console.log(firstName, lastName)
            updateUserInfo(token, firstName, lastName)
        }
    }

    const isValidInput = (inputValue, type = 'firstName') => {
        const rgxName = /^[a-zA-ZÀ-ÖØ-öøç]{2,15}[-]{0,1}[a-zA-ZÀ-ÖØ-öøç]{0,15}$/
        if(!rgxName.test(inputValue)){
            if(type === 'firstName'){
                setIsInvalidFirstName(true)
            } else {
                setIsInvalidLastName(true)
            }
        } else {
            if(type === 'firstName'){
                setIsInvalidFirstName(false)
            } else {
                setIsInvalidLastName(false)
            }
        }
        return rgxName.test(inputValue)
    }

    const updateUserInfo = async (isAuthToken, firstName, lastName) => {
        console.log("updateUserInfo() :" + isAuthToken)
        if(!isAuthToken){
            console.log("JWT malformed : Token === " + isAuthToken)
            return
        }
        console.log('--------------------')
        console.log(firstName, lastName)
        console.log('--------------------')
        const objToSend = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${isAuthToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName
            })
        }
        const response = await fetch('http://localhost:3001/api/v1/user/profile', objToSend)
        const data = await response.json()
        console.log(data)
        if(data.status === 400 || data.status === 401){
            console.log(data.message)
        }
    
        if(data.status === 200){
            console.log(data.message)
            dispatch(setUserInfo({userInfo: data.body}))
            setShowEditName(!showEditName)
        }
    
        if(data.status === 500){
            console.log(data.message)
        }
    }

    const toggleEditForm = () => {
        setShowEditName(!showEditName)
    }
    return (
        <>
            <div className="accountsBalance">
                <div className="account">
                    <h1 className="account__title">
                        <span>Welcome back</span>
                        <span className="account__title__name">{userI ? userI.firstName : ``} {userI ? userI.lastName : ``}</span>
                        <div className={`account__title__edit__form ${showEditName ? 'active' : ''} `}>
                            <div className="account__title__edit__form__group">
                                <div className="account__title__edit__form__subgroup">
                                    <label htmlFor="firstName" className="account__title__edit__form__group__label sr-only">First Name</label>
                                    <input type="text" id="firstName" className="account__title__edit__form__group__input" defaultValue={userI ? userI.firstName : ``} onInput={(e) => {isValidInput(e.target.value)}}/>
                                </div>
                                <div className="account__title__edit__form__subgroup">
                                    <label htmlFor="lastName" className="account__title__edit__form__group__label sr-only">Last Name</label>
                                    <input type="text" id="lastName" className="account__title__edit__form__group__input" defaultValue={userI ? userI.lastName : ``} onInput={(e) => {isValidInput(e.target.value,'lastname')}}/>
                                </div>
                            </div>
                            <p className={`account__title__edit__form__text ${isInvalidFirstName ? 'active' : ''}`}>
                                Please enter a valid first name. 2-31 characters. Only letters (lowercase or uppercase) and hyphen.
                            </p>
                            <p className={`account__title__edit__form__text ${isInvalidLastName ? 'active' : ''}`}>
                                Please enter a valid last name. 2-31 characters. Only letters (lowercase or uppercase) and hyphen.
                            </p>
                            <div className="account__title__edit__form__group">
                                <button className="account__title__edit__form__btn" onClick={handleEditName} disabled={isInvalidFirstName || isInvalidLastName ? true : false}>Save</button>
                                <button className="account__title__edit__form__btn" onClick={toggleEditForm}>Cancel</button>
                            </div>
                            
                        </div>
                    </h1>
                    <button className={`account__btn ${!showEditName ? 'active' : ''} `} onClick={toggleEditForm}>Edit Name</button>
                </div>
                <h2 className="sr-only">Account</h2>
                <section className="accounts">
                {
                    accountsBalances && accountsBalances.map((account, index) => {
                        return (
                            <AccountItem key={index} datas={account} />
                        )
                    })
                }
                </section>
            </div>            
        </>
    )
}

export default Account