# Ecommerce Project

## Backend

### Step 1: Basic Setup

### Step 2: User Management API

- **Create Schema and Model**
- **Validation**
- **Register**
- **Login**
- **Reset Password**
- **Forget Password** -**Update user profile**

### Step 3: Authentication and Authorization

- **Protect Routes**

### Category API

- **Create a Schema and Model**
  - `name`
  - `slug`
- **Create Route and Controller**
- **Add Validation**

### Product API

- **Create Product Schema and Model**
- **Create Product Validation Model**
- **Create a Product**
- **Delete a Product**
- **Update a Product**
- **Get a Product**
  - Use `formidable` package to send photos

### Steps to Run and Test API in Postman

#### Start the Server

Run the project using the following command:

```bash
npm start
```

The server will start on the URL: `http://localhost:3003`

#### User API (User Management)

- **Registration** (POST)

  ```

  URL: http://localhost:3003/api/register
  Body: { name, email, password }
  ```

- **Account Activation** (POST)

  ```

  URL: http://localhost:3003/api/account-activation
  Body: { name, email, password }
  ```

- **Login** (POST)

  ```
  URL: http://localhost:3003/api/login
  Body: { email, password }
  ```

- **Forget Password** (POST)

  ```
  URL: http://localhost:3003/api/forget-password?email=example@example.com
  Body: { email }
  ```

- **Reset Password** (POST)

  ```
  URL: http://localhost:3003/api/reset-password
  Body: { newPassword }
  ```

- **Update The user profile** (PUT)

  ```
  URL: http://localhost:3003/api/update
  //the token must be used after the login
   Headers: { Authorization: <your-token> }
  Body: { name,passwor,address,photo }
  ```









- **Protected Route** (POST)
  ```
  URL: http://localhost:3003/api/protected
  Headers: { Authorization: <your-token> }
  ```


#### Admin API (Admin Management)

- **Registration** (POST)

  ```

  URL: http://localhost:3003/api/admin/register
  Body: { name, email, password }
  ```













#### Category API

- **Create Category** (POST)

  ```
  URL: http://localhost:3003/api/categories
  Body: { name }
  Headers: { Authorization: <your-token> }
  ```

- **Get All Categories** (GET)

  ```
  URL: http://localhost:3003/api/categories
  Headers: { Authorization: <your-token> }
  ```

- **Get Single Category** (GET)

  ```
  URL: http://localhost:3003/api/categories/:slug
  Headers: { Authorization: <your-token> }
  ```

- **Update Category** (PUT)

  ```
  URL: http://localhost:3003/api/categories/:id
  Body: { name }
  Headers: { Authorization: <your-token> }
  ```

- **Delete Category** (DELETE)
  ```
  URL: http://localhost:3003/api/categories/:id
  Headers: { Authorization: <your-token> }
  ```

#### Product API

- **Create Product** (POST)

  ```
  URL: http://localhost:3003/api/products
  Body: { name, description, price, quantity, photo, category }
  Headers: { Authorization: <your-token> }
  ```

- **Update Product** (PUT)

  ```
  URL: http://localhost:3003/api/products/:id
  Headers: { Authorization: <your-token> }
  ```

- **Get Single Product** (GET)

  ```
  URL: http://localhost:3003/api/products/:id
  Headers: { Authorization: <your-token> }
  ```

- **Get specific number of product ** (GET)

  ```
  URL: http://localhost:3003/api/products-count
  Headers: { Authorization: <your-token> }
  ```

- **Get specific number of product as pagination** (GET)

  ```
  URL: http://localhost:3003/api/products/query
  Headers: { Authorization: <your-token> }
  Params:{page,limit}
  ```

- **Get Product Photo** (GET)

  ```
  URL: http://localhost:3003/api/products/photo/:id
  Headers: { Authorization: <your-token> }
  ```

- **Delete Product** (DELETE)

  ```
  URL: http://localhost:3003/api/products/:id
  Headers: { Authorization: <your-token> }
  ```

- **Get count of product** (GET)
  ```
  URL: http://localhost:3003/api/products-count
  Headers: { Authorization: <your-token> }
  ```
- **search the products on the basis of their name or description or slug name** (POST)

  ```
  URL: http://localhost:3003/api/products/search/rice cooker
  Headers: { Authorization: <your-token> }
  ```

- **Payment Integration creating the token and send to the frontend** (GET)

  ```
  URL: http://localhost:3003/api/braintree/token
  Headers: { Authorization: <your-token> }
  ```

- **Payment Integration for processing the payment** (POST)
  ```
  URL: http://localhost:3003/api/braintree/payment
  Headers: { Authorization: <your-token> }
  ```

Order management
-backend: when the payment is successfull processed
----create an order Schema and Model
----store the order in the database

## Frontend

### Steps

1. **Create the React App**

2. **Pages and Routing**

   - Register User
   - Activate User
   - Login User
   - Protected Route for Authentication
   - Manage Login Status with Redux Toolkit
   - Store Login Data in Local Storage
   - Protected Route with Server Response
   - Render Navbar Conditionally
   - Dynamic Dashboard for Users and Admins

3. **Dashboards**

   - Admin Dashboard
   - User Dashboard

4. **APIs**

   - **Category API**
     - Create, Read, Update, Delete
   - **Product API**
     - Create, Read, Update, Delete

5. **Deploy**
