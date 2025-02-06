import React from 'react'
import { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { nanoid } from 'nanoid'

function AddTransaction() {
    const [text, setText] = useState('')
    const [amount, setAmount] = useState(0)

    const { addTransactions } = useContext(GlobalContext)

    const onSubmit = (e) => {
        e.preventDefault()

        const newTransaction = {
            id: nanoid(),
            text,
            amount: +amount,
        }

        addTransactions(newTransaction)
    }

    return (
        <>
            <h3>Add new transaction</h3>
            <form id="form" onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} id="text" placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="amount"
                    >Amount <br />
                        (negative - expense, positive - income)</label
                    >
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} id="amount" placeholder="Enter amount..." />
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </>
    )
}

export default AddTransaction
