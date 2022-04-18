import React, { useState } from 'react';

function MyHook(props) {
  const [fname, setFname] = useState(props.etunimi);
  const [lname, setLname] = useState("Virta");
  const [vuosi, setVuosi] =useState(2012);
  const [year, setYear] =useState(2012);

  const doChange =(e)=>{
      console.log(e.target)
      setYear(e.target.value);
  }

    return (
        <div>
            <h2>myhook</h2>
            <input  onChange={e=>setFname(e.target.value)}/>
            <input onChange={e=>setLname(e.target.value)}/>
            <p>Hello {fname} {lname}</p>
            <button onClick={()=>setFname("No name")}>Set to NoName</button>
            <select value={vuosi} onChange={e=>setVuosi(e.target.value)} >
                <option value="2021">2021</option>
                <option value="2022">2022</option>
            </select>
            {vuosi}

        </div>
    );
}

export default MyHook;