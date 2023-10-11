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
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";

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
  const [filterError, setFilterError] = useState("");

  const handleRoleChange = (event) => {
    setFilterError("");
    setRole(event.target.value);
  };

  const handleStatusChange = (event) => {
    setFilterError("");
    setStatus(event.target.value);
  };

  const handleSearch = () => {
    // Check if either role or status is not "None"
    if (role === "" && status === "") {
      // Perform the search action
      setFilterError(
        "Please select at least one filter (Roles or Account Status)"
      );
    } else {
      // Show an error message or handle the case where both are "None"
      setFilterError("");
    }
  };

  const handleReset = () => {
    // Reset both role and status to "None"
    setRole("");
    setStatus("");
    setFilterError("");
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
      id: 2,
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "123-456-7890",
      studentId: "S12345",
      gender: "Male",
      role: "Student",
      status: "Locked",
    },
    {
      id: 3,
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "123-456-7890",
      studentId: "S12345",
      gender: "Male",
      role: "Student",
      status: "Locked",
    },
    {
      id: 4,
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "123-456-7890",
      studentId: "S12345",
      gender: "Male",
      role: "Student",
      status: "Locked",
    },
    {
      id: 5,
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "123-456-7890",
      studentId: "S12345",
      gender: "Male",
      role: "Student",
      status: "Locked",
    },
    {
      id: 6,
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "123-456-7890",
      studentId: "S12345",
      gender: "Male",
      role: "Student",
      status: "Locked",
    },
    {
      id: 7,
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

  // edit icon
  const [editableRow, setEditableRow] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");

  // Function to handle the "Edit" button click
  const handleEditClick = (id) => {
    setEditableRow(id);
    // Initialize the updatedStatus with the current status value
    const row = sampleData.find((row) => row.id === id);
    setUpdatedStatus(row.status);
  };

  // Function to handle the "Update" button click
  const handleUpdate = (id) => {
    // Handle the update logic here with the selected status (updatedStatus)
    // After updating, you can set editableRow back to null to exit the edit mode
    setEditableRow(null);
  };

  // Function to handle the "Cancel" button click
  const handleCancelEdit = () => {
    setEditableRow(null);
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
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button variant="outlined" size="medium" onClick={handleReset}>
          Reset
        </Button>
      </div>
      {filterError && (
        <Alert severity="error" style={{ marginTop: "5px" }}>
          {filterError}
        </Alert>
      )}
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
                    <TableCell>
                      {editableRow === row.id ? (
                        <Select
                          size="small"
                          value={updatedStatus}
                          onChange={(e) => setUpdatedStatus(e.target.value)}
                        >
                          <MenuItem value="Locked">Locked</MenuItem>
                          <MenuItem value="Unlocked">Unlocked</MenuItem>
                        </Select>
                      ) : (
                        row.status
                      )}
                    </TableCell>
                    <TableCell>
                      {editableRow === row.id ? (
                        <div>
                          <Button
                            color="primary"
                            onClick={() => handleUpdate(row.id)}
                          >
                            Update
                          </Button>
                          <Button
                            color="secondary"
                            onClick={() => handleCancelEdit()}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div>
                          {editableRow === null ? (
                            <IconButton
                              color="primary"
                              aria-label="edit"
                              onClick={() => handleEditClick(row.id)}
                            >
                              <EditIcon />
                            </IconButton>
                          ) : null}
                          <IconButton color="primary" aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      )}
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
