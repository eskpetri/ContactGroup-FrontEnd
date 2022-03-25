import React from "react";
function MyFunction(props){
    return (
    <div>
    <h2>MyFunction</h2>
    <p>Hello {props.fname} {props.lname}</p>
    </div>
    );
}

export default MyFunction;