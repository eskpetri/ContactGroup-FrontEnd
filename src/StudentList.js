import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from './myURL';
import { NavLink, Link } from 'react-router-dom';

const StudentList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [iserror, setIsError] = useState('');
    const token = localStorage.getItem('token');
    const [imagename, setImagename]=useState('');

    const getStudents = () => {
        setLoading(true);
        setIsError(false);
        axios.get(apiURL + '/student/', {
            headers: { "Authorization": `Bearer ${token}` } 
        })
            .then(res => {
                console.log(imagename);
                setData(res.data);
                //console.log(data);
                setLoading(false);
            }).catch(err => {
                setLoading(false);
                setIsError(true);
            });
    }
    const userData = () => {
        setLoading(true);
        setIsError(false);
        axios.get(apiURL + '/userdetails/'+localStorage.getItem('username'), {
            headers: { "Authorization": `Bearer ${token}` } 
        })
            .then(res => {
                console.log(res.data[0].image_name);
                setImagename(apiURL+'/images/'+res.data[0].image_name);
                //console.log(imagename);
                setLoading(false);
            }).catch(err => {
                setLoading(false);
                setIsError(true);
            });
    }
    useEffect(() => {
        getBooks();
    }, []);
    useEffect(() => {
        userData();
    }, []);


    return (
        <div className="container">
            <Link to='/addbook'><button className='btn btn-primary'>Uusi kirja</button></Link>
            <br/> <br/>
            <img src={imagename} width="300"/> <br/>
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr>
                        <th>id_book</th><th>name</th><th>author</th><th>isbn</th><th>Select</th><th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(book => (
                        <tr key={book.id_book}>
                            <td>{book.id_book}</td>
                            <td> {book.name}</td>
                            <td>{book.author}</td>
                            <td>{book.isbn}</td>
                            <td><NavLink to={`selectedbook/${book.id_book}`}>
                                <button className="btn btn-primary">Select({book.id_book})</button>
                                </NavLink>
                            </td>
                            <td><NavLink to={`deletebook/${book.id_book}`}>
                                <button className="btn btn-danger">Delete({book.id_book})</button>
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

export default BookList;