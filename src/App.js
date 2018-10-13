import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import './App.css';
import axios from 'axios';
import Auth from './Auth';
import TaskList from './TaskList'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      loggedInUser: null,
    }
  }


  setUserInState = (userObject) =>{
      console.log('=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=', userObject)
    this.setState({loggedInUser: userObject})
  }


    componentDidMount(){
      this.fetchUser();
    }



      fetchUser = () =>{
        axios.get('http://localhost:5000/api/loggedin', {withCredentials: true})
        .then((theResponse)=>{
          this.setState({loggedInUser: theResponse.data})
        })
        .catch((err)=>{
          console.log(err)
        })
      }



    logout = () => {
      axios.post('http://localhost:5000/api/logout',{}, {withCredentials: true})
      .then((x)=>{
        this.setState({loggedInUser: null})
      })
    }


  render() {
    


    return (
      <div className="App">
      {this.state.loggedInUser && <button onClick={this.logout}> Logout</button>}
      <Link to={"/auth"}> Login/Signup </Link>
      <Link to={"/tasks"}> List Of Tasks </Link>
      <h3>
         {this.state.loggedInUser && 'Welcome, ' + this.state.loggedInUser.username}
      </h3>

      <Switch>
        <Route path="/auth" render = {props => <Auth {...props}  passTheUserToApp = {this.setUserInState}/>}/>
        <Route path="/tasks" component = {TaskList} />
      </Switch>


  



      




      

   

      </div>



    );
  }

}

export default App;
