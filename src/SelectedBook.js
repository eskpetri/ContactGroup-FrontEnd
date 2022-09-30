import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from './myURL';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const SelectedBook = (props) => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [id_book, setIdBook] = useState('');
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const {id}=useParams();
    const navigate=useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
        
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("id="+id);
                const { data: response } = await axios.get(apiURL + '/book/'+id, {
                    headers: { "Authorization": `Bearer ${token}` } 
                })
                setIdBook(id);
                console.log(response.name);
                setName(response.name);
                setAuthor(response.author);
                setIsbn(response.isbn);
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
            name: name,
            author: author,
            isbn: isbn
        }
        axios.put(apiURL + '/book/'+id, data, {
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
            <table border="1">
                <thead>
                    <tr>
                        <th>id_book</th><th>name</th><th>author</th><th>isbn</th><th>Choose</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td>{id_book}</td>
                            <td><input type="text" id="name" value={name} onChange={e => setName(e.target.value)} /></td>
                            <td><input type="text" id="author" value={author} onChange={e => setAuthor(e.target.value)} /></td>
                            <td><input type="text" id="isbn" value={isbn} onChange={e => setIsbn(e.target.value)} /></td>
                            <td><button type="submit" onClick={handleSubmit}  disabled={loading}>Update</button></td>
                        </tr>
                    
                </tbody>
            </table>
        </div>
    )
}

export default SelectedBook;