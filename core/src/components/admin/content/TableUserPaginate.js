import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../../services/apiServices';
import ReactPaginate from 'react-paginate';

const TableUserPaginate = (props) => {

    const { listUsers, pageCount } = props


    const handlePageClick = (event) => {
        props.fetchListUsersWithPaginate(+event.selected + 1)
        props.setCurrentPage(+event.selected + 1)
    };

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
                                        <button className='btn btn-danger' onClick={() => props.handleClickButtonDelete(item)}>Delete</button ></td>
                                </tr>
                            )
                        })
                    }
                    {listUsers && listUsers.length === 0 && <tr><td colSpan={'4'}>EMPTY</td></tr>
                    }
                </tbody>
            </table>
            <div className='d-flex justify-content-center'>
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />
            </div>
        </>
    );
}

export default TableUserPaginate;