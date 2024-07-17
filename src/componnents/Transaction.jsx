import { useEffect, useState } from 'react'
import {services} from '../utils/services'
import {useSelector} from 'react-redux'


/**
 * Renders a transaction component with details and editable fields.
 *
 * @param {Object} transaction - The transaction object containing details.
 * @param {number} accountId - The ID of the account.
 * @param {number} index - The index the componnent when we mapped it.
 * @return {JSX.Element} The rendered transaction component.
 */
const Transaction = ({transaction, accountId, index}) => {
  const {token} = useSelector((state) => state.auth)
  const [open, setOpen] = useState(false)
  const [updateCategory, setUpdateCategory] = useState(false)
  const [updateNote, setUpdateNote] = useState(false)

  const [category, setCategory] = useState(transaction.categorie)
  const [note, setNote] = useState(transaction.note)

  const [error, setError] = useState(false)

  /**
   * Toggles the update category state when called.
   *
   * @param {Event} e - The event object.
   * @return {void} This function does not return anything.
   */
  const handleUpdateCategory = (e) => {
    e.preventDefault()
    setUpdateCategory(!updateCategory)
  }

  /**
   * Toggles the update note state when called.
   *
   * @param {Event} e - The event object.
   * @return {void} This function does not return anything.
   */
  const handleUpdateNote = (e) => {
    e.preventDefault()
    setUpdateNote(!updateNote)
  }

  /**
   * Close the update field 'categorie'when called.
   *
   * @param {Event} e - The event object.
   * @return {void} This function does not return anything.
   */
  const handleCloseCategory = (e) => {
    e.preventDefault()
    setUpdateCategory(!updateCategory)
  }
  /**
   * Close the update field 'note'when called.
   *
   * @param {Event} e - The event object.
   * @return {void} This function does not return anything.
   */
  const handleCloseNote = (e) => {
    e.preventDefault()
    setUpdateNote(!updateCategory)
  }

/**
 * Updates a transaction based on the given type.
 *
 * @param {string} type - The type of update. Can be 'category' or 'note'.
 * @return {void} 
 */
  const handleUpdate = async (type) => {
    console.log(type)
    let newTransaction = {}
    if(type === 'category'){
      newTransaction = {
        id: transaction.id,
        accountId: accountId,
        date: transaction.dateOrigine,
        description: transaction.description,
        amount: transaction.amount,
        balance: transaction.balance,
        categorie: document.getElementById('categorie-input').value,
        note: note
      }
      setCategory(document.getElementById('categorie-input').value)
    }
    if(type === 'note'){
      newTransaction = {
        id: transaction.id,
        accountId: accountId,
        date: transaction.dateOrigine,
        description: transaction.description,
        amount: transaction.amount,
        balance: transaction.balance,
        categorie: category,
        note: document.getElementById('note-input').value
      }
      setNote(document.getElementById('note-input').value)
    }
    
    const updateTransaction = await services.transactions.updateTransaction(token, accountId, newTransaction)
    console.log(updateTransaction)
    if(updateTransaction.status !== 200){
      setError({
        status: updateTransaction.status,
        message: updateTransaction.message
      })
      return
    }
    setUpdateCategory(false)
    setUpdateNote(false)
  }

  useEffect(() => {
    console.log(category)
  }, [category])
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
            {
              updateCategory && <div className="accountview__transactions__table__body__row__body__td">
                  Catégorie : 
                  <input type="text" id="categorie-input" className='accountview__transactions__table__body__row__body__td__input' defaultValue={category}/>
                  <img src='/check.png' alt='valid' className='accountview__transactions__table__body__row__body__td__img' onClick={() => {handleUpdate('category')}}/>
                  <img src='/cancel.png' alt='cancel' className='accountview__transactions__table__body__row__body__td__img' onClick={handleCloseCategory}/>
                </div>
            }
            {
              !updateCategory && <div className="accountview__transactions__table__body__row__body__td">
                Category : {category}
                <img src="/edit.png" alt="edit" className='accountview__transactions__table__body__row__body__td__img' onClick={handleUpdateCategory}/>
                </div>
            } 
            {
              updateNote && <div className="accountview__transactions__table__body__row__body__td">
                  Notes : 
                  <input type="text" id="note-input" className='accountview__transactions__table__body__row__body__td__input' defaultValue={note}/>
                  <img src='/check.png' alt='valid' className='accountview__transactions__table__body__row__body__td__img' onClick={() => {handleUpdate('note')}}/>
                  <img src='/cancel.png' alt='cancel' className='accountview__transactions__table__body__row__body__td__img' onClick={handleCloseNote}/>
                </div>
            }
            {
              !updateNote && <div className="accountview__transactions__table__body__row__body__td">
                Notes : {note}
                <img src="/edit.png" alt="edit" className='accountview__transactions__table__body__row__body__td__img' onClick={handleUpdateNote}/>
                </div>
            }
            {
              error && <div className="accountview__transactions__table__body__row__body__td">{error.status} : {error.message}</div>  
            }
          </div>
        </div>
    </>
  )
  
}

export default Transaction