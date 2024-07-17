import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { services } from '../utils/services'
import { useEffect, useState } from 'react';
import Transaction from '../componnents/Transaction'

const AccountView = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token)
  const { accountId } = useParams();
  const [transactions, setTransactions] = useState([])
  const [account, setAccount] = useState({})
  
  const handleAccount = async (accountId, token) => {
    if(accountId > 0 && token){
      const accountTransactions = await services.transactions.getAllTransactions(token, accountId)
      const transactionsArr = services.data.formatTransactions(accountTransactions.transactions)
      setTransactions(transactionsArr)
      const accountInfo = await services.data.getAccountInfos(accountId)
      setAccount(accountInfo)
    } else {
      navigate('/account')
    }
  }
  useEffect(() => {
    handleAccount(accountId, token)
  }, [])
  return (
    <>
      <div className="content__container accountview">
        <div className="accountview__header">
          <h1 className="accountview__header__title">
            {account ? account.name : ''} (x{ accountId })
          </h1>
          <h2 className="accountview__header__balance">
            {account ? account.availableBalance : ''}
          </h2>
          <h3 className="accountview__header__balancename">
            Available Balance
          </h3>
        </div>
        <div className="accountview__transactions">
          <div className="accountview__transactions__table">
            <div className="accountview__transactions__table__head">
              <div className="accountview__transactions__table__head__row">
                <div className="accountview__transactions__table__head__row__th accountview__transactions__table__head__row__th--small">
                  &nbsp;
                </div>
                <div className="accountview__transactions__table__head__row__th">DATE</div>
                <div className="accountview__transactions__table__head__row__th">DESCRIPTION</div>
                <div className="accountview__transactions__table__head__row__th">AMOUNT</div>
                <div className="accountview__transactions__table__head__row__th">BALANCE</div>
              </div>
            </div>
            <div className="accountview__transactions__table__body">
              {transactions.map((transaction, index) => (
                <Transaction key={index} transaction={transaction} accountId={accountId} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default AccountView