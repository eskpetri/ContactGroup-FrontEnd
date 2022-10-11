import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import apiURL from '../myURL';
import { NavLink, Link } from 'react-router-dom';

const UserList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [iserror, setIsError] = useState('');
    const {id}=useParams();

    const getUsers = () => {
        setLoading(true);
        setIsError(false);
        axios.get(apiURL + '/Group/group/'+id,{})  //Group/group/10
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
            <Link to='/grouplist'><button className='btn btn-primary'>Back to Groups</button></Link>
            <br/> 
            <br/>
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr className='table-info'>
                        <th>idcontacts</th><th>username</th><th>nickname</th><th>email</th><th>phone</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>{iserror}</p>
        </div>
    )
}
export default UserList;