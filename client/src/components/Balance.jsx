import React from 'react'
import { GlobalContext } from '../context/GlobalState'
import { useContext } from 'react'

function Balance() {
    const { transactions } = useContext(GlobalContext)

    const amounts = transactions.map(transaction => transaction.amount)
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2)

    return (
        <>
            <h3>Balance :</h3>
            <h2 id='balance'>₹{total}</h2>
        </>
    )
}

export default Balance