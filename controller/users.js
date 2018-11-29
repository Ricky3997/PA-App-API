const userService = require("../service/users");

const profile = (req,res) => {
    const {email} = req.decoded;
    res.json(userService.getUserProfile(email))
};

module.exports = {
    profile
};