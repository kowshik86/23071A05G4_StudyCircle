import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadMaterial.css';

function UploadMaterial() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    type: '',
    description: '',
    file: null,
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const subjectOptions = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'Web Development',
    'Programming',
    'Arts',
    'History',
    'Geography',
    'Literature',
    'Economics',
    'Business Studies',
    'Other'
  ];

  const typeOptions = [
    'PDF',
    'Document',
    'Presentation',
    'Video',
    'Audio',
    'Image',
    'Code',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox'
        ? checked
        : type === 'file'
          ? files[0]
          : value
    });
  };

  const handleFileChange = useCallback((file) => {
    setFormData(prevFormData => {
      const updatedFormData = {
        ...prevFormData,
        file
      };

      // Auto-detect file type if not already selected
      if (!prevFormData.type && file) {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        let detectedType = '';

        if (['pdf'].includes(fileExtension)) {
          detectedType = 'PDF';
        } else if (['doc', 'docx', 'txt', 'rtf'].includes(fileExtension)) {
          detectedType = 'Document';
        } else if (['ppt', 'pptx'].includes(fileExtension)) {
          detectedType = 'Presentation';
        } else if (['mp4', 'avi', 'mov', 'wmv'].includes(fileExtension)) {
          detectedType = 'Video';
        } else if (['mp3', 'wav', 'ogg'].includes(fileExtension)) {
          detectedType = 'Audio';
        } else if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(fileExtension)) {
          detectedType = 'Image';
        } else if (['js', 'py', 'java', 'c', 'cpp', 'html', 'css', 'php'].includes(fileExtension)) {
          detectedType = 'Code';
        }

        if (detectedType) {
          updatedFormData.type = detectedType;
        }
      }

      return updatedFormData;
    });
  }, []);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileChange(file);
      e.dataTransfer.clearData();
    }
  }, [handleFileChange]);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.subject) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.type) {
      newErrors.type = 'Material type is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.file) {
      newErrors.file = 'Please select a file to upload';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Here you would typically upload the file to your backend
      setIsUploading(true);

      // Simulate upload process
      setTimeout(() => {
        setIsUploading(false);
        console.log('Upload data:', formData);
        alert('Material uploaded successfully!');
        navigate('/materials');
      }, 2000);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Upload Study Material</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                  {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <select
                      className={`form-select ${errors.subject ? 'is-invalid' : ''}`}
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    >
                      <option value="">Select Subject</option>
                      {subjectOptions.map((subject, index) => (
                        <option key={index} value={subject}>{subject}</option>
                      ))}
                    </select>
                    {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="type" className="form-label">Material Type</label>
                    <select
                      className={`form-select ${errors.type ? 'is-invalid' : ''}`}
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                    >
                      <option value="">Select Type</option>
                      {typeOptions.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.type && <div className="invalid-feedback">{errors.type}</div>}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    id="description"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                  {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="file" className="form-label">Upload File</label>
                  <div
                    className={`drag-drop-area p-4 text-center border rounded ${isDragging ? 'border-primary bg-light' : 'border-dashed'} ${errors.file ? 'border-danger' : ''}`}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {formData.file ? (
                      <div className="file-preview">
                        <div className="d-flex align-items-center justify-content-center mb-3">
                          <i className="bi bi-file-earmark-check fs-1 text-success me-2"></i>
                          <div className="text-start">
                            <p className="mb-0 fw-bold">{formData.file.name}</p>
                            <p className="mb-0 text-muted small">
                              {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleFileChange(null)}
                        >
                          Remove File
                        </button>
                      </div>
                    ) : (
                      <>
                        <i className="bi bi-cloud-arrow-up fs-1 mb-3 d-block"></i>
                        <p className="mb-2">Drag & drop your file here</p>
                        <p className="text-muted mb-3">or</p>
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={handleBrowseClick}
                        >
                          Browse Files
                        </button>
                      </>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="d-none"
                      id="file"
                      name="file"
                      onChange={(e) => {
                        handleChange(e);
                        if (e.target.files[0]) {
                          handleFileChange(e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                  {errors.file && <div className="text-danger mt-2">{errors.file}</div>}
                  <div className="form-text mt-2">Maximum file size: 50MB</div>
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className={`form-check-input ${errors.agreeTerms ? 'is-invalid' : ''}`}
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="agreeTerms">
                    I confirm that I have the right to share this material and it does not violate any copyright laws
                  </label>
                  {errors.agreeTerms && <div className="invalid-feedback">{errors.agreeTerms}</div>}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Uploading...
                    </>
                  ) : 'Upload Material'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadMaterial;
