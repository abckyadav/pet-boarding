import axios from "axios";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Home = () => {
  const [data, setData] = useState([]);
  const [inputvalue, setinputValue] = useState("");

  const sortOptions = ["name", "city", "verified", "cost", "rating"];

  useEffect(() => {
    loaduserdata();
  }, []);

  const loaduserdata = async () => {
    return await axios
      .get("http://localhost:5000/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log("error:", err));
  };

  console.log("inputvalue", inputvalue);

  const handleSearch = async (e) => {
    e.preventDefault();

    return await axios
      .get(`http://localhost:5000/users?q=${inputvalue}`)
      .then((res) => {
        setData(res.data);
        setinputValue("");
      })
      .catch((err) => console.log(err));
  };

  console.log("data:", data);

  const handleReset = () => {
    loaduserdata();
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <h1>Pet Boarding</h1>

      <form
        onSubmit={handleSearch}
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <TextField
          size="small"
          label="Seach name"
          variant="outlined"
          type="text"
          placeholder="Seach name"
          value={inputvalue}
          onChange={(e) => setinputValue(e.target.value)}
        />

        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button type="submit" color="primary">
            Search
          </Button>
          <Button onClick={() => handleReset()} color="secondary">
            Reset
          </Button>
        </ButtonGroup>
      </form>

      <div>
        <TableContainer component={Paper}>
          <IconButton>
           
          </IconButton>

          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">id</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">City</StyledTableCell>
                <StyledTableCell align="center">Address</StyledTableCell>
                <StyledTableCell align="center">Capacity</StyledTableCell>
                <StyledTableCell align="center">Cost per day</StyledTableCell>
                <StyledTableCell align="center">Verified</StyledTableCell>
                <StyledTableCell align="center">Rating</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <h1>No Data Found</h1>
              ) : (
                data.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.city}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.address}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.capacity}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.cost}</StyledTableCell>
                    <StyledTableCell align="center">{row.cost}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.verified}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.rating}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Home;
