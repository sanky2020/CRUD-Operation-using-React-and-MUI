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
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import AddUser from "./AddUser";

//use this command to install appropriate dependency => npm install @material-ui/core --save

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  tableContainer: {
    margin: "20px auto",
    maxWidth: 800,
  },
  tableHead: {
    fontWeight: 800,
    fontSize: 20,
    backgroundImage: "linear-gradient(to bottom, #076093, #F3F8FB)",
    border: "1px solid rgba(224, 224, 224, 1)"
  },
  tableRow: {
    "&:nth-child(even)": {
      backgroundColor: "#D7EEFC",
    },
  },
  tableData: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  functionalities:{
    display: "flex" , justifyContent:"space-evenly",
    
    width:130,
    height: 35
  },
  
});

function UsersTable() {
  let [users, setUsers] = useState([]);

  const childFunc = useRef(null);

  useEffect(() => {
    axios
      .get("https://6139330a1fcce10017e78a63.mockapi.io/users")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
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
    alert("User Deleted Successfuly")
  }

  return (
    <>
      <AddUser childFunc={childFunc} />
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table} size="small" stickyHeader>
          <TableHead>
            <TableRow >
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
                    <TableCell className={classes.tableData} align="center">
                      <Grid container>
                        <Grid item sm={4}>
                          <Avatar alt={item.name} src="." />
                        </Grid>
                        <Grid item sm={8}>
                          {item.name}
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell align="center">{item.email}</TableCell>
                    <TableCell align="center">{item.phone}</TableCell>
                    <TableCell align="center">{item.address}</TableCell>
                    <TableCell className={classes.functionalities}>
                      <Button onClick={() => childFunc.current(item.id)} >
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
