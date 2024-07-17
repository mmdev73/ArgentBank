import { useNavigate } from "react-router-dom"

/**
 * Renders the AccountItem component with the account details.
 *
 * @param {Object} datas - The data object containing account information.
 * @return {JSX.Element} The rendered AccountItem component.
 */
const AccountItem = ({ datas }) => {
    const navigate = useNavigate()

    /**
     * Handles the click event by preventing the default behavior and navigating to the account page.
     *
     * @param {Event} e - The click event object.
     * @return {void} This function does not return anything.
     */
    const handleClick = (e) => {
        e.preventDefault()
        const accountId = datas.accountId
        navigate(`/account/${accountId}`)
    }
    return (
        <div className="accounts__wrapper">
            <article className="accounts__wrapper__item">
                <h3 className="accounts__wrapper__item__title">{`Argent Bank ${datas.name} (x${datas.accountId})`}</h3>
                <p className="accounts__wrapper__item__amount">{datas.currency === 'USD' ? `$${datas.balance}` : `${datas.balance}`}</p>
                <p className="accounts__wrapper__item__description">{datas.availableBalance ? 'Available Balance' : 'Current Balance'}</p>
            </article>
            <div className="accounts__wrapper__item cta">
                <button className="accounts__wrapper__item__btn" onClick={handleClick}>View transactions</button>
            </div>
        </div>
        
    )
}

export default AccountItem