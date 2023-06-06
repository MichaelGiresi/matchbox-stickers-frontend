import React, { useContext, useEffect, useState } from 'react'
import './checkout.css'
import { CartContext } from '../../contexts/CartContext'
import { stringify } from 'querystring'
import { toast } from 'react-toastify'
import { setDefaultResultOrder } from 'dns'

const Checkout = () => {
  const cartContext = useContext(CartContext)
  const [randomNumber1, setRandomNumber1] = useState(Number)
  const [randomNumber2, setRandomNumber2] = useState(Number)
  const [randomNumber3, setRandomNumber3] = useState(Number)
  const [finalOrderNumber, setFinalOrderNumber] = useState(String)
  const [customers, setCustomers] = useState([])
  const [shippingAddresses, setShippingAddresses] = useState([])
  let total = cartContext?.cartSubTotal
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    shippingStreet: '',
    shippingCity: '',
    shippingState: '',
    shippingCountry: '',
    shippingZipCode: '',
    billingCheckBox: false,
    billingStreet: '',
    billingCity: '',
    billingState: '',
    billingCountry: '',
    billingZipCode: '',
    fullNameOnCard: '',
    cardNumber: '',
    securityCode: '',
    expirationMonth: '',
    expirationYear: ''
  });

  // useEffect(() => {
  //   console.log(cartContext?.localCartItems)
  // })

  // Checkout Interface Defintions

  interface OrderItems {
    quantity: Number,
    unitPrice: Number,
    orderId: {id: Number},
    productId: {id: Number},
  }


interface Checkout {
    orderTrackingNumber: number;
    totalPrice: number;
    totalQuantity: number;
    customer: {id: number};
    shippingAddressId: {id: number};
    status: boolean;
}

  interface Customer {
    firstName: string,
    lastName: string,
    email: string
  }

  interface ShippingAddress {
    customer: { id: Number },
    city: String,
    country: String,
    state: String,
    street: String,
    zipCode: String
  }


// Checkout Interface Declarations
 const newCustomer: Customer = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email
  }


