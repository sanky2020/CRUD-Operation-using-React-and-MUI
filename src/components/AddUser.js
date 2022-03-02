import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Typography,
  Box ,
  Modal
} from "@mui/material";
import React, { useState,useEffect } from "react";
import axios from "axios";

const initialValue = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function AddUser(props) {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(initialValue);
  const [singleData, setSingleData] = useState([])
  const { name, email, phone, address } = user;
  const {getuserdata} = props;

  console.log(props)

  //for modal logic
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

useEffect(()=>{
    props.childFunc.current = showUserForm
});

  const showUserForm = (props) => {
      handleOpen();
    if(typeof(props)==="string"){
        axios.get("https://6139330a1fcce10017e78a63.mockapi.io/users/"+props)
        .then(response=>{
            console.log(response.data)
            setSingleData(response.data);
            
        })
        .catch(err=>{
            console.log(err.message)
        })
    }
    setShow(!show);
    
  };



  const onValueChange = (e) => {
    console.log(e.target.value);
    
    if(singleData.id){
        setSingleData({...singleData, [e.target.name]: e.target.value})
    }
    else{
        setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const addUserDetails = async () => {
      if(singleData.id){
          await axios.put('https://6139330a1fcce10017e78a63.mockapi.io/users/'+singleData.id, singleData)
          alert("Changes Updated Successfully");
          setSingleData([])
          getuserdata();
      }
    else{
        await axios.post(`https://6139330a1fcce10017e78a63.mockapi.io/users`, user);
        alert("User Added Successfully");
        getuserdata();
    }
    
    setShow(!show);
  };
  console.log(singleData)
  return (
    <>
      <Button variant="contained" onClick={showUserForm}>
        Add User
      </Button>
      
      {show ? (

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <FormGroup >
          <Typography variant="h4">Add User</Typography>
          <FormControl>
            <InputLabel htmlFor="my-input">Name</InputLabel>
            <Input style={{margin:10}}
              onChange={(e) => onValueChange(e)}
              name="name"
              value={singleData.name ? singleData.name : name}
              id="my-input"
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="my-input">Email</InputLabel>
            <Input style={{margin:10}}
              onChange={(e) => onValueChange(e)}
              name="email"
              value={singleData.email ? singleData.email : email}
              id="my-input"
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="my-input">Phone</InputLabel>
            <Input style={{margin:10}}
              onChange={(e) => onValueChange(e)}
              name="phone"
              value={singleData.phone ? singleData.phone : phone}
              id="my-input"
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="my-input">Address</InputLabel>
            <Input style={{margin:10}}
              onChange={(e) => onValueChange(e)}
              name="address"
              value={singleData.address ? singleData.address : address}
              id="my-input"
            />
          </FormControl>
          <FormControl>
            <Button
            //   type="submit"
              variant="contained"
              color="primary"
              onClick={()=>addUserDetails()}
            >
              Add User
            </Button>
          </FormControl>
        </FormGroup>
        </Box>
      </Modal>

        
      ) : (
        ""
      )}
    </>
  );
}

export default AddUser;
