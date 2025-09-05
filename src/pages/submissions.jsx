import React, { useState } from 'react';

const Submissions = () => {
  const [policyNumber, setPolicyNumber] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const rowsPerPage = 10;

  const allSubmissions = [
    {
      policyNumber: 'POL1001',
      date: '15/10/2023',
      client: 'Kwame Mensah',
      phone: '0552418228',
      premium: 'GHS 500',
      product: 'SAP Life',
      branch: 'Accra',
      agentId: 'AG001',
      agentNumber: '0244123456',
      agentName: 'Agent A',
      leaderName: 'Leader 1',
      autoAcceptance: 'Needs Underwriting',
    },
    {
      policyNumber: 'POL1002',
      date: '14/10/2023',
      client: 'Abena Sarpong',
      phone: '0556789123',
      premium: 'GHS 700',
      product: 'AJU Ultimate',
      branch: 'Kumasi',
      agentId: 'AG002',
      agentNumber: '0244789654',
      agentName: 'Agent B',
      leaderName: 'Leader 2',
      autoAcceptance: 'Underwriting',
    },
    {
      policyNumber: 'POL1003',
      date: '13/10/2023',
      client: 'Kofi Adjei',
      phone: '0201234567',
      premium: 'GHS 1200',
      product: 'SAP Lite',
      branch: 'Takoradi',
      agentId: 'AG003',
      agentNumber: '0204455667',
      agentName: 'Agent C',
      leaderName: 'Leader 3',
      autoAcceptance: 'Ultimate',
    },
  ];

  const [submissions, setSubmissions] = useState(allSubmissions);

  const handleSearch = () => {
    setIsLoading(true);
    setHasSearched(true);

    setTimeout(() => {
      let filtered = allSubmissions;

      if (policyNumber) {
        filtered = filtered.filter(item =>
          item.policyNumber.toLowerCase().includes(policyNumber.toLowerCase())
        );
      }

      if (fromDate) {
        const fromDateObj = new Date(fromDate);
        filtered = filtered.filter(item => {
          const caseDate = new Date(item.date.split('/').reverse().join('-'));
          return caseDate >= fromDateObj;
        });
      }

      if (toDate) {
        const toDateObj = new Date(toDate);
        filtered = filtered.filter(item => {
          const caseDate = new Date(item.date.split('/').reverse().join('-'));
          return caseDate <= toDateObj;
        });
      }

      setSubmissions(filtered);
      setCurrentPage(1);
      setIsLoading(false);
    }, 1500);
  };

  const handleCSVExport = () => {
    exportToCSV(submissions, 'submissions_export');
  };

  const handlePDFExport = () => {
    exportToPDF(submissions, 'submissions_export');
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = submissions.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(submissions.length / rowsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const emptyRows = rowsPerPage - currentRows.length;
  const emptyRowsArray = emptyRows > 0 ? Array(emptyRows).fill(null) : [];

  return (
    <div className="underwriting-view">
      <h1 className="page-heading">CDD EDD CASES VIEW</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Policy number"
          value={policyNumber}
          onChange={(e) => setPolicyNumber(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <div className="date-input-group">
          <label>From</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="date-input"
          />
        </div>
        <div className="date-input-group">
          <label>To</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="date-input"
          />
        </div>
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {isLoading && <Loader />}

      <div className="table-controls">
        <div className="pagination-top">
          <button onClick={handlePrev} disabled={currentPage === 1 || isLoading}>Prev</button>
          <span className="page-info">Page {currentPage} of {totalPages}</span>
          <button onClick={handleNext} disabled={currentPage === totalPages || isLoading}>Next</button>
        </div>
        <div className="export-buttons">
          <button className="csv-button" onClick={handleCSVExport} disabled={isLoading}>
            CSV
          </button>
          <button className="pdf-button" onClick={handlePDFExport} disabled={isLoading}>
            PDF
          </button>
        </div>
      </div>

      <div className="table-container">
        {hasSearched && submissions.length === 0 ? (
          <NoData />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Policy Number</th>
                <th>Date of submission</th>
                <th>Client</th>
                <th>Client Phone</th>
                <th>Premium</th>
                <th>Product</th>
                <th>Branch</th>
                <th>Agent ID</th>
                <th>Agent Number</th>
                <th>Agent Name</th>
                <th>Leader Name</th>
                <th>Auto Acceptance</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, index) => (
                <tr key={index}>
                  <td>{row.policyNumber}</td>
                  <td>{row.date}</td>
                  <td>{row.client}</td>
                  <td>{row.phone}</td>
                  <td>{row.premium}</td>
                  <td>{row.product}</td>
                  <td>{row.branch}</td>
                  <td>{row.agentId}</td>
                  <td>{row.agentNumber}</td>
                  <td>{row.agentName}</td>
                  <td>{row.leaderName}</td>
                  <td>
                    <span className={`status ${row.autoAcceptance.replace(' ', '-').toLowerCase()}`}>
                      {row.autoAcceptance}
                    </span>
                  </td>
                </tr>
              ))}
              {emptyRowsArray.map((_, index) => (
                <tr key={`empty-${index}`} className="empty-row">
                  <td colSpan="12">&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};


// Loader Component
const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader"></div>
      <p>Searching...</p>
    </div>
  );
};

// No Data Component
const NoData = () => {
  return (
    <div className="no-data">
      <div className="no-data-icon">📭</div>
      <h3>No Cases Found</h3>
      <p>Try adjusting your search criteria or filters</p>
    </div>
  );
};

export default Submissions;