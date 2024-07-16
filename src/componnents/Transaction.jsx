import { useState } from 'react'
import {services} from '../utils/services'
const Transaction = ({transaction, index}) => {

  const [open, setOpen] = useState(false)
  return (
    <>
       <div key={index} className="accountview__transactions__table__body__row">
          <div className="accountview__transactions__table__body__row__head"  onClick={() => setOpen(!open)}>
            <div className="accountview__transactions__table__body__row__head__td accountview__transactions__table__body__row__head__td--small">
              <img src='/arrow-down.png' alt="arrow" className={open ? 'accountview__transactions__table__body__row__head__td__img accountview__transactions__table__body__row__head__td__img--active' : 'accountview__transactions__table__body__row__head__td__img'}/>
            </div>
            <div className="accountview__transactions__table__body__row__head__td">{transaction.date}</div>
            <div className="accountview__transactions__table__body__row__head__td">{transaction.description}</div>
            <div className="accountview__transactions__table__body__row__head__td">${services.data.formatAmount(transaction.amount)}</div>
            <div className="accountview__transactions__table__body__row__head__td">${services.data.formatAmount(transaction.balance)}</div>      
          </div>
          <div className={open ? 'accountview__transactions__table__body__row__body accountview__transactions__table__body__row__body--active' : 'accountview__transactions__table__body__row__body'}>
            <div className="accountview__transactions__table__body__row__body__td">Transaction Type : {transaction.type}</div>
            <div className="accountview__transactions__table__body__row__body__td">Categorie : {transaction.categorie}</div>
            <div className="accountview__transactions__table__body__row__body__td">Notes : {transaction.note}</div>
          </div>
        </div>
    </>
  )
  
}

export default Transaction