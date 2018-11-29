const userService = require("../service/users");

const profile = (req,res) => {
    const {email} = req.decoded;
    const result = userService.getUserProfile(email)
    if(result) res.json(result)
    else res.sendStatus(400);
};

module.exports = {
    profile
};