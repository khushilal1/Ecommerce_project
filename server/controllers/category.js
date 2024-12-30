const slugify = require("slugify")
const { Category } = require("../models/category")


//for creating  new category
const createCategory = async (req, res) => {

    try {

        //getting the admin value
        const adminId = req.admin._id
        console.log(adminId)
        //checking if the admin is not not
        if (!adminId) {
            return res.status(403).json({ message: 'You must be an admin to create categories.' });
        }
        console.log("category creation")
        //getting the nane of category
        const { name } = req.body
        //checking the categrory name in the database
        const existingCategory = await Category.findOne({ name: name })
        //checking the categiory is already exist or not
        if (existingCategory) {
            return res.status(400).json({ error: "Category already exist with this name" })
        }

        // //saving the category

        const newCategory = await new Category({
            name: name,
            slug: slugify(name),
            admin: adminId,
        })
        //savig the value
        await newCategory.save()
        //sending the response 
        return res.status(201).json({ message: "Category was created", newCategory: newCategory })
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }


}


//getting all category
const getAllCategories = async (req, res) => {

    try {

        const allCategories = await Category.find()
        if (!allCategories) {
            return res.status(400).jso({ error: "The categories not found" })
        }
        return res.status(200).json({ message: "Categories was returned", allCategries: allCategories })
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }


}


//for getting the single categories
const getSingleCategory = async (req, res) => {

    try {
        //gettign the value from thw params as query parmater
        const { slug } = req.params
        console.log(slug);

        const singleCategory = await Category.findOne({ slug: slug })
        if (!singleCategory) {
            return res.status(400).json({ error: "Category  not exist with slug" })
        }


        return res.status(200).json({ message: "single category was return", singleCategory: singleCategory })



    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }


}



// updating the category
const updateCategory = async (req, res) => {

    try {

        console.log(req.params);


        const { categoryId } = req.params
        if (!categoryId) {
            return res.status(401).json({ error: "The categoryId is invalid" })
        }
        //checking the in database
        const existingCategory = await Category.findById({ _id: categoryId })
        //
        if (!existingCategory) {
            return res.status(400).json({ error: "The category with id did not found" })
        }
        //gettig the name category
        const { name } = req.body



        //update  the name and slug of category
        const updatedCategory = await Category.findByIdAndUpdate({ _id: categoryId }, { name: name, slug: slugify(name) }, { new: true })

        return res.status(200).json({ message: "Updated category was returned", updatedCategory: updatedCategory })

    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }


}

//for delete the categpry
const deleteCategory = async (req, res) => {

    try {
        const { categoryId } = req.params
        if (!categoryId) {
            return res.status(401).json({ error: "The categoryId is invalid" })
        }
        //checking the in database
        const existingCategory = await Category.findById({ _id: categoryId })
        //
        if (!existingCategory) {
            return res.status(400).json({ error: "The category with id did not found" })
        }


        //update  the name and slug of category
        const deletedCategory = await Category.findByIdAndDelete({ _id: categoryId })

        return res.status(200).json({ message: "Deleted category was returned ", deletedCategory: deletedCategory })

    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }


}




//for the searching on the basis of category name and their slug nmae 
const searchCategory = async (req, res) => {

    try {
        //getting the value from params 
        const { searchValue } = req.params
        //searching the category the
        console.log(searchValue)
        //for searching the product
        const searchedCategory = await Category.find({
            $or: [
                { name: { $regex: searchValue, $options: "i" } }, // i for case sensitive 
                { slug: { $regex: searchValue, $options: "i" } } // i for case sensitive 
            ]
        })


        //checking if the category not found
        if (searchedCategory.length<1) {
            return res.status(404).json({ message: "No categories found matching the search." })
        }

        //returning the value to the frontend
        return res.status(200).send({ message: "Searched Category was returned", searchedCategory: searchedCategory })


    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }


}





module.exports = { createCategory, updateCategory, getSingleCategory, getAllCategories, deleteCategory, searchCategory }