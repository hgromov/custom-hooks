import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import DataTable from './components/DataTable';
import ListComponent from './components/ListComponent';

function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/simple-list">simple list</Link>
            </li>
            <li>
              <Link to="/data-list">
                list with pagination, sorting and filtering
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/simple-list" element={<ListComponent />} />
          <Route path="/data-list" element={<DataTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
