import React, { createContext, use, useReducer } from 'react'
import AppReducer from './AppReducer'

const InitialState = {
    transactions:  []
}

export const GlobalContext = createContext(InitialState)

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, InitialState)

    function deleteTransactions(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        })        
    }

    function addTransactions(transaction) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        })
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        deleteTransactions,
        addTransactions,
    }}>
        {children}
    </GlobalContext.Provider>)
}