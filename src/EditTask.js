import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class EditTask extends Component{
    constructor(props){
        super(props)
        this.state={
            title: "", 
            description: "",
        }
    }


    componentDidMount(){
        this.setState(this.props.theTask)
    }


    updateInput = (theEvent) => {
        // const {name, value} = event.target;
        const name = theEvent.target.name
        const value = theEvent.target.value
        this.setState({[name]: value}  );
      }

      submitForm = (theEvent) => {
        theEvent.preventDefault();

      axios.post('http://localhost:5000/api/tasks/edit/'+this.state._id,
       {title: this.state.title, description: this.state.description},
       {withCredentials: true})
       .then((response)=>{
           console.log(response);

           this.props.fetchTasks();
           this.props.hideForm(this.state._id);

       })
       .catch((err)=>{
           console.log(err);
       })

    }





    render(){
        return (
            <div>

            <form onSubmit = {e=> this.submitForm(e)}>
                <h4>Edit This Task</h4>

                <label>Title</label>
                <input value={this.state.title}
                name="title"
                onChange = {e=> this.updateInput(e) } />

                <label>Description</label>
                <input value={this.state.description}
                name="description"
                onChange = {e=> this.updateInput(e) } />

                <button className="hello">Submit Changes</button>


        
                
            </form>

            </div>
        )
    }
}


export default EditTask;