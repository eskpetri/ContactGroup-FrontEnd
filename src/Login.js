import './App.css';
import React, {useEffect, useState } from 'react';
import axios from "axios";
import apiURL from './myURL';
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function Login() {
    const [usernamelogin, setUsernamelogin] = useState('');
    const [passwordlogin, setPasswordlogin] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isadmin, setIsadmin] = useState('');
    const [idcontacts, setIdcontacts] = useState('');   //Pass this to GroupList
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [databaseError, setDatabaseError] = useState(false);
    const navigate = useNavigate();
    var login = false;       //check if logged in or registered
    var cook = null;            //JWT from cookies or login or registration have a bubble gum... Half designed is half work... Jumpet to a moving train....
    var decoded;
//Proper way to do it React Login Authentication with JWT Access, Refresh Tokens, Cookies and Axios https://www.youtube.com/watch?v=nI8PYZNFtac&list=PLVkcJcg8_dUUNeR3A1NfejN00ES9VUsNh&index=7
//Interceptor, Axios instance, Navigate (Access cookie Where did you came while intercepted and where to take you) JWT handling etc
    const sendLoginRequest = async (data) => {
//        setUsernamelogin('');
//        setPasswordlogin('');
//        setIdcontacts('');
//        setIsadmin('');
        console.log("loginuser="+data.username+" "+usernamelogin)
        console.log("loginpassword="+data.password+" "+passwordlogin)
        try {
            const res = await axios.post(apiURL + '/login', data, {})
            console.log(res.data);
            console.log(res.data);
                if(res.data.errno){
                    console.log(res.data.errno);
                    setDatabaseError('Virhe tietokantayhteydessä');
                }
                else if(res.data===false){
                    setDatabaseError('Tunnus ja salasana eivät täsmää');
                }
                else {
                    setDatabaseError('Kirjautuminen onnistui');
                    localStorage.setItem('username',usernamelogin);
                    console.log("usernameLocalStorage="+usernamelogin);
                    login = true;
                    console.log("login is " +login)
                }
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

   useEffect(() => {
        console.log("useEffect ");   //useEffect toimii entry pointtina sivulle eli ladataan alussa
        getCook();
        
    }, []);
    
    async function getCook() {//Cookie and JWT has same time to live
       await getCookieJWT();
       //console.log("ingetCook "+cook)
       //console.log("cook length?"+cook.length)
       if (cook.length > 10) {
            axios.defaults.headers.common['Authorization'] = `Bearer `+cook;
            decoded = jwt_decode(cook);
            console.log(decoded);
            var jwtUser = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
            await sendGetRequest(jwtUser);
            console.log(jwtUser);
            console.log("if "+cook.length);
            navigate("/grouplist/");
        }
        else {
            console.log("else "+cook)
        }
    };

    async function clicklogin() {
        const data = {
            username: usernamelogin,
            password: passwordlogin
        }
        console.log("data is "+data.username);
        await sendLoginRequest(data);
        if (login == true) {
            console.log("username before async send="+usernamelogin);
            await setCookieJWT(data);
            console.log("cook in login="+cook);
            axios.defaults.headers.common['Authorization'] = `Bearer `+cook;
            await sendGetRequest(usernamelogin);
            return navigate("/grouplist/");
        }
    };

    const sendGetRequest = async (username) => {
        setUsernamelogin('');
        setPasswordlogin('');
        setIdcontacts('');
        setIsadmin('');
        try {
            const resp = await axios.get(apiURL + '/Contacts/username/'+username, {});
            console.log(resp.data);
            localStorage.setItem('cid',resp.data.idcontacts);
            localStorage.setItem('username',resp.data.username);
            localStorage.setItem('appadmin',resp.data.isadmin);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

async function clickregister() {
    const data = {
        username: username,
        password: password,
        nickname: nickname ? nickname : null,
        email: email ? email : null,
        phone: phone ? phone :null
    }
    console.log("Register"+data.username)
     await sendRegisterRequest(data);
     console.log("username before async send="+username);

     if (login == true) {
        console.log("username before async send="+usernamelogin);
        //JWT query here
        await setCookieJWT(data);
        console.log("Cook in register"+cook);
        axios.defaults.headers.common['Authorization'] = `Bearer `+cook;
        await sendGetRequest(username);
        return navigate("/grouplist/");
    }
     //sendGetRequest(usernamelogin);
     console.log("before navigate idc="+idcontacts);
     //return navigate("/grouplist/");
 }

    const sendRegisterRequest = async (data) => {
        window.localStorage.clear();   //LocalStorage tyhjäksi
        try {
            const resp = await axios.post(apiURL + '/login/register', data, {});
            console.log(resp.data);
            console.log("resp Register="+resp.data);
            localStorage.setItem('cid',resp.data);
            localStorage.setItem('username',username);
            localStorage.setItem('appadmin',0);
            login = true;
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }

    const getCookieJWT = async () => {          //withCredentials: true or cookie won't be send at all
        try {
            const resp = await axios.get(apiURL + '/Login/get-token-from-cookie', {withCredentials: true});
            //console.log(resp.data);
            //console.log("resp Cookie="+resp.data);
            cook = resp.data;
            //console.log("resp CookieCook="+cook);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }
    const setCookieJWT = async (data) => {          //withCredentials: true or cookie won't be send at all
        try {
            const resp = await axios.post(apiURL + '/Login/jwt', data, {withCredentials: true});
            console.log(resp.data);
            console.log("resp Cookie="+resp.data);
            cook = resp.data;
            console.log("login setCookieCook="+cook);
            axios.defaults.headers.common['Authorization'] = `Bearer `+cook;
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }
    return (
        <div className="container">
            <div >
                <div className='form-group'>
                    <label htmlFor="username">username </label>
                    <input className='form-control'
                        type="text"
                        id="username"
                        value={usernamelogin}
                        onChange={e => setUsernamelogin(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor="password">password </label>
                    <input className='form-control'
                        type="text"
                        id="password"
                        value={passwordlogin}
                        onChange={e => setPasswordlogin(e.target.value)} />
                </div>
                <div className='form-group'>
                    <button className='btn btn-primary form-control'
                        type="submit"
                        onClick={clicklogin}
                        disabled={loading}
                    >Login</button>
                </div>
                {databaseError}
                <br/>
                <h2>OR</h2> 
                <h2>Register as new Contact below</h2>
                <table className='table table-bordered'>
                <thead>
                    <tr className='table-info'>
                    <th>username</th><th>password</th><th>nickname</th><th>email</th><th>phone</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" id="username" required value={username} onChange={e => setUsername(e.target.value)} /></td>
                        <td><input type="text" id="password" required value={password} onChange={e => setPassword(e.target.value)} /></td>
                        <td><input type="text" id="nickname" required value={nickname} onChange={e => setNickname(e.target.value)} /></td>
                        <td><input type="text" id="email" required value={email} onChange={e => setEmail(e.target.value)} /></td>
                        <td><input type="text" id="phone" required value={phone} onChange={e => setPhone(e.target.value)} /></td>
                        
                    </tr>
                </tbody>
            </table>
            <button className='btn btn-primary' type="submit" onClick={clickregister} >Register</button>

                {isError && <small>Something went wrong. Please try again later.</small>}
                <br/>
                {databaseError}
            </div>
        </div>
    );
}
export default Login;