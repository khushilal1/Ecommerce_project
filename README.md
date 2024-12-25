# Ecommerce-project

## Backend

## step 1: Basic Setup

## step2: Use Management API

--create schema and model
--validation
--register
--login
--reset password
--forget password

## step 3:Authentication and authorization

--protect my routes

## category API

--create a schema and model
--name,slug
--crate route and controller
--add validation

## Product API

--create product schema and model
--create product validation model
--create a product
--delete the Product
--update the product
--get a Product

-----formidable package is used to send the photos


## step to run  and get the api testing on postman 
#for the regitser of the user:
##start the project using the command as:npm start
The server start to on the url:http://localhost:3003 
//for testing the user api:
//for registration of the user

http://localhost:3003/api/register

and put the name,email,password and address into the body of the postman as the POST request


## for login
http://localhost:3003/api/login
and put the email and password in order to login to theb system

##for forget password 
http://localhost:3003/api/forget-password?email=077bct039@ioepc.edu.np
and enter the email in the body of the postman as the POST request




## for reset the password
# This is as the post request
http://localhost:3000/api/reset-password
and put the new password as update one


## for the protected route 
#This is post request of the protected login
http://localhost:3000/api/protected




 ########CATEGORY API
##this is the route for the creating category
##This is also POST for creating the products
###postman->header->Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzY2YzFkYmI2MGNhY2VhNzFlNTc4NDciLCJpYXQiOjE3MzUwOTUxMjYsImV4cCI6MTczNTEzMTEyNn0.5xXpBfHDDMRew5Cvwlwql6bfc0-K_DaIxmgV_IwSky0
http://localhost:3003/api/products/
 Put the name of category in the body of the postman and also should put the :in the params oif the post as  postman->header->Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzY2YzFkYmI2MGNhY2VhNzFlNTc4NDciLCJpYXQiOjE3MzUwOTUxMjYsImV4cCI6MTczNTEzMTEyNn0.5xXpBfHDDMRew5Cvwlwql6bfc0-K_DaIxmgV_IwSky0



##This is route for the getting all the category
##this is the GET request 
##Remember that te header must contain the token as authorization
###postman->header->Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzY2YzFkYmI2MGNhY2VhNzFlNTc4NDciLCJpYXQiOjE3MzUwOTUxMjYsImV4cCI6MTczNTEzMTEyNn0.5xXpBfHDDMRew5Cvwlwql6bfc0-K_DaIxmgV_IwSky0
http://localhost:3003/api/categories




##This is route for the getting single the category
##this is the GET request 
##Remember that te header must contain the token as authorization
##Getting the category with slug-name
###postman->header->Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzY2YzFkYmI2MGNhY2VhNzFlNTc4NDciLCJpYXQiOjE3MzUwOTUxMjYsImV4cCI6MTczNTEzMTEyNn0.5xXpBfHDDMRew5Cvwlwql6bfc0-K_DaIxmgV_IwSky0
http://localhost:3003/api/categories/electric-cooker



##This is route for the updating the category
##this is the PUT request 
##Remember that te header must contain the token as authorization
##put the new of the category in the body of postman
## put the id of existing category
name:computer
###postman->header->Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzY2YzFkYmI2MGNhY2VhNzFlNTc4NDciLCJpYXQiOjE3MzUwOTUxMjYsImV4cCI6MTczNTEzMTEyNn0.5xXpBfHDDMRew5Cvwlwql6bfc0-K_DaIxmgV_IwSky0
http://localhost:3003/api/categories/676658c3d1dafc55d9426d70



##This is route for the deleting the category
##this is the DELETE request 
##Remember that te header must contain the token as authorization
##put the new of the category in the body of postman
###postman->header->Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzY2YzFkYmI2MGNhY2VhNzFlNTc4NDciLCJpYXQiOjE3MzUwOTUxMjYsImV4cCI6MTczNTEzMTEyNn0.5xXpBfHDDMRew5Cvwlwql6bfc0-K_DaIxmgV_IwSky0
http://localhost:3003/api/categories/676658ded1dafc55d9426d76





 #######PRODUCT API
##this is the route for the creating product
##This is also POST for creating the products
##select the form-data 
###postman->header->Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzY2YzFkYmI2MGNhY2VhNzFlNTc4NDciLCJpYXQiOjE3MzUwOTUxMjYsImV4cCI6MTczNTEzMTEyNn0.5xXpBfHDDMRew5Cvwlwql6bfc0-K_DaIxmgV_IwSky0
http://localhost:3003/api/products/
name,description,price,quantity,photo,category as the id in the body of the postman and   postman->header->Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzY2YzFkYmI2MGNhY2VhNzFlNTc4NDciLCJpYXQiOjE3MzUwOTUxMjYsImV4cCI6MTczNTEzMTEyNn0.5xXpBfHDDMRew5Cvwlwql6bfc0-K_DaIxmgV_IwSky0



##This is route for the updating all the products
##this is the PUT request 
##Remember that te header must contain the token as authorization
###postman->header->Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzY2YzFkYmI2MGNhY2VhNzFlNTc4NDciLCJpYXQiOjE3MzUwOTUxMjYsImV4cCI6MTczNTEzMTEyNn0.5xXpBfHDDMRew5Cvwlwql6bfc0-K_DaIxmgV_IwSky0
http://localhost:3003/api/products




##This is route for the getting single the product
##this is the GET request 
##Remember that te header must contain the token as authorization
##Getting the product 
###postman->header->Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzY2YzFkYmI2MGNhY2VhNzFlNTc4NDciLCJpYXQiOjE3MzUwOTUxMjYsImV4cCI6MTczNTEzMTEyNn0.5xXpBfHDDMRew5Cvwlwql6bfc0-K_DaIxmgV_IwSky0
http://localhost:3003/api/categories/



##This is for getting the photo back using the photo id as the products
##this is the PUT request 
##Remember that te header must contain the token as authorization
## put the id of product
###postman->header->Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzY2YzFkYmI2MGNhY2VhNzFlNTc4NDciLCJpYXQiOjE3MzUwOTUxMjYsImV4cCI6MTczNTEzMTEyNn0.5xXpBfHDDMRew5Cvwlwql6bfc0-K_DaIxmgV_IwSky0
http://localhost:3003/api/products/photo/676658c3d1dafc55d9426d70



##This is route for the deleting the products
##this is the DELETE request 
##Remember that te header must contain the token as authorization
##put the new of the category in the body of postman
###postman->header->Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzY2YzFkYmI2MGNhY2VhNzFlNTc4NDciLCJpYXQiOjE3MzUwOTUxMjYsImV4cCI6MTczNTEzMTEyNn0.5xXpBfHDDMRew5Cvwlwql6bfc0-K_DaIxmgV_IwSky0
http://localhost:3003/api/products/6766620b3ec1a63039d5c057




## frontend

### -create the react app

--create pages
--create route
--register user
--activate the user
--login the user
--how to use the Outlet in react routing
--protected route for authentication
--manages the loginStatus with help of redux-toolkit
--store login data in local storage
--protected route with the server response
--render navbar conditonally
--use of outlet in react routing
--dyanamic dashboard for the user and admin
--admin dashboard
--user dashboard
--product api
---Create,Read,Update,Delete
--category api
---Create,Read,Update,Delete

--payments
--deploy




