import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from './myURL';
import { NavLink } from 'react-router-dom';

const BookList = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [info, setInfo] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: response } = await axios.get(apiURL + '/book', {
                    headers: { "Authorization": `Bearer ${token}` } 
                })
                setData(response);
                console.log(data);
            } catch (error) {
                console.error(error.message);
                setInfo("You need to login to see the books!");
            }
            setLoading(false);
        }

        fetchData();
    }, []);

    return (
        <div className="container">
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
                            <td>Delete</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <p>{info}</p>
        </div>
    )
}

export default BookList;