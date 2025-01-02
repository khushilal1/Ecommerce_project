const bcrypt = require("bcrypt")
const saltRounds = 10

//converting the plain password into hash password
const getHashPassword = async (password) => {

    try {

        return await bcrypt.hash(password, saltRounds)

    }
    catch (error) {
        res.status(400).send({
            sucess: false,
            message: "Error on hashing of password"
        })
    }


}


//converting the plain password into hash password
const getComparePassword = async (plainPassword, hashPassword) => {

    try {
        return await bcrypt.compare(plainPassword, hashPassword)

    }
    catch (error) {
        console.log(error.message);


    }


}



module.exports
    = { getHashPassword, getComparePassword }