import React, { useEffect, useState } from 'react';
import { getQuizByUser } from '../../services/apiServices';
import './ListQuiz.scss'
import { useNavigate } from 'react-router-dom';

const ListQuiz = (props) => {

    const navigate = useNavigate()
    const [listQuiz, setListQuiz] = useState([])

    useEffect(() => {
        fetchQuizData()
    }, [])

    const fetchQuizData = async () => {
        let res = await getQuizByUser()
        if (res && +res.EC === 0) {
            setListQuiz(res.DT)
        }
    }

    return (
        <div className='list-quiz-container'>
            {listQuiz && listQuiz.length > 0 &&
                listQuiz.map((quiz, index) => {
                    return (
                        <div key={"quiz" + index} className="card" style={{ width: "18rem" }}>
                            <img src={`data:image/jpeg;base64,${quiz.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button onClick={() => navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })} className="btn btn-primary">Start</button>
                            </div>
                        </div>
                    )
                })
            }
            {listQuiz && listQuiz.length === 0 &&
                <>
                    YOU DON'T HAVE ANY QUIZ NOW...
                </>
            }
        </div>
    );
}

export default ListQuiz;