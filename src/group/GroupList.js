import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useParams } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';

const GroupList = (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [iisadmin, setAdmin] = useState('');
    const [iserror, setIsError] = useState('');
    const {cid}=useParams();
    var ciid = 0;
    var isadmin = 0;
    //var reFresh = true;
    const getGroup = () => {
        setLoading(true);
        setIsError(false);
        
        console.log("CID="+ciid);
        axios.get(apiURL + '/Group/contact/'+ciid,{})  //Group/contact/1
            .then(res => {
                console.log(res.data);
                setData(res.data);
                
                //console.log(data);
                setLoading(false);
            }).catch(err => {
                setLoading(false);
                setIsError(true);
            });
    }

    useEffect(() => {
        ciid = localStorage.getItem('cid');
        isadmin = localStorage.getItem('appadmin')
        console.log("isappadmin="+isadmin);
        setAdmin(localStorage.getItem("appadmin"))
     /*   if (reFresh == true){
            setTimeout("location.reload(true);",200);
            reFresh = false;
        }*/

        //window.location.reload();
        getGroup();
    }, []);



    return (
        <div className="container">
            {/*<p>Debug iis admin={iisadmin} Debug is admin={isadmin}</p>*/}
            <Link to='/addgroup'><button className='btn btn-primary'>Add Group</button></Link>
            <br/> <br/>
            <table className='table table-bordered table-hover'>
                <thead>
                    <tr className='table-info'>
                        <th>idgroups</th><th>groupname</th><th>description</th><th>join/leave</th><th>Show members</th>{iisadmin==1?<th>admin</th>:null}
                    </tr>
                </thead>
                <tbody>
                    {data.map(group => (
                        <tr key={group.idgroups}>
                            <td>{group.idgroups}</td>
                            <td>{group.groupname}</td>
                            <td>{group.description ? group.description : null}</td>
                            {group.ismember===1 ?<td> <NavLink to={`leavegroup/${group.idgroups}`}><button className="btn btn-primary">Leave({group.idgroups})</button></NavLink></td> 
                                :<td> <NavLink to={`joingroup/${group.idgroups}`}><button className="btn btn-primary">Join({group.idgroups})</button></NavLink></td>}
                            <td><NavLink to={`showmembersgroup/${group.idgroups}`}><button className="btn btn-primary">Show Members({group.idgroups})</button></NavLink></td>
                            {group.isadmin===1 ?<td><NavLink to={`selectedgroup/${group.idgroups}`}><button className="btn btn-primary">Update({group.idgroups})</button></NavLink></td>:null}
                            {group.isadmin===1 ?<td><NavLink to={`deletegroup/${group.idgroups}`}><button className="btn btn-danger">Delete({group.idgroups})</button></NavLink></td>:null}
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>{iserror}</p>
        </div>
    )
}
/*
    "idgroups": 1,
    "groupname": "BootCamp2022",
    "description": "Autumn 2022 Study Group on development of BackEnd and FrontEnd using DB"
  */

            /*
        if (window.localStorage) {
  
            // If there is no item as 'reload'
            // in localstorage then create one &
            // reload the page
            if (!localStorage.getItem('reload')) {
                localStorage['reload'] = true;
                window.location.reload();
            } else {

                // If there exists a 'reload' item
                // then clear the 'reload' item in
                // local storage
                localStorage.removeItem('reload');
            }
        }*/

export default GroupList;