import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class CreateTask extends Component{
    constructor(props){
        super(props)
        this.state={
            titleInput: "",
            descriptionInput: "",
        }
    }

    updateInput = (theEvent) => {
        // const {name, value} = event.target;
        const name = theEvent.target.name
        const value = theEvent.target.value
        this.setState({[name]: value}  );
      }


      submitForm = (theEvent) => {
          theEvent.preventDefault();

        axios.post('http://localhost:5000/api/tasks/create',
         {title: this.state.titleInput, description: this.state.descriptionInput},
         {withCredentials: true})
         .then((response)=>{
             console.log(response);

             this.props.fetchTasks();
             this.setState({titleInput:"", descriptionInput: ""})

         })
         .catch((err)=>{
             console.log(err);
         })

      }



    render(){
        return(
            <div>
            <form onSubmit={e => this.submitForm(e)}>
                <h3> Add a New Task To The List</h3>

                <label>Title</label>
                <input name="titleInput"
                 value={this.state.titleInput}
                  onChange={e => this.updateInput(e)} />

                <label>Description</label>
                <textarea name="descriptionInput"
                 value={this.state.descriptionInput}
                  onChange={e => this.updateInput(e)} /> 

                <button>Create</button>
            </form>



            </div>
        )
    }




}

export default CreateTask;