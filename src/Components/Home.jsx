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
import { useNavigate } from "react-router-dom";

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
  let [sortvalue, setSortValue] = useState("");
  let [filterValue, setFilterValue] = useState("");
  const navigate = useNavigate();

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

  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);

    return await axios
      .get(`http://localhost:5000/users?_sort=${value}&_order=asc`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleFilter = async (e) => {
    let { id, value } = e.target;

    setFilterValue(value);

    return await axios
      .get(`http://localhost:5000/users?${id}=${value}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
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
        <TableContainer
          component={Paper}
          style={{ width: "80%", margin: "auto" }}
        >
          <Table>
            <TableRow>
              <StyledTableCell align="center">
                <h5>Sort:</h5>
                <select
                  id={sortvalue}
                  style={{ width: "40%", borderRadius: "5px", height: "35px" }}
                  onChange={handleSort}
                  value={sortvalue}
                >
                  <option>Please Select One</option>
                  <option value="name">Name</option>
                  <option value="cost">Cost</option>
                  <option value="rating">Rating</option>
                </select>
              </StyledTableCell>

              <StyledTableCell align="center">
                <h5>Filter By City</h5>{" "}
                <select
                  id="city"
                  style={{ width: "40%", borderRadius: "5px", height: "35px" }}
                  onChange={handleFilter}
                  value={filterValue}
                >
                  <option>Please Select One</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Patna">Patna</option>
                  <option value="Gaya">Gaya</option>
                </select>
              </StyledTableCell>

              <StyledTableCell align="center">
                <h5>Verfied</h5>{" "}
                <select
                  id="verified"
                  style={{ width: "40%", borderRadius: "5px", height: "35px" }}
                  onChange={handleFilter}
                  value={filterValue}
                >
                  <option>---</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </StyledTableCell>
            </TableRow>
          </Table>

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
                  <StyledTableRow
                    key={row.id}
                    onClick={() => navigate(`/${row.id}`)}
                  >
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
