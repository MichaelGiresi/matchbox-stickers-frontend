import { useOktaAuth } from '@okta/okta-react';
import { Navigate } from 'react-router-dom';
import './adminPage.css'
import { useEffect, useState } from 'react';

function AdminPage() {
  const { authState } = useOktaAuth();
  const [products, setProducts] = useState([])
  const [order, setOrders] = useState([])
  const username = 'myusername';
  const password = 'mypassword';
  const credentials = btoa(`${username}:${password}`);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    sku: '',
    quantity: 0,
    unitPrice: 0,
    image_url: '',
    active: 0,
    category_id: 0,
    date_active: ''

  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:8080/api/orders?size=1000'
        const options = {
          method: "GET", 
          headers: 
          {"Content-Type": "application/json", "Authorization" : `Basic ${credentials}`},
        };
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const orders = data
        console.log(orders)
        setOrders(orders)
      } catch (error) {
        console.log(error)
      }
    }
    
    fetchData();
  }, []);  // Empty dependency array means this effect will only run once when the component mounts.
  



  useEffect(() => {
    const fetchProducts = async () => {
        try {
          const url = 'http://localhost:8080/products'
          const options = {
            method: "GET", 
            headers: 
              {"Content-Type": "application/json", "Authorization" : `Basic ${credentials}`},
            };
            const response = await fetch(url, options)
          const data = await response.json();
          const responseData = data
          
          setProducts(responseData._embedded.products)
          console.log(data)
        } catch (error) {
          console.error('Error fetching orders:', error)
        }
      };
      fetchProducts();
      console.log(products)
  },[])



  if (!authState) return null;

  if (authState.isPending) {
    return null; // or some loading spinner
  }

  if (!authState.isAuthenticated) {
    return <Navigate to='/' replace />;
  }



  const handleInputChange = (event) => {
    let value = event.target.value;
  
    // check if the input is for the 'price' field and convert the string to a float
    if (event.target.name === 'unitPrice') {
      value = parseFloat(value);
    }
  
    setNewProduct({
      ...newProduct,
      [event.target.name]: value
    });
  };



  const handleAddProduct = async (event) => {
    event.preventDefault();
    
    // Send a request to your server to add the new product
    const response = await fetch('http://localhost:8080/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Basic ${credentials}`
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
        unitPrice: 0,
        image_url: '',
        active: 0,
        category_id: 0,
        date_active: ''
      });
    } else {
      alert("Failed to add product.");
    }
  }

  const handleEditProduct = async (event) => {
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
        unitPrice: 0,
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
                    <form className='admin-product-add-form' onSubmit={handleAddProduct}>
                        <label className='admin-product-label-input'>
                            Name:
                            <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} />
                        </label>
                        <label className='admin-product-label-input'>
                            SKU:
                            <input type="text" name="sku" value={newProduct.sku} onChange={handleInputChange} />
                        </label>
                        <label className='admin-product-label-input'>
                            Description:
                            <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} />
                        </label>
                        <label className='admin-product-label-input'>
                            Price:
                            <input type="number" name="unitPrice" value={newProduct.unitPrice} onChange={handleInputChange} />
                        </label>
                        <label className='admin-product-label-input'>
                            Quantity:
                            <input type="number" name="quantity" value={newProduct.quantity} onChange={handleInputChange} />
                        </label>
                        <label className='admin-product-label-input'> 
                            Image URL:
                            <input type="text" name="image_url" value={newProduct.image_url} onChange={handleInputChange} />
                        </label>
                        <button onClick={handleAddProduct} type="submit">Add Product</button>
                    </form>
                </div>
            </div>
            <div className='admin-product-edit'>
            <h3 style={{textAlign: 'center'}}>EDIT PRODUCT</h3>
                <div>
                    <form className='admin-product-add-form' onSubmit={handleEditProduct}>
                        <label className='admin-product-label-input'>
                            Name:
                            <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} />
                        </label>
                        <label className='admin-product-label-input'>
                            Description:
                            <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} />
                        </label>
                        <label className='admin-product-label-input'>
                            Price:
                            <input type="number" name="unitPrice" value={newProduct.unitPrice} onChange={handleInputChange} />
                        </label>
                        <label className='admin-product-label-input'> 
                            Image URL:
                            <input type="text" name="imageUrl" value={newProduct.image_url} onChange={handleInputChange} />
                        </label>
                        <button type="submit">Add Product</button>
                    </form>
                </div>
            </div>
        </div>
        <div className='admin-remove-product-container'>
            <div className='admin-remove-product'>
            <h3 style={{textAlign: 'center'}}>REMOVE PRODUCT</h3>
                      <table style={{width: '98%', margin: '0 auto', maxWidth: '1300px'}}>
                      <thead>
                        <tr>
                          <th style={{width: '14.28%'}}>REMOVE</th>
                          <th style={{width: '14.28%'}}>ID</th>
                          <th style={{width: '14.28%'}}>Name</th>
                          <th style={{width: '14.28%'}}>SKU</th>
                          {/* <th>Date Active</th> */}
                          <th style={{width: '14.28%'}}>Quantity</th>
                          <th style={{width: '14.28%'}}>Price</th>
                          <th style={{width: '14.28%'}}>Description</th>
                        </tr>
                      </thead>
                      <tbody>

            {products.map((e) => (
              
              
                  <tr className='admin-remove-product-map'>
                    <td><button>REMOVE</button></td>
                    <td>{e.id}</td>
                    <td>{e.name}</td>
                    <td>{e.sku}</td>
                    {/* <td>{e.dateActive}</td> */}
                    <td>{e.quantity}</td>
                    <td>${e.unitPrice}</td>
                    <td>{e.description}</td>
                    </tr>
                    
                    ))}
                    </tbody>
                    </table>
            </div>
        </div>
        <div className='admin-active-orders'>
        <div className='admin-remove-product'>
            <h3 style={{textAlign: 'center'}}>ORDERS</h3>
                      <table style={{width: '98%', margin: '0 auto', maxWidth: '1300px'}}>
                      <thead style={{}}>
                        <tr style={{}}>
                          <th style={{width: '20%'}}>TOGGLE</th>
                          <th style={{width: '20%'}}>ID</th>
                          <th style={{width: '20%'}}>Tracking Number</th>
                          <th style={{width: '20%'}}>Total Price</th>
                          {/* <th>Date Active</th> */}
                          <th style={{width: '20%'}}>Total Quantity</th>
                        </tr>
                      </thead>
                      <tbody>

            {order.map((e) => (
              
              
                  <tr className='admin-remove-product-map'>
                    <td><button>ACTIVE</button></td>
                    <td>{e.id}</td>
                    <td>{e.orderTrackingNumber}</td>
                    <td>${e.totalPrice}</td>
                    {/* <td>{e.dateActive}</td> */}
                    <td>{e.totalQuantity}</td>
                    </tr>
                    
                    ))}
                    </tbody>
                    </table>
            </div>
        </div>
    </div>
  )
}

export default AdminPage;
