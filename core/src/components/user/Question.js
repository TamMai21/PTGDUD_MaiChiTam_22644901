import _ from 'lodash';
import React from 'react';

const Question = (props) => {
    const { data, indexQuestion } = props

    const handleCheckBox = (event, answerId, questionId) => {
        // console.log('handle checkbox', data, '///');
        props.handleSelectAnswer(answerId, questionId)
    }

    if (_.isEmpty(data)) {
        return (<></>)
    }
    // console.log('data detail quiz: ', data);
    return (
        <>
            {data.image ?
                <div className='q-image'>
                    <img src={`data:image/jpeg;base64,${data.image}`} />
                </div>
                :
                <div className='q-image'></div>
            }
            <div className='question'>Question {indexQuestion + 1}: {data.description} ?</div>
            <div className='answer'>
                {data.answers && data.answers.length &&
                    data.answers.map((answer, index) => {
                        return (
                            <div key={`answer-${index}`} className='a-child'>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        onChange={(event) => handleCheckBox(event, answer.id, data.questionId)}
                                        checked={answer.isSelected}
                                    />
                                    <label className="form-check-label" for="flexCheckDefault">
                                        {answer.description}
                                    </label>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}

export default Question;