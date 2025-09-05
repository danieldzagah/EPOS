import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './index.css';
import NeedsUnderwriting from './pages/needsunderwriting';
import Submissions from './pages/submissions';
import SCBKYC from './pages/scbkyc';
// import Modal from './Components/modal';
// import Modaldata from './functions/modaldata';

const Navigation = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="top-nav">
      <div className="nav-links">
        <Link to="/" className={isActive('/')}>Needs Underwriting</Link>
        <Link to="/scb-kyc" className={isActive('/scb-kyc')}>SCB KYC</Link>
        <Link to="/submissions" className={isActive('/submissions')}>Submissions</Link>
      </div>
      <div className="user-info">
        <div className="dropdown" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          William Gymah
          {isDropdownOpen && (
            <div className="dropdown-content">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// SCB KYC Page Component with centered search controls

// Export utility functions
// const exportToCSV = (data, filename) => {
//   if (data.length === 0) {
//     alert('No data to export');
//     return;
//   }

//   const headers = Object.keys(data[0]).join(',');
//   const rows = data.map(row => 
//     Object.values(row).map(value => 
//       typeof value === 'string' && value.includes(',') ? `"${value}"` : value
//     ).join(',')
//   );
  
//   const csvContent = [headers, ...rows].join('\n');
//   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//   const link = document.createElement('a');
//   const url = URL.createObjectURL(blob);
  
//   link.setAttribute('href', url);
//   link.setAttribute('download', `${filename}.csv`);
//   link.style.visibility = 'hidden';
  
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// const exportToPDF = (data, filename) => {
//   if (data.length === 0) {
//     alert('No data to export');
//     return;
//   }

//   // Simulate PDF export (in a real app, you would use a PDF library like jsPDF)
//   alert(`Exporting ${data.length} records to PDF (${filename}.pdf)\n\nThis would generate a PDF file in a real application.`);
//   console.log('PDF Export Data:', data);
// };

// Submissions Page Component

// Needs Underwriting Page Component

// Main App Component with Routing
const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <div className="main-content">
          <Routes>
            <Route path="/" element={< NeedsUnderwriting />} />
            <Route path="/scb-kyc" element={<SCBKYC />} />
            <Route path="/submissions" element={<Submissions />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;