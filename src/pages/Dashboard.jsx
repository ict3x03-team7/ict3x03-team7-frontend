import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import EmailIcon from "@mui/icons-material/Email";
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
import axios from "axios";

function Dashboard() {
  const columnStyle = {
    float: "left",
    width: "48%",
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

  const handleReset = () => {
    try {
      // Reset the account status dropdown
      setUserAccounttStatus("");

      // Reset the table data
      setUsers(originalUsers);
    } catch (error) {
      console.error("Error in handleReset");
    }
  };

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

  // scroll to top button
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
      behavior: "smooth",
    });
  };

  // Edit icon
  const [editableRow, setEditableRow] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");

  // Function to handle the "Edit" button click
  const handleEditClick = (id) => {
    setEditableRow(id);
    // Initialize the updatedStatus with the current locked value
    const user = users.find((user) => user.userID === id);
    setUpdatedStatus(user.locked ? "Locked" : "Not Locked");
  };

  // Function to handle the "Update" button click
  const handleUpdate = (id) => {
    // Handle the update logic here with the selected status (updatedStatus)
    const updatedUser = users.find((user) => user.userID === id);

    if (updatedStatus === "Locked" && updatedUser.locked === false) {
      alert("User Account is Not Locked. You cannot locked a user account!");
      return;
    }

    if (updatedStatus === "Not Locked" && updatedUser.locked === false) {
      alert("User Account is already Unlocked.");
      return;
    }

    // Define the payload for the update request
    const updatePayload = {
      locked: updatedStatus === "Locked",
    };

    // Make the PUT request to update the user status
    axios
      .put(`http://localhost:8085/api/v1/user/${id}/unlock`, updatePayload, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200 && response.data.result.isUnlocked) {
          // Update the user's locked status in the frontend
          const updatedUsers = users.map((user) => {
            if (user.userID === id) {
              return { ...user, locked: false };
            }
            return user;
          });
          setUsers(updatedUsers);
        } else {
        }
      })
      .catch((error) => {
        console.error("Error unlocking user");
      });

    // exit the edit mode
    setEditableRow(null);
  };

  // Function to handle the "Cancel" button click
  const handleCancelEdit = () => {
    setEditableRow(null);
  };

  // get all user data
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8085/api/v1/user/all",
          {
            withCredentials: true, // Include withCredentials option
          }
        );

        if (response.status === 200) {
          setUsers(response.data.result);
        } else {
        }
      } catch (error) {
        console.error("Error fetching user data");
      }
    };

    fetchData();
  }, []);

  // Update Table after Deleting a Record
  useEffect(() => {
    axios.get("http://localhost:8085/api/v1/users").then((response) => {
      if (response.status === 200) {
        setUsers(response.data.users);
        setUsersData(response.data.users);
      } else {
        console.error("Failed to fetch user data");
      }
    });
  }, []);

  // delete selected user account (for admin to delete only)
  const handleDeleteUser = (userID) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user's account?"
    );
    if (confirmed) {
      deleteAccount(userID);
    }
  };

  const deleteAccount = async (userID) => {
    try {
      const response = await axios.delete(
        `http://localhost:8085/api/v1/user/admin/${userID}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const result = response.data.result;
        if (result.isSuccess) {
          alert("User account has been deleted successfully.");

          // Update users and usersData after deletion
          const updatedUsers = users.filter((user) => user.userID !== userID);
          setUsers(updatedUsers);
          setUsersData(updatedUsers);
        } else {
          console.error("Failed to delete the user.");
        }
      } else {
        console.error("Failed to delete the user. Server returned an error.");
      }
    } catch (error) {
      console.error("Error while deleting the user");
    }
  };

  // Calculate the total number of users
  const totalUsers = users.length;

  // Calculate the total number of locked accounts
  const totalLockedAccounts = users.filter((user) => user.locked).length;

  // filter table by account locked status
  const [useraccountstatus, setUserAccounttStatus] = useState("");
  const handleUserAccountStatusChange = (event) => {
    setUserAccounttStatus(event.target.value);
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
              {totalUsers}
            </Typography>
            <div>
              <Typography variant="h5">Total Users</Typography>
            </div>
          </Paper>
        </div>

        <div className="column" style={columnStyle}>
          <Paper style={{ padding: "10px" }}>
            <LockIcon style={iconStyle} />
            <Typography variant="h3" style={numberStyle}>
              {totalLockedAccounts}
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
          <InputLabel id="status-label">Account Status</InputLabel>
          <Select
            labelId="status-label"
            id="status-select"
            value={useraccountstatus}
            label="Account Status"
            onChange={handleUserAccountStatusChange}
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
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>

      <br />
      <br />

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
                <TableCell style={{ color: "white" }}>Last Login</TableCell>
                <TableCell style={{ color: "white" }}>Status</TableCell>
                <TableCell style={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .filter((user) => {
                  if (useraccountstatus === "locked") {
                    return user.locked;
                  } else if (useraccountstatus === "unlocked") {
                    return !user.locked;
                  }
                  // Show all users when no status is selected
                  return true;
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => (
                  <TableRow key={user.userID}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {user.firstName + " " + user.lastName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.mobileNumber}</TableCell>
                    <TableCell>{user.studentID || "N/A"}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.lastLogin || "N/A"}</TableCell>

                    <TableCell>
                      {editableRow === user.userID ? (
                        <Select
                          size="small"
                          value={updatedStatus}
                          onChange={(e) => setUpdatedStatus(e.target.value)}
                        >
                          <MenuItem value="Locked">Locked</MenuItem>
                          <MenuItem value="Not Locked">Not Locked</MenuItem>
                        </Select>
                      ) : user.locked ? (
                        "Locked"
                      ) : (
                        "Not Locked"
                      )}
                    </TableCell>
                    <TableCell>
                      {editableRow === user.userID ? (
                        <div>
                          <Button
                            color="primary"
                            onClick={() => handleUpdate(user.userID)}
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
                              onClick={() => handleEditClick(user.userID)}
                            >
                              <EditIcon />
                            </IconButton>
                          ) : null}
                          <IconButton
                            color="primary"
                            aria-label="delete"
                            onClick={() => handleDeleteUser(user.userID)}
                          >
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
            count={users.length}
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
          <ArrowUpwardIcon />
        </Button>
      )}
    </div>
  );
}

export default Dashboard;
