import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const SelectedUser = (props) => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [idcontacts, setIdcontacts] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const navigate = useNavigate();
    const {id}=useParams();

    useEffect(() => {
        
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("id="+id);
                const { data: response } = await axios.get(apiURL + '/contacts/'+id, {})
                setIdcontacts(id);
                console.log(response.iduser);
                setIdcontacts(response.idcontacts);
                setUsername(response.username);
                setPassword(response.password);
                setNickname(response.nickname);
                setEmail(response.email);
                setPhone(response.phone);

                console.log(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    const handleSubmit = () => {
        setLoading(true);
        setIsError(false);
        const data = {
            idcontacts: id,
            username: username,
            password:password,
            nickname: nickname,
            email:email ? email : null ,
            phone:phone ? phone : null
        }
        console.log(data);
        axios.put(apiURL + '/contacts', data, {})
            .then(res => {
                setIdcontacts('');
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
                        <th>idcontacts</th><th>username</th><th>password</th><th>nickname</th><th>email</th><th>phone</th><th></th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td><input type="text" id="idcontacts" value={id} onChange={e => setIdcontacts(e.target.value)} /></td>
                            <td><input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} /></td>
                            <td><input type="text" id="password" value={password} onChange={e => setPassword(e.target.value)} /></td>
                            <td><input type="text" id="nickname" value={nickname} onChange={e => setNickname(e.target.value)} /></td>
                            <td><input type="text" id="email" value={email} onChange={e => setEmail(e.target.value)} /></td>
                            <td><input type="text" id="phone" value={phone} onChange={e => setPhone(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><button type="submit" className='btn btn-primary' onClick={handleSubmit}  disabled={loading}>Update</button></td>
                        </tr>
                </tbody>
            </table>
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
export default SelectedUser;