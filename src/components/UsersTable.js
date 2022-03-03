import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Grid,
  TablePagination,
  Button,
  Snackbar,
  IconButton,
  
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@mui/icons-material/Close"
import DeleteIcon from "@mui/icons-material/Delete";
import AddUser from "./AddUser";
import { Link } from "react-router-dom";

//use this command to install appropriate dependency => npm install @material-ui/core --save

const useStyles = makeStyles({
  tableContainer: {
    margin: "20px auto",
    width: '75%',
    border: "2px solid rgba(224, 224, 224, 1)",
  },
  table: {
    // width: '100%',
    
  },
  
  tableHead: {
    
    backgroundImage: "linear-gradient(to bottom, #076093, #F3F8FB)",
    border: "2px solid rgba(224, 224, 224, 1)",
    "&.css-nc6t7a-MuiTableCell-root":{
      fontWeight: 800,
    fontSize: '1rem',
    height: '2.5rem'
    }
  },
  tableRow: {
    "&:nth-child(even)": {
      backgroundColor: "#D7EEFC",
    },
  },
  tableData: {
    display: "flex",
    height: 35,
    border: "1px solid rgba(224, 224, 224, 0.8)",
    "& .css-11lq3yg-MuiGrid-root":{
      justifyContent: "space-between",
      alignItems: "center",
    }
  },
  border:{
    border: "1px solid rgba(224, 224, 224, 0.8)",
  },
  functionalities: {
    display: "flex",
    justifyContent: "space-evenly",
    height: 35,
  },
});

function UsersTable() {
  let [users, setUsers] = useState([]);

  // snackbar logic begins
  var msg = "User Deleted Successfuly";
  const [open, setOpen] = useState(false); 
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
    //snackbar logic ends

  const childFunc = useRef(null);

  //axios call
  const getuserdata = async ()=>{
    let response = await axios
      .get("http://6139330a1fcce10017e78a63.mockapi.io/users")
      setUsers(response.data) 
  }

  useEffect(() => {
    getuserdata();
  }, []);

  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  async function deleteFunc(id) {
    await axios.delete(
      "https://6139330a1fcce10017e78a63.mockapi.io/users/" + id
    );
    handleClick();
    getuserdata();
  }

  const showUserDetails = (id) =>{
    console.log("user id: ", id )
  }
  return (
    <><Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={msg}
        action={action}
      />
      <AddUser childFunc={childFunc} getuserdata={getuserdata}/>
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table} size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead} align="center">
                Name
              </TableCell>
              <TableCell className={classes.tableHead} align="center">
                Email
              </TableCell>
              <TableCell className={classes.tableHead} align="center">
                Phone
              </TableCell>
              <TableCell className={classes.tableHead} align="center">
                Address
              </TableCell>
              <TableCell className={classes.tableHead} align="center">
                Functionalities
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => {
                return (
                  <TableRow key={item.id} className={classes.tableRow}>
                    {/* by using src="." it will pick the 1st letter of the text provided for its avatar */}
                    
                    <TableCell className={classes.tableData} align="center" onClick={()=>showUserDetails(item.id)}>
                    
                      <Grid container>
                        <Grid item sm={4}>
                          <Avatar alt={item.name} src="." />
                        </Grid>
                        <Grid item sm={8}>
                        <Link to={{pathname:`${item.name}`, state:`${item.id}`}} style={{textDecoration:"none"}}>{item.name}</Link>
                        </Grid>
                      </Grid>
                       
                    </TableCell>
                    
                    <TableCell className={classes.border} align="center"><Link to={{pathname:`${item.name}`, state:`${item.id}`}} style={{textDecoration:"none"}}>{item.email}</Link></TableCell>
                    <TableCell className={classes.border} align="center"><Link to={{pathname:`${item.name}`, state:`${item.id}`}} style={{textDecoration:"none"}}>{item.email}{item.phone}</Link></TableCell>
                    <TableCell className={classes.border} align="center"><Link to={{pathname:`${item.name}`, state:`${item.id}`}} style={{textDecoration:"none"}}>{item.email}{item.address}</Link></TableCell>
                    <TableCell className={`${classes.functionalities} ${classes.border}`}>
                      <Button onClick={() => childFunc.current(item.id)}>
                        <EditOutlinedIcon />
                      </Button>
                      <Button onClick={() => deleteFunc(item.id)}>
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          stickyheader="true"
        />
      </TableContainer>
    </>
  );
}

export default UsersTable;
