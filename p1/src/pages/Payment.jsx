import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Payment() {
  const navigate = useNavigate();
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [cart, setCart] = useState([]);

  // Sample materials data (in a real app, this would come from an API or context)
  const availableMaterials = [
    {
      id: 1,
      title: 'Advanced Calculus',
      subject: 'Mathematics',
      type: 'PDF',
      author: 'Dr. Jane Smith',
      price: 1000,
      description: 'Comprehensive guide to advanced calculus concepts including limits, derivatives, and integrals.',
      previewUrl: '#',
      thumbnail: 'https://via.placeholder.com/150?text=Calculus'
    },
    {
      id: 2,
      title: 'Introduction to Quantum Physics',
      subject: 'Physics',
      type: 'PDF',
      author: 'Prof. Robert Johnson',
      price: 1000,
      description: 'A beginner-friendly introduction to quantum mechanics and its applications.',
      previewUrl: '#',
      thumbnail: 'https://via.placeholder.com/150?text=Physics'
    },
    {
      id: 3,
      title: 'Data Structures and Algorithms',
      subject: 'Computer Science',
      type: 'PDF',
      author: 'Michael Chen',
      price: 1000,
      description: 'Learn essential data structures and algorithms with practical examples in Python.',
      previewUrl: '#',
      thumbnail: 'https://via.placeholder.com/150?text=CS'
    },
    {
      id: 4,
      title: 'Organic Chemistry Fundamentals',
      subject: 'Chemistry',
      type: 'PDF',
      author: 'Dr. Emily Williams',
      price: 1000,
      description: 'Comprehensive guide to organic chemistry with detailed explanations and practice problems.',
      previewUrl: '#',
      thumbnail: 'https://via.placeholder.com/150?text=Chemistry'
    },
    {
      id: 5,
      title: 'World History: Ancient Civilizations',
      subject: 'History',
      type: 'PDF',
      author: 'Prof. David Thompson',
      price: 1000,
      description: 'Explore the rise and fall of ancient civilizations from Mesopotamia to Rome.',
      previewUrl: '#',
      thumbnail: 'https://via.placeholder.com/150?text=History'
    }
  ];

  // Initialize cart with some items for demonstration
  useEffect(() => {
    // In a real app, this would come from a cart context or API
    setCart([
      { ...availableMaterials[0], quantity: 1 },
      { ...availableMaterials[2], quantity: 1 }
    ]);
  }, []);

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const validate = () => {
    const newErrors = {};

    if (cart.length === 0) {
      newErrors.cart = 'Your cart is empty';
    }

    if (paymentMethod === 'credit') {
      if (!formData.cardName.trim()) {
        newErrors.cardName = 'Name on card is required';
      }

      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Invalid card number';
      }

      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Invalid format (MM/YY)';
      }

      if (!formData.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'Invalid CVV';
      }
    }

    if (!formData.billingAddress.trim()) {
      newErrors.billingAddress = 'Billing address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    return newErrors;
  };

  // This function is already defined above

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Here you would typically process the payment through a payment gateway
      setIsProcessing(true);

      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        console.log('Payment data:', {
          items: cart,
          totalAmount: totalPrice,
          method: paymentMethod,
          ...formData
        });
        alert('Payment processed successfully!');
        // Clear cart after successful payment
        setCart([]);
        navigate('/materials');
      }, 2000);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Study Materials Payment</h2>

      {errors.cart && <div className="alert alert-danger">{errors.cart}</div>}

      <div className="row mb-4">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Your Cart</h5>
            </div>
            <div className="card-body p-0">
              {cart.length === 0 ? (
                <div className="p-4 text-center">
                  <p className="mb-3">Your cart is empty</p>
                  <Link to="/materials" className="btn btn-primary">
                    Browse Materials
                  </Link>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>Material</th>
                        <th>Type</th>
                        <th className="text-end">Price</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map(item => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="ms-3">
                                <h6 className="mb-0">{item.title}</h6>
                                <small className="text-muted">{item.subject}</small>
                              </div>
                            </div>
                          </td>
                          <td>{item.type}</td>
                          <td className="text-end">₹{item.price.toFixed(2)}</td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleRemoveFromCart(item.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="table-group-divider">
                      <tr>
                        <th colSpan="2">Total</th>
                        <th className="text-end">₹{totalPrice}</th>
                        <th></th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">Available Study Materials</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {availableMaterials.filter(material => !cart.some(item => item.id === material.id)).map(material => (
                  <div key={material.id} className="col-md-6 mb-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <h6 className="card-title">{material.title}</h6>
                        <p className="card-text small">{material.description.substring(0, 80)}...</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="badge bg-primary">₹{material.price.toFixed(2)}</span>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => setCart([...cart, { ...material, quantity: 1 }])}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          {cart.length > 0 && (
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Payment Information</h4>
              </div>
              <div className="card-body">
                <ul className="nav nav-pills mb-4">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${paymentMethod === 'credit' ? 'active' : ''}`}
                      onClick={() => handlePaymentMethodChange('credit')}
                    >
                      Credit Card
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${paymentMethod === 'paypal' ? 'active' : ''}`}
                      onClick={() => handlePaymentMethodChange('paypal')}
                    >
                      PayPal
                    </button>
                  </li>
                </ul>

                <form onSubmit={handleSubmit}>
                  {paymentMethod === 'credit' && (
                    <div className="credit-card-form">
                      <div className="row mb-3">
                        <div className="col-md-12">
                          <label htmlFor="cardName" className="form-label">Name on Card</label>
                          <input
                            type="text"
                            className={`form-control ${errors.cardName ? 'is-invalid' : ''}`}
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                          />
                          {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>}
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="cardNumber" className="form-label">Card Number</label>
                        <input
                          type="text"
                          className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="XXXX XXXX XXXX XXXX"
                        />
                        {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                          <input
                            type="text"
                            className={`form-control ${errors.expiryDate ? 'is-invalid' : ''}`}
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            placeholder="MM/YY"
                          />
                          {errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate}</div>}
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="cvv" className="form-label">CVV</label>
                          <input
                            type="text"
                            className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="XXX"
                          />
                          {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="paypal-info text-center mb-3">
                      <p>You will be redirected to PayPal to complete your payment.</p>
                    </div>
                  )}

                  <div className="billing-address">
                    <h5 className="mb-3">Billing Address</h5>

                    <div className="mb-3">
                      <label htmlFor="billingAddress" className="form-label">Address</label>
                      <input
                        type="text"
                        className={`form-control ${errors.billingAddress ? 'is-invalid' : ''}`}
                        id="billingAddress"
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleChange}
                      />
                      {errors.billingAddress && <div className="invalid-feedback">{errors.billingAddress}</div>}
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-4">
                        <label htmlFor="city" className="form-label">City</label>
                        <input
                          type="text"
                          className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                        />
                        {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="state" className="form-label">State</label>
                        <input
                          type="text"
                          className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                        />
                        {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                      </div>
                      <div className="col-md-4">
                        <label htmlFor="zipCode" className="form-label">ZIP Code</label>
                        <input
                          type="text"
                          className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                        />
                        {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="mb-3">
                      <strong>Total: ₹{totalPrice}</strong>
                    </p>
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Processing...
                        </>
                      ) : 'Complete Payment'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payment;
