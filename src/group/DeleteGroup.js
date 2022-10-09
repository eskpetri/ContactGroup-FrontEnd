import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";

const DeleteGroup = (props) => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [idgroups, setIdgroups] = useState('');
    const [groupname, setGroupname] = useState('');
    const [description, setDescription] = useState('');
    const {id}=useParams();
    const navigate = useNavigate();
    useEffect(() => {
        
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("id="+id);
                const { data: response } = await axios.get(apiURL + '/Group/'+id, {})
                setIdgroups(id);
                setGroupname(response.groupname);
                setDescription(response.description);
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
            idgroups: id,
            groupname: groupname,
            description: description ? description : null
        }
        axios.delete(apiURL + '/group/'+id, {})
            .then(res => {
                setIdgroups('');
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
                    <tr>
                    <th>idgroups</th><th>groupname</th><th>description</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td>{idgroups}</td><td>{groupname}</td><td>{description}</td>
                        </tr>
                </tbody>
            </table>
            Do you really want to delete the Group?
            <br/>
            <button className='btn btn-danger' type="submit" onClick={handleSubmit}  disabled={loading}>Delete</button>
            &nbsp;
            <Link to="/grouplist"><button className='btn btn-info'>Cancel</button></Link>
            {isError}
        </div>
    )
}
/*
    "idgroups": 1,
    "groupname": "BootCamp2022",
    "description": "Autumn 2022 Study Group on development of BackEnd and FrontEnd using DB"
  */
export default DeleteGroup;