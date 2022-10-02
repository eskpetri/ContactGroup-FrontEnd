import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";

const SelectedStudent = (props) => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [idstudent, setIdstudent] = useState('');
    const [start_date, setStart_date] = useState('');
    const [graduate_date, setGraduate_date] = useState('');
    const {id}=useParams();
    const navigate=useNavigate();
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
            idstudent: idstudent,
            start_date: start_date,
            graduate_date: graduate_date
        }
        axios.delete(apiURL + '/student/'+id, {
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
                    <tr>
                        <th>idstudent</th><th>start_date</th><th>graduate_date</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td>{idstudent}</td>
                            <td>{start_date}</td>
                            <td>{graduate_date}</td>
                        </tr>
                </tbody>
            </table>
            Do you really want to delete the student?
            <br/>
            <button className='btn btn-danger' type="submit" onClick={handleSubmit}  disabled={loading}>Delete</button>
            <br/>
            <Link to="/studentlist"><button className='btn btn-info'>Cancel</button></Link>
            {isError}
        </div>
    )
}

export default SelectedStudent;