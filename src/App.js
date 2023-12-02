import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Transaction from './components/Transaction';
import Data from './components/Data';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 h-screen flex flex-col">
        <nav className="bg-blue-500 p-4 text-white">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/transaction" className="hover:underline">
                Transaction
              </Link>
            </li>
            <li>
              <Link to="/data" className="hover:underline">
                Data
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/data" element={<Data />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
