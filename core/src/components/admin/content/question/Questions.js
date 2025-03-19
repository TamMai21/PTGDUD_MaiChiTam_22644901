import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './Questions.scss'
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { IoImage } from "react-icons/io5";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import LightBox from 'react-awesome-lightbox'
import { getAllQuiz, postCreateNewAnswerForQuestion, postCreateNewQuestionForQuiz } from '../../../../services/apiServices';

const Questions = (props) => {
    const options = [
        {}
    ]



    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: '',
            image: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(), description: '', isCorrect: false
                },
            ]
        },
    ])

    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [dataImagePreview, setDataImagePreview] = useState({
        title: '',
        url: ''
    })

    const [listQuiz, setListQuiz] = useState([])
    const [selectedQuiz, setSelectedQuiz] = useState({})


    useEffect(() => {
        fetchQuiz();
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuiz();
        if (res && res.EC === 0) {
            let newQuizs = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuizs)
        }
    }

    const handleAddRemoveQuestion = (typeAction, id) => {
        if (typeAction === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                image: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(), description: '', isCorrect: false
                    },

                ]
            }
            setQuestions([...questions, newQuestion])
        }

        if (typeAction === 'REMOVE') {
            let cloneQuestions = _.cloneDeep(questions)
            cloneQuestions = cloneQuestions.filter(item => item.id !== id)
            setQuestions(cloneQuestions)
        }
    }

    const handleAddRemoveAnswer = (typeAction, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions)
        // console.log('questionID: ', questionId, ' answerID: ', answerId);
        if (typeAction === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }

            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers.push(newAnswer)
            setQuestions(questionsClone)
        }

        if (typeAction === 'REMOVE') {
            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionsClone)
        }
    }

    const handleOnchange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions)
            let index = questionsClone.findIndex(item => item.id === questionId)
            if (index > -1) {
                questionsClone[index].description = value
                setQuestions(questionsClone)
            }

        }
    }

    const handleOnchangeImageQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].imageFile = event.target.files[0]
            questionsClone[index].imageName = event.target.files[0].name
            setQuestions(questionsClone)
        }
    }

    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map(answer => {
                if (answer.id === answerId) {
                    if (type === 'CHECKBOX') {
                        answer.isCorrect = value
                    }
                    if (type === 'INPUT') {
                        answer.description = value
                    }
                }
                return answer   //ko thay doi thi giu nguyen
            })

            setQuestions(questionsClone)
        }
    }

    const handleClickPreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName
            })
            setIsPreviewImage(true)
        }
    }

    const handleSubmitQuestionsForQuiz = async () => {

        //validate

        //submit questions
        await Promise.all(questions.map(async (question) => {
            const q = await postCreateNewQuestionForQuiz(
                +selectedQuiz.value,
                question.description,
                question.imageFile)

            //submit answer
            await Promise.all(
                question.answers.map(async (answer) => {
                    await postCreateNewAnswerForQuestion(
                        answer.description,
                        answer.isCorrect,
                        q.DT.id
                    )
                })
            )
        }))


    }

    return (
        <div className='questions-container'>
            <div className='title'>
                Manage questions
            </div>
            <div className='add-new-question'>
                <div className='col-6 form-group'>
                    <label className=''>Select quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                Add questions:
                <hr />
                {
                    questions && questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div key={`question-${index}`} className='mt-2 q-main mb-5'>
                                <div className='questions-content'>
                                    <div className="form-floating description">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            value={question.description}
                                            onChange={(event) => handleOnchange('QUESTION', question.id, event.target.value)}
                                        />
                                        <label >Question {index + 1} description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label htmlFor={`${question.id}`}>
                                            <IoImage className='label-upload' />
                                        </label>
                                        <input
                                            id={`${question.id}`}
                                            type={'file'}
                                            hidden
                                            onChange={(event) => handleOnchangeImageQuestion(question.id, event)}
                                        />
                                        <span>{question.imageName ?
                                            <span style={{ cursor: 'pointer' }} onClick={() => handleClickPreviewImage(question.id)}>{question.imageName}</span>
                                            :
                                            '0 file was uploaded'}
                                        </span>
                                    </div>
                                    <div className='btn-add'>
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                            <FaPlusCircle className='icon-add' />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <FaMinusCircle className='icon-remove' />
                                            </span>
                                        }
                                    </div>
                                    <div className='answers'>

                                    </div>
                                </div>
                                {question.answers && question.answers.length > 0 &&
                                    question.answers.map((answer, index) => {
                                        // console.log('questionId: ', question.id, ' //answer.id: ', answer.id);
                                        return (
                                            <div key={`answer-${index}`} className='answers-content'>
                                                <input
                                                    className="form-check-input iscorrect"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                                                />
                                                <div className="form-floating answer-name">
                                                    <input
                                                        value={answer.description}
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="name@example.com"
                                                        onChange={(event) => handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)}
                                                    />
                                                    <label >Answer {index + 1}</label>
                                                </div>
                                                <div className='btn-group'>
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
                                                        <AiOutlinePlusCircle className='icon-add' />
                                                    </span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                            <AiOutlineMinusCircle className='icon-remove' />
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                {questions && questions.length > 0 &&
                    <div>
                        <button
                            className='btn btn-success'
                            onClick={() => handleSubmitQuestionsForQuiz()}
                        >Save questions</button>
                    </div>
                }
                {
                    isPreviewImage === true &&
                    <LightBox
                        image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)}
                    ></LightBox>
                }
            </div>
        </div>
    );
}

export default Questions;