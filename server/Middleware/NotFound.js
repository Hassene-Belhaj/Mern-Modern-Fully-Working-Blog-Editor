const NotFound = async (req,res) => {
    return res.status(404).json({succes : false , message : `route ${req.originalUrl} does not exist `})
}



module.exports = {
    NotFound
};
