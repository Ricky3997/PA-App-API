const adminService = require("../service/admin");

const changeMentorStatus =  async (req,res) => {
    const {status, id} = req.body;
    const result = await adminService.changeMentorStatus(id, status);
    if(result) res.json(result);
    else res.sendStatus(400);
};

module.exports = {changeMentorStatus};