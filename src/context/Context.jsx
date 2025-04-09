import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
const Context = createContext(null)
const ContextProvider = ({ children }) => {
    let [data, setData] = useState([])
    const addToUser = (dataAdd) => {
        setData([...data, dataAdd]);
    };
    const remove = (data) => {
        let dataAfterRemove = dataCart.filter(item => +item.id !== +data.id)
        setDataCart(dataAfterRemove)
    }
    useEffect(() => {
        // fetchPokemon();
        // console.log('data Context: ', dataJson);
        // console.log('data cart: ', data);
    }, [data])
    const value = useMemo(() => ({ data, addToUser, remove }), [data]);
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>)
}
export { ContextProvider, Context }
