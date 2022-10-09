import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useNavigate } from "react-router-dom";


const AddUser = () => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [groupname, setGroupname] = useState('');
    const [description, setDescription] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = () => {
        setLoading(true);
        setIsError(false);
        const data = {
            groupname: groupname,
            description: description ? description :null
        }
        axios.post(apiURL + '/Group/', data, {})
            .then(res => {
                setGroupname('');
                setDescription('');
                setLoading(false);
                return navigate("/grouplist");
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
                    <th>groupname</th><th>description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" id="groupname" value={groupname} onChange={e => setGroupname(e.target.value)} /></td>
                        <td><input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} /></td>
                    </tr>
                </tbody>
            </table>
            <button className='btn btn-primary' type="submit" onClick={handleSubmit} >Add</button>
            {isError}
        </div>
    )
}
/*
    "idgroups": 1,
    "groupname": "BootCamp2022",
    "description": "Autumn 2022 Study Group on development of BackEnd and FrontEnd using DB"
  */
export default AddUser; 