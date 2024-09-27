import { accountsBalances } from "../assets/accounts"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react"
import AccountItem from "../componnents/AccountItem"
import Loader from "../componnents/Loader"
import { useNavigate } from "react-router-dom"
import { setUserInfo } from '../features/authSlicer'
import { services } from '../utils/services'
import { useInitialized } from "../hooks/useInitialized"

/**
 * Renders the Account page component.
 *
 * @return {JSX.Element} The rendered Account page component.
 */
const Account = () => {
    //console.log("Account")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token, userInfo } = useSelector((state) => state.auth);
    const isInitialized = useInitialized();
    const [showEditName, setShowEditName] = useState(false);
    const [isInvalidFirstName, setIsInvalidFirstName] = useState(false);
    const [isInvalidLastName, setIsInvalidLastName] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else if (token && userInfo) {
            setIsLoading(false);
        }
    }, [token, userInfo, navigate]);

    useEffect(() => {
        console.log('useEff - Account -> token, isInitialized, userInfo', token ? token.substring(0, 5) : 'NoToken', isInitialized, userInfo);
        if (isInitialized && token && userInfo) {
            setIsLoading(false);
        } else if (!token) {
            navigate("/login");
        }
    }, [token, isInitialized, userInfo, navigate]);
    /**
     * Handles the edit name event.
     *
     * @param {Event} e - The event object.
     * @return {void} No return value.
     */
    const handleEditName = (e) => {
        e.preventDefault()
        const firstName = document.getElementById('firstName').value
        const lastName = document.getElementById('lastName').value

        if (!isInvalidFirstName && !isInvalidLastName) {
            updateUserInfo(token, firstName, lastName)
        }
        //setIsLoading(false)
    }

    /**
     * Validates the input value based on the provided type.
     *
     * @param {string} inputValue - The input value to be validated.
     * @param {string} [type='firstName'] - The type of input to validate. Defaults to 'firstName'.
     * @return {boolean} Returns true if the input value is valid, false otherwise.
     */
    const isValidInput = (inputValue, type = 'firstName') => {
        const rgxName = /^[a-zA-ZÀ-ÖØ-öøç]{2,15}[-]{0,1}[a-zA-ZÀ-ÖØ-öøç]{0,15}$/
        if (!rgxName.test(inputValue)) {
            if (type === 'firstName') {
                setIsInvalidFirstName(true)
            } else {
                setIsInvalidLastName(true)
            }
        } else {
            if (type === 'firstName') {
                setIsInvalidFirstName(false)
            } else {
                setIsInvalidLastName(false)
            }
        }
        return rgxName.test(inputValue)
    }

    /**
     * A description of the entire function.
     *
     * @param {string} isAuthToken - description of parameter
     * @param {string} firstName - description of parameter
     * @param {string} lastName - description of parameter
     * @return {void} description of return value
     */
    const updateUserInfo = async (isAuthToken, firstName, lastName) => {
        setIsError(false)
        setIsLoading(true)
        const data = await services.user.updateProfile(isAuthToken, firstName, lastName)
        if (data.status !== 200) {
            setIsError({
                status: data.status,
                message: data.message
            })
            //console.log(data.message)
        }

        if (data.status === 200) {
            dispatch(setUserInfo({ userInfo: data.body }))
            setShowEditName(!showEditName)
        }
        //setIsLoading(false)
    }


    /**
     * Toggles the visibility of the edit form.
     *
     * @return {void} 
     */
    const toggleEditForm = () => {
        setShowEditName(!showEditName)
    }
    if (isLoading) {
        return <Loader />
    }
    if (!isLoading && userInfo) {
        return (
            <>
                <div className=" content__container accountsBalance">
                    <div className="account">
                        <h1 className="account__title">
                            <span>Welcome back</span>
                            <span className="account__title__name">{userInfo ? userInfo.firstName : ``} {userInfo ? userInfo.lastName : ``}</span>
                            <div className={`account__title__edit__form ${showEditName ? 'active' : ''} `}>
                                <div className="account__title__edit__form__group">
                                    <div className="account__title__edit__form__subgroup">
                                        <label htmlFor="firstName" className="account__title__edit__form__group__label sr-only">First Name</label>
                                        <input type="text" id="firstName" className="account__title__edit__form__group__input" defaultValue={userInfo ? userInfo.firstName : ``} onInput={(e) => { isValidInput(e.target.value) }} />
                                    </div>
                                    <div className="account__title__edit__form__subgroup">
                                        <label htmlFor="lastName" className="account__title__edit__form__group__label sr-only">Last Name</label>
                                        <input type="text" id="lastName" className="account__title__edit__form__group__input" defaultValue={userInfo ? userInfo.lastName : ``} onInput={(e) => { isValidInput(e.target.value, 'lastname') }} />
                                    </div>
                                </div>
                                <p className={`account__title__edit__form__text ${isInvalidFirstName ? 'active' : ''}`}>
                                    Please enter a valid first name. 2-31 characters. Only letters (lowercase or uppercase) and hyphen.
                                </p>
                                <p className={`account__title__edit__form__text ${isInvalidLastName ? 'active' : ''}`}>
                                    Please enter a valid last name. 2-31 characters. Only letters (lowercase or uppercase) and hyphen.
                                </p>
                                {
                                    isError && <p className="account__update__error">{isError.status} - {isError.message}</p>
                                }
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
    
}

export default Account
