import './App.css';
import React, {useEffect, useState } from 'react';
import axios from "axios";
import apiURL from './myURL';

function Logout() {
    const [databaseError, setDatabaseError] = useState(false);

//JWT from cookies or login or registration have a bubble gum... Half designed is half work... Jumpet to a moving train....

//Proper way to do it React Login Authentication with JWT Access, Refresh Tokens, Cookies and Axios https://www.youtube.com/watch?v=nI8PYZNFtac&list=PLVkcJcg8_dUUNeR3A1NfejN00ES9VUsNh&index=7
//Interceptor, Axios instance, Navigate (Access cookie Where did you came while intercepted and where to take you) JWT handling etc

   useEffect(() => {
        console.log("useEffect ");   //useEffect toimii entry pointtina sivulle eli ladataan alussa
        APIlogout();
        //document.cookie = "name=renewToken; expires=Sat, 20 Jan 1980 12:00:00 UTC";//Huom Cookie on porttiin Localhost:3000 vs localhost:7080
        localStorage.clear();
    }, []);
    
    const APIlogout = async () => {     
        //delete headers.common['Authorization'];
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['Authorization'] = '';
        try {
            const resp = await axios.post(apiURL + '/Login/logout', {withCredentials: true});
            console.log(resp.data);
        } catch (err) {
            // Handle Error Here
            console.error(err);
            setDatabaseError(err);
        }
    }

    return (
        <div className="container">
            <div >
                <h1>Logget out - Move along nothing to see here</h1>
                <br/>
                {databaseError}
            </div>
        </div>
    );
}
export default Logout;