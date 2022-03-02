import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";

function SoloUserDetails(props) {
  let id = props.location.state;
  const [person, setPerson] = useState([]);

  const getdata = () =>{
    axios
    .get("https://6139330a1fcce10017e78a63.mockapi.io/users/" + id)
    .then((response) => {
      console.log(response.data);
      setPerson(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
  }
  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      Click to go home
      <Link to="/">
        <HomeIcon />
      </Link>
      
      <h2>User Name : {person.name}</h2>
      <h3>User Email : {person.email}</h3>
      <h4>User Phone : {person.phone}</h4>
      <p>User Address : {person.address}</p>
    </>
  );
}

export default SoloUserDetails;
