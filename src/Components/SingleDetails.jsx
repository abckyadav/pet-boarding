import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleDetails = () => {
  const [data, setdata] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}`).then((res) => {
      console.log("res.data", res.data);
      setdata(res.data);
    });
  }, [id]);

  return (
    <div>
      <h1>Welcome to {data.name}</h1>

      <p>City: {data.city}</p>
      <p>Address: {data.address}</p>
      <p>Total Capacity: {data.capacity}</p>
      <p>Cost Per Day: Rs. {data.cost}</p>
      <p>Verified Status : {data.verified}</p>
      <p>Rating : {data.rating} Star</p>
    </div>
  );
};

export default SingleDetails;
