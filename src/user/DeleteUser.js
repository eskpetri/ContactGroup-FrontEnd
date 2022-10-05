import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";

const SelectedUser = (props) => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [iduser, setIduser] = useState('');
    const [username, setUsername] = useState('');
    const [identity, setIdentity] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const {id}=useParams();
    const navigate = useNavigate();
    useEffect(() => {
        
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("id="+id);
                const { data: response } = await axios.get(apiURL + '/user/'+id, {
                    auth: {
                        username:localStorage.getItem('username'),
                        password:localStorage.getItem('password')
                    }
                })
                setIduser(id);
                setUsername(response.username);
                setIdentity(response.identity);
                setFirstname(response.firstname);
                setLastname(response.lastname);
                setPassword(response.password);
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
            iduser: iduser,
            username: username,
            identity: identity,
            firstname: firstname ? firstname : null,
            lastname: lastname ? lastname : null,
            password: password
        }
        axios.delete(apiURL + '/user/'+id, {
            auth: {
                username:localStorage.getItem('username'),
                password:localStorage.getItem('password')
            }
        })
            .then(res => {
                setIduser('');
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
                    <tr>
                    <th>iduser</th><th>username</th><th>identity</th><th>firstname</th><th>lastname</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td>{iduser}</td>
                            <td>{username}</td>
                            <td>{identity}</td>
                            <td>{firstname}</td>
                            <td>{lastname}</td>
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

export default SelectedUser;