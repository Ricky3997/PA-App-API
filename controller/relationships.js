const relationshipsService = require("../service/relationships");

const getAll = async (req,res) => {
    const result = await relationshipsService.getAll()
    if(result) res.json(result)
    else res.sendStatus(400);
};
const mentorDecision = async (req,res) => {
    const {id} = req.decoded;
    const {relationshipId} = req.params;
    const {accept} = req.body;
    const result = await relationshipsService.mentorDecision(relationshipId, id, accept)
    if(result) res.json(result)
    else res.sendStatus(400);
};

module.exports = {getAll, mentorDecision};