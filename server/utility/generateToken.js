const jwt = require("jsonwebtoken")
const {dev} = require("../config/index")
//generating the token as jsonToken


const getJsonToken = (name, email, hashPassword, address) => {

    return jwt.sign({ name: name, email: email, password: hashPassword, address: address }, dev.secretKey.jwtSecretKey, {
        expiresIn: "100m"
    })
}
//exporting the  model
module.exports = { getJsonToken }