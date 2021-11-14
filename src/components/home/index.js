import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import http from '../../http_common';
import { Link } from 'react-router-dom'
import { UserAll, UserDelete, UserEdit } from '../../actions/user';

const HomePage = () => {


    const dispatch = useDispatch();
    const {list} =  useSelector(state => state.users);

    useEffect(() => {
        try{
            dispatch(UserAll())
                .then()
                .catch();
        }
        catch(error)
        {
            console.log("server error global");
        }

    }, [])

    // useEffect(() => {
    //     http.get("api/users/all")
    //     .then (resp => {
    //         setUsers(resp.data)
    //     });
    // }, [])

    const onDeleteClick = (id) => {
        try{
            dispatch(UserDelete(id))
                .then()
                .catch();
        }
        catch(error)
        {
            console.log("server error global");
        }
    }

    const onEditClick = (id) => {
        try{
            dispatch(UserEdit(id))
                .then()
                .catch();
        }
        catch(error)
        {
            console.log("server error global");
        }
    }


    return (
        <div className="row">
            <h1 className="text-center">Головна сторінка</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ФІО</th>
                        <th scope="col">Email</th>
                        <th scope="col">Image</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.login}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <img src={"http://localhost:44797/" + user.image} alt={user.image} width="150"/>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => onDeleteClick(user.id)}>Delete</button>
                                            <Link className="btn btn-success" onClick={() => onEditClick(user.id)} to={`/user/edit/${user.id}`}>Edit</Link>
                                    </td>
                                </tr>

                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default HomePage