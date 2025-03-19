import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../context/Context'

const Detail = (props) => {
    const {data} = useContext(Context)
    const {id} = useParams()
    const dataProduct = (data && data.length !== 0) ? data.filter(item=>item.id === id) : null
      useEffect(() => {
        console.log('dataCardDetail: ', data);
      }, [data])

      console.log('dataProduct: ', dataProduct);
      
    
  return (
    <div>
        <h1>{dataProduct.name}</h1>
        <img src={dataProduct.image}/>
    </div>
  )
}

export default Detail