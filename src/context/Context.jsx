import React, { createContext, useContext, useEffect, useState } from 'react'
import dataJson from '../data/menu.json'

export const Context = createContext()

const ContextData = ({children}) => {
   
  let [data, setData] = useState([])

  useEffect(()=>{
    (dataJson && dataJson.length !== 0) ? setData(dataJson) : setData(null)
    // console.log('data: ', dataJson); 
}, [])
    
  return (
    <Context.Provider value={{data}}>
        {children}
    </Context.Provider>
  )
}

export default ContextData