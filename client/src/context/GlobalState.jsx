import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'

const InitialState = {
    transactions:  [],
    error: null,
    loading: true
}

export const GlobalContext = createContext(InitialState)

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, InitialState)

    async function getTransactions() {
        try {
            const res = await axios.get('/api/v1/transactions')

            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            })
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            })
        }
    }

    async function deleteTransactions(id) {
        try {
            console.log('deleting with id: ', id)

            await axios.delete(`/api/v1/transactions/${id}`)
            console.log('helooooooooooooooooooooooooo');


            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            })
        } catch (error) {
            console.log(error)

            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response ? error.response.data.error : 'Unknown error'
            })
        }
    }

    async function addTransactions(transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/v1/transactions', transaction, config)

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            })
        } catch (error) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: error.response.data.error
            })
        }
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        deleteTransactions,
        addTransactions,
        getTransactions
    }}>
        {children}
    </GlobalContext.Provider>)
}
