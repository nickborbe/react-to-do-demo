import React, { Component } from 'react';

import './App.css';
import axios from 'axios';

class Auth extends Component{
    constructor(props){
        super(props)
        this.state = {
            usernameInput: "",
            passwordInput: "",
            loginUser: "",
            loginPassword: "",
        }
    }


    updateInput = (theEvent) => {
        // const {name, value} = event.target;
        const name = theEvent.target.name
        const value = theEvent.target.value
        this.setState({[name]: value}  );
      }


      submitForm = (event, theUri) => {
        event.preventDefault();
    
        let reqBody;
        if(theUri === "signup"){
          reqBody = {username: this.state.usernameInput, password: this.state.passwordInput}
        } else if(theUri === "login"){
          reqBody = {username: this.state.loginUser, password: this.state.loginPassword}
        }
    
        // axios.post(url, thereqbody, header)
        axios.post( 'http://localhost:5000/api/'+theUri, reqBody, {withCredentials: true} )
           .then((response)=>{
    
             console.log(response)
    
             this.setState({
               usernameInput: "",
                passwordInput: "",
                loginUser: "",
                loginPassword: "",
                })
                // send the response back to App.js
                this.props.passTheUserToApp(response.data);

                this.props.history.push('/')
           })
           .catch((error)=>{
            console.log(error)
           })
      }



    render(){
        console.log(this.props)
        return (
            <div> 


    <form onSubmit={e => this.submitForm(e, 'signup')}>
        <h2>Sign Up</h2>


     <label>Username</label>
      <input type="text" name="usernameInput" value={this.state.usernameInput} onChange={e => this.updateInput(e)}/>

      <label>Password</label>
      <input type="passsword" name="passwordInput" value={this.state.passwordInput} onChange={e => this.updateInput(e)}/>


      <button>Create Coolboy</button>
      </form>



      <form onSubmit={e => this.submitForm(e, 'login')}>
        <h2>Login</h2>


     <label>Username</label>
      <input type="text" name="loginUser" value={this.state.loginUser} onChange={e => this.updateInput(e)}/>

      <label>Password</label>
      <input type="passsword" name="loginPassword" value={this.state.loginPassword} onChange={e => this.updateInput(e)}/>


      <button>Login Coolboy</button>
      </form>









            </div>
        )
    }







}



export default Auth;