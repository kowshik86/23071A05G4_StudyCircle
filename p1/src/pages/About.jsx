import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  const teamMembers = [
    {
      name: 'John Smith',
      role: 'Founder & CEO',
      bio: 'John has over 15 years of experience in education and technology. He founded Study Circle with the vision of making quality education accessible to everyone.',
      image: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      name: 'Sarah Johnson',
      role: 'Chief Academic Officer',
      bio: 'With a PhD in Education, Sarah oversees all academic content and ensures the highest quality of educational materials on our platform.',
      image: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      bio: 'Michael leads our technology team, ensuring that our platform is secure, fast, and user-friendly for all our members.',
      image: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Content',
      bio: 'Emily works with educators and content creators to curate and develop the best study materials for our community.',
      image: 'https://randomuser.me/api/portraits/women/2.jpg'
    }
  ];

  return (
    <div className="container mt-5">
      <div className="row mb-5">
        <div className="col-md-6">
          <h2 className="mb-4">About Study Circle</h2>
          <p className="lead">
            Empowering learners through accessible, quality education since 2015.
          </p>
          <p>
            Study Circle was founded with a simple mission: to make quality educational resources accessible to everyone, regardless of their location or background. What started as a small community of passionate educators has grown into a global platform serving thousands of learners worldwide.
          </p>
          <p>
            We believe that education is a fundamental right and that knowledge should be shared freely. Our platform brings together students, teachers, and professionals from diverse backgrounds to create a vibrant learning community.
          </p>
          <p>
            Through our extensive library of study materials, interactive learning tools, and supportive community, we aim to help every learner achieve their educational goals and unlock their full potential.
          </p>
        </div>
        <div className="col-md-6">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" 
            alt="Students studying together" 
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
      
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h3 className="mb-4">Our Mission & Values</h3>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="mb-3">
                <i className="bi bi-book fs-1 text-primary"></i>
              </div>
              <h4 className="card-title">Accessible Education</h4>
              <p className="card-text">
                We believe that quality education should be accessible to everyone, regardless of their background or location.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="mb-3">
                <i className="bi bi-people fs-1 text-primary"></i>
              </div>
              <h4 className="card-title">Community Collaboration</h4>
              <p className="card-text">
                We foster a collaborative environment where learners can share knowledge and support each other.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <div className="mb-3">
                <i className="bi bi-lightbulb fs-1 text-primary"></i>
              </div>
              <h4 className="card-title">Continuous Innovation</h4>
              <p className="card-text">
                We constantly innovate and improve our platform to provide the best learning experience for our users.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h3 className="mb-4">Our Team</h3>
          <p className="mb-5">
            Meet the passionate individuals behind Study Circle who are dedicated to transforming education.
          </p>
        </div>
        
        {teamMembers.map((member, index) => (
          <div key={index} className="col-md-3 mb-4">
            <div className="card h-100">
              <img 
                src={member.image} 
                className="card-img-top" 
                alt={member.name} 
              />
              <div className="card-body text-center">
                <h5 className="card-title">{member.name}</h5>
                <p className="card-subtitle text-muted mb-2">{member.role}</p>
                <p className="card-text">{member.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h3 className="mb-4">Our Achievements</h3>
        </div>
        <div className="col-md-3 mb-4 text-center">
          <div className="display-4 fw-bold text-primary">10K+</div>
          <p>Registered Users</p>
        </div>
        <div className="col-md-3 mb-4 text-center">
          <div className="display-4 fw-bold text-primary">5K+</div>
          <p>Study Materials</p>
        </div>
        <div className="col-md-3 mb-4 text-center">
          <div className="display-4 fw-bold text-primary">50+</div>
          <p>Subject Areas</p>
        </div>
        <div className="col-md-3 mb-4 text-center">
          <div className="display-4 fw-bold text-primary">20+</div>
          <p>Countries Reached</p>
        </div>
      </div>
      
      <div className="row">
        <div className="col-12 text-center">
          <h3 className="mb-4">Join Our Community</h3>
          <p className="mb-4">
            Become a part of our growing community of learners and educators.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/register" className="btn btn-primary">Register Now</Link>
            <Link to="/contact" className="btn btn-outline-primary">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
