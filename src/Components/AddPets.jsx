import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField ";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { postPet } from "../Redux/actions";

const AddPets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: "",
    city: "",
    address: "",
    capacity: "",
    cost: "",
    verified: "",
    rating: "",
  });

  const { name, city, address, capacity, cost, verified, rating } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postPet(state));
    navigate
  };

  return (
    <>
      <h1>Add new data here</h1>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            "& > :not(style)": {
              m: 1,
              width: "60%",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="outlined-basic"
            label="Name"
            variant="outlined"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-basic"
            label="City"
            variant="outlined"
            type="text"
            name="city"
            value={city}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-basic"
            label="Address"
            variant="outlined"
            type="text"
            name="address"
            value={address}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-basic"
            label="Capacity"
            variant="outlined"
            type="number"
            name="capacity"
            value={capacity}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-basic"
            label="Cost Per Day"
            variant="outlined"
            type="number"
            name="cost"
            value={cost}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-basic"
            label="Verified"
            variant="outlined"
            type="text"
            name="verified"
            placeholder="type `yes` or `no` only"
            value={verified}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-basic"
            label="Rating"
            variant="outlined"
            type="number"
            name="rating"
            value={rating}
            onChange={handleChange}
          />

          <ButtonGroup
            style={{
              marginTop: " 20px",
              height: "53px",
              display: "flex",
              margin: "auto",

              justifyContent: "space-between",
            }}
            variant="contained"
            aria-label="outlined danger button group"
          >
            <Button
              style={{ width: "45%" }}
              color="primary"
              onClick={() => navigate("/")}
            >
              Back
            </Button>

            <Button
              style={{ marginLeft: "30px", width: "45%" }}
              id="btn"
              type="submit"
              color="secondary"
            >
              Submit
            </Button>
          </ButtonGroup>
        </Box>
      </form>
    </>
  );
};

export default AddPets;
