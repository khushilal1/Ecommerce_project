;; # Ecommerce Project

;; ## Backend

;; ### Step 1: Basic Setup

;; ### Step 2: User Management API

;; - **Create Schema and Model**
;; - **Validation**
;; - **Register**
;; - **Login**
;; - **Reset Password**
;; - **Forget Password** -**Update user profile**

;; ### Step 3: Authentication and Authorization

;; - **Protect Routes**

;; ### Category API

;; - **Create a Schema and Model**
;; - `name`
;; - `slug`
;; - **Create Route and Controller**
;; - **Add Validation**

;; ### Product API

;; - **Create Product Schema and Model**
;; - **Create Product Validation Model**
;; - **Create a Product**
;; - **Delete a Product**
;; - **Update a Product**
;; - **Get a Product**
;; - Use `formidable` package to send photos

;; ### Steps to Run and Test API in Postman

;; #### Start the Server

;; Run the project using the following command:

;; `bash
;; npm start
;; `

;; The server will start on the URL: `http://localhost:3003`

;; #### User API (User Management)
;; - **Registration** (POST)

;; `;;   URL: http://localhost:3003/api/register
;;   Body: { name, email, password }
;;  `

;; - **Account Activation** (POST)

;; `URL: http://localhost:3003/api/account-activation
;;   Body: { name, email, password }
;;   `

;; - **Login** (POST)
;; `URL: http://localhost:3003/api/login
;;   Body: { email, password }
;;   `

;; - **Forget Password** (POST)
;; `;;   URL: http://localhost:3003/api/forget-password?email=example@example.com
;;   Body: { email }
;;  `

;; - **Reset Password** (POST)
;; `;;   URL: http://localhost:3003/api/reset-password
;;   Body: { newPassword }
;;  `

;; - **Update The user profile** (PUT)
;; `;;   URL: http://localhost:3003/api/update
;;   //the token must be used after the login
;;    Headers: { Authorization: <your-token> }
;;   Body: { name,passwor,address,photo }
;;  `

;; - **Protected Route** (POST)
;; `;;   URL: http://localhost:3003/api/protected
;;   Headers: { Authorization: <your-token> }
;;  `

;; #### Admin API (Admin Management)

;; - **Registration** (POST)

;; `URL: http://localhost:3003/api/admin/register
;;   Body: { name, email, password }
;;   `

;; - **Account Activation** (POST)
;; `URL: http://localhost:3003/api/admin/account-activation
;;   Body: { name, email, password }
;;   `

;; - **Login** (POST)
;; `;;   URL: http://localhost:3003/api/admin/login
;;   Body: { email, password }
;;  `

;; - **Forget Password** (POST)
;; `URL:http://localhost:3003/api/admin/forget-password
;;   Body: { email }
;;   `

;; - **Reset Password** (POST)

;; `;;   URL: http://localhost:3003/api/admin/reset-password
;;   Body: { newPassword }
;;  `

;; - **Update The admin profile** (PUT)

;; `;;   URL: http://localhost:3003/api/admin/update
;;   //the token must be used after the login
;;    Headers: { Authorization: <your-token> }
;;   Body: { name,passwor,address,photo }
;;  `

;; #### Category API

;; - **Create Category** (POST)

;; ```
;; the user should be loggedin and admin to create the category
;; URL: http://localhost:3003/api/categories
;; Body: { name }
;; Headers: { Authorization: <your-token> }

;; ```

;; AnyOne can get the access of the category
;; - **Get All Categories** (GET)

;; `;;   URL: http://localhost:3003/api/categories
;;   Headers: { Authorization: <your-token> }
;;  `

;; - **Get Single Category** (GET)
;; categories cab be get with the slug or nmae of categories
;; `;;   URL: http://localhost:3003/api/categories/:slug
;;   Headers: { Authorization: <your-token> }
;;  `

;; - **Update Category** (PUT)
;; The user must me admin to update the categories
;; `;;   URL: http://localhost:3003/api/categories/:id
;;   Body: { name }
;;   Headers: { Authorization: <your-token> }
;;  `

;; - **Delete Category** (DELETE)
;; The user must me admin to update the categories

;; `;;   URL: http://localhost:3003/api/categories/:id
;;   Headers: { Authorization: <your-token> }
;;  `

;; #### Product API

;; - **Create Product** (POST)

;; `;;   URL: http://localhost:3003/api/products
;;   Body: { name, description, price, quantity, photo, category }
;;   Headers: { Authorization: <your-token> }
;;  `

;; - **Update Product** (PUT)

;; `;;   URL: http://localhost:3003/api/products/:id
;;   Headers: { Authorization: <your-token> }
;;  `

;; - **Get Single Product** (GET)

;; `;;   URL: http://localhost:3003/api/products/:id
;;   Headers: { Authorization: <your-token> }
;;  `

;; - **Get specific number of product ** (GET)

;; `;;   URL: http://localhost:3003/api/products-count
;;   Headers: { Authorization: <your-token> }
;;  `

;; - **Get specific number of product as pagination** (GET)

;; `;;   URL: http://localhost:3003/api/products/query
;;   Headers: { Authorization: <your-token> }
;;   Params:{page,limit}
;;  `

;; - **Get Product Photo** (GET)

;; `;;   URL: http://localhost:3003/api/products/photo/:id
;;   Headers: { Authorization: <your-token> }
;;  `

