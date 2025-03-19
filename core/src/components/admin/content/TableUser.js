import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../../services/apiServices';

const TableUser = (props) => {

    const { listUsers } = props

    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope='col'>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`table-item-${index}`}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td className='d-flex' style={{ gap: '4px' }}>
                                        <button className='btn btn-info' onClick={() => props.handleClickButtonView(item)}>View</button >
                                        <button className='btn btn-warning' onClick={() => props.handleClickButtonUpdate(item)}>Update</button >
                                        <button className='btn btn-danger' onClick={() => props.handleClickButtonDelete(item)}>Delete</button >
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUsers && listUsers.length === 0 && <tr><td colSpan={'4'}>EMPTY</td></tr>
                    }
                </tbody>
            </table>
        </>
    );
}

export default TableUser;