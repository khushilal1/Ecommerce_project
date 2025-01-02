
//cleint error
const clientError = (err, req, res, next) => {
    console.log(err.stack);
    return res.status(500).send({
        success: false,
        message: err.message
    })
}




const serverError = (err, req, res, next) => {
    console.log(err.stack);
    return res.status(404).json({
        success: false,
        message: "Route not found"
    })

}
module.exports = { clientError, serverError }