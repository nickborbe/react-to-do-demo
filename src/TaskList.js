import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import CreateTask from './CreateTask';
import EditTask from './EditTask';


class TaskList extends Component{
    constructor(props){
        super(props)
        this.state={tasks: [],
            formShowing: false,
        }
    }

    componentDidMount(){
        this.getTasks();
    }


    getTasks = () => {
        axios.get('http://localhost:5000/api/tasks')
        .then((response)=>{
            this.setState({tasks: response.data});
        })
        .catch((err)=>{
            console.log(err);
        })

    }

    showForm = (theId) => {
        if(theId === this.state.formShowing){
            this.setState({formShowing: false})
        } else{   
            this.setState({formShowing: theId});
        }
    }

    showTheTasks = () => {

        if(this.state.tasks.length > 0){
                return this.state.tasks.map((eachTask)=>{
                    return (<div key={eachTask._id}>
                    <h3>{eachTask.title}</h3>
                    <p> { eachTask.description }</p>
                    <button onClick = {()=>this.deleteTask(eachTask._id)} >Delete</button>
                    
                    <button onClick={()=> this.showForm(eachTask._id)}> Edit This Task</button>

                        { this.state.formShowing === eachTask._id &&
                          <EditTask  fetchTasks = {this.getTasks}
                           theTask = {eachTask} 
                           hideForm = {this.showForm}
                           />}

                    <hr />
                </div>)
                })
        }
    }

    deleteTask = (theId) => {

        axios.post('http://localhost:5000/api/tasks/delete/'+theId, {})
        .then((response)=>{
            this.getTasks();
        })
        .catch((err)=>{
            console.log(err);
        })
    }



    render(){
        console.log(this.state)
        return(
            <div>

                <CreateTask {...this.props} fetchTasks = {this.getTasks}  />

                {this.showTheTasks()}


            </div>
        )
    }




}




export default TaskList;



