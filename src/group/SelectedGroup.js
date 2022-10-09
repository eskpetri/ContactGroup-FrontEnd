import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const SelectedGroup = (props) => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [idgroups, setIdgroups] = useState('');
    const [groupname, setGroupname] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();
    const {id}=useParams();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("id="+id);
                const { data: response } = await axios.get(apiURL + '/group/'+id, {})
                setIdgroups(id);
                console.log(response.idgroups);
                setIdgroups(response.idgroups);
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
            description:description ? description : null
        }
        console.log(data);
        axios.put(apiURL + '/Group', data, {})
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
                    <tr className='table-info'>
                        <th>idgroups</th><th>groupname</th><th>description</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td><input type="text" id="idgroups" value={id} onChange={e => setIdgroups(e.target.value)} /></td>
                            <td><input type="text" id="groupname" value={groupname} onChange={e => setGroupname(e.target.value)} /></td>
                            <td><input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><button type="submit" className='btn btn-primary' onClick={handleSubmit}  disabled={loading}>Update</button></td>
                        </tr>
                </tbody>
            </table>
        </div>
    )
}
/*
    "idgroups": 1,
    "groupname": "BootCamp2022",
    "description": "Autumn 2022 Study Group on development of BackEnd and FrontEnd using DB"
  */
export default SelectedGroup;