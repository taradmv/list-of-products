import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Filter from "./filter/Filter";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Filter />} />
      </Routes>
    </Router>
  );
}

export default App;
