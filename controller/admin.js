const adminService = require("../service/admin");

const changeUserStatus =  async (req,res) => {
    const {status, id, type} = req.body;
    const result = await adminService.changeUserStatus(id, status, type);
    if(result) res.json(result);
    else res.sendStatus(400);
};
const matchingMentorRecommendations =  async (req,res) => {
    const result = await adminService.matchingMentorRecommendations(req.params.id);
    if(result) res.json(result);
    else res.sendStatus(400);
};

module.exports = {changeUserStatus, matchingMentorRecommendations};