;; - **Delete Product** (DELETE)

;; `;;   URL: http://localhost:3003/api/products/:id
;;   Headers: { Authorization: <your-token> }
;;  `

;; - **Get count of product** (GET)
;; `;;   URL: http://localhost:3003/api/products-count
;;   Headers: { Authorization: <your-token> }
;;  `
;; - **search the products on the basis of their name or description or slug name** (POST)

;; `;;   URL: http://localhost:3003/api/products/search/rice cooker
;;   Headers: { Authorization: <your-token> }
;;  `

;; - **Payment Integration creating the token and send to the frontend** (GET)

;; `;;   URL: http://localhost:3003/api/braintree/token
;;   Headers: { Authorization: <your-token> }
;;  `

;; - **Payment Integration for processing the payment** (POST)
;; `;;   URL: http://localhost:3003/api/braintree/payment
;;   Headers: { Authorization: <your-token> }
;;  `

;; Order management
;; -backend: when the payment is successfull processed
;; ----create an order Schema and Model
;; ----store the order in the database

# E-commerce Project

This is a backend implementation of an e-commerce application that includes features like user and admin management, product management, category management, and payment integration. The project uses Node.js, Express, and MongoDB to provide a scalable and efficient solution.

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB
- Postman (for API testing)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd ecommerce-backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and configure the following variables:

   ```env
   PORT=3003
   DATABASE_URL=<your-mongodb-url>
   JWT_SECRET=<your-jwt-secret>
   ```

5. Start the server:

   ```bash
   npm start
   ```

   The server will start at `http://localhost:3003`.

---

## Features

### User Management

- User Registration
- Login and Authentication
- Account Activation
- Password Reset and Forgot Password
- Update User Profile
- Protected Routes

### Admin Management

- Admin Registration
- Login and Authentication
- Account Activation
- Password Reset and Forgot Password
- Update Admin Profile

### Category Management

- Create, Update, and Delete Categories (Admin only)
- Fetch All or Single Category (Public access)

### Product Management

- Add, Update, and Delete Products (Admin only)
- Fetch Products with Pagination
- Search Products by Name, Description, or Slug
- Product Photo Upload and Retrieval

### Payment Integration

- Braintree Payment Gateway Integration:
  - Generate Payment Token
  - Process Payments

### Order Management

- Create and Store Orders upon Successful Payment

---

## API Documentation

### User API

- **Registration**

  ```http
  POST /api/register
  Body: { "name": "John Doe", "email": "john@example.com", "password": "123456" }
  ```

- **Login**

  ```http
  POST /api/login
  Body: { "email": "john@example.com", "password": "123456" }
  ```

- **Forget Password**

  ```http
  POST /api/forget-password
  Body: { "email": "john@example.com" }
  ```

- **Reset Password**

  ```http
  POST /api/reset-password
  Body: { "newPassword": "newpassword123" }
  ```

- **Update User Profile**

  ```http
  PUT /api/update
  Headers: { Authorization: <your-token> }
  Body: { "name": "John Doe", "password": "newpassword123", "address": "123 Street", "photo": "base64string" }
  ```

- **Protected Route**

  ```http
  GET /api/protected
  Headers: { Authorization: <your-token> }
  ```

### Admin API

- **Registration**

  ```http
  POST /api/admin/register
  Body: { "name": "Admin", "email": "admin@example.com", "password": "admin123" }
  ```

- **Login**

  ```http
  POST /api/admin/login
  Body: { "email": "admin@example.com", "password": "admin123" }
  ```

- **Update Admin Profile**

  ```http
  PUT /api/admin/update
  Headers: { Authorization: <your-token> }
  Body: { "name": "Admin", "password": "newpassword123" }
  ```

### Category API

- **Create Category**

  ```http
  POST /api/categories
  Headers: { Authorization: <your-token> }
  Body: { "name": "Electronics" }
  ```

- **Get All Categories**

  ```http
  GET /api/categories
  ```

- **Get Single Category**

  ```http
  GET /api/categories/:slug
  ```

- **Update Category**

  ```http
  PUT /api/categories/:id
  Headers: { Authorization: <your-token> }
  Body: { "name": "Updated Electronics" }
  ```

- **Delete Category**

  ```http
  DELETE /api/categories/:id
  Headers: { Authorization: <your-token> }
  ```




### Product API

- **Create Product**

  ```http
  POST /api/products
  Headers: { Authorization: <your-token> }
  Body: { "name": "Laptop", "description": "High-performance laptop", "price": 1000, "quantity": 5, "category": "Electronics", "photo": "base64string" }
  ```

- **Get All Products**

  ```http
  GET /api/products
  ```

- **Search Products**

  ```http
  GET /api/products/search?query=laptop
  ```

- **Delete Product**

  ```http
  DELETE /api/products/:id
  Headers: { Authorization: <your-token> }
  ```

### Payment API

- **Generate Payment Token**

  ```http
  GET /api/braintree/token
  Headers: { Authorization: <your-token> }
  ```

- **Process Payment**

  ```http
  POST /api/braintree/payment
  Headers: { Authorization: <your-token> }
  Body: { "paymentMethodNonce": "nonce-from-client", "amount": 100 }
  ```

---

## License

This project is licensed under the MIT License.
