import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddPets from "./Components/AddPets";
import Home from "./Components/Home";
import SingleDetails from "./Components/SingleDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/add" element={<AddPets />} />
        <Route path="/:id" element={<SingleDetails />} />
      </Routes>
    </div>
  );
}

export default App;
