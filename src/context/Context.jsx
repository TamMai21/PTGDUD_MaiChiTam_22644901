import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const Context = createContext(null)

const ContextProvider = ({ children }) => {
    const [data, setData] = useState([])

    const addToUser = (dataAdd) => {
        setData(prev => [...prev, dataAdd])
    }

    const remove = (userToRemove) => {
        const filtered = data.filter(item => +item.id !== +userToRemove.id)
        setData(filtered)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/users')
                const json = await response.json()
                setData(json)
            } catch (error) {
                console.error('Lỗi khi fetch data từ db.json:', error)
            }
        }
        fetchData()
    }, [])

    const value = useMemo(() => ({ data, addToUser, remove }), [data])

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }
