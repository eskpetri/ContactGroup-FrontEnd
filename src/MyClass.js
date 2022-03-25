import React, { Component } from 'react';

class MyClass extends Component {
    constructor(props){
        super(props);
        this.state={
            name:props.fname,
            address:"Kotikatu"
        };
        this.setName=this.setName.bind(this);
        this.updateName=this.updateName.bind(this);
        this.updateAddress=this.updateAddress.bind(this);
    }
    setName() {
        this.setState({name:"No name"});    
    }
    updateName = (event)=>{
        const userValue = event.target.value;
        this.setState({name:userValue}); 
        console.log(userValue);
    };
    updateAddress = (event)=>{
        const userAddress=event.target.value;
        this.setState({address:userAddress});
    };

    render() {
        return (
            <div>
                <h2>MyClass</h2>
                <input  onChange={this.updateName}/>
                <input onChange={this.updateAddress} />
                <p>Hello {this.state.name} from {this.state.address}</p>
                <button onClick={this.setName}>Set to NoName</button>
            </div>
        );
    }
}

export default MyClass;