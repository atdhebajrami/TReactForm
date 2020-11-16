import React, { useState } from "react";
import './App.css';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import MultiSelect from "react-multi-select-component";

const CreateEvents = ({ team_id, /*eventableUsers,*/ eventableGroups }) => {

  const [eventableUsers, setEventAbleUsers] = useState([]);

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
  const [eventgroups, setEventGroups] = useState([]);
  const [eventaudience, setEventAudience] = useState("");
  const [eventableAudience, setEventAbleAudience] = useState([]);
  const [eventselectedAudience, setEventSelectedAudience] = useState([]);
  const [eventshowAudienceDropdown, setEventShowAudienceDropdown] = useState(false);
  const [showEventTypeDropdown, setShowEventTypeDropdown] = useState(false);
  const [eventshowAudienceBox, setEventShowAudienceBox] = useState(false);
  const [eventsclicked, setEventsClicked] = useState(false);
  const [eventsText, setEventsText] = useState("");

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
      setAbleEventTypes([{label:"Club events", value:"club-event"},
                         {label:"Group events", value:"group-events"},
                         {label:"Functionary events",value:"functionary-events"},
                         {label:"Courses/Classes",value:"Courses/Classes"},
                         {label:"Seminars",value:"seminars"},
                         {label:"Work assignments",value:"work-assignments"}]);
    }else if(v === "admin"){
      setAbleEventTypes([{label:"Group events", value:"group-events"},{label:"Courses/Classes",value:"Courses/Classes"}]);
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

  const setEventTypeFunc = async (v) => {
    setEventType(v);
    var eventtype = null;
    if(visibility === "Public" && v === "Courses/Classes"){
      eventtype = "courses";
    }else if(visibility === "Private" && v === "Courses/Classes"){
      eventtype = "courses-non-public";
    }else{
      eventtype = v;
    }
    console.log("event type: " + eventtype);
    let apicall = await fetch(`http://localhost:5000/api/eventusers/team/${team_id}/event/${eventtype}`,{
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
      setEventAbleUsers(lista);
      setEventAbleAudience(lista);
      setEventShowAudienceBox(true);
    }
  }

  const setVisibilityFunc = (v) => {
    setVisibility(v);
    setEventType("");
    setEventShowAudienceBox(false);
    setShowEventTypeDropdown(true);
  }

  return (
      <div className="InputBox">
        <h4 className="CreateNews">Create Events</h4>
        <h5>Role</h5>
        <input className="Inputi" type="text" value={role} onChange={(e) => setRoleFunc(e.target.value)} placeholder="Role"/>
        <h5>Schedule</h5>
        <input className="Inputi" type="text" value={schedule} onChange={(e) => setSchedule(e.target.value)} placeholder="Schedule"/>
        <h5>Official Club Date</h5>
        <Dropdown options={["Yes", "No"]} onChange={v => setOfficial_club_date(v.value)} value={official_club_date} placeholder="Is this official club date ?" />
        <div className="Space"></div>
        <h5>Visibility</h5>
        <Dropdown options={["Public", "Private"]} onChange={v => setVisibilityFunc(v.value)} value={visibility} placeholder="Select Visibility" />
        <div className="Space"></div>
        {
          showEventTypeDropdown ?
          <div>
            <h5>Type of Event</h5>
            <Dropdown options={ableEventTypes} onChange={v => setEventTypeFunc(v.value)} value={eventType} placeholder="Select an event type" />
            <div className="Space"></div>
          </div>
          : null
        }
        <h5>Name of Event</h5>
        <input className="Inputi" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name of Event"/>
        <h5>Picture Video</h5>
        <input className="Inputi" type="text" value={picture_video} onChange={(e) => setPicture_video(e.target.value)} placeholder="Picture Video"/>
        {
          eventshowAudienceBox ?
          <div>
            <h5>Audience</h5>
            <input className="Inputi" type="text" value={eventaudience} onChange={(e) => getEventAudience(e.target.value)} placeholder="Audience"/>
          </div>
          : null
        }
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
  );
}

export default CreateEvents;
