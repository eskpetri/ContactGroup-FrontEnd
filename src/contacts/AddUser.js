import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useNavigate } from "react-router-dom";


const AddUser = () => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = () => {
        setLoading(true);
        setIsError(false);
        const data = {
            username: username,
            password: password,
            nickname: nickname ? nickname : null,
            email: email ? email : null,
            phone: phone ? phone :null
        }
        axios.post(apiURL + '/contacts/', data, {})
            .then(res => {
                setUsername('');
                setPassword('');
                setNickname('');
                setEmail('');
                setPhone('');
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
                    <th>username</th><th>password</th><th>nickname</th><th>email</th><th>phone</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} /></td>
                        <td><input type="text" id="password" value={password} onChange={e => setPassword(e.target.value)} /></td>
                        <td><input type="text" id="nickname" value={nickname} onChange={e => setNickname(e.target.value)} /></td>
                        <td><input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} /></td>
                        <td><input type="text" id="phone" value={phone} onChange={e => setPhone(e.target.value)} /></td>
                        
                    </tr>
                </tbody>
            </table>
            <button className='btn btn-primary' type="submit" onClick={handleSubmit} >Add</button>
            {isError}
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
export default AddUser; 