//
// Submit form
//
  const handleSubmit = async (event:any) => {
    event.preventDefault();
    let activeCustomer: any[] = [];
    let activeShippingAddressId = 0;
    let activeOrderNumber = 0;
    let activeOrderId = 0;

    // Order Tracking Number Generator 

    let randomNumber1: number = 0;
    for (let i = 0; i < 200; i++) {
        randomNumber1 += Math.floor(Math.random() * 123);
    }
    setRandomNumber1(randomNumber1)
    // console.log(randomNumber1);
    
    let randomNumber2: number = 0;
    for (let i = 0; i < 200; i++) {
        randomNumber2 += Math.floor(Math.random() * 456);
    }
    setRandomNumber2(randomNumber2)
    // console.log(randomNumber2);
    
    let randomNumber3: number = 0;
    for (let i = 0; i < 200; i++) {
        randomNumber3 += Math.floor(Math.random() * 789);
    }
    setRandomNumber3(randomNumber3)
    // console.log(randomNumber3);
    const finalOrderNum = (`${randomNumber1}${randomNumber2}${randomNumber3}`)
    
    // const parseFinalOrderNumber = parseInt(finalOrderNumber, 10)
    setFinalOrderNumber(finalOrderNum)
    let orderTrackingNumber: number = parseInt(finalOrderNum)
    // console.log(orderTrackingNumber)
    
    const urlCustomers = 'http://localhost:8080/customers'
    const username = 'myusername';
    const password = 'mypassword';
    const credentials = btoa(`${username}:${password}`);
    if(cartContext?.localCartItems.length === 0) {
      toast.error("Your Cart is Empty!")
    } else {

    

    try {
    // Check to see if customer already exists in the database, Get array of customers
    const optionsCustomers = {
      method: "GET", 
      headers: 
        {"Content-Type": "application/json",
        "Authorization" : `Basic ${credentials}`}
      };
      const response = await fetch(urlCustomers, optionsCustomers);
      const data = await response.json();
      const customerArray = data._embedded.customers;
      setCustomers(customerArray)
      console.log(customerArray)

      // If form input is empty
      if(formData.firstName === '' || formData.lastName === '' || formData.email === '') {
        toast.error("Please Complete All Fields")
      } else {

      // Looping over the length of customers array
      let a = false
      for(let i = 0; i < customerArray.length; i++) {

      // If the form data does not match any existing customers, post new customer
       if(customerArray[i].firstName === formData.firstName && customerArray[i].lastName === formData.lastName && customerArray[i].email === formData.email) {
        a = true

        activeCustomer = [customerArray[i].id, customerArray[i].firstName, customerArray[i].lastName, customerArray[i].email]
        console.log(activeCustomer)
        } 
      }
        if(a) {
          console.log("customer already exist")
          // toast.error("The Customer already exists")
          

          
        } else {
          // Post new customer to the database
          console.log("The customer does not exist, adding them to the database...")
          try{
            await fetch('http://localhost:8080/customers', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Basic ${credentials}`
              },
              body: JSON.stringify(newCustomer)
            }) 
            toast.success("New Customer Added")
            console.log("New Customer Added!")
            setCustomers([...customerArray, newCustomer])
            
          }
          catch{
            toast.error("The Customer wasn't added")
            console.log("New Customer Not added")
          }
          
          // Final get request to customers table to get all information on new customer.
          try {
            console.log("Getting the most up to date customer table...")
            const urlCustomers = 'http://localhost:8080/customers'
            const optionsCustomers = {
            method: "GET", 
            headers: 
              {"Content-Type": "application/json", "Authorization" : `Basic ${credentials}`},
            };
            const response = await fetch(urlCustomers, optionsCustomers);
            const data = await response.json();
            const customerArray = data._embedded.customers;
            console.log(customerArray)
            for(let i = 0; i < customerArray.length; i++) {
              if(customerArray[i].firstName === formData.firstName && customerArray[i].lastName === formData.lastName && customerArray[i].email === formData.email) {

                activeCustomer = [customerArray[i].id, customerArray[i].firstName, customerArray[i].lastName, customerArray[i].email]
                console.log(`The active customer has been found!`)
                } 
            }
          }
          catch (error){
            console.log(`There was an error ${error}`)
          }
        } 
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    // End of Customer GET and POST

  

    // Shipping GET and POST
    try {
      const shippingAddressArrayUrl = 'http://localhost:8080/shippingAddresses'
      const shippingAddressArrayOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json", "Authorization" : `Basic ${credentials}`}
      }
      const response = await fetch(shippingAddressArrayUrl, shippingAddressArrayOptions)
      const data = await response.json();
      const shippingAddressArray = data._embedded.shippingAddresses
      console.log(shippingAddressArray)
      setShippingAddresses(shippingAddressArray)
      

      // Check if any shipping inputs are empty
      if (formData.shippingStreet ==='' || formData.shippingCity === '' || formData.shippingState === '' || formData.shippingCountry === '' || formData.shippingZipCode === '') {
        toast.error("Please enter all shipping address information")
      } else {
        console.log(`The active customer id is ${activeCustomer[0]}`)
        // check if shipping information entered in the inputs already exists on the database
        let a = false
        for (let i = 0; i < shippingAddressArray.length; i++) {

          if(shippingAddressArray[i].city === formData.shippingCity && 
            shippingAddressArray[i].country === formData.shippingCountry && 
            shippingAddressArray[i].state === formData.shippingState &&
            shippingAddressArray[i].street === formData.shippingStreet &&
            shippingAddressArray[i].zipCode === formData.shippingZipCode &&
            shippingAddressArray[i].customerId === activeCustomer[0]) {
              a = true
              
            }

        }

        // console.log(activeCustomer)

        // if the shipping address does not exist in the shipping_address table
        if(!a) {
          console.log('The shipping address didnt exist, adding it to the database..')
          const newShippingAddress: ShippingAddress = {
    
            city: formData.shippingCity,
            country: formData.shippingCountry,
            state: formData.shippingState,
            street: formData.shippingStreet,
            zipCode: formData.shippingZipCode,
            customer: {id: activeCustomer[0]}
        
          }

          // POST to shipping_address table 
          try{
            await fetch('http://localhost:8080/api/shipping_addresses', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', "Authorization" : `Basic ${credentials}`
              },
              body: JSON.stringify(newShippingAddress)
            }) 
            .then(response => {
              console.log("Response Status: ", response.status)
              console.log("Response Status Text: ", response.statusText)
            })            
          }
          catch (error){
            toast.error("The Shipping Address wasn't added")
            console.log(error)
          }
        } else {
          console.log('The Shipping address and customer id already exist')
        }
      }
    }
    catch (error) {
      console.error("Error fetching data", error)
    }

    // GET request of shipping table to get active shipping id
    try {
      const urlShippingAddresses = 'http://localhost:8080/api/shipping_addresses'
      const optionsShippingAddresses = {
      method: "GET", 
      headers: 
        {"Content-Type": "application/json", "Authorization": `Basic ${credentials}`},
      };
      const response = await fetch(urlShippingAddresses, optionsShippingAddresses);
      const data = await response.json();
      // console.log(data)
      const shippingAddressesQuery = data
      for(let i = 0; i < shippingAddressesQuery.length; i++) {
        if(shippingAddressesQuery[i].city === formData.shippingCity && 
          shippingAddressesQuery[i].country === formData.shippingCountry && 
          shippingAddressesQuery[i].state === formData.shippingState && 
          shippingAddressesQuery[i].street === formData.shippingStreet &&
          shippingAddressesQuery[i].zipCode === formData.shippingZipCode) {

          activeShippingAddressId = shippingAddressesQuery[i].id
          // console.log(`This is the active shipping id = ${activeShippingAddressId}`)
          } 
      }
    }
    catch (error){
      console.log(`There was an error ${error}`)
    }

  try {
    const newCheckout: Checkout = {
    

      orderTrackingNumber: orderTrackingNumber,
      totalPrice: total,
      totalQuantity: cartContext?.cartCount,
      customer: {id: activeCustomer[0]},
      shippingAddressId: {id: activeShippingAddressId},
      status: true

      
    }
    console.log(activeShippingAddressId)
    console.log(orderTrackingNumber)
    console.log(total)
    console.log(activeCustomer[0])
    console.log(cartContext?.cartCount)

    // make POST request to order table
    await fetch('http://localhost:8080/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 'Authorization': `Basic ${credentials}`
      },
      body: JSON.stringify(newCheckout)
    })
    .then(response => {
      if(response.status === 200) {
        toast.success("Your Order Has Been Received!")
      }
      console.log("Response Status: ", response.status)
      console.log("Response Status Text: ", response.statusText)
    })
  } 
  catch (error){
    console.log("There was an error posting the new order")
    console.log(error)
  }
  // Final GET request for the new order number
  try {
    const url = 'http://localhost:8080/api/orders?size=1000'
    const options = {
    method: "GET", 
    headers: 
      {"Content-Type": "application/json", "Authorization" : `Basic ${credentials}`},
    };
    const response = await fetch(url, options);
    const data = await response.json();
    const orders = data
    // console.log(orders)
    // console.log(orderTrackingNumber)
    for(let i = 0; i < orders.length; i++) {
      if(orders[i].orderTrackingNumber === orderTrackingNumber) {

        // activeOrderNumber = orders[i].orderTrackingNumber
        activeOrderId = orders[i].id
        console.log(`This is the active order id = ${activeOrderId}`)
        } 
    }
    
  }
  catch (error){
    console.log(`There was an error ${error}`)
  }

  for(let i = 0; i < cartContext?.localCartItems.length; i++ ) {
    try{
      console.log(cartContext?.localCartItems)
      const newOrderItems: OrderItems = {
        quantity: 1,
        unitPrice: cartContext?.localCartItems[i].unitPrice,
        orderId: {id: activeOrderId},
        productId: {id: cartContext?.localCartItems[i].id}
    }
    // console.log(newOrderItems)
    const response = await fetch('http://localhost:8080/api/order-items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Basic ${credentials}`
      },
      body: JSON.stringify(newOrderItems)
    });
    
    // console.log("Response Status: ", response.status);
    // console.log("Response Status Text: ", response.statusText);
    
  }
  catch (error){
    console.log(error)
  }
}

try {
  const url = 'http://localhost:8080/products'
  const options = {
    method: "GET",
    headers: {"Content-Type": 'application/json', 'Authorization' : `Basic ${credentials}`},
  };
  const response = await fetch(url, options);
  const data = await response.json();
  const products = data._embedded.products
  console.log("Here is the list of products from the checkout button")
  console.log(products)
//   const sizeMapping = {
//     1: "sizeSmall",
//     2: "sizeMedium",
//     3: "sizeLarge",
//     4: "sizeExtraLarge",
//     5: "sizeExtraExtraLarge"
// }

// If the product id from the get request, and the product id from the 
// current local cart items elemet in the array equal, then we want to create
// a put request, involving the size id of the localcartitems[j] array.
// Subtract the quanity from the value in the field of products[i].sizeMapping[cartContext?.localcartItems[j][9]]
for(let i = 0; i < products.length; i++) {
  for(let j = 0; j < cartContext?.localCartItems.length; j++){
    if(products[i].id === cartContext?.localCartItems[j].id) {
        // const size = sizeMapping[cartContext?.localCartItems[j][9]]
        const quantity = cartContext?.localCartItems[j].quantity
        console.log(quantity)
        // const productSize = products[i][size]
        // console.log(size)
        // console.log(productSize)
        const total = products[i].quantity - 1
        console.log(`This is the total quantity to be subtracted from the current total ${total}`)
      console.log(`This is the product id that will be updated ${products[i].id}`)
        try {
          // const sizeMapPutRequest: string = sizeMapping[cartContext?.localCartItems[j][9]]
          // console.log(sizeMapPutRequest)
          const url = `http://localhost:8080/products/${products[i].id}`
          const options = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization" : `Basic ${credentials}`
            },
            body: JSON.stringify({"quantity": total})
          };
          const response = await fetch(url, options);
          if (response.status === 200) {
            
            console.log("Successfully updated the quantity")
            console.log(response.status)
          } else {
            console.error("Failed to update the quantity")
          }
        } catch (error) {
          console.log(`There was an error in the size subtraction ${error}`)
        }
      }
    }
    
  }
} catch (error){
  console.log(`There was an error getting the array of products ${error}`)
}

    }

  };
  

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
  
    if (type === 'checkbox' && name === 'billingCheckBox' && checked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        billingStreet: prevFormData.shippingStreet,
        billingCity: prevFormData.shippingCity,
        billingState: prevFormData.shippingState,
        billingCountry: prevFormData.shippingCountry,
        billingZipCode: prevFormData.shippingZipCode,
        [name]: checked,
      }));
    } else if (type === 'checkbox' && name === 'billingCheckBox' && !checked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        billingStreet: '',
        billingCity: '',
        billingState: '',
        billingCountry: '',
        billingZipCode: '',
        [name]: checked,
      }));
    } else if (name.startsWith('shipping')) {
      const updatedFormData = {
        ...formData,
        [name]: value,
      };
  
      if (formData.billingCheckBox) {
        const billingAddressFields = name.replace('shipping', 'billing');
        updatedFormData[billingAddressFields] = value;
      }
  
      setFormData(updatedFormData);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  // Local Cart Remove Button
  const cartRemove = (indexToRemove) => {
    console.log(indexToRemove)

    cartContext?.setCartCount(cartContext?.localCartItems[indexToRemove][4] - cartContext?.cartCount)
    cartContext?.setLocalCartItems(cartContext?.localCartItems.filter((_, index) => index !== indexToRemove));
  }

  return (

    <div className='checkout-container'>
        <div className='checkout-cart-container'>
          <h1 style={{color: "black", textAlign: 'center', marginBottom: '50px', fontFamily: 'Barlow', marginTop: '-2px'}}>Cart Contents:</h1>
        {cartContext?.localCartItems.map((e, index) => (

<div key={index} id="cart-product-info-id" className="checkout-product-info-container">
  <div>
    <img id="cart-image-id" src={cartContext?.localCartItems[index].imageUrl} className="cart-product-image" />

  </div>
  <div className="cart-product-info-increment-wrapper">
    <div className="cart-product-info">

      {/* Product Name */}
      <h1 style={{textAlign: 'center'}}>{cartContext?.localCartItems[index].name}</h1>

      {/* Product Size */}
      

      {/* Product Price */}
      <h2 style={{marginTop: 0, textAlign: 'center'}}>{`$${cartContext?.localCartItems[index].unitPrice}`}</h2>

      {/* Product In Stock */}

      {/* Remove Button */}
      <button className="cart-product-remove-button" id="cart-product-remove" onClick={() => { cartRemove(index) }}>REMOVE</button>
    </div>

  </div>
</div>

))}
        </div>
        <div className='checkout-input-container'>
          <form className='checkout-input-form'>
            <label className='checkout-input-label'>
              First Name:
              <input className='checkout-input-form-input' type="text" name="firstName" value={formData.firstName} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              Last Name:
              <input className='checkout-input-form-input' type="text" name="lastName" value={formData.lastName} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              Email:
              <input className='checkout-input-form-input' type="email" name="email" value={formData.email} onChange={handleChange}/>
            </label>
          </form>
          <h3 style={{fontFamily: 'Allerta Stencil'}}>Shipping Information:</h3>
          <form className='checkout-input-form'>
            <label className='checkout-input-label'>
              Street:
              <input className='checkout-input-form-input' type="text" name="shippingStreet" value={formData.shippingStreet} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              City:
              <input className='checkout-input-form-input' type="text" name="shippingCity" value={formData.shippingCity} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              State:
              <input className='checkout-input-form-input' type="text" name="shippingState" value={formData.shippingState} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              Country:
              <input className='checkout-input-form-input' type="text" name="shippingCountry" value={formData.shippingCountry} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              Zip Code:
              <input className='checkout-input-form-input' type="text" name="shippingZipCode" value={formData.shippingZipCode} onChange={handleChange}/>
            </label>
          </form>
          <h3 style={{fontFamily: 'Allerta Stencil'}}>Billing Address:</h3>
          <form className='checkout-input-form'>
          <label className='checkout-input-label-checkbox'>
              <input className='checkout-input-form-input-checkbox' onChange={handleChange} type="checkbox" name="billingCheckBox"/>
              Billing Address same as Shipping Address
            </label>
            <label className='checkout-input-label'>
              Street:
              <input className='checkout-input-form-input' type="text" name="billingStreet" value={formData.billingStreet} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              City:
              <input className='checkout-input-form-input' type="text" name="billingCity" value={formData.billingCity} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              State:
              <input className='checkout-input-form-input' type="text" name="billingState" value={formData.billingState} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              Country:
              <input className='checkout-input-form-input' type="text" name="billingCountry" value={formData.billingCountry} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              Zip Code:
              <input className='checkout-input-form-input' type="text" name="billingZipCode" value={formData.billingZipCode} onChange={handleChange}/>
            </label>
          </form>
          <h3 style={{fontFamily: 'Allerta Stencil'}}>Credit Card Information:</h3>
          <form className='checkout-input-form'>
            <label className='checkout-input-label'>
              Full name on card:
              <input className='checkout-input-form-input' type="text" name="fullNameOnCard" value={formData.fullNameOnCard} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              Card Number:
              <input className='checkout-input-form-input' type="number" name="cardNumber" value={formData.cardNumber} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              Security Code:
              <input className='checkout-input-form-input' type="number" name="securityCode" value={formData.securityCode} onChange={handleChange}/>
            </label>
            <label className='checkout-input-label'>
              Expiration Month:
              <select className='credit-month-selection' name="month" value={formData.expirationMonth} onChange={handleChange}>
                <option value="">Select a month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </label>
            <label className='checkout-input-label'>
              Expiration Year:
              <input className='checkout-input-form-input' type="number" name="expirationYear" value={formData.expirationYear} onChange={handleChange}/>
            </label>
          </form>
          <button className='checkout-submit-button' onClick={(handleSubmit)}>Place Order</button>
        </div>
    </div>
  )
}

export default Checkout
