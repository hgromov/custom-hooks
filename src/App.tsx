import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { DataTable } from "./components/DataTable";
import { List } from "./components/List";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div className="container">
        <Nav />
        <Routes>
          <Route path="/simple-list" element={<List />} />
          <Route path="/data-list" element={<DataTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
