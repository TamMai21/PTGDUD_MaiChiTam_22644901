import React, { useEffect, useState } from 'react';
import './ManageUser.scss'

import ModalCreateUser from './ModalCreateUser';
import { FcPlus } from 'react-icons/fc';
import TableUser from './TableUser';
import { getAllUsers, getAllUsersWithPaginate } from '../../../services/apiServices';
import ModalUpdateUser from './ModalUpdateUser';
import ModalViewUserInfo from './ModalViewUserInfo';
import ModalDeleteUser from './ModalDeleteUser';
import TableUserPaginate from './TableUserPaginate';



const ManageUser = (props) => {

    const LIMIT_USER_PER_PAGE = 3;
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [listUsers, setListUsers] = useState([])

    const [showModalViewUserInfo, setShowModalViewUserInfo] = useState(false)

    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [userToUpdate, setUserToUpdate] = useState({})

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)

    useEffect(() => {
        // fetchListUsers()
        fetchListUsersWithPaginate(1)
    }, [])

    const fetchListUsers = async () => {
        const res = await getAllUsers()
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }

    const fetchListUsersWithPaginate = async (page) => {
        const res = await getAllUsersWithPaginate(page, LIMIT_USER_PER_PAGE)
        if (res.EC === 0) {
            setListUsers(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }

    const handleClickButtonUpdate = (user) => {
        setUserToUpdate(user)
        setShowModalUpdateUser(true)
    }

    const handleClickButtonView = (user) => {
        setUserToUpdate(user)
        setShowModalViewUserInfo(true)
    }

    const handleClickButtonDelete = (user) => {
        setUserToUpdate(user)
        setShowModalDeleteUser(true)
    }


    return (
        <div className='manage-user-container'>
            <div className='title'>
                Manage
            </div>
            <div className='users-content'>
                <div className='btn-add-new'>
                    <button className='btn btn-info' onClick={() => setShowModalCreateUser(true)}><FcPlus />Add new user</button>

                </div>
                <div className='table-users-container'>
                    {/* <TableUser
                        listUsers={listUsers}
                        handleClickButtonUpdate={handleClickButtonUpdate}
                        handleClickButtonView={handleClickButtonView}
                        handleClickButtonDelete={handleClickButtonDelete}
                    /> */}
                    <TableUserPaginate
                        listUsers={listUsers}
                        handleClickButtonUpdate={handleClickButtonUpdate}
                        handleClickButtonView={handleClickButtonView}
                        handleClickButtonDelete={handleClickButtonDelete}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    userToUpdate={userToUpdate}
                    setUserToUpdate={setUserToUpdate}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalViewUserInfo
                    show={showModalViewUserInfo}
                    setShow={setShowModalViewUserInfo}
                    userToUpdate={userToUpdate}
                    setUserToUpdate={setUserToUpdate}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalDeleteUser
                    userToUpdate={userToUpdate}
                    show={showModalDeleteUser}
                    setUserToUpdate={setUserToUpdate}
                    setShow={setShowModalDeleteUser}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default ManageUser;