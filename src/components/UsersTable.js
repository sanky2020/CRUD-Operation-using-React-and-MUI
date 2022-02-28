import {
    Paper,
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
    // TableFooter
  } from "@mui/material";
  import React, {useEffect, useState} from "react";
  import { makeStyles } from "@material-ui/core";
  import axios from 'axios';
  import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
  import DeleteIcon from '@mui/icons-material/Delete';
  
  //use this command to install appropriate dependency => npm install @material-ui/core --save
  
  const useStyles = makeStyles({
    table: {
      minWidth: 500,
    },
    tableContainer: {
      margin: "20px auto",
      // borderRadius: 20,
      maxWidth: 800,
    },
    tableHead: {
      fontWeight: 800,
      fontSize: 18,
      // backgroundColor: "#C05D69",
      backgroundImage: "linear-gradient(to bottom, #C05D69, #E0E0E0)"
    },
    tableRow: {
      "&:nth-child(even)": {
        backgroundColor: "#E0E0E0",
      },
    },
    tableData: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });
  
  function UsersTable() {
    let [users, setUsers] = useState([]);
    useEffect(()=>{
        axios.get('https://6139330a1fcce10017e78a63.mockapi.io/users')
        .then(response =>{
            console.log(response.data)
            setUsers(response.data);
            
        })
        .catch(err =>{
            console.log(err.message)
        })
    },[])
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

    //logging the users data onto console
    // console.log(users);

    return (
        
      <Paper >
      <TableContainer component={Paper} className={classes.tableContainer} >
        <Table className={classes.table} size='small' stickyHeader >
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
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => {
              return (
                <TableRow key={item.id} className={classes.tableRow}>
                  {/* by using src="." it will pick the 1st letter of the text provided for its avatar */}
                  <TableCell className={classes.tableData} align="center">
                    <Grid container>
                    <Grid item sm={4}><Avatar alt={item.name} src="." /></Grid>
                    <Grid item sm={8}>{item.name}</Grid>
                    </Grid>
                  </TableCell>
                  <TableCell align="center">{item.email}</TableCell>
                  <TableCell align="center">{item.phone}</TableCell>
                  <TableCell align="center">{item.address.city}</TableCell>
                  <TableCell style={{display:"flex"}}>
                      <Button><EditOutlinedIcon/></Button>
                      <Button><DeleteIcon/></Button>
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
          rowsPerPageOptions={[5,10,15]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          stickyheader = 'true'
        />
       
      </TableContainer>
      
        
      </Paper>
    );
  }
  
  export default UsersTable;
  