import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { postCreateNewUser, putUpdateNewUser } from '../../../services/apiServices';
import _ from 'lodash'

const ModalUpdateUser = (props) => {
    const { show, setShow, userToUpdate } = props;

    const handleClose = () => {
        setShow(false)
        setEmail("")
        setImage("")
        setPreviewImage("")
        setPassword("")
        setUsername("")
        setRole("USER")
        props.setUserToUpdate({})
    };

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("USER")
    const [image, setImage] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    useEffect(() => {
        // console.log('userToUpdate: ', userToUpdate);
        if (!_.isEmpty(userToUpdate)) {
            setEmail(userToUpdate.email)
            setUsername(userToUpdate.username)
            setRole(userToUpdate.role)
            if (userToUpdate.image)
                setPreviewImage(`data:image/jpeg;base64,${userToUpdate.image}`)
        }

    }, [userToUpdate])

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            setPreviewImage("")
            setImage("")
        }
    }


    const handleSubmitUpdateUser = async () => {
        let id = userToUpdate.id
        const data = new FormData()
        let res = await putUpdateNewUser({ id, username, role, image })

        console.log('res: ', res);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            handleClose()
            props.setCurrentPage(1)
            await props.fetchListUsersWithPaginate(1)
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM)
        }

    }


    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose} size='xl' backdrop='static' className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Update user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" disabled className="form-control" value={email} onChange={(event) => { setEmail(event.target.value) }} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input type="password" disabled className="form-control" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" value={username} onChange={(event) => { setUsername(event.target.value) }} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">State</label>
                            <select id="inputState" className="form-select" onChange={(event) => { setRole(event.target.value) }}>
                                <option selected value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                        <div className='col-md-12'>
                            <label htmlFor='labelUpload' className="form-label label-upload"><FcPlus />Image</label>
                            <input type='file' hidden id='labelUpload' onChange={(event) => { handleUploadImage(event) }} />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>Preview image</span>
                            }
                        </div>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitUpdateUser}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;