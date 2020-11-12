import React, { useEffect, useState } from "react";
import './App.css';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import MultiSelect from "react-multi-select-component";

const App = () => {

  // Create News Variables
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [priority, setPriority] = useState("2");
  const [publication_date_from, setPublication_date_from] = useState("");
  const [publication_date_to, setPublication_date_to] = useState("");
  const [headline, setHeadline] = useState("Headline");
  const [images, setImages] = useState("img1");
  const [attachment, setAttachment] = useState("Attachment");
  const [category, setCategory] = useState([]);
  const [ableCategory, setAbleCategory] = useState([]);
  const [tags, setTags] = useState("522");
  const [audience, setAudience] = useState("");
  const [ableAudience, setAbleAudience] = useState([]);
  const [selectedAudience, setSelectedAudience] = useState([]);
  const [showAudienceDropdown, setShowAudienceDropdown] = useState(false);
  const [team_id, setTeam_id] = useState(1);
  const [user_id, setUser_id] = useState(8);
  const [users, setUsers] = useState([]);
  const [ableUsers, setAbleUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [ableGroups, setAbleGroups] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [newsText, setNewsText] = useState("");

  // Create Event Variables
  const [role, setRole] = useState("");
  const [schedule, setSchedule] = useState("");
  const [official_club_date, setOfficial_club_date] = useState("");
  const [ableEventTypes, setAbleEventTypes] = useState([]);
  const [eventType, setEventType] = useState("");
  const [name, setName] = useState("");
  const [picture_video, setPicture_video] = useState("");
  const [date_from, setDate_from] = useState("");
  const [date_to, setDate_to] = useState("");
  const [time_from, setTime_from] = useState("");
  const [time_until, setTime_until] = useState("");
  const [place, setPlace] = useState("");
  const [room, setRoom] = useState("");
  const [visibility, setVisibility] = useState("");
  const [limitation_of_participants, setLimitation_of_participants] = useState("");
  const [participants, setParticipants] = useState("");
  const [waiting_list, setWaiting_list] = useState("");
  const [max_on_waiting_list, setMax_on_waiting_list] = useState(0);
  const [showmaxpart, setShowmaxpart] = useState(false);
  const [acceptances_cancellations, setAcceptances_cancellations] = useState("");
  const [attachments, setAttachments] = useState("Attachments");
  const [link_to_ticket_store, setLink_to_ticket_store] = useState("");
  const [eventtags, setEventTags] = useState("");
  const [eventauthor, setEventAuthor] = useState(8);
  const [eventusers, setEventUsers] = useState([]);
  const [eventableUsers, setEventAbleUsers] = useState([]);
  const [eventgroups, setEventGroups] = useState([]);
  const [eventableGroups, setEventAbleGroups] = useState([]);
  const [eventaudience, setEventAudience] = useState("");
  const [eventableAudience, setEventAbleAudience] = useState([]);
  const [eventselectedAudience, setEventSelectedAudience] = useState([]);
  const [eventshowAudienceDropdown, setEventShowAudienceDropdown] = useState(false);
  const [eventsclicked, setEventsClicked] = useState(false);
  const [eventsText, setEventsText] = useState("");

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

  // Create News Functions

  const getAudience = (v) => {
    if(v === "0"){
      setUsers(ableUsers);
      setGroups([]);
      setShowAudienceDropdown(false);
    }else if(v === "1"){
      if(audience !== "1"){
        setSelectedAudience([]);
      }
      setAbleAudience(ableUsers);
      setShowAudienceDropdown(true);
    }else if(v === "2"){
      if(audience !== "2"){
        setSelectedAudience([]);
      }
      setAbleAudience(ableGroups);
      setShowAudienceDropdown(true);
    }else{
      setUsers([]);
      setGroups([]);
      setShowAudienceDropdown(false);
    }
    setAudience(v);
  }

  const changeSelectedAudience = (v) => {
    setSelectedAudience(v);
    setUsers([]);
    setGroups([]);
    if(audience === "0"){
      setUsers(ableUsers);
      setGroups([]);
    }else if(audience === "1"){
      setUsers(v);
    }else if(audience === "2"){
      setGroups(v);
    }
  }

  const merrImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      var image = e.target.files[0];
      setImages(image);
    }    
  }

  const submit = async() => {
    var finalgroups = [];
    for(let i=0; i < groups.length; i++){
      finalgroups.push(groups[i].value);
    }
    var finalcategory = [];
    for(let i=0; i < category.length; i++){
      finalcategory.push(category[i].value);
    }
    var finalusers = [];
    for(let i=0; i < users.length; i++){
      finalusers.push(users[i].value);
    }
    console.log("users: " + finalusers);
    console.log("groups: " + finalgroups);
    console.log("category: " + finalcategory);
    console.log(images);
    let apicall = await fetch("http://localhost:5000/api/createNews",{
      method: "post",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "title": title,
        "text": text,
        "author": author,
        "priority": priority,
        "publication_date_from": publication_date_from,
        "publication_date_to": publication_date_to,
        "headline": headline,
        "imageUrls": images,
        "attachment": attachment,
        "category": finalcategory,
        "tags": tags,
        "audience": audience,
        "team_id": team_id,
        "user_id": user_id,
        "groups": finalgroups,
        "users": finalusers
      })
    })
    let response = await apicall.json();
    if(response.isError === false){
      setNewsText("News Created Successfully.");
      setClicked(true);
    }
    if(response.isError === true){
      console.log("Something went wrong. News creation failed.");
    }
  }

  // Create Event Functions

  const setWaitingListFunc = (v) => {
    setWaiting_list(v);
    if(v === "Yes"){
      setShowmaxpart(true);
    }
    if(v === "No"){
      setMax_on_waiting_list(0);
      setShowmaxpart(false);
    }
  }

  const getEventAudience = (v) => {
    if(v === "0"){
      setEventUsers(eventableUsers);
      setEventGroups([]);
      setEventShowAudienceDropdown(false);
    }else if(v === "1"){
      if(eventaudience !== "1"){
        setEventSelectedAudience([]);
      }
      setEventAbleAudience(eventableUsers);
      setEventShowAudienceDropdown(true);
    }else if(v === "2"){
      if(eventaudience !== "2"){
        setEventSelectedAudience([]);
      }
      setEventAbleAudience(eventableGroups);
      setEventShowAudienceDropdown(true);
    }else{
      setEventUsers([]);
      setEventGroups([]);
      setEventShowAudienceDropdown(false);
    }
    setEventAudience(v);
  }

  const eventchangeSelectedAudience = (v) => {
    setEventSelectedAudience(v);
    setEventUsers([]);
    setEventGroups([]);
    if(eventaudience === "0"){
      setEventUsers(eventableUsers);
      setEventGroups([]);
    }else if(eventaudience === "1"){
      setEventUsers(v);
    }else if(eventaudience === "2"){
      setEventGroups(v);
    }
  }

  const setRoleFunc = (v) => {
    setRole(v);
    if(v === "secretaries" || v === "functionaries" || v === "editor"){
      setAbleEventTypes(["Club events", "Group events", "Functionary events", "Courses/Classes", "Seminars", "Work assignments"]);
    }else if(v === "admin"){
      setAbleEventTypes(["Group events", "Courses/Classes"]);
    }else{
      setAbleEventTypes([]);
    }
  }

  const eventsubmit = async() => {
    var finalgroups = [];
    for(let i=0; i < eventgroups.length; i++){
      finalgroups.push(eventgroups[i].value);
    }
    var finalusers = [];
    for(let i=0; i < eventusers.length; i++){
      finalusers.push(eventusers[i].value);
    }
    var datefrom = date_from + "T" + time_from;
    var dateto = date_to + "T" + time_until;
    console.log("datefrom: " + datefrom);
    console.log("dateto: " + dateto);
    console.log("eventusers: " + finalusers);
    console.log("eventgroups: " + finalgroups);
    console.log("official_club_date: " + official_club_date);
    let apicall = await fetch("http://localhost:5000/api/createEvent",{
      method: "post",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "schedule": schedule,
        "official_club_date": official_club_date,
        "type": eventType,
        "name": name,
        "picture_video": picture_video,
        "date_from": datefrom,
        "date_to": dateto,
        "place": place,
        "room": room,
        "visibility": visibility,
        "limitation_of_participants": limitation_of_participants,
        "participants": participants,
        "waiting_list": waiting_list,
        "max_on_waiting_list": max_on_waiting_list,
        "acceptances_cancellations": acceptances_cancellations,
        "attachments": attachments,
        "link_to_ticket_store": link_to_ticket_store,
        "tags": eventtags,
        "author": eventauthor,
        "audience": eventaudience,
        "groups": finalgroups,
        "users": finalusers
      })
    })
    let response = await apicall.json();
    console.log(response);
    if(response.isError === false){
      setEventsText("Event Created Successfully.");
      setEventsClicked(true);
    }
    if(response.isError === true){
      console.log("Something went wrong. Event creation failed.");
    }
  }

  return (
    <div className="App">
      <div className="InputBox">
        <h4 className="CreateNews">Create News</h4>
        <h5>Title</h5>
        <input className="Inputi" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title"/>
        <h5>Text</h5>
        <input className="Inputi" type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Text"/>
        <h5>Author</h5>
        <input className="Inputi" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author"/>
        <h5>Audience</h5>
        <input className="Inputi" type="text" value={audience} onChange={(e) => getAudience(e.target.value)} placeholder="Audience"/>
        {
          showAudienceDropdown ?
          <div>
            <MultiSelect
          options={ableAudience}
          value={selectedAudience}
          onChange={changeSelectedAudience}
          labelledBy={"Select Audience"}
          />
          <div className="Space"></div>
          </div>
          : null
        }
        <h5>Priority</h5>
        <input className="Inputi" type="text" value={priority} onChange={(e) => setPriority(e.target.value)} placeholder="Priority"/>
        <h5>Publication Date From</h5>
        <input className="Inputi" type="date" value={publication_date_from} onChange={(e) => setPublication_date_from(e.target.value)} placeholder="Publication_date_from"/>
        <h5>Publication Date To</h5>
        <input className="Inputi" type="date" value={publication_date_to} onChange={(e) => setPublication_date_to(e.target.value)} placeholder="Publication_date_to"/>
        <h5>Headline</h5>
        <input className="Inputi" type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Headline"/>
        <h5>Images</h5>
        <input className="Inputi" type="file" accept="image/*" onChange={(e) => merrImage(e)} placeholder="Images"/>
        <h5>Attachment</h5>
        <input className="Inputi" type="text" value={attachment} onChange={(e) => setAttachment(e.target.value)} placeholder="Attachment"/>
        <h5>Category</h5>
        <MultiSelect
        options={ableCategory}
        value={category}
        onChange={setCategory}
        labelledBy={"Select Category"}
        />
        <div className="Space"></div>
        <h5>Tags</h5>
        <input className="Inputi" type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags"/>
        <h5>User id</h5>
        <input className="Inputi" type="text" value={user_id} onChange={(e) => setUser_id(e.target.value)} placeholder="User_id"/>
        <button className="Buttoni" onClick={() => submit()}>Submit</button>
        {
        clicked ?
        <div>
          <h6>News Backend Response</h6>
          <h4>{newsText}</h4>
        </div>
        : null
        }
      </div>
      
      <div className="InputBox">
        <h4 className="CreateNews">Create Events</h4>
        <h5>Role</h5>
        <input className="Inputi" type="text" value={role} onChange={(e) => setRoleFunc(e.target.value)} placeholder="Role"/>
        <h5>Schedule</h5>
        <input className="Inputi" type="text" value={schedule} onChange={(e) => setSchedule(e.target.value)} placeholder="Schedule"/>
        <h5>Official Club Date</h5>
        <Dropdown options={["Yes", "No"]} onChange={v => setOfficial_club_date(v.value)} value={official_club_date} placeholder="Is this official club date ?" />
        <div className="Space"></div>
        <h5>Type of Event</h5>
        <Dropdown options={ableEventTypes} onChange={v => setEventType(v.value)} value={eventType} placeholder="Select an event type" />
        <div className="Space"></div>
        <h5>Name of Event</h5>
        <input className="Inputi" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name of Event"/>
        <h5>Picture Video</h5>
        <input className="Inputi" type="text" value={picture_video} onChange={(e) => setPicture_video(e.target.value)} placeholder="Picture Video"/>
        <h5>Audience</h5>
        <input className="Inputi" type="text" value={eventaudience} onChange={(e) => getEventAudience(e.target.value)} placeholder="Audience"/>
        {
          eventshowAudienceDropdown ?
          <div>
            <MultiSelect
          options={eventableAudience}
          value={eventselectedAudience}
          onChange={eventchangeSelectedAudience}
          labelledBy={"Select Audience"}
          />
          <div className="Space"></div>
          </div>
          : null
        }
        <h5>Date From</h5>
        <input className="Inputi" type="date" value={date_from} onChange={(e) => setDate_from(e.target.value)} placeholder="Date From"/>
        <h5>Date To</h5>
        <input className="Inputi" type="date" value={date_to} onChange={(e) => setDate_to(e.target.value)} placeholder="Date To"/>
        <h5>Time From</h5>
        <input className="Inputi" type="time" value={time_from} onChange={(e) => setTime_from(e.target.value)} placeholder="Time From"/>
        <h5>Time Until</h5>
        <input className="Inputi" type="time" value={time_until} onChange={(e) => setTime_until(e.target.value)} placeholder="Time Until"/>
        <h5>Place</h5>
        <input className="Inputi" type="text" value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Place"/>
        <h5>Room</h5>
        <input className="Inputi" type="number" value={room} onChange={(e) => setRoom(e.target.value)} placeholder="Room"/>
        <h5>Visibility</h5>
        <Dropdown options={["Public", "Private"]} onChange={v => setVisibility(v.value)} value={visibility} placeholder="Select Visibility" />
        <div className="Space"></div>
        <h5>Limitation of Participants</h5>
        <Dropdown options={["Yes", "No"]} onChange={v => setLimitation_of_participants(v.value)} value={limitation_of_participants} placeholder="Select Limitation of Participants" />
        <div className="Space"></div>
        <h5>Participants</h5>
        <Dropdown options={["Public", "Private"]} onChange={v => setParticipants(v.value)} value={participants} placeholder="Select Type of Participants" />
        <div className="Space"></div>
        <h5>Waiting List</h5>
        <Dropdown options={["Yes", "No"]} onChange={v => setWaitingListFunc(v.value)} value={waiting_list} placeholder="Does Event have Waiting List" />
        <div className="Space"></div>
        {
          showmaxpart ?
          <div>
            <h5>Max on Waiting List</h5>
            <input className="Inputi" type="number" value={max_on_waiting_list} onChange={(e) => setMax_on_waiting_list(e.target.value)} placeholder="Max on Waiting List"/>
          </div>
          : null
        }
        <h5>Acceptances Cancellations</h5>
        <Dropdown options={["Yes", "No"]} onChange={v => setAcceptances_cancellations(v.value)} value={acceptances_cancellations} placeholder="Allow Acceptances/Cancellations" />
        <div className="Space"></div>
        <h5>Attachments</h5>
        <input className="Inputi" type="text" value={attachments} onChange={(e) => setAttachments(e.target.value)} placeholder="Attachments"/>
        <h5>Link to Ticket Store</h5>
        <input className="Inputi" type="text" value={link_to_ticket_store} onChange={(e) => setLink_to_ticket_store(e.target.value)} placeholder="Link to Ticket Store"/>
        <h5>Tags</h5>
        <input className="Inputi" type="text" value={eventtags} onChange={(e) => setEventTags(e.target.value)} placeholder="Tags"/>
        <h5>Author</h5>
        <input className="Inputi" type="text" value={eventauthor} onChange={(e) => setEventAuthor(e.target.value)} placeholder="Author"/>
        <button className="Buttoni" onClick={() => eventsubmit()}>Submit</button>
        {
        eventsclicked ?
        <div>
          <h6>Event Backend Response</h6>
          <h4>{eventsText}</h4>
        </div>
        : null
        }
        <div className="Space"></div>
        <div className="Space"></div>
      </div>
    </div>
  );
}

export default App;
