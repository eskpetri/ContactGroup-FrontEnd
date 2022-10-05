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
        axios.get(apiURL + '/user',{
        auth: {
            username:localStorage.getItem('username'),
            password:localStorage.getItem('password')
        }
        })
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
            <Link to='/adduser'><button className='btn btn-primary'>Add user</button></Link>
            <br/> <br/>
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr className='table-info'>
                        <th>iduser</th><th>username</th><th>identity</th><th>firstname</th><th>lastname</th><th>Select</th><th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(user => (
                        <tr key={user.iduser}>
                            <td>{user.iduser}</td>
                            <td>{user.username}</td>
                            <td>{user.identity}</td>
                            <td>{user.firstname ? user.firstname : null}</td>
                            <td>{user.lastname ? user.lastname : null}</td>
                            <td><NavLink to={`selecteduser/${user.iduser}`}>
                                <button className="btn btn-primary">Select({user.iduser})</button>
                                </NavLink>
                            </td>
                            <td><NavLink to={`deleteuser/${user.iduser}`}>
                                <button className="btn btn-danger">Delete({user.iduser})</button>
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

export default UserList;