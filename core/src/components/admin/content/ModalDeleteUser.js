import _ from 'lodash';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../services/apiServices';

const ModalDeleteUser = (props) => {
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
        // console.log('userToDelete: ', userToUpdate);
        if (!_.isEmpty(userToUpdate)) {
            setEmail(userToUpdate.email)
            setUsername(userToUpdate.username)
            setRole(userToUpdate.role)
            if (userToUpdate.image)
                setPreviewImage(`data:image/jpeg;base64,${userToUpdate.image}`)
        }

    }, [userToUpdate])

    const handleDeleteUser = async () => {
        let id = userToUpdate.id
        const data = new FormData()
        let res = await deleteUser(id)

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
            <Modal show={show} onHide={handleClose} backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to delete a user with email = {userToUpdate.email}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteUser()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;