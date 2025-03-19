import React, { useContext, useEffect, useState } from 'react'
import '../assets/Content.scss'
import { Accordion } from 'react-bootstrap';
import Checked from '../assets/img/checkboxpink.png'
import UnChecked from '../assets/img/checkbox.png'
import SliderTime from '../assets/img/slider.png'
import Rating1 from '../assets/img/rating_1.png'
import Rating2 from '../assets/img/rating_2.png'
import Rating3 from '../assets/img/rating_3.png'
import Rating4 from '../assets/img/rating_4.png'
import Rating5 from '../assets/img/rating_5.png'
import Bar from '../assets/img/list_filter.png'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ContextData, { Context } from '../context/Context';
import { useNavigate } from 'react-router-dom';

const MenuList = () => {

  const {data} = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    console.log('dataCard1: ', data);
  }, [data])



  return (
    <div className='content-container'>
      <div className="left-content">
        <div className="filter">
          <div className="header" style={{ border: "1px solid #dee2e6", borderRadius: "4px", padding: "1%" }} >
            <img src={Bar} style={{ height: "28px", width: "28px" }} />
            <p className="h4">FILTERS</p>
          </div>
          <div className="filter-box">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header style={{ backgroundColor: "white" }}  >Time</Accordion.Header>
                <Accordion.Body>
                  <div className="body2">
                    <div className="d-flex2">
                      <p className='p1'>30 minutes</p>
                      <p className='p2'>50 minutes</p>
                    </div>
                    <img src={SliderTime} className='img2' />
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header style={{ backgroundColor: "white" }}  >Rating</Accordion.Header>
                <Accordion.Body>
                  <div className="body3">
                    <ul>
                      <li>
                        <img src={UnChecked} />
                        <img src={Rating5} />
                      </li>
                      <li>
                        <img src={UnChecked} />
                        <img src={Rating4} />
                      </li>
                      <li>
                        <img src={Checked} />
                        <img src={Rating3} />
                      </li>
                      <li>
                        <img src={UnChecked} />
                        <img src={Rating2} />
                      </li>
                      <li>
                        <img src={UnChecked} />
                        <img src={Rating1} />
                      </li>
                    </ul>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
      <div className="right-content">
        <div className="title">
          <p className="h5">Food (9)</p>
          <div className="filter"></div>
        </div>
        <div className="content">
          {data && data.length > 0 && data.map((item, index) => {
            return (
              <Card style={{ width: '10rem', border: "1px solid gray", borderRadius: "8px" }} id={index}>
                <Card.Img variant="top" style={{width: "100%", height: "auto", border: "1px solid gray"}} src={item.image} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    {item.name}
                  </Card.Text>
                  <Button variant="primary" onClick={()=>{navigate(`/book/${item.id}`)}}>View detail</Button>
                </Card.Body>
              </Card>
            )
          })}
          {/* <Context/> */}
        </div>
        <div className="pagination">
          <div class="flex items-center space-x-2">
            <button class="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-200">
              &lt;
            </button>
            <button class="active px-4 py-2 rounded-lg border border-pink-500 bg-pink-500 text-white">
              1
            </button>
            <button class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-200">
              2
            </button>
            <button class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-200">
              3
            </button>
            <button class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-200">
              4
            </button>
            <span class="px-4 py-2 text-gray-500">...</span>
            <button class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-200">
              10
            </button>
            <button class="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-200">
              11
            </button>

            <button class="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-200">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuList