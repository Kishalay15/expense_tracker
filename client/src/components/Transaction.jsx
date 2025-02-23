import React from 'react'
import { GlobalContext } from '../context/GlobalState'
import { useContext } from 'react'

function Transaction({ transaction }) {
    const { deleteTransactions } = useContext(GlobalContext)

    const sign = transaction.amount < 0 ? '-' : '+'

    return (
        <li className={transaction.amount < 0 ? "minus" : "plus"}>
            {transaction.text}
            <span>{sign}₹{Math.abs(transaction.amount)}</span>
            <button onClick={() => deleteTransactions(transaction._id)} className="delete-btn">x</button>
        </li>
    )
}

export default Transaction
