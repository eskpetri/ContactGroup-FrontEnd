import React, { useState } from 'react';

function MyHook(props) {
  const [fname, setFname] = useState(props.etunimi);
  const [lname, setLname] = useState("Virta");

    return (
        <div>
            <h2>myhook</h2>
            <input  onChange={e=>setFname(e.target.value)}/>
            <input onChange={e=>setLname(e.target.value)}/>
            <p>Hello {fname} {lname}</p>
            <button onClick={()=>setFname("No name")}>Set to NoName</button>
        </div>
    );
}

export default MyHook;