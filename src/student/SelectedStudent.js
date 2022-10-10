import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const SelectedStudent = (props) => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [idstudent, setIdstudent] = useState('');
    const [start_date, setStart_date] = useState('');
    const [graduate_date, setGraduate_date] = useState('');
    const navigate = useNavigate();
    const {id}=useParams();

    useEffect(() => {
        
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("id="+id);
                const { data: response } = await axios.get(apiURL + '/student/'+id, {
                    auth: {
                        username:localStorage.getItem('username'),
                        password:localStorage.getItem('password')
                    }
                })
                setIdstudent(id);
                console.log(response.idstudent);
                setIdstudent(response.idstudent);
                setStart_date(response.start_date);
                setGraduate_date(response.graduate_date);
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
            idstudent: id,
            start_date: start_date,
            graduate_date: graduate_date
        }
        console.log("TEST");
        console.log(data);
        axios.put(apiURL + '/student/'+id, data, {
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
        <div className="container">
            <table className='table table-bordered'>
                <thead>
                    <tr className='table-info'>
                        <th>idstudent</th><th>start_date</th><th>graduate_date</th><th></th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td><input type="text" id="idstudent" value={id} onChange={e => setIdstudent(e.target.value)} /></td>
                            <td><input type="text" id="start_date" value={start_date} onChange={e => setStart_date(e.target.value)} /></td>
                            <td><input type="text" id="graduate_date" value={graduate_date} onChange={e => setGraduate_date(e.target.value)} /></td>
                            <td><button type="submit" className='btn btn-primary' onClick={handleSubmit}  disabled={loading}>Update</button></td>
                        </tr>
                    
                </tbody>
            </table>
        </div>
    )
}

export default SelectedStudent;