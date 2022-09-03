import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import React, { useState } from 'react';
import AddTaskForm from './components/AddTaskForm'
import UpdateForm from './components/UpdateForm'
import ToDo from './components/ToDo'


function App() {
  //tasks state 
  const [toDo,setToDo] = useState([ ]);
    
  //temp state 
  const [newTask , setNewTask] = useState('');
  const [updateData , setupdateData] = useState('');

  //Add Task
  const addTask =()=>{
    if(newTask) {
      let num = toDo.length + 1;
      let newEntry = {id:num , title:newTask , status : false}
      setToDo([...toDo , newEntry])
      setNewTask('')
    }
  } 

  //Delete Task
  const deleteTask =(id)=>{
    let newTasks = toDo.filter(task=>task.id !== id)
    setToDo(newTasks)
  } 

  //mark Task as completed
  const markTask =(id)=>{
    let newTask = toDo.map(task =>{
      if(task.id === id) {
        return ({...task , status: !task.status})
      }
      return task
    })
    setToDo(newTask)
  }

  //cancel update
  const cancelUpdate =()=>{
    setupdateData('')
  } 

  //change task from update
  const changeTask =(e)=>{
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status : updateData.status ? true : false
    }
    setupdateData(newEntry);
  } 

  //update task 
  const updateTask =()=>{
    let filterRecords = [...toDo].filter(task =>task.id !== updateData.id);
    let updateObject = [...filterRecords,updateData];
    setToDo(updateObject);
    setupdateData('');
  } 

  return (
    <div className="container App">
      <br/><br/>
      <h1>To Do List App (React App)</h1>

      <br/><br/>
      
      {updateData && updateData ? (
        //update task 
        <UpdateForm
          updateData = {updateData}
          changeTask = {changeTask}
          updateTask = {updateTask}
          cancelUpdate = {cancelUpdate}
          
        />
      ) : (
        // add task
        <AddTaskForm
          newTask = {newTask}
          setNewTask = {setNewTask} 
          addTask = {addTask}
        />
      )}
      
      {toDo &&toDo.length ? '' : 'No Tasks...'}
      <ToDo
        toDo = {toDo}  
        markTask = {markTask}
        setupdateData = {setupdateData}  
        deleteTask = {deleteTask}
      />
      
    </div>
  );
}
export default App;
