import React, { useState } from 'react';

// Component for displaying and managing underwriting cases
const NeedsUnderwriting = () => {
  const [policyNumber, setPolicyNumber] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rowsPerPage = 10;

  // Sample case data (expand with additional fields if needed)
  const allCases = [
    { policyNumber: 'PLF000068250', date: '23/07/2023', client: 'Owusu Bill', phone: '0552418228', product: 'SAP Life', agent: 'Kwaku Adams', agentPhone: 'Kwaku Adams', autoAcceptance: 'Needs Underwriting', details: '#' },
    { policyNumber: 'PLF00006866', date: '31/08/2023', client: 'Eltan-Kumi Peterson', phone: '0342813722', product: 'AJU Ultimate', agent: 'Angela Mensah', agentPhone: 'Angela Mensah', autoAcceptance: 'Needs Underwriting', details: '#' },
    { policyNumber: 'PLF00004751', date: '06/09/2023', client: 'Sawyer', phone: '151-84', product: 'SAP Life', agent: 'Daniel Pkya', agentPhone: 'Daniel Pkya', autoAcceptance: 'Underwriting', details: '#' },
    { policyNumber: 'PLF0012039', date: '24/09/2023', client: 'Rabons Eduards', phone: '102900978', product: 'SAP Life', agent: 'Joel Aimee', agentPhone: 'Joel Aimee', autoAcceptance: 'Ultimate', details: '#' },
    { policyNumber: 'UPF0012483', date: '18/09/2023', client: 'Khatlis Eduards', phone: '126-921', product: 'SAP Life', agent: 'Mart Aimee', agentPhone: 'Mart Aimee', autoAcceptance: 'SAP Life', details: '#' },
    { policyNumber: 'UPF0012042', date: '27/09/2023', client: 'Ermonn Jasinn', phone: '0919 Z11', product: 'SPA Life', agent: 'Mathjile Smith', agentPhone: 'Mathjile Smith', autoAcceptance: 'SAP Life', details: '#' },
    { policyNumber: 'UPF0012043', date: '13/09/2023', client: 'Mahi ni', phone: '86.24', product: 'SUC Life', agent: 'Ronnie Tagad', agentPhone: 'Ronnie Tagad', autoAcceptance: 'SAP LITE', details: '#' },
    { policyNumber: 'UPF0012080', date: '16/12/2022', client: 'Akoto', phone: '112-4', product: 'Ultimate', agent: 'Emma Adotey', agentPhone: 'Emma Adotey', autoAcceptance: 'Ultimate', details: '#' },
    { policyNumber: 'PLF000068251', date: '23/07/2023', client: 'Ama Boateng', phone: '0552418229', product: 'SAP Life', agent: 'Kwame Addo', agentPhone: 'Kwame Addo', autoAcceptance: 'Needs Underwriting', details: '#' },
    { policyNumber: 'PLF00006867', date: '31/08/2023', client: 'Kofi Mensah', phone: '0342813723', product: 'AJU Ultimate', agent: 'Grace Osei', agentPhone: 'Grace Osei', autoAcceptance: 'Needs Underwriting', details: '#' },
    { policyNumber: 'PLF00004752', date: '06/09/2023', client: 'Yaw Amoah', phone: '151-85', product: 'SAP Life', agent: 'Emmanuel Kofi', agentPhone: 'Emmanuel Kofi', autoAcceptance: 'Underwriting', details: '#' },
    { policyNumber: 'PLF0012040', date: '24/09/2023', client: 'Nana Kwame', phone: '102900979', product: 'SAP Life', agent: 'Isaac Mensah', agentPhone: 'Isaac Mensah', autoAcceptance: 'Ultimate', details: '#' },
    { policyNumber: 'PLF000068250', date: '23/07/2023', client: 'Owusu Bill', phone: '0552418228', product: 'SAP Life', agent: 'Kwaku Adams', agentPhone: 'Kwaku Adams', autoAcceptance: 'Needs Underwriting', details: '#' },
    { policyNumber: 'PLF000068250', date: '23/07/2023', client: 'Owusu Bill', phone: '0552418228', product: 'SAP Life', agent: 'Kwaku Adams', agentPhone: 'Kwaku Adams', autoAcceptance: 'Needs Underwriting', details: '#' },
    { policyNumber: 'PLF00006866', date: '31/08/2023', client: 'Eltan-Kumi Peterson', phone: '0342813722', product: 'AJU Ultimate', agent: 'Angela Mensah', agentPhone: 'Angela Mensah', autoAcceptance: 'Needs Underwriting', details: '#' },
    { policyNumber: 'PLF00004751', date: '06/09/2023', client: 'Sawyer', phone: '151-84', product: 'SAP Life', agent: 'Daniel Pkya', agentPhone: 'Daniel Pkya', autoAcceptance: 'Underwriting', details: '#' },
    { policyNumber: 'PLF0012039', date: '24/09/2023', client: 'Rabons Eduards', phone: '102900978', product: 'SAP Life', agent: 'Joel Aimee', agentPhone: 'Joel Aimee', autoAcceptance: 'Ultimate', details: '#' },
    { policyNumber: 'UPF0012483', date: '18/09/2023', client: 'Khatlis Eduards', phone: '126-921', product: 'SAP Life', agent: 'Mart Aimee', agentPhone: 'Mart Aimee', autoAcceptance: 'SAP Life', details: '#' },
    { policyNumber: 'UPF0012042', date: '27/09/2023', client: 'Ermonn Jasinn', phone: '0919 Z11', product: 'SPA Life', agent: 'Mathjile Smith', agentPhone: 'Mathjile Smith', autoAcceptance: 'SAP Life', details: '#' },
    { policyNumber: 'UPF0012043', date: '13/09/2023', client: 'Mahi ni', phone: '86.24', product: 'SUC Life', agent: 'Ronnie Tagad', agentPhone: 'Ronnie Tagad', autoAcceptance: 'SAP LITE', details: '#' },
    { policyNumber: 'UPF0012080', date: '16/12/2022', client: 'Akoto', phone: '112-4', product: 'Ultimate', agent: 'Emma Adotey', agentPhone: 'Emma Adotey', autoAcceptance: 'Ultimate', details: '#' },
    { policyNumber: 'PLF000068251', date: '23/07/2023', client: 'Ama Boateng', phone: '0552418229', product: 'SAP Life', agent: 'Kwame Addo', agentPhone: 'Kwame Addo', autoAcceptance: 'Needs Underwriting', details: '#' },
    { policyNumber: 'PLF00006867', date: '31/08/2023', client: 'Kofi Mensah', phone: '0342813723', product: 'AJU Ultimate', agent: 'Grace Osei', agentPhone: 'Grace Osei', autoAcceptance: 'Needs Underwriting', details: '#' },
    { policyNumber: 'PLF00004752', date: '06/09/2023', client: 'Yaw Amoah', phone: '151-85', product: 'SAP Life', agent: 'Emmanuel Kofi', agentPhone: 'Emmanuel Kofi', autoAcceptance: 'Underwriting', details: '#' },
    { policyNumber: 'PLF0012040', date: '24/09/2023', client: 'Nana Kwame', phone: '102900979', product: 'SAP Life', agent: 'Isaac Mensah', agentPhone: 'Isaac Mensah', autoAcceptance: 'Ultimate', details: '#' },
    { policyNumber: 'PLF000068250', date: '23/07/2023', client: 'Owusu Bill', phone: '0552418228', product: 'SAP Life', agent: 'Kwaku Adams', agentPhone: 'Kwaku Adams', autoAcceptance: 'Needs Underwriting', details: '#' },
    { policyNumber: 'PLF000068251', date: '23/07/2023', client: 'Ama Boateng', phone: '0552418229', product: 'SAP Life', agent: 'Kwame Addo', agentPhone: 'Kwame Addo', autoAcceptance: 'Needs Underwriting', details: '#' },
    { policyNumber: 'PLF00006867', date: '31/08/2023', client: 'Kofi Mensah', phone: '0342813723', product: 'AJU Ultimate', agent: 'Grace Osei', agentPhone: 'Grace Osei', autoAcceptance: 'Needs Underwriting', details: '#' },
    { policyNumber: 'PLF00004752', date: '06/09/2023', client: 'Yaw Amoah', phone: '151-85', product: 'SAP Life', agent: 'Emmanuel Kofi', agentPhone: 'Emmanuel Kofi', autoAcceptance: 'Underwriting', details: '#' },
    { policyNumber: 'PLF0012040', date: '24/09/2023', client: 'Nana Kwame', phone: '102900979', product: 'SAP Life', agent: 'Isaac Mensah', agentPhone: 'Isaac Mensah', autoAcceptance: 'Ultimate', details: '#' },
  ];

  const [cases, setCases] = useState(allCases);

  const handleSearch = () => {
    setIsLoading(true);
    setHasSearched(true);
    
    setTimeout(() => {
      let filteredCases = allCases;
      
      if (policyNumber) {
        filteredCases = filteredCases.filter(caseItem => 
          caseItem.policyNumber.toLowerCase().includes(policyNumber.toLowerCase())
        );
      }
      
      if (fromDate) {
        const fromDateObj = new Date(fromDate);
        filteredCases = filteredCases.filter(caseItem => {
          const caseDate = new Date(caseItem.date.split('/').reverse().join('-'));
          return caseDate >= fromDateObj;
        });
      }
      
      if (toDate) {
        const toDateObj = new Date(toDate);
        filteredCases = filteredCases.filter(caseItem => {
          const caseDate = new Date(caseItem.date.split('/').reverse().join('-'));
          return caseDate <= toDateObj;
        });
      }
      
      // Optional: Highlight recent cases (last 30 days from today, 04/09/2025)
      const today = new Date('2025-09-04');
      const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
      filteredCases = filteredCases.map(caseItem => ({
        ...caseItem,
        isRecent: new Date(caseItem.date.split('/').reverse().join('-')) >= thirtyDaysAgo,
      }));

      setCases(filteredCases);
      setCurrentPage(1);
      setIsLoading(false);
    }, 1500);
  };

  const openModal = (caseItem) => {
    setSelectedCase(caseItem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCase(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentCases = cases.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(cases.length / rowsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const emptyRows = rowsPerPage - currentCases.length;
  const emptyRowsArray = emptyRows > 0 ? Array(emptyRows).fill(null) : [];

  // Map selectedCase to modal data structure
  const proposalData = selectedCase ? {
    clientDetails: {
      name: selectedCase.client,
      email: '', // Add if available
      signature: '', // Add if available
      uploadedSignature: '', // Add if available
    },
    proposalDetails: {
      number: selectedCase.policyNumber,
      productName: selectedCase.product,
      effectiveDate: selectedCase.date,
      paymentFrequency: '', // Add if available
      policyTerm: '', // Add if available
      premium: '', // Add if available
      policyFee: '', // Add if available
      premiumTerm: '', // Add if available
      deductionStartMonth: '', // Add if available
      bankAccountName: '', // Add if available
    },
    beneficiaryDetails: [], // Add if available
    trusteeDetails: [], // Add if available
    agentDetails: {
      name: selectedCase.agent,
      phone: selectedCase.agentPhone,
      id: '', // Add if available
      branch: '', // Add if available
    },
    dueDiligence: {
      id: '', // Add if available
      address: '', // Add if available
      proofOfAddress: '', // Add if available
      proofOfWealth: '', // Add if available
    },
  } : null;

  return (
    <div className="underwriting-view">
      <h1 className="page-heading">Cases for Underwriting view</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Policy number"
          value={policyNumber}
          onChange={(e) => setPolicyNumber(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          aria-label="Policy number search"
        />
        <div className="date-input-group">
          <label>From</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="date-input"
            aria-label="From date"
          />
        </div>
        <div className="date-input-group">
          <label>To</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="date-input"
            aria-label="To date"
          />
        </div>
        <button className="search-button" onClick={handleSearch} disabled={isLoading}>
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
      </div>
      
      <div className="table-container">
        {hasSearched && cases.length === 0 ? (
          <NoData />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Policy Number</th>
                <th>Date of submission</th>
                <th>Client</th>
                <th>Client Phone</th>
                <th>Product</th>
                <th>Agent</th>
                <th>Agent Phone</th>
                <th>Auto Acceptance</th>
                <th className="details">Details</th>
              </tr>
            </thead>
            <tbody>
              {currentCases.map((caseItem, index) => (
                <tr key={index} className={caseItem.isRecent ? 'recent-case' : ''}>
                  <td>{caseItem.policyNumber}</td>
                  <td>{caseItem.date}</td>
                  <td>{caseItem.client}</td>
                  <td>{caseItem.phone}</td>
                  <td>{caseItem.product}</td>
                  <td>{caseItem.agent}</td>
                  <td>{caseItem.agentPhone}</td>
                  <td>
                    <span className={`status ${caseItem.autoAcceptance.replace(' ', '-').toLowerCase()}`}>
                      {caseItem.autoAcceptance}
                    </span>
                  </td>
                  <td className="details">
                    <button 
                      className="details-link" 
                      onClick={() => openModal(caseItem)}
                      aria-label={`View details for ${caseItem.policyNumber}`}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
              {emptyRowsArray.map((_, index) => (
                <tr key={`empty-${index}`} className="empty-row">
                  <td colSpan="9">&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

     {isModalOpen && proposalData && (
        <div className="modal-overlay proposal-modal" onClick={closeModal}>
          <div className="modal-content proposal-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <div className="proposal-header">
              {/* <h2>Proposal Details</h2> */}
              <div className="proposal-number">{proposalData.proposalDetails.number}</div>
            </div>
            
            <div className="proposal-sections">
              {/* Client Details - Top Left */}
              <div className="proposal-section left-side">
                <h3>CLIENT DETAILS</h3>
                <div className="details-table">
                  <div className="detail-row">
                    <span className="detail-label">Client Name</span>
                    <span className="detail-value">{proposalData.clientDetails.name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Client Email</span>
                    <span className="detail-value">{proposalData.clientDetails.email || "N/A"}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Signature</span>
                    <span className="detail-value">{proposalData.clientDetails.signature}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Uploaded Signature</span>
                    <span className="detail-value">{proposalData.clientDetails.uploadedSignature || "N/A"}</span>
                  </div>
                </div>
              </div>
              
              {/* Proposal Details - Top Right */}
              <div className="proposal-section right-side">
                <h3>PROPOSAL DETAILS</h3>
                <div className="details-table">
                  <div className="detail-row">
                    <span className="detail-label">Proposal Number</span>
                    <span className="detail-value">{proposalData.proposalDetails.number}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Product Name</span>
                    <span className="detail-value">{proposalData.proposalDetails.productName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Effective Date</span>
                    <span className="detail-value">{proposalData.proposalDetails.effectiveDate}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Payment Frequency</span>
                    <span className="detail-value">{proposalData.proposalDetails.paymentFrequency}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Policy Term</span>
                    <span className="detail-value">{proposalData.proposalDetails.policyTerm}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Premium</span>
                    <span className="detail-value">{proposalData.proposalDetails.premium}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Policy Fee</span>
                    <span className="detail-value">{proposalData.proposalDetails.policyFee}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Premium Term</span>
                    <span className="detail-value">{proposalData.proposalDetails.premiumTerm}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Deduction Start Month</span>
                    <span className="detail-value">{proposalData.proposalDetails.deductionStartMonth || "N/A"}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Bank Account Name</span>
                    <span className="detail-value">{proposalData.proposalDetails.bankAccountName}</span>
                  </div>
                </div>
              </div>
              
              {/* Beneficiary Details - Beneath Client Details */}
              <div className="proposal-section left-side">
                <h3>BENEFICIARY DETAILS</h3>
                <div className="details-table">
                  <div className="table-header">
                    <span>Beneficiary Name</span>
                    <span>Allocation Percentage</span>
                    <span>Beneficiary DoB</span>
                  </div>
                  {proposalData.beneficiaryDetails && proposalData.beneficiaryDetails.length > 0 ? (
                    proposalData.beneficiaryDetails.map((beneficiary, index) => (
                      <div className="detail-row" key={index}>
                        <span className="detail-value">{beneficiary.name}</span>
                        <span className="detail-value">{beneficiary.percentage}</span>
                        <span className="detail-value">{formatDate(beneficiary.dob)}</span>
                      </div>
                    ))
                  ) : (
                    <div className="detail-row">
                      <span className="detail-value">No beneficiaries listed</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Trustee Details - Beneath Beneficiary Details */}
              <div className="proposal-section left-side">
                <h3>TRUSTEE DETAILS</h3>
                <div className="details-table">
                  <div className="table-header">
                    <span>Trustee Name</span>
                    <span>Trustee Telephone</span>
                    <span>Trustee DoB</span>
                  </div>
                  {proposalData.trusteeDetails.map((trustee, index) => (
                    <div className="detail-row" key={index}>
                      <span className="detail-value">{trustee.name}</span>
                      <span className="detail-value">{trustee.telephone}</span>
                      <span className="detail-value">{formatDate(trustee.dob)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Agent Details - Beneath Trustee Details */}
              <div className="proposal-section left-side">
                <h3>AGENT DETAILS</h3>
                <div className="details-table">
                  <div className="detail-row">
                    <span className="detail-label">Agent Name</span>
                    <span className="detail-value">{proposalData.agentDetails.name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Agent Phone</span>
                    <span className="detail-value">{proposalData.agentDetails.phone}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Agent ID</span>
                    <span className="detail-value">{proposalData.agentDetails.id}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Agent Branch</span>
                    <span className="detail-value">{proposalData.agentDetails.branch}</span>
                  </div>
                </div>
              </div>
              
              {/* Due Diligence Details - Right side */}
              <div className="proposal-section right-side">
                <h3>DUE DILIGENCE DETAILS</h3>
                <div className="details-table">
                  <div className="detail-row">
                    <span className="detail-label">ID</span>
                    <span className="detail-value">{proposalData.dueDiligence.id}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">ADDRESS</span>
                    <span className="detail-value">{proposalData.dueDiligence.address}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Proof of Address</span>
                    <span className="detail-value">{proposalData.dueDiligence.proofOfAddress || "N/A"}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Proof of Wealth</span>
                    <span className="detail-value">{proposalData.dueDiligence.proofOfWealth || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* <div className="modal-actions">
              <button className="modal-button primary" onClick={closeModal}>Close</button>
              <button className="modal-button secondary">Print</button>
            </div> */}
          </div>
        </div>
      )}
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

export default NeedsUnderwriting;
