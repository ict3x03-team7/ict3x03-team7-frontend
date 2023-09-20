import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import GroupIcon from "@mui/icons-material/Group";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockIcon from "@mui/icons-material/Lock";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

function Dashboard() {
  const columnStyle = {
    float: "left",
    width: "30%",
    padding: "15px",
    marginBottom: "10px",
    backgroundColor: "#e1f5fe",
  };

  const iconStyle = {
    fontSize: 60,
  };

  const numberStyle = {
    float: "right",
    marginRight: "20px",
    marginTop: "10px",
  };

  const randomNumber = () => {
    return Math.floor(Math.random() * 100); // Generate a random number
  };

  const [role, setRole] = React.useState(""); // State for Roles dropdown
  const [status, setStatus] = React.useState(""); // State for Account Status dropdown

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  // Sample data
  const sampleData = [
    {
      id: 1,
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "123-456-7890",
      studentId: "S12345",
      gender: "Male",
      role: "Student",
      status: "Locked",
    },
    {
      id: 1,
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "123-456-7890",
      studentId: "S12345",
      gender: "Male",
      role: "Student",
      status: "Locked",
    },
    {
      id: 1,
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "123-456-7890",
      studentId: "S12345",
      gender: "Male",
      role: "Student",
      status: "Locked",
    },
    {
      id: 1,
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "123-456-7890",
      studentId: "S12345",
      gender: "Male",
      role: "Student",
      status: "Locked",
    },
    {
      id: 1,
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "123-456-7890",
      studentId: "S12345",
      gender: "Male",
      role: "Student",
      status: "Locked",
    },
    {
      id: 1,
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "123-456-7890",
      studentId: "S12345",
      gender: "Male",
      role: "Student",
      status: "Locked",
    },
    {
      id: 1,
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "123-456-7890",
      studentId: "S12345",
      gender: "Male",
      role: "Student",
      status: "Locked",
    },

    // Add more data here
  ];

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    // Function to check if the user has scrolled down enough to show the button
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to scroll to the top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Add smooth scrolling behavior
    });
  };

  return (
    <div>
      <h1>Account Management</h1>

      <div
        className="row"
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <div className="column" style={columnStyle}>
          <Paper style={{ padding: "10px" }}>
            <EmailIcon style={iconStyle} />
            <Typography variant="h3" style={numberStyle}>
              {randomNumber()}
            </Typography>
            <div>
              <Typography variant="h5">Total Users</Typography>
            </div>
          </Paper>
        </div>

        <div className="column" style={columnStyle}>
          <Paper style={{ padding: "10px" }}>
            <VisibilityIcon style={iconStyle} />
            <Typography variant="h3" style={numberStyle}>
              {randomNumber()}
            </Typography>
            <div>
              <Typography variant="h5">New Users</Typography>
            </div>
          </Paper>
        </div>

        <div className="column" style={columnStyle}>
          <Paper style={{ padding: "10px" }}>
            <LockIcon style={iconStyle} />
            <Typography variant="h3" style={numberStyle}>
              {randomNumber()}
            </Typography>
            <div>
              <Typography variant="h5">Account Locked</Typography>
            </div>
          </Paper>
        </div>
      </div>

      <h2
        style={{
          display: "flex",
          alignItems: "lect",
          marginTop: "250px",
        }}
      >
        User Accounts
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          marginTop: "30px",
        }}
      >
        <Typography variant="h6" style={{ marginRight: "20px" }}>
          Filter:
        </Typography>
        <FormControl
          sx={{ m: 1, minWidth: 200, marginRight: "20px" }}
          size="small"
        >
          <InputLabel id="roles-label">Roles</InputLabel>
          <Select
            labelId="roles-label"
            id="roles-select"
            value={role}
            label="Roles"
            onChange={handleRoleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          sx={{ m: 1, minWidth: 200, marginRight: "20px" }}
          size="small"
        >
          <InputLabel id="status-label">Account Status</InputLabel>
          <Select
            labelId="status-label"
            id="status-select"
            value={status}
            label="Account Status"
            onChange={handleStatusChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="locked">Locked</MenuItem>
            <MenuItem value="unlocked">Unlocked</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          size="medium"
          style={{ marginRight: "15px" }}
        >
          Search
        </Button>
        <Button variant="outlined" size="medium">
          Reset
        </Button>
      </div>

      <br />
      <br />

      {/* add table here */}
      <div style={{ marginTop: "20px" }}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "black" }}>
                <TableCell style={{ color: "white" }}>ID</TableCell>
                <TableCell style={{ color: "white" }}>Full Name</TableCell>
                <TableCell style={{ color: "white" }}>Email</TableCell>
                <TableCell style={{ color: "white" }}>Phone Number</TableCell>
                <TableCell style={{ color: "white" }}>Student ID</TableCell>
                <TableCell style={{ color: "white" }}>Gender</TableCell>
                <TableCell style={{ color: "white" }}>Role</TableCell>
                <TableCell style={{ color: "white" }}>Status</TableCell>
                <TableCell style={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sampleData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.fullName}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phoneNumber}</TableCell>
                    <TableCell>{row.studentId}</TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      <IconButton color="primary" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={sampleData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* Scroll to top button */}
      {showScrollButton && (
        <Button
          variant="contained"
          onClick={scrollToTop}
          style={{
            backgroundColor: "grey",
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          <ArrowUpwardIcon /> {/* Replace text with the ArrowUpward icon */}
        </Button>
      )}
    </div>
  );
}

export default Dashboard;
