import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Materials() {
  // Materials data (in a real app, this would come from an API)
  const [materials, setMaterials] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('');

  // Get unique subjects for filter dropdown
  const subjects = materials.length > 0 ? [...new Set(materials.map(material => material.subject))] : [];

  // Filter materials based on search term and subject filter
  const filteredMaterials = materials.filter(material => {
    return (
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterSubject === '' || material.subject === filterSubject)
    );
  });

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Study Materials</h2>
        <Link to="/upload" className="btn btn-primary">
          <i className="bi bi-cloud-arrow-up me-2"></i>
          Upload Material
        </Link>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary" type="button">Search</button>
          </div>
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
          >
            <option value="">All Subjects</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredMaterials.length === 0 ? (
        <div className="text-center py-5">
          <div className="alert alert-info mb-4">
            {searchTerm || filterSubject ?
              'No materials found matching your criteria.' :
              'No study materials available yet. Be the first to upload study materials!'
            }
          </div>
          {!searchTerm && !filterSubject && (
            <Link to="/upload" className="btn btn-primary">
              <i className="bi bi-cloud-arrow-up me-2"></i>
              Upload Material
            </Link>
          )}
        </div>
      ) : (
        <div className="row">
          {filteredMaterials.map(material => (
            <div key={material.id} className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <span className="badge bg-primary">{material.type}</span>
                  <span className="badge bg-secondary">{material.subject}</span>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{material.title}</h5>
                  <p className="card-text">{material.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      Uploaded by {material.uploadedBy} on {material.uploadDate}
                    </small>
                    <a href={material.downloadUrl} className="btn btn-outline-primary btn-sm">
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Materials;
