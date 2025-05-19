import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Study Circle</h5>
            <p>Your one-stop platform for educational resources and collaboration.</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/materials" className="text-white">Materials</a></li>
              <li><a href="/contact" className="text-white">Contact</a></li>
              <li><a href="/about" className="text-white">About</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <address>
              <p>Email: info@studycircle.com</p>
              <p>Phone: +1 (123) 456-7890</p>
              <p>Address: 123 Education St, Learning City</p>
            </address>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col text-center">
            <p className="mb-0">© {new Date().getFullYear()} Study Circle. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
