import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useNavigate } from "react-router-dom";


const AddStudent = () => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [idstudent, setIdstudent] = useState('');
    const [start_date, setStart_date] = useState('');
    const [graduate_date, setGraduate_date] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        setLoading(true);
        setIsError(false);
        const data = {
            idstudent: idstudent,
            start_date: start_date,
            graduate_date: graduate_date
        }
        axios.post(apiURL + '/student/', data, {
            auth: {
                username:localStorage.getItem('username'),
                password:localStorage.getItem('password')
            }
        })
            .then(res => {
                setIdstudent('');
                setStart_date('');
                setGraduate_date('');
                setLoading(false);
                return navigate("/studentlist");
            }).catch(err => {
                setLoading(false);
                setIsError(true);
            });
    }

    return (
        <div classidstudent="container">
            <table classidstudent='table table-bordered'>
                <thead>
                    <tr classidstudent='table-info'>
                        <th>idstudent</th><th>start_date</th><th>graduate_date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" id="idstudent" placeholder='idstudent' onChange={e => setIdstudent(e.target.value)} /></td>
                        <td><input type="text" id="start_date" placeholder='start_date' onChange={e => setStart_date(e.target.value)} /></td>
                        <td><input type="text" id="graduate_date" placeholder='graduate_date' onChange={e => setGraduate_date(e.target.value)} /></td>
                    </tr>
                </tbody>
            </table>
            <button classidstudent='btn btn-primary' type="submit" onClick={handleSubmit} >Add</button>
            {isError}
        </div>
    )
} 

export default AddStudent; 