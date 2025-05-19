import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { currentUser, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    interests: '',
    profilePicture: null
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else {
      // Initialize form with current user data
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        bio: currentUser.bio || '',
        interests: currentUser.interests || '',
        profilePicture: null
      });
    }
  }, [currentUser, navigate]);
  
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value
    });
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setIsSaving(true);
      
      // Here you would typically update the user profile through your backend
      updateProfile(formData.name, formData.email)
        .then(() => {
          setIsSaving(false);
          setIsEditing(false);
          setSuccessMessage('Profile updated successfully!');
          
          // Clear success message after 3 seconds
          setTimeout(() => {
            setSuccessMessage('');
          }, 3000);
        })
        .catch(error => {
          setIsSaving(false);
          setErrors({ submit: error.message });
        });
    }
  };
  
  const handleLogout = () => {
    logout()
      .then(() => {
        navigate('/login');
      })
      .catch(error => {
        console.error('Logout error:', error);
      });
  };
  
  // Mock data for user stats and activities
  const userStats = {
    materialsUploaded: 12,
    materialsDownloaded: 45,
    commentsPosted: 8,
    memberSince: 'January 2023'
  };
  
  const recentActivities = [
    { id: 1, type: 'upload', title: 'Advanced React Patterns', date: '2023-05-15' },
    { id: 2, type: 'download', title: 'JavaScript Fundamentals', date: '2023-05-10' },
    { id: 3, type: 'comment', title: 'Commented on "CSS Grid Layout"', date: '2023-05-08' },
    { id: 4, type: 'download', title: 'Python for Data Science', date: '2023-05-05' }
  ];
  
  if (!currentUser) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <img 
                src={formData.profilePicture ? URL.createObjectURL(formData.profilePicture) : 'https://via.placeholder.com/150'} 
                alt="Profile" 
                className="rounded-circle img-fluid mb-3" 
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <h5 className="card-title">{currentUser.name}</h5>
              <p className="text-muted">{currentUser.email}</p>
              
              {!isEditing && (
                <button 
                  className="btn btn-primary w-100 mb-2" 
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              )}
              
              <button 
                className="btn btn-outline-danger w-100" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
          
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">User Statistics</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Materials Uploaded
                  <span className="badge bg-primary rounded-pill">{userStats.materialsUploaded}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Materials Downloaded
                  <span className="badge bg-primary rounded-pill">{userStats.materialsDownloaded}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Comments Posted
                  <span className="badge bg-primary rounded-pill">{userStats.commentsPosted}</span>
                </li>
                <li className="list-group-item">
                  Member Since: <strong>{userStats.memberSince}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="col-md-8">
          {successMessage && (
            <div className="alert alert-success mb-4">{successMessage}</div>
          )}
          
          {errors.submit && (
            <div className="alert alert-danger mb-4">{errors.submit}</div>
          )}
          
          {isEditing ? (
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Edit Profile</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="bio" className="form-label">Bio</label>
                    <textarea
                      className="form-control"
                      id="bio"
                      name="bio"
                      rows="3"
                      value={formData.bio}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="interests" className="form-label">Interests</label>
                    <input
                      type="text"
                      className="form-control"
                      id="interests"
                      name="interests"
                      value={formData.interests}
                      onChange={handleChange}
                      placeholder="e.g. Programming, Mathematics, Physics"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
                    <input
                      type="file"
                      className="form-control"
                      id="profilePicture"
                      name="profilePicture"
                      onChange={handleChange}
                      accept="image/*"
                    />
                  </div>
                  
                  <div className="d-flex gap-2">
                    <button 
                      type="submit" 
                      className="btn btn-primary" 
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Saving...
                        </>
                      ) : 'Save Changes'}
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary" 
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">Profile Information</h5>
              </div>
              <div className="card-body">
                <h6>Bio</h6>
                <p>{formData.bio || 'No bio provided yet.'}</p>
                
                <h6>Interests</h6>
                <p>{formData.interests || 'No interests specified yet.'}</p>
              </div>
            </div>
          )}
          
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Recent Activity</h5>
            </div>
            <div className="card-body">
              {recentActivities.length === 0 ? (
                <p className="text-muted">No recent activities.</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {recentActivities.map(activity => (
                    <li key={activity.id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className={`badge ${
                            activity.type === 'upload' ? 'bg-success' : 
                            activity.type === 'download' ? 'bg-info' : 'bg-warning'
                          } me-2`}>
                            {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                          </span>
                          {activity.title}
                        </div>
                        <small className="text-muted">{activity.date}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
