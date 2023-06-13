import { useOktaAuth } from '@okta/okta-react';
import { Navigate } from 'react-router-dom';
import './adminPage.css'
import { useState } from 'react';

function AdminPage() {
  const { authState } = useOktaAuth();

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    sku: '',
    quantity: 0,
    unit_price: 0,
    image_url: '',
    active: 0,
    category_id: 0,
    date_active: ''

  })

  if (!authState) return null;

  if (authState.isPending) {
    return null; // or some loading spinner
  }

  if (!authState.isAuthenticated) {
    return <Navigate to='/' replace />;
  }



  const handleInputChange = (event) => {
    setNewProduct({
      ...newProduct,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Send a request to your server to add the new product
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    });

    if (response.ok) {
      alert("Product added!");
      setNewProduct({
        name: '',
        description: '',
        sku: '',
        quantity: 0,
        unit_price: 0,
        image_url: '',
        active: 0,
        category_id: 0,
        date_active: ''
      });
    } else {
      alert("Failed to add product.");
    }
  }


  return (
    <div className='admin-page'>
        <h1 style={{textAlign: 'center'}}>Admin Page</h1>
        <div className='admin-product-add-edit-container'>

        <div className='admin-product-add'>
            <h3 style={{textAlign: 'center'}}>ADD PRODUCT</h3>
            <div>
            <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} />
      </label>
      <label>
        Description:
        <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} />
      </label>
      <label>
        Price:
        <input type="number" name="price" value={newProduct.unit_price} onChange={handleInputChange} />
      </label>
      <label>
        Image URL:
        <input type="text" name="imageUrl" value={newProduct.image_url} onChange={handleInputChange} />
      </label>
      <button type="submit">Add Product</button>
    </form>
            </div>

        </div>
        <div className='admin-product-edit'>
        Edit
        </div>
        </div>
        <div className='admin-remove-product-container'>
            <div className='admin-remove-product'>
            Remove
            </div>
        </div>
        <div className='admin-active-orders'>
            Active Orders
        </div>
    </div>
  )

  // AdminPage code here
}

export default AdminPage;
