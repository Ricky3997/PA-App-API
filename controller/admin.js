const adminService = require("../service/admin");

const changeUserStatus =  async (req,res) => {
    const {status, id, type, rejectionReason} = req.body;
    const result = await adminService.changeUserStatus(type, id, status, rejectionReason);
    if(result) res.json(result);
    else res.sendStatus(400);
};
const matchingMentorRecommendations =  async (req,res) => {
    const result = await adminService.matchingMentorRecommendations(req.params.id);
    if(result) res.json(result);
    else res.sendStatus(400);
};
const createMatch =  async (req,res) => {
    const {mentorId, menteeId} = req.body;
    const result = await adminService.createMatch(mentorId, menteeId);
    if(result) res.json(result);
    else res.sendStatus(400);
};

module.exports = {changeUserStatus, matchingMentorRecommendations, createMatch};