import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from './myURL';
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleSubmit = () => {
        setLoading(true);
        setIsError(false);
        const data = {
            name: name,
            author: author,
            isbn: isbn
        }
        axios.post(apiURL + '/book/', data, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => {
                setName('');
                setAuthor('');
                setIsbn('');
                setLoading(false);
                return navigate("/booklist");
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
                        <th>name</th><th>author</th><th>isbn</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" id="name" placeholder='kirjan nimi' onChange={e => setName(e.target.value)} /></td>
                        <td><input type="text" id="author" placeholder='kirjan tekijä' onChange={e => setAuthor(e.target.value)} /></td>
                        <td><input type="text" id="isbn" placeholder='isbn' onChange={e => setIsbn(e.target.value)} /></td>
                    </tr>
                </tbody>
            </table>
            <button className='btn btn-primary' type="submit" onClick={handleSubmit} >Tallenna</button>
            {isError}
        </div>
    )
}

export default AddBook;