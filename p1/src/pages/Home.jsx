import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mt-5">
      <div className="jumbotron bg-light p-5 rounded">
        <h1 className="display-4">Welcome to Study Circle</h1>
        <p className="lead">
          Your one-stop platform for educational resources, collaboration, and learning.
        </p>
        <hr className="my-4" />
        <p>
          Join our community to access study materials, upload your own resources, and connect with fellow learners.
        </p>
        <div className="d-flex gap-2">
          <Link to="/register" className="btn btn-primary">Register Now</Link>
          <Link to="/materials" className="btn btn-secondary">Browse Materials</Link>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Access Study Materials</h5>
              <p className="card-text">
                Browse through our extensive collection of study materials across various subjects and topics.
              </p>
              <Link to="/materials" className="btn btn-outline-primary">View Materials</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Share Your Knowledge</h5>
              <p className="card-text">
                Upload your own study materials and resources to help others in their learning journey.
              </p>
              <Link to="/upload" className="btn btn-outline-primary">Upload Materials</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Premium Membership</h5>
              <p className="card-text">
                Get access to exclusive content and features with our premium membership plans.
              </p>
              <Link to="/payment" className="btn btn-outline-primary">View Plans</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <h2>Why Choose Study Circle?</h2>
        <div className="row mt-4">
          <div className="col-md-3">
            <div className="p-3">
              <h4>Quality Content</h4>
              <p>Curated and verified study materials</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3">
              <h4>Community</h4>
              <p>Connect with like-minded learners</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3">
              <h4>Accessibility</h4>
              <p>Access materials anytime, anywhere</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3">
              <h4>Support</h4>
              <p>24/7 support for all your queries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
