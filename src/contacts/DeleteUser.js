import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";

const SelectedUser = (props) => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [idcontacts, setIdcontacts] = useState('');
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const {id}=useParams();
    const navigate = useNavigate();
    useEffect(() => {
        
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("id="+id);
                const { data: response } = await axios.get(apiURL + '/contacts/'+id, {})
                setIdcontacts(id);
                setUsername(response.username);
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
            nickname: nickname,
            email:email ? email : null ,
            phone:phone ? phone : null
        }
        axios.delete(apiURL + '/contacts/'+id, {})
            .then(res => {
                setIdcontacts('');
                setUsername('');
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
                    <tr>
                    <th>idcontacts</th><th>username</th><th>nickname</th><th>email</th><th>phone</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td>{idcontacts}</td><td>{username}</td><td>{nickname}</td><td>{email}</td><td>{phone}</td>
                        </tr>
                </tbody>
            </table>
            Do you really want to delete the user?
            <br/>
            <button className='btn btn-danger' type="submit" onClick={handleSubmit}  disabled={loading}>Delete</button>
            &nbsp;
            <Link to="/userlist"><button className='btn btn-info'>Cancel</button></Link>
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
export default SelectedUser;