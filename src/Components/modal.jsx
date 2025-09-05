// import React, { useState } from 'react';
// {/* Modal Popup */}
// {isModalOpen && selectedCase && proposalData && (
//   <div className="modal-overlay proposal-modal" onClick={closeModal}>
//     <div className="modal-content proposal-modal-content" onClick={(e) => e.stopPropagation()}>
//       <button className="modal-close" onClick={closeModal}>×</button>
      
//       <div className="proposal-header">
//         <h2>Proposal Details</h2>
//         <div className="proposal-number">#{proposalData.proposalDetails.number}</div>
//       </div>
      
//       <div className="proposal-sections">
//         {/* Client Details Section - Top Left */}
//         <div className="proposal-section left-side">
//           <h3>CLIENT DETAILS</h3>
//           <div className="details-table">
//             <div className="detail-row">
//               <span className="detail-label">Client Name</span>
//               <span className="detail-value">{proposalData.clientDetails.name}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Client Phone</span>
//               <span className="detail-value">{selectedCase.phone}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Client Email</span>
//               <span className="detail-value">{proposalData.clientDetails.email || "N/A"}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Signature</span>
//               <span className="detail-value">{proposalData.clientDetails.signature}</span>
//             </div>
//           </div>
//         </div>
        
//         {/* Proposal Details Section - Top Right */}
//         <div className="proposal-section right-side">
//           <h3>PROPOSAL DETAILS</h3>
//           <div className="details-table">
//             <div className="detail-row">
//               <span className="detail-label">Proposal Number</span>
//               <span className="detail-value">{proposalData.proposalDetails.number}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Product Name</span>
//               <span className="detail-value">{proposalData.proposalDetails.productName}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Effective Date</span>
//               <span className="detail-value">{proposalData.proposalDetails.effectiveDate}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Payment Frequency</span>
//               <span className="detail-value">{proposalData.proposalDetails.paymentFrequency}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Policy Term</span>
//               <span className="detail-value">{proposalData.proposalDetails.policyTerm}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Premium</span>
//               <span className="detail-value">{proposalData.proposalDetails.premium}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Policy Fee</span>
//               <span className="detail-value">{proposalData.proposalDetails.policyFee}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Premium Term</span>
//               <span className="detail-value">{proposalData.proposalDetails.premiumTerm}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Bank Account Name</span>
//               <span className="detail-value">{proposalData.proposalDetails.bankAccountName}</span>
//             </div>
//           </div>
//         </div>
        
//         {/* Agent Details Section - Beneath Client Details */}
//         <div className="proposal-section left-side">
//           <h3>AGENT DETAILS</h3>
//           <div className="details-table">
//             <div className="detail-row">
//               <span className="detail-label">Agent Name</span>
//               <span className="detail-value">{proposalData.agentDetails.name}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Agent Phone</span>
//               <span className="detail-value">{proposalData.agentDetails.phone}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Agent ID</span>
//               <span className="detail-value">{proposalData.agentDetails.id}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Agent Branch</span>
//               <span className="detail-value">{proposalData.agentDetails.branch}</span>
//             </div>
//           </div>
//         </div>
        
//         {/* Due Diligence Section - Right side */}
//         <div className="proposal-section right-side">
//           <h3>DUE DILIGENCE DETAILS</h3>
//           <div className="details-table">
//             <div className="detail-row">
//               <span className="detail-label">ID</span>
//               <span className="detail-value">{proposalData.dueDiligence.id}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">ADDRESS</span>
//               <span className="detail-value">{proposalData.dueDiligence.address}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Proof of Address</span>
//               <span className="detail-value">{proposalData.dueDiligence.proofOfAddress || "N/A"}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Proof of Wealth</span>
//               <span className="detail-value">{proposalData.dueDiligence.proofOfWealth || "N/A"}</span>
//             </div>
//           </div>
//         </div>
        
//         {/* Trustee Details Section - Beneath Agent Details */}
//         <div className="proposal-section left-side">
//           <h3>TRUSTEE DETAILS</h3>
//           <div className="details-table">
//             <div className="table-header">
//               <span>Trustee Name</span>
//               <span>Trustee Telephone</span>
//               <span>Trustee DoB</span>
//             </div>
//             {proposalData.trusteeDetails.map((trustee, index) => (
//               <div className="detail-row" key={index}>
//                 <span className="detail-value">{trustee.name}</span>
//                 <span className="detail-value">{trustee.telephone}</span>
//                 <span className="detail-value">{formatDate(trustee.dob)}</span>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         {/* Beneficiary Details Section - Beneath Trustee Details */}
//         <div className="proposal-section left-side">
//           <h3>BENEFICIARY DETAILS</h3>
//           <div className="details-table">
//             <div className="table-header">
//               <span>Beneficiary Name</span>
//               <span>Allocation Percentage</span>
//               <span>Beneficiary DoB</span>
//             </div>
//             {proposalData.beneficiaryDetails && proposalData.beneficiaryDetails.length > 0 ? (
//               proposalData.beneficiaryDetails.map((beneficiary, index) => (
//                 <div className="detail-row" key={index}>
//                   <span className="detail-value">{beneficiary.name}</span>
//                   <span className="detail-value">{beneficiary.percentage}</span>
//                   <span className="detail-value">{formatDate(beneficiary.dob)}</span>
//                 </div>
//               ))
//             ) : (
//               <div className="detail-row">
//                 <span className="detail-value">No beneficiaries listed</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
      
//       <div className="modal-actions">
//         <button className="modal-button primary" onClick={closeModal}>Close</button>
//         <button className="modal-button secondary">Print</button>
//       </div>
//     </div>
//   </div>
// )}

// export default Modal;