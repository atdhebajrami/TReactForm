import React, { useState } from "react";
import './App.css';

import MultiSelect from "react-multi-select-component";

const CreateNews = ({ team_id, ableUsers, ableGroups, ableCategory }) => {

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
  const [tags, setTags] = useState("522");
  const [audience, setAudience] = useState("");
  const [ableAudience, setAbleAudience] = useState([]);
  const [selectedAudience, setSelectedAudience] = useState([]);
  const [showAudienceDropdown, setShowAudienceDropdown] = useState(false);
  const [user_id, setUser_id] = useState(8);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [newsText, setNewsText] = useState("");

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

  return (
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
  );
}

export default CreateNews;
