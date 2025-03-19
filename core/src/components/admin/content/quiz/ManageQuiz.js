import React, { useState } from 'react';
import './ManageQuiz.scss'
import Select from 'react-select';
import { postCreateQuiz } from '../../../../services/apiServices';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import { Accordion } from 'react-bootstrap';

const ManageQuiz = (props) => {

    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ]

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState({ value: 'EASY', label: 'EASY' },)
    const [image, setImage] = useState(null)

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    const handleCreateQuiz = async () => {
        if (!name || !description) {
            toast.error('Please fill in all field')
            return
        }
        console.log('type: ', type);
        let data = { name, description, difficulty: type?.value, image }
        let res = await postCreateQuiz(data)
        console.log('ré: ', res);
        if (res && +res.EC === 0) {
            toast.success(res.EM)
            setDescription("")
            setName("")
            setImage(null)
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className='quiz-container'>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage quizzes</Accordion.Header>
                    <Accordion.Body>
                        <div className='add-new'>
                            <fieldset className='border rounded-3 p-3'>
                                <legend className='float-none w-auto px-3'>Add new quiz:</legend>
                                <div className="form-floating mb-3">
                                    <input type="text" value={name} onChange={(event) => setName(event.target.value)} className="form-control" placeholder='Name' />
                                    <label >Name</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} className="form-control" placeholder='Description' />
                                    <label >Description</label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                        defaultValue={options.find(option => option.value === type?.value)}
                                        onChange={setType}
                                        options={options}
                                        placeholder={"Quiz difficulity"}

                                    />
                                </div>
                                <div className='more-actions form-group'>
                                    <label className='mb-1'>Upload Image</label>
                                    <input type='file' className='form-control' onChange={(event) => handleUploadImage(event)} />

                                </div>
                                <div className='mt-3'>
                                    <button className='btn btn-success'
                                        onClick={() => handleCreateQuiz()}
                                    >Create</button>
                                </div>
                            </fieldset>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <div className='list-detail'>
                <TableQuiz />
            </div>
        </div>
    );
}

export default ManageQuiz;