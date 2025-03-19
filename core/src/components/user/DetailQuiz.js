import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getQuizData, postSubmitQuiz } from '../../services/apiServices';
import _ from 'lodash';
import './DetailQuiz.scss'
import Question from './Question';
import { toast } from 'react-toastify';
import ModalResult from './ModalResult';

const DetailQuiz = (props) => {
    const params = useParams()
    const location = useLocation()
    const quizID = params.id


    const [quizData, setQuizData] = useState([])
    const [indexQuestion, setIndexQuestion] = useState(0)
    const [disablePrev, setDisablePrev] = useState(true)
    const [disableNext, setDisableNext] = useState(false)

    const [isShowModalResult, setIsShowModalResult] = useState(false)
    const [dataModalResult, setDataModalResult] = useState({})

    useEffect(() => {
        fetchQuestions()
    }, [quizID])

    const fetchQuestions = async () => {
        let res = await getQuizData(quizID)
        if (res && +res.EC === 0) {
            let rawData = res.DT
            let data = _.chain(rawData)
                .groupBy("id")
                .map((value, key) => {
                    let answers = []
                    let description, image = null

                    value.forEach((item, index) => {
                        if (index === 0) {
                            description = item.description
                            image = item.image
                        }
                        item.answers.isSelected = false
                        answers.push(item.answers)
                    })
                    return { questionId: key, description, image, answers }
                })
                .value()
            setQuizData(data)
        }
    }

    const handlePrevious = () => {
        if (indexQuestion > 0) {
            let currentIndex = indexQuestion - 1
            setIndexQuestion(indexQuestion - 1)
            if (currentIndex == 0) {
                setDisablePrev(true)
            } else {
                setDisablePrev(false)
                setDisableNext(false)
            }

        } else {
            setDisablePrev(true)
        }
    }

    const handleNext = () => {
        if (quizData && quizData.length > indexQuestion + 1) {
            let currentIndex = indexQuestion + 1
            setIndexQuestion(indexQuestion + 1)
            if (quizData.length === currentIndex + 1) {
                setDisableNext(true)
            } else {
                setDisableNext(false)
                setDisablePrev(false)
            }

        } else {
            setDisableNext(true)
        }
    }

    const handleSelectAnswer = (answerId, questionId) => {
        let quizDataClone = _.cloneDeep(quizData)
        // console.log('quizClon', quizDataClone);
        let question = quizDataClone.find(item => +item.questionId === +questionId)
        // console.log('ques: ', question, ' /awID', answerId, '/ qID', questionId);
        if (question && question.answers) {
            // console.log('ques: ', question);
            question.answers = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected
                }
                return item
            })//tao mang question.answer moi co su thay doi cua dap an xong ghi de lai

            // console.log('b ', question.answers);
        }
        let index = quizDataClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            quizDataClone[index] = question //cap nhat cau hoi vua thay doi dap an
            setQuizData(quizDataClone)
        }
    }

    const handleFinishQuiz = async () => {
        console.log('data before finish quiz: ', quizData);
        let dataFinal = {
            quizId: +quizID,
            answers: []
        }
        let answers = []
        if (quizData && quizData.length > 0) {
            quizData.forEach(question => {

                let questionId = question.questionId
                let userAnswerId = []

                question.answers.forEach(ans => {
                    if (ans.isSelected) {
                        userAnswerId.push(ans.id)
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            dataFinal.answers = answers
            console.log('final data: ', dataFinal);

            //submit
            let res = await postSubmitQuiz(dataFinal)
            if (res && +res.EC === 0) {
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setIsShowModalResult(true)
            } else {
                toast.error('Something wrong...Please try again later')
            }
        }
    }

    return (
        <div className='detail-quiz-container'>
            <div className='left-content'>
                <div className='title'>
                    Quiz {quizID}: {location?.state?.quizTitle}
                </div>
                <hr />
                <div className='q-body'>
                    <img />
                </div>
                <div className='q-content'>
                    <Question
                        data={quizData && quizData.length > 0 ? quizData[indexQuestion] : []}
                        indexQuestion={indexQuestion}
                        handleSelectAnswer={handleSelectAnswer}
                    />
                </div>
                <div className='footer'>
                    <button className='btn btn-secondary'
                        onClick={() => handlePrevious()}
                        disabled={disablePrev}
                    >
                        Previous
                    </button>
                    <button className='btn btn-primary'
                        onClick={() => handleNext()}
                        disabled={disableNext}
                    >
                        Next
                    </button>
                    <button className='btn btn-success'
                        onClick={() => handleFinishQuiz()}
                    >
                        Finish
                    </button>
                </div>
            </div>
            <div className='right-content'>
                count down
            </div>
            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    );
}

export default DetailQuiz;