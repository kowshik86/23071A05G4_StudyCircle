import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        console.log('Contact form data:', formData);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 1500);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2 className="mb-4">Contact Us</h2>
          <p className="mb-4">
            Have questions or feedback? We'd love to hear from you. Fill out the form and our team will get back to you as soon as possible.
          </p>
          
          <div className="mb-4">
            <h5>Our Information</h5>
            <address>
              <p><strong>Address:</strong> 123 Education St, Learning City, LC 12345</p>
              <p><strong>Email:</strong> info@studycircle.com</p>
              <p><strong>Phone:</strong> +1 (123) 456-7890</p>
              <p><strong>Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM</p>
            </address>
          </div>
          
          <div className="mb-4">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-decoration-none">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="#" className="text-decoration-none">
                <i className="bi bi-twitter fs-4"></i>
              </a>
              <a href="#" className="text-decoration-none">
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a href="#" className="text-decoration-none">
                <i className="bi bi-linkedin fs-4"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          {submitted ? (
            <div className="alert alert-success p-4">
              <h4 className="alert-heading">Thank you for contacting us!</h4>
              <p>Your message has been received. We'll get back to you as soon as possible.</p>
              <hr />
              <button 
                className="btn btn-success" 
                onClick={() => setSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title mb-4">Send Us a Message</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your Name</label>
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
                    <label htmlFor="email" className="form-label">Email Address</label>
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
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input
                      type="text"
                      className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                    {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                    {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending...
                      </>
                    ) : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="row mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-0">
              <div className="ratio ratio-16x9">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215266754809!2d-73.98784492426285!3d40.75798657138946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1684239058459!5m2!1sen!2sus" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
