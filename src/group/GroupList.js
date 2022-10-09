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
        axios.get(apiURL + '/Group',{})
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
            <Link to='/addgroup'><button className='btn btn-primary'>Add Group</button></Link>
            <br/> <br/>
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr className='table-info'>
                        <th>idgroups</th><th>groupname</th><th>description</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(group => (
                        <tr key={group.idgroups}>
                            <td>{group.idgroups}</td>
                            <td>{group.groupname}</td>
                            <td>{group.description ? group.description : null}</td>
                            <td><NavLink to={`selectedgroup/${group.idgroups}`}>
                                <button className="btn btn-primary">Select({group.idgroups})</button>
                                </NavLink>
                            </td>
                            <td><NavLink to={`deletegroup/${group.idgroups}`}>
                                <button className="btn btn-danger">Delete({group.idgroups})</button>
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
    "idgroups": 1,
    "groupname": "BootCamp2022",
    "description": "Autumn 2022 Study Group on development of BackEnd and FrontEnd using DB"
  */

export default UserList;