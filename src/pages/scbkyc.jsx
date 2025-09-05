import React, { useState } from 'react';
const SCBKYC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  const allKycRequests = [
    // { id: 1, client: 'Kwame Mensah', status: 'Pending', initiated: '12/10/2023', clientId: 'CL001', documentType: 'Passport', documentNumber: 'G1234567' },
    // { id: 2, client: 'Abena Sarpong', status: 'In Progress', initiated: '11/10/2023', clientId: 'CL002', documentType: 'Driver License', documentNumber: 'DL789012' },
    // { id: 3, client: 'Kofi Adjei', status: 'Completed', initiated: '10/10/2023', clientId: 'CL003', documentType: 'National ID', documentNumber: 'ID345678' },
    // { id: 4, client: 'Ama Boakye', status: 'Pending', initiated: '13/10/2023', clientId: 'CL004', documentType: 'Voter ID', documentNumber: 'V9012345' },
    // { id: 5, client: 'Yaw Boateng', status: 'In Progress', initiated: '14/10/2023', clientId: 'CL005', documentType: 'Passport', documentNumber: 'G5678901' },
    // { id: 6, client: 'Akua Mensah', status: 'Completed', initiated: '15/10/2023', clientId: 'CL006', documentType: 'National ID', documentNumber: 'ID7890123' },
  ];

  const [filteredRequests, setFilteredRequests] = useState(allKycRequests);

  const handleSearch = () => {
    setIsLoading(true);
    setHasSearched(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const filtered = allKycRequests.filter(request => {
        const matchesSearch = searchTerm === '' || 
          request.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.clientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.documentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.documentType.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || 
          request.status.toLowerCase() === statusFilter.toLowerCase();
        
        return matchesSearch && matchesStatus;
      });
      
      setFilteredRequests(filtered);
      setIsLoading(false);
    }, 800); // Simulate API call
  };

  const handleClear = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setHasSearched(false);
    setFilteredRequests(allKycRequests);
  };

  const handleCSVExport = () => {
    exportToCSV(filteredRequests, 'scb_kyc_export');
  };

  const handlePDFExport = () => {
    if (filteredRequests.length === 0) {
      alert('No data to export');
      return;
    }

    // Create a simple text-based PDF simulation
    let pdfContent = `SCB KYC Verification Report\n`;
    pdfContent += `Exported on: ${new Date().toLocaleDateString()}\n\n`;
    
    // Add headers
    const headers = ['Client ID', 'Client Name', 'Document Type', 'Document Number', 'Status', 'Initiated Date'].join('\t');
    pdfContent += headers + '\n';
    
    // Add rows
    filteredRequests.forEach(request => {
      const rowValues = [
        request.clientId,
        request.client,
        request.documentType,
        request.documentNumber,
        request.status,
        request.initiated
      ].join('\t');
      pdfContent += rowValues + '\n';
    });
    
    // Create and download the file
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = `scb_kyc_export_${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert(`PDF exported successfully with ${filteredRequests.length} records!`);
  };

  // Handle Enter key press for search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="page-content">
      <div className="page-header-center">
        <h1>SCB KYC DATA SEARCH</h1>
        <p>Manage KYC verification requests for Prudential Life Insurance, Ghana.</p>
      </div>
      
      {/* Centered Search and Filter Controls */}
      <div className="search-controls-centered">
        <div className="search-input-group-centered">
          <label className="find-details-label">Find details</label>
          <input
            type="text"
            placeholder="Contact Number / Application ID*"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="search-actions">
            <button className="search-button" onClick={handleSearch} disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </button>
            <button className="clear-button" onClick={handleClear} disabled={isLoading}>
              Clear
            </button>
          </div>
        </div>
        
        <div className="export-buttons-centered">
          <button className="csv-button" onClick={handleCSVExport} disabled={isLoading || filteredRequests.length === 0}>
            CSV
          </button>
          <button className="pdf-button" onClick={handlePDFExport} disabled={isLoading || filteredRequests.length === 0}>
            PDF
          </button>
        </div>
      </div>

      {isLoading && <Loader />}
      
      <div className="kyc-list">
        {hasSearched && filteredRequests.length === 0 ? (
          <div className="no-data">
            <div className="no-data-icon">🔍</div>
            <h3>No KYC Requests Found</h3>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          filteredRequests.map(request => (
            <div key={request.id} className="kyc-item">
              <div className="kyc-info">
                <h3>{request.client} ({request.clientId})</h3>
                <p>
                  {request.documentType}: {request.documentNumber} | 
                  Initiated: {request.initiated}
                </p>
              </div>
              <div className={`kyc-status ${request.status.toLowerCase().replace(' ', '-')}`}>
                {request.status}
              </div>
              <div className="kyc-actions">
                <button className="action-btn">View Details</button>
                {request.status === 'Pending' && <button className="action-btn">Start Verification</button>}
              </div>
            </div>
          ))
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

export default SCBKYC;