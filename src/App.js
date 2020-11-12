import React, { useEffect, useState } from "react";
import './App.css';

import CreateNews from "./CreateNews";
import CreateEvents from "./CreateEvents";

const App = () => {

  const [team_id, setTeam_id] = useState(1);

  const [ableUsers, setAbleUsers] = useState([]);
  const [ableGroups, setAbleGroups] = useState([]);
  const [ableCategory, setAbleCategory] = useState([]);

  const [eventableUsers, setEventAbleUsers] = useState([]);
  const [eventableGroups, setEventAbleGroups] = useState([]);

  useEffect(() => {
    getUsers();
    getGroups();
    getCategory();

  }, [])

  const getUsers = async () => {
    let apicall = await fetch(`http://localhost:5000/api/teamusers/${team_id}`,{
      method: "get",
      headers: {'Content-Type':'application/json'}
    })
    let response = await apicall.json();
    var lista = [];
    if(response !== null && response !== undefined){
      for(let i=0; i < response.length; i++){
        let ableuser = {
          value: response[i].id,
          label: response[i].username
        }
        lista.push(ableuser);
      }
      setAbleUsers(lista);
      setEventAbleUsers(lista);
    }
  }

  const getGroups = async () => {
    let apicall = await fetch(`http://localhost:5000/api/teamgroups/${team_id}`,{
      method: "get",
      headers: {'Content-Type':'application/json'}
    })
    let response = await apicall.json();
    var lista = [];
    if(response !== null && response !== undefined){
      for(let i=0; i < response.length; i++){
        let ablegroup = {
          value: response[i].id,
          label: response[i].name
        }
        lista.push(ablegroup);
      }
      setAbleGroups(lista);
      setEventAbleGroups(lista);
    }
  }

  const getCategory = async() => {
    let apicall = await fetch("http://localhost:5000/api/category",{
      method: "get",
      headers: {'Content-Type':'application/json'}
    })
    let response = await apicall.json();
    var lista = [];
    if(response !== null && response !== undefined){
      for(let i=0; i < response.length; i++){
        let ablecategory = {
          value: response[i].id,
          label: response[i].title
        }
        lista.push(ablecategory);
      }
      setAbleCategory(lista);
    }
  }

  return (
    <div className="App">
      <CreateNews team_id={team_id} ableUsers={ableUsers} ableGroups={ableGroups} ableCategory={ableCategory} />

      <CreateEvents eventableUsers={eventableUsers} eventableGroups={eventableGroups} />
    </div>
  );
}

export default App;
