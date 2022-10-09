import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { NavLink, Link } from 'react-router-dom';

const UserList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [iserror, setIsError] = useState('');

    const getUsers = () => {
        setLoading(true);
        setIsError(false);
        axios.get(apiURL + '/contacts',{})
            .then(res => {
                console.log(res.data);
                setData(res.data);
                //console.log(data);
                setLoading(false);
            }).catch(err => {
                setLoading(false);
                setIsError(true);
            });
    }

    useEffect(() => {
        getUsers();
    }, []);



    return (
        <div className="container">
            <Link to='/adduser'><button className='btn btn-primary'>Add Contact</button></Link>
            <br/> <br/>
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr className='table-info'>
                        <th>idcontacts</th><th>username</th><th>nickname</th><th>email</th><th>phone</th><th>Select</th><th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(user => (
                        <tr key={user.idcontacts}>
                            <td>{user.idcontacts}</td>
                            <td>{user.username}</td>
                            <td>{user.nickname}</td>
                            <td>{user.email ? user.email : null}</td>
                            <td>{user.phone ? user.phone : null}</td>
                            <td><NavLink to={`selecteduser/${user.idcontacts}`}>
                                <button className="btn btn-primary">Select({user.idcontacts})</button>
                                </NavLink>
                            </td>
                            <td><NavLink to={`deleteuser/${user.idcontacts}`}>
                                <button className="btn btn-danger">Delete({user.idcontacts})</button>
                                </NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>{iserror}</p>
        </div>
    )
}
/*
    "idcontacts": 1,
    "username": "eskpetri",
    "password": "$2a$11$T0uJeH03ie4GBpi0S/5yiu5hHulm.uNKepmeLkRs3mqxOs1Q.6FXy",
    "nickname": "Pete",
    "email": "eskpetri@gmail.com",
    "phone": "044-528 4517",
    "isadmin": 1
  */

export default UserList;