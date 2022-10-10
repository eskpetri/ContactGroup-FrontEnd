import './App.css';
import React, {useEffect, useState } from 'react';
import axios from "axios";
import apiURL from './myURL';
import { useNavigate } from "react-router-dom";

//useEffect(() => {}, []);

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
    //const idcontacts=0;

    const handleSubmit = () => {
        setLoading(true);
        setIsError(false);
        const data = {
            username: usernamelogin,
            password: passwordlogin
        }
        window.localStorage.clear();   //Ehkä

        axios.post(apiURL + '/login', data, {})
            .then(res => {
                setUsernamelogin('');
                setPasswordlogin('');
                setLoading(false);
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
                }
            }).catch(err => {
                setLoading(false);
                setIsError(true);
            });

            //GetCid(data.username);
/*
            console.log("username="+usernamelogin);
            setLoading(true);
            setIsError(false);
            axios.get(apiURL + '/Contacts/username/'+usernamelogin, {})
                   .then(resp => {
                        console.log(resp.data);
                        console.log("idaxios="+resp.data.idcontacts);
                        localStorage.setItem('cid',resp.data.idcontacts);
                        //idcontacts=rest.data.idcontacts;
                        setLoading(false);
                    }).catch(err => {
                        setLoading(false);
                        setIsError(true);
                    });*/

            //console.log("before navigate idcdata="+rest.data.idcontacts);
            console.log("username before async send="+usernamelogin);
            sendGetRequest(usernamelogin);
            console.log("before navigate idc="+idcontacts);
            //return navigate("/grouplist/"+idcontacts);
            return navigate("/grouplist/");
    }
  //  useEffect(() => {
    const sendGetRequest = async (username) => {
        setUsernamelogin('');
        setPasswordlogin('');
        setIdcontacts('');
        setIsadmin('');
        try {
            const resp = await axios.get(apiURL + '/Contacts/username/'+username, {});
            console.log(resp.data);
            console.log("idaxiosasync="+resp.data.idcontacts);
            localStorage.setItem('cid',resp.data.idcontacts);
            localStorage.setItem('username',usernamelogin);
            localStorage.setItem('appadmin',resp.data.isadmin);
            idcontacts=resp.idcontacts;
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
//    }, []);
    function GetCid(username) {
        setLoading(true);
        setIsError(false);
        axios.get(apiURL + '/Contacts/username/' + username, {})
            .then(res => {
                console.log(res.data);
                localStorage.setItem('cid', res.data.idcontacts);
                setLoading(false);
            }).catch(err => {
                setLoading(false);
                setIsError(true);
            });
    }

    const handleSubmitRegister = () => {
        setLoading(true);
        setIsError(false);
        const data = {
            username: username,
            password: password,
            nickname: nickname ? nickname : null,
            email: email ? email : null,
            phone: phone ? phone :null
        }
        axios.post(apiURL + '/login/register', data, {})
            .then(res => {
                setUsername('');
                setPassword('');
                setNickname('');
                setEmail('');
                setPhone('');
                setLoading(false);
                /////////////GetCid(data.username);
                localStorage.setItem('username',username);
                return navigate("/grouplist");
            }).catch(err => {
                setLoading(false);
                setIsError(true);
            });
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
                        onClick={handleSubmit}
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
            <button className='btn btn-primary' type="submit" onClick={handleSubmitRegister} >Register</button>

                {isError && <small>Something went wrong. Please try again later.</small>}
                <br/>
                {databaseError}
            </div>
        </div>
    );
}
/*
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("username="+username);
                const { data: response } = await axios.get(apiURL + '/Contacts/username/'+username, {})
                console.log("resid="+response.idcontacts);
                setIdcontacts(response.idcontacts);
                //idcontacts=response.idcontacts;
                console.log("idcont="+idcontacts)
                console.log(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();*/
export default Login;