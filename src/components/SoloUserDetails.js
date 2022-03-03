import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";
import "../styling/solo.css";

function SoloUserDetails(props) {
  let id = props.location.state;
  const [person, setPerson] = useState([]);

  const getdata = () => {
    axios
      .get("https://6139330a1fcce10017e78a63.mockapi.io/users/" + id)
      .then((response) => {
        console.log(response.data);
        setPerson(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    getdata();
  },[]);

  return (
    <div className="solopage">
      <div className="insidesolo">
        
        <Link to="/">
          <HomeIcon className="home" style={{width:'2em', height:'2em'}}/>
        </Link>
      </div>

      <h2>User Name : {person.name}</h2>
      <h3>User Email : {person.email}</h3>
      <h4>User Phone : {person.phone}</h4>
      <p>User Address : {person.address}</p>
    </div>
  );
}

export default SoloUserDetails;
