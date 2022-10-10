import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";

const LeaveGroup = (props) => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [idgroups, setIdgroups] = useState('');
    const [idcontacts, setGroupname] = useState('');
    const {id}=useParams();
    const navigate = useNavigate();
    var cid = 0;
    var isadmin = 0;

    useEffect(() => {
        cid = localStorage.getItem('cid');
        isadmin = localStorage.getItem('appadmin');
        setLoading(true);
        setIsError(false);
        const data = {
            idcontacts: cid,
            idgroups: id,
            isadmin: isadmin
        }
        console.log("idc="+data.idcontacts)
        console.log("idg="+data.idgroups)
        console.log("isa="+data.isadmin)
        console.log(data)
        axios.post(apiURL + '/Groupcontact/cg/', data, {})
            .then(res => {
                setIdgroups('');
                setGroupname('');
                setLoading(false);
                return navigate("/grouplist");
            }).catch(err => {
                setLoading(false);
                setIsError(true);
            });
   
    }, []);
    return (
        <div className="container">
            <table>
Töttöröö
            </table>
            {isError}
        </div>
    )
}
/*
  "idgroupcontacts": 1,
  "idcontacts": 1,
  "idgroups": 1,
  "isadmin": 1
  */
export default LeaveGroup;