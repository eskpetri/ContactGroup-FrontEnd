import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useNavigate } from "react-router-dom";


const AddUser = () => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [username, setUsername] = useState('');
    const [identity, setIdentity] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        setLoading(true);
        setIsError(false);
        const data = {
            username: username,
            identity: identity,
            firstname: firstname ? firstname : null,
            lastname: lastname ? lastname : null,
            password: password
        }
        axios.post(apiURL + '/user/', data, {
            auth: {
                username: localStorage.getItem('username'),
                password: localStorage.getItem('password')
            }
        })
            .then(res => {
                setUsername('');
                setIdentity('');
                setFirstname('');
                setLastname('');
                setPassword('');
                setLoading(false);
                return navigate("/userlist");
            }).catch(err => {
                setLoading(false);
                setIsError(true);
            });
    }

    return (
        <div className="container">
            <table className='table table-bordered'>
                <thead>
                    <tr className='table-info'>
                    <th>username</th><th>identity</th><th>firstname</th><th>lastname</th><th>password</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} /></td>
                        <td><input type="text" id="identity" value={identity} onChange={e => setIdentity(e.target.value)} /></td>
                        <td><input type="text" id="firstname" value={firstname} onChange={e => setFirstname(e.target.value)} /></td>
                        <td><input type="text" id="lastname" value={lastname} onChange={e => setLastname(e.target.value)} /></td>
                        <td><input type="text" id="password" value={password} onChange={e => setPassword(e.target.value)} /></td>
                    </tr>
                </tbody>
            </table>
            <button className='btn btn-primary' type="submit" onClick={handleSubmit} >Add</button>
            {isError}
        </div>
    )
}

export default AddUser; 