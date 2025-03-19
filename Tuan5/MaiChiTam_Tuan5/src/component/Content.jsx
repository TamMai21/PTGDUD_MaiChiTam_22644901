import React, { useEffect, useState } from 'react'
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

const Content = () => {

  const [dataCard, setDataCard] = useState([])

  useEffect(() => {
    handleFetchData()
  }, [])

  const handleFetchData = () => {
    let data = fetch("https://67d6a512286fdac89bc28e08.mockapi.io/food")
      .then(response => response.json())
      .then((data) => {
        console.log("data: ", data);
        setDataCard(data)
      })
      .catch(error => console.error("Error:", error));

  }

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
                <Accordion.Header style={{ backgroundColor: "white" }}  >Type</Accordion.Header>
                <Accordion.Body>
                  <div className="d-flex">
                    <ul>
                      <li>
                        <img src={UnChecked} />
                        <p>Pan-fried</p>
                      </li>
                      <li>
                        <img src={Checked} />
                        <p>Grilled</p>
                      </li>
                      <li>
                        <img src={UnChecked} />
                        <p>Sauteed</p>
                      </li>
                      <li>
                        <img src={UnChecked} />
                        <p>Streamed</p>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <img src={UnChecked} />
                        <p>Stir-fired</p>
                      </li>
                      <li>
                        <img src={Checked} />
                        <p>Roasted</p>
                      </li>
                      <li>
                        <img src={UnChecked} />
                        <p>Baked</p>
                      </li>
                      <li>
                        <img src={UnChecked} />
                        <p>Stewed</p>
                      </li>
                    </ul>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
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
          <p className="h5">Salad (32)</p>
          <div className="filter"></div>
        </div>
        <div className="content">
          {dataCard && dataCard.length > 0 && dataCard.map((item, index) => {
            return (
              <Card style={{ width: '15rem' }} id={index}>
                <Card.Img variant="top" src={item.avatar} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    {item.name}
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            )
          })}
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

export default